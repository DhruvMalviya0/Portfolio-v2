"use client";

import { useEffect, useRef, useState } from "react";
import type { Mesh, MeshStandardMaterial, Object3D, SkinnedMesh } from "three";
import { Navigator } from "@/components/art/Navigator";
import { usePortfolioStore } from "@/lib/store";

/**
 * Live 3D Jotaro. Only loads on capable desktops — everyone else keeps the
 * static WebP cut-in, which is also shown while the model streams.
 * Strikes a new random pose each time the menu selection moves.
 * Model: static Jotaro OBJ, rigged in Blender with one pose clip per stance,
 * textures as WebP and the GLB gzipped (1.36 MB → 0.93 MB). Decompressed in
 * the browser.
 */

// Clip names baked into the GLB
const POSES = [
  { clip: "idle", line: "…" },
  { clip: "yare", line: "YARE YARE DAZE" },
  { clip: "point", line: "OI. YOU." },
  { clip: "ora", line: "ORA ORA ORA!" },
  { clip: "stardust", line: "STAR PLATINUM!" },
  { clip: "crossed", line: "HMPH." },
] as const;
const FADE = 0.6; // seconds to blend into a new pose

/** Shuffle-bag: every pose shows once before any repeats, never twice in a row */
function poseDeck(count: number) {
  let bag: number[] = [];
  let last = -1;
  return () => {
    if (bag.length === 0) {
      bag = Array.from({ length: count }, (_, i) => i);
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      if (bag[bag.length - 1] === last) bag.reverse();
    }
    last = bag.pop() as number;
    return last;
  };
}

interface Channel {
  obj: Object3D;
  prop: "quaternion" | "position" | "scale";
  /** First keyframe of each pose clip, indexed like POSES */
  poses: number[][];
  from: number[];
}

export function JotaroAvatar({ accent = "#39FF14" }: { accent?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [pose, setPose] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const capable =
      window.innerWidth >= 900 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !conn?.saveData &&
      typeof DecompressionStream !== "undefined";
    if (!capable) return;

    let disposed = false;
    let raf = 0;
    let cleanup = () => {};

    const start = async () => {
      const [THREE, { GLTFLoader }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/loaders/GLTFLoader.js"),
      ]);
      const res = await fetch("/models/jotaro.glbz");
      if (!res.ok || !res.body || disposed) return;
      const buf = await new Response(
        res.body.pipeThrough(new DecompressionStream("gzip")),
      ).arrayBuffer();
      if (disposed) return;

      const gltf = await new GLTFLoader().parseAsync(buf, "/models/");
      if (disposed) return;
      const model = gltf.scene;
      model.traverse((o) => {
        if (!(o as Mesh).isMesh) return;
        const mesh = o as SkinnedMesh;
        mesh.frustumCulled = false; // posed bounds drift from the bind pose
        const mat = mesh.material as MeshStandardMaterial;
        // Texture alpha is only cut-outs (hair tips, lashes) — clip, don't sort
        mat.transparent = false;
        mat.alphaTest = 0.5;
        mat.depthWrite = true;
      });

      const w = host.clientWidth;
      const h = host.clientHeight;
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w * 2.2, h);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.className = "avatar-canvas";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const key = new THREE.DirectionalLight(0xffffff, Math.PI * 0.85);
      key.position.set(1, 1.5, 2);
      scene.add(key);
      const rim = new THREE.DirectionalLight(new THREE.Color(accent), 2.4);
      rim.position.set(-2, 1, -1.5);
      scene.add(rim);
      scene.add(new THREE.AmbientLight(0xffffff, 1.1));
      scene.add(model);
      model.rotation.y = -0.3;

      // Canvas is 2.2× the slot so outstretched arms aren't clipped
      const camera = new THREE.PerspectiveCamera(24, (w * 2.2) / h, 0.1, 30);
      camera.position.set(0, 1.0, 5.6);
      camera.lookAt(0, 0.96, 0);

      // Each clip is a held pose, so read its first keyframe per bone and
      // blend between those ourselves. (AnimationMixer skips writing values
      // that don't change, which let the additive layer below accumulate.)
      const channels = new Map<string, Channel>();
      POSES.forEach((p, i) => {
        const clip = THREE.AnimationClip.findByName(gltf.animations, p.clip);
        if (!clip) throw new Error(`jotaro.glbz is missing the ${p.clip} clip`);
        for (const track of clip.tracks) {
          const { nodeName, propertyName } =
            THREE.PropertyBinding.parseTrackName(track.name);
          const obj = model.getObjectByName(nodeName);
          if (!obj) continue;
          const prop = propertyName as Channel["prop"];
          let ch = channels.get(track.name);
          if (!ch) {
            ch = { obj, prop, poses: [], from: obj[prop].toArray() };
            channels.set(track.name, ch);
          }
          const stride = track.getValueSize();
          ch.poses[i] = Array.from(track.values.slice(0, stride));
        }
      });

      const nextPose = poseDeck(POSES.length);
      let target = nextPose();
      let blend = 1; // start fully in the first pose
      for (const ch of channels.values()) ch.from = ch.poses[target] ?? ch.from;
      setPose(target);

      const switchPose = () => {
        target = nextPose();
        blend = 0;
        for (const ch of channels.values()) ch.from = ch.obj[ch.prop].toArray();
        setPose(target);
      };
      // Change pose only when the menu selection moves
      const unsubscribe = usePortfolioStore.subscribe((s, prev) => {
        if (s.menuFocus !== prev.menuFocus) switchPose();
      });

      const qa = new THREE.Quaternion();
      const qb = new THREE.Quaternion();
      const va = new THREE.Vector3();
      const vb = new THREE.Vector3();
      const applyPose = (k: number) => {
        for (const ch of channels.values()) {
          const to = ch.poses[target];
          if (!to) continue;
          if (ch.prop === "quaternion") {
            qa.fromArray(ch.from);
            qb.fromArray(to);
            ch.obj.quaternion.slerpQuaternions(qa, qb, k);
          } else {
            ch.obj[ch.prop].lerpVectors(
              va.fromArray(ch.from),
              vb.fromArray(to),
              k,
            );
          }
        }
      };

      const head = model.getObjectByName("head");
      const neck = model.getObjectByName("neck");
      const chest = model.getObjectByName("chest");
      const tmp = new THREE.Quaternion();
      const euler = new THREE.Euler();
      const look = { x: 0, y: 0 };

      const mouse = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
      });
      io.observe(host);

      const onResize = () => {
        const nw = host.clientWidth * 2.2;
        const nh = host.clientHeight;
        renderer.setSize(nw, nh);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      const clock = new THREE.Clock();
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) {
          clock.getDelta();
          return;
        }
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;

        // Base pose is rebuilt every frame, so the layer below never stacks
        blend = Math.min(1, blend + dt / FADE);
        const k = blend < 0.5 ? 4 * blend ** 3 : 1 - (-2 * blend + 2) ** 3 / 2;
        applyPose(k);

        // Layered on top of the held pose: breathing + glance at the cursor
        if (chest) {
          tmp.setFromEuler(euler.set(Math.sin(t * 1.6) * 0.025, 0, 0));
          chest.quaternion.multiply(tmp);
        }
        look.x = THREE.MathUtils.lerp(look.x, mouse.x * 0.3, 0.08);
        look.y = THREE.MathUtils.lerp(look.y, mouse.y * 0.15, 0.08);
        if (neck) {
          tmp.setFromEuler(euler.set(0, look.x * 0.5, 0));
          neck.quaternion.premultiply(tmp);
        }
        if (head) {
          tmp.setFromEuler(euler.set(look.y, look.x * 0.5, 0));
          head.quaternion.premultiply(tmp);
        }

        renderer.render(scene, camera);
      };
      tick();
      setReady(true);

      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        io.disconnect();
        unsubscribe();
        model.traverse((o) => {
          const mesh = o as Mesh;
          if (!mesh.isMesh) return;
          mesh.geometry.dispose();
          const mat = mesh.material as MeshStandardMaterial;
          mat.map?.dispose();
          mat.normalMap?.dispose();
          mat.dispose();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // Wait for the page to settle before pulling ~1 MB of 3D
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(() => void start(), { timeout: 1500 })
      : setTimeout(() => void start(), 600);

    return () => {
      disposed = true;
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle);
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, [accent]);

  return (
    <div
      ref={hostRef}
      className={`avatar-host ${ready ? "avatar-ready" : ""}`}
      role="img"
      aria-label="3D Jotaro Kujo"
    >
      <Navigator
        variant="full"
        priority
        sizes="(max-width: 768px) 40vw, 22vw"
        className="avatar-fallback"
      />
      {ready && (
        <span className="avatar-tag font-display" key={pose} aria-live="polite">
          {POSES[pose].line}
        </span>
      )}
    </div>
  );
}
