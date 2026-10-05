"use client";

import { useEffect, useRef, useState } from "react";
import { Navigator } from "@/components/art/Navigator";

/**
 * Live 3D navigator (VRM). Only loads on capable desktops — everyone else
 * keeps the static WebP cut-in, which is also shown while the model streams.
 * Model: pixiv VRM1 sample avatar, textures recompressed to WebP and the
 * file gzipped (10.8 MB → 1.2 MB). Decompressed in the browser.
 */
export function NavigatorAvatar({ accent = "#39FF14" }: { accent?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const waveRef = useRef(0);

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
      const [THREE, { GLTFLoader }, { VRMLoaderPlugin, VRMUtils }] =
        await Promise.all([
          import("three"),
          import("three/examples/jsm/loaders/GLTFLoader.js"),
          import("@pixiv/three-vrm"),
        ]);
      const res = await fetch("/models/navigator.vrmz");
      if (!res.ok || !res.body || disposed) return;
      const buf = await new Response(
        res.body.pipeThrough(new DecompressionStream("gzip")),
      ).arrayBuffer();
      if (disposed) return;

      const loader = new GLTFLoader();
      loader.register((parser) => new VRMLoaderPlugin(parser));
      const gltf = await loader.parseAsync(buf, "/models/");
      if (disposed) return;
      const vrm = gltf.userData.vrm;
      VRMUtils.removeUnnecessaryVertices(gltf.scene);
      VRMUtils.combineSkeletons(gltf.scene);

      const w = host.clientWidth;
      const h = host.clientHeight;
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.className = "avatar-canvas";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const key = new THREE.DirectionalLight(0xffffff, Math.PI);
      key.position.set(1, 1.5, 2);
      scene.add(key);
      const rim = new THREE.DirectionalLight(new THREE.Color(accent), 2.2);
      rim.position.set(-2, 1, -1.5);
      scene.add(rim);
      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      scene.add(vrm.scene);
      vrm.scene.rotation.y = 0.3;

      const camera = new THREE.PerspectiveCamera(24, w / h, 0.1, 20);
      camera.position.set(0, 0.95, 4);
      camera.lookAt(0, 0.85, 0);

      const bone = (n: string) => vrm.humanoid?.getNormalizedBoneNode(n);
      const lUpper = bone("leftUpperArm");
      const rUpper = bone("rightUpperArm");
      const rLower = bone("rightLowerArm");
      const head = bone("head");
      const neck = bone("neck");
      const spine = bone("spine");

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
        const nw = host.clientWidth;
        const nh = host.clientHeight;
        renderer.setSize(nw, nh);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      const clock = new THREE.Clock();
      let blinkAt = 2;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) {
          clock.getDelta();
          return;
        }
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;

        // Idle: breathing + relaxed arms
        if (spine) spine.rotation.x = Math.sin(t * 1.6) * 0.02;
        if (lUpper) lUpper.rotation.z = -1.2 + Math.sin(t * 1.6) * 0.02;

        // Wave on click, otherwise rest
        const waving = waveRef.current > 0;
        if (waving) waveRef.current = Math.max(0, waveRef.current - dt);
        const wv = waving ? Math.min(1, waveRef.current * 2) : 0;
        if (rUpper) {
          rUpper.rotation.z = THREE.MathUtils.lerp(
            rUpper.rotation.z,
            waving ? -0.6 : 1.2,
            0.15,
          );
          rUpper.rotation.y = THREE.MathUtils.lerp(
            rUpper.rotation.y,
            waving ? 0.9 : 0,
            0.15,
          );
        }
        if (rLower)
          rLower.rotation.y = waving ? 0.3 + Math.sin(t * 14) * 0.35 * wv : 0;

        // Look toward the cursor
        if (neck)
          neck.rotation.y = THREE.MathUtils.lerp(
            neck.rotation.y,
            mouse.x * 0.35 - 0.2,
            0.08,
          );
        if (head)
          head.rotation.x = THREE.MathUtils.lerp(
            head.rotation.x,
            mouse.y * 0.18,
            0.08,
          );

        // Blink
        const em = vrm.expressionManager;
        if (em) {
          blinkAt -= dt;
          const b =
            blinkAt < 0 ? Math.max(0, 1 - Math.abs(blinkAt + 0.08) / 0.08) : 0;
          if (blinkAt < -0.16) blinkAt = 2 + Math.random() * 3;
          em.setValue("blink", b);
          em.setValue("happy", waving ? 0.7 : 0.25);
        }

        vrm.update(dt);
        renderer.render(scene, camera);
      };
      tick();
      setReady(true);

      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        io.disconnect();
        VRMUtils.deepDispose(vrm.scene);
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // Wait for the page to settle before pulling ~1.4 MB of 3D
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
      onClick={() => {
        waveRef.current = 1.6;
      }}
      onKeyDown={(e) => {
        if (e.key === "h") waveRef.current = 1.6;
      }}
      role="img"
      aria-label="3D navigator avatar — click to wave"
      title={ready ? "Click me" : undefined}
    >
      <Navigator
        variant="full"
        priority
        sizes="(max-width: 768px) 40vw, 22vw"
        className="avatar-fallback"
      />
    </div>
  );
}
