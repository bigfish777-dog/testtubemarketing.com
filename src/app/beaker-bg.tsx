"use client";

import { useEffect, useRef } from "react";

/*
 * Ambient 3D glass beaker for the hero background (round 4, item 16).
 * WebGL via three.js. Runs entirely in a browser effect (SSR-safe: the
 * container renders empty on the server; three.js loads client-side only,
 * code-split via dynamic import so it never touches the initial bundle).
 *
 * Deliberately a background flourish, not a centrepiece: a real glass
 * beaker with a fushia measure of liquid, softly lit, turning slowly.
 * NOT ASCII. NOT scroll-driven (that was the killed foreground gimmick).
 * - prefers-reduced-motion: renders a single still frame, no loop.
 * - Off-screen: the RAF loop pauses (IntersectionObserver) to save power.
 * - <=680px: not initialised at all; the CSS hero gradient carries mobile.
 */
export function BeakerBg() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (typeof window === "undefined") return;
    // Mobile / tiny viewports: skip WebGL entirely, keep the CSS gradient.
    if (window.matchMedia("(max-width: 680px)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import(
        "three/examples/jsm/environments/RoomEnvironment.js"
      );
      if (disposed || !hostRef.current) return;

      const width = host.clientWidth || window.innerWidth;
      const height = host.clientHeight || window.innerHeight;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.02;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();

      // Environment: gives the glass something real to refract/reflect.
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;

      const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
      camera.position.set(0, 2.4, 17);
      camera.lookAt(0, -0.3, 0);

      // Soft key + fill so the fushia liquid reads warm, not muddy.
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(4, 8, 6);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xff5e9f, 0.9);
      rim.position.set(-6, 2, -4);
      scene.add(rim);
      scene.add(new THREE.HemisphereLight(0xffffff, 0xe9ddc9, 0.5));

      // Group holds the whole beaker so we can float/turn it as one.
      // Scaled down and floated on the right so the whole vessel reads;
      // the camera looks down a touch to reveal the rim and liquid line.
      const beaker = new THREE.Group();
      beaker.scale.setScalar(0.64);
      beaker.position.set(3.7, -0.1, 0);
      beaker.rotation.z = 0.07;
      scene.add(beaker);

      // --- Glass body: a lathed beaker profile (straight sides, a lip,
      // a slight pour spout feel from the flared rim). ---
      const R = 1.85; // outer radius
      const H = 4.6; // height
      const wall = 0.14;
      const profile: InstanceType<typeof THREE.Vector2>[] = [];
      profile.push(new THREE.Vector2(0.0, -H / 2)); // base centre
      profile.push(new THREE.Vector2(R - 0.05, -H / 2)); // base edge
      profile.push(new THREE.Vector2(R, -H / 2 + 0.18));
      profile.push(new THREE.Vector2(R, H / 2 - 0.1));
      profile.push(new THREE.Vector2(R + 0.12, H / 2)); // flared rim
      profile.push(new THREE.Vector2(R + 0.12 - wall, H / 2)); // rim inner
      profile.push(new THREE.Vector2(R - wall, H / 2 - 0.14));
      profile.push(new THREE.Vector2(R - wall, -H / 2 + wall + 0.16));
      profile.push(new THREE.Vector2(0.0, -H / 2 + wall)); // inner base
      const glassGeo = new THREE.LatheGeometry(profile, 96);
      glassGeo.computeVertexNormals();

      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.06,
        transmission: 1,
        thickness: 1.4,
        ior: 1.46,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.1,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      beaker.add(glass);

      // --- Liquid: fushia, filled a bit under half, softly glowing. ---
      const fill = 0.42;
      const liqH = H * fill;
      const liqGeo = new THREE.CylinderGeometry(
        R - wall - 0.02,
        R - wall - 0.02,
        liqH,
        96,
        1
      );
      const liqMat = new THREE.MeshPhysicalMaterial({
        color: 0xff0d64,
        roughness: 0.18,
        transmission: 0.55,
        thickness: 2.2,
        ior: 1.34,
        emissive: 0xc7004a,
        emissiveIntensity: 0.28,
        envMapIntensity: 0.7,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const liquid = new THREE.Mesh(liqGeo, liqMat);
      liquid.position.y = -H / 2 + wall + liqH / 2 + 0.02;
      beaker.add(liquid);

      // Meniscus: a faint brighter disc at the liquid surface.
      const surfGeo = new THREE.CircleGeometry(R - wall - 0.03, 96);
      const surfMat = new THREE.MeshPhysicalMaterial({
        color: 0xff2f7d,
        emissive: 0xff0d64,
        emissiveIntensity: 0.5,
        roughness: 0.25,
        transmission: 0.3,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const surface = new THREE.Mesh(surfGeo, surfMat);
      surface.rotation.x = -Math.PI / 2;
      surface.position.y = liquid.position.y + liqH / 2;
      beaker.add(surface);

      // Two graduation ticks etched as thin rings (subtle lab detail).
      const tickMat = new THREE.MeshBasicMaterial({
        color: 0x201d1a,
        transparent: true,
        opacity: 0.16,
      });
      [-0.2, 0.7].forEach((yy) => {
        const tick = new THREE.Mesh(
          new THREE.TorusGeometry(R - wall + 0.02, 0.012, 8, 96, Math.PI * 0.5),
          tickMat
        );
        tick.rotation.x = Math.PI / 2;
        tick.rotation.z = -Math.PI * 0.25;
        tick.position.y = yy;
        beaker.add(tick);
      });

      const clock = new THREE.Clock();

      const render = () => {
        renderer.render(scene, camera);
      };

      const tick = () => {
        if (disposed) return;
        const t = clock.getElapsedTime();
        beaker.rotation.y = t * 0.28;
        beaker.position.y = -0.1 + Math.sin(t * 0.5) * 0.12;
        beaker.rotation.z = 0.07 + Math.sin(t * 0.33) * 0.015;
        surfMat.emissiveIntensity = 0.42 + Math.sin(t * 1.1) * 0.1;
        render();
        raf = requestAnimationFrame(tick);
      };

      let raf = 0;
      let running = false;
      const start = () => {
        if (running || disposed) return;
        running = true;
        clock.start();
        raf = requestAnimationFrame(tick);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
        clock.stop();
      };

      // Reduced motion: one still frame, hold the fushia glow, no loop.
      if (reduce) {
        beaker.rotation.y = 0.5;
        render();
      } else {
        // Pause the loop when the hero scrolls out of view.
        const io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) e.isIntersecting ? start() : stop();
          },
          { threshold: 0.01 }
        );
        io.observe(host);
        start();
        const onVis = () => (document.hidden ? stop() : start());
        document.addEventListener("visibilitychange", onVis);
        cleanup = () => {
          io.disconnect();
          document.removeEventListener("visibilitychange", onVis);
          stop();
        };
      }

      const onResize = () => {
        if (disposed || !hostRef.current) return;
        const w = host.clientWidth || window.innerWidth;
        const h = host.clientHeight || window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        if (reduce) render();
      };
      window.addEventListener("resize", onResize);

      const priorCleanup = cleanup;
      cleanup = () => {
        priorCleanup();
        window.removeEventListener("resize", onResize);
        glassGeo.dispose();
        liqGeo.dispose();
        surfGeo.dispose();
        glassMat.dispose();
        liqMat.dispose();
        surfMat.dispose();
        tickMat.dispose();
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className="beaker-canvas" aria-hidden="true" />;
}
