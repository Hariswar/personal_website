import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { seeded, useCanvasTexture } from "../canvasTexture";

const WALL = "#2a2c4a";
const TRIM = "#1f2038";

// Floor, two walls, window with a night sky, rug, curtains and fairy lights
const Shell = () => {
  const floorTex = useCanvasTexture(1024, 1024, (ctx, w, h) => {
    const rand = seeded(7);
    const plank = h / 12;
    for (let i = 0; i < 12; i++) {
      const tone = 38 + rand() * 10;
      ctx.fillStyle = `hsl(24, 34%, ${tone}%)`;
      ctx.fillRect(0, i * plank, w, plank);
      // wood grain
      ctx.strokeStyle = `hsla(24, 40%, ${tone - 8}%, 0.35)`;
      for (let g = 0; g < 6; g++) {
        ctx.beginPath();
        const y = i * plank + rand() * plank;
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(w * 0.3, y + rand() * 6 - 3, w * 0.6, y + rand() * 6 - 3, w, y);
        ctx.stroke();
      }
      // plank seams
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, i * plank, w, 2);
      const seam = rand() * w;
      ctx.fillRect(seam, i * plank, 2, plank);
    }
  });

  const skyTex = useCanvasTexture(512, 440, (ctx, w, h) => {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#070a1f");
    sky.addColorStop(0.65, "#1b1646");
    sky.addColorStop(1, "#4a2a5e");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const rand = seeded(42);
    for (let i = 0; i < 120; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.3 + rand() * 0.7})`;
      const r = rand() * 1.4 + 0.3;
      ctx.beginPath();
      ctx.arc(rand() * w, rand() * h * 0.7, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // moon with a soft halo
    const halo = ctx.createRadialGradient(370, 110, 10, 370, 110, 110);
    halo.addColorStop(0, "rgba(255,244,214,0.5)");
    halo.addColorStop(1, "rgba(255,244,214,0)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#fff4d6";
    ctx.beginPath();
    ctx.arc(370, 110, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(210,196,160,0.45)";
    ctx.beginPath();
    ctx.arc(358, 100, 7, 0, Math.PI * 2);
    ctx.arc(382, 122, 5, 0, Math.PI * 2);
    ctx.fill();

    // campus skyline with a few lit windows
    let x = 0;
    while (x < w) {
      const bw = 30 + rand() * 60;
      const bh = 50 + rand() * 120;
      ctx.fillStyle = "#0c0b22";
      ctx.fillRect(x, h - bh, bw, bh);
      for (let wy = h - bh + 10; wy < h - 10; wy += 16) {
        for (let wx = x + 6; wx < x + bw - 8; wx += 12) {
          if (rand() > 0.72) {
            ctx.fillStyle = rand() > 0.5 ? "#ffd27a" : "#9fd8ff";
            ctx.fillRect(wx, wy, 5, 7);
          }
        }
      }
      x += bw + 4;
    }
  });

  const rugTex = useCanvasTexture(512, 512, (ctx, w, h) => {
    const colors = ["#3b2f5c", "#5a3f7a", "#2f5a6b", "#7a4a5a", "#3b2f5c"];
    colors.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, (w / 2) * (1 - i * 0.18), 0, Math.PI * 2);
      ctx.fill();
    });
  });

  return (
    <group>
      {/* floor */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <boxGeometry args={[6, 0.12, 6]} />
        <meshStandardMaterial map={floorTex} roughness={0.75} />
      </mesh>

      {/* walls */}
      <mesh position={[0, 1.5, -3.06]} receiveShadow>
        <boxGeometry args={[6.12, 3, 0.12]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      <mesh position={[-3.06, 1.5, 0]} receiveShadow>
        <boxGeometry args={[0.12, 3, 6]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>

      {/* skirting boards */}
      <mesh position={[0, 0.05, -2.99]}>
        <boxGeometry args={[6, 0.1, 0.02]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
      <mesh position={[-2.99, 0.05, 0]}>
        <boxGeometry args={[0.02, 0.1, 6]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>

      <Window skyTex={skyTex} />

      {/* rug */}
      <mesh position={[0.3, 0.004, -0.4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.35, 64]} />
        <meshStandardMaterial map={rugTex} roughness={1} />
      </mesh>

      <FairyLights />
      <Beanbag />
      <FloorPlant />
    </group>
  );
};

const Window = ({ skyTex }: { skyTex: THREE.Texture }) => {
  const frame = "#d9d2c5";
  const cx = 1.95;
  const cy = 1.7;
  const w = 1.3;
  const h = 1.1;

  return (
    <group>
      {/* the view outside: unlit so it glows like the real night sky */}
      <mesh position={[cx, cy, -2.995]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={skyTex} toneMapped={false} />
      </mesh>
      {/* frame */}
      {[
        [cx, cy + h / 2, w + 0.1, 0.06],
        [cx, cy - h / 2, w + 0.1, 0.06],
        [cx, cy, 0.04, h],
      ].map(([x, y, fw, fh], i) => (
        <mesh key={`h${i}`} position={[x, y, -2.97]}>
          <boxGeometry args={[fw, fh, 0.06]} />
          <meshStandardMaterial color={frame} />
        </mesh>
      ))}
      {[cx - w / 2, cx + w / 2].map((x, i) => (
        <mesh key={`v${i}`} position={[x, cy, -2.97]}>
          <boxGeometry args={[0.06, h, 0.06]} />
          <meshStandardMaterial color={frame} />
        </mesh>
      ))}
      <mesh position={[cx, cy, -2.97]}>
        <boxGeometry args={[w, 0.03, 0.04]} />
        <meshStandardMaterial color={frame} />
      </mesh>
      {/* sill */}
      <mesh position={[cx, cy - h / 2 - 0.04, -2.9]} castShadow>
        <boxGeometry args={[w + 0.25, 0.04, 0.22]} />
        <meshStandardMaterial color={frame} />
      </mesh>
      {/* curtains */}
      {[cx - w / 2 - 0.2, cx + w / 2 + 0.2].map((x, i) => (
        <mesh key={`c${i}`} position={[x, cy + 0.05, -2.93]} castShadow>
          <boxGeometry args={[0.32, 1.55, 0.05]} />
          <meshStandardMaterial color="#5b3a6b" roughness={1} />
        </mesh>
      ))}
      <mesh position={[cx, cy + h / 2 + 0.2, -2.92]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, w + 0.9]} />
        <meshStandardMaterial color="#9b8f7a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* moonlight pooling in through the window */}
      <pointLight position={[cx, cy, -2.6]} color="#8fa8ff" intensity={1.2} distance={3} decay={2} />
    </group>
  );
};

// String of warm bulbs swagging along the top of both walls
const FairyLights = () => {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const sag = (t: number) => 2.78 - 0.13 * Math.sin(Math.PI * ((t % 1 + 1) % 1));
    // back wall, left to right
    for (let x = -2.95; x <= 2.95; x += 0.1) pts.push(new THREE.Vector3(x, sag(x + 3), -2.94));
    // left wall, back to front
    const side: THREE.Vector3[] = [];
    for (let z = -2.9; z <= 2.95; z += 0.1) side.push(new THREE.Vector3(-2.94, sag(z + 3), z));
    return { back: pts, side, bulbs: [...pts.filter((_, i) => i % 2 === 0), ...side.filter((_, i) => i % 2 === 0)] };
  }, []);

  const color = useMemo(() => new THREE.Color(), []);

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const dummy = new THREE.Object3D();
    points.bulbs.forEach((p, i) => {
      dummy.position.set(p.x, p.y - 0.03, p.z);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      // colours must exist before the first render so the shader is compiled with them
      m.setColorAt(i, new THREE.Color("#ffb35c"));
    });
    m.instanceMatrix.needsUpdate = true;
  }, [points]);

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const t = clock.elapsedTime;
    points.bulbs.forEach((_, i) => {
      const glow = 1.6 + Math.sin(t * 1.6 + i * 1.7) * 0.9;
      const hue = i % 3 === 0 ? 0.11 : i % 3 === 1 ? 0.08 : 0.13;
      color.setHSL(hue, 1, 0.55).multiplyScalar(glow);
      m.setColorAt(i, color);
    });
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <Line points={points.back} color="#1a1a1a" lineWidth={1} />
      <Line points={points.side} color="#1a1a1a" lineWidth={1} />
      <instancedMesh ref={mesh} args={[undefined, undefined, points.bulbs.length]}>
        <sphereGeometry args={[0.022, 10, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <pointLight position={[-1.5, 2.6, -2.6]} color="#ffb35c" intensity={1.5} distance={3.5} decay={2} />
      <pointLight position={[-2.6, 2.6, 0.5]} color="#ffb35c" intensity={1.2} distance={3.5} decay={2} />
    </group>
  );
};

const Beanbag = () => (
  <group position={[1.9, 0, -0.1]}>
    <mesh position={[0, 0.26, 0]} scale={[1, 0.62, 1]} castShadow receiveShadow>
      <sphereGeometry args={[0.45, 32, 24]} />
      <meshStandardMaterial color="#2f7d6d" roughness={0.9} />
    </mesh>
    <mesh position={[-0.05, 0.42, 0.18]} rotation={[0.4, 0.3, 0.2]} castShadow>
      <boxGeometry args={[0.3, 0.08, 0.3]} />
      <meshStandardMaterial color="#e3c16f" roughness={1} />
    </mesh>
  </group>
);

const FloorPlant = () => (
  <group position={[2.6, 0, -2.55]}>
    <mesh position={[0, 0.2, 0]} castShadow>
      <cylinderGeometry args={[0.2, 0.15, 0.4, 24]} />
      <meshStandardMaterial color="#c9744f" roughness={0.8} />
    </mesh>
    {Array.from({ length: 9 }).map((_, i) => {
      const a = (i / 9) * Math.PI * 2;
      return (
        <mesh key={i} position={[Math.cos(a) * 0.12, 0.62 + (i % 3) * 0.08, Math.sin(a) * 0.12]} rotation={[Math.sin(a) * 0.6, a, Math.cos(a) * 0.6]} castShadow>
          <sphereGeometry args={[0.14, 12, 8]} />
          <meshStandardMaterial color={i % 2 ? "#3f8f4f" : "#2e6e3e"} roughness={0.8} />
        </mesh>
      );
    })}
  </group>
);

export default Shell;
