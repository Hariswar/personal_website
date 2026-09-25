import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seeded, useCanvasTexture } from "../canvasTexture";
import { prefersReducedMotion } from "@/lib/motion";

const MIN = new THREE.Vector3(-2.8, 0.2, -2.8);
const MAX = new THREE.Vector3(2.5, 2.7, 2.2);

// Specks of dust slowly drifting through the lamp light
const Dust = ({ count }: { count: number }) => {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const rand = seeded(3);
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = THREE.MathUtils.lerp(MIN.x, MAX.x, rand());
      positions[i * 3 + 1] = THREE.MathUtils.lerp(MIN.y, MAX.y, rand());
      positions[i * 3 + 2] = THREE.MathUtils.lerp(MIN.z, MAX.z, rand());
      speeds[i] = 0.02 + rand() * 0.05;
    }
    return { positions, speeds };
  }, [count]);

  const sprite = useCanvasTexture(64, 64, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(255,230,190,1)");
    g.addColorStop(0.3, "rgba(255,210,150,0.5)");
    g.addColorStop(1, "rgba(255,210,150,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

  useFrame(({ clock }, dt) => {
    const geo = points.current?.geometry;
    if (!geo || prefersReducedMotion()) return;
    const attr = geo.getAttribute("position") as THREE.BufferAttribute;
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) + speeds[i] * dt;
      if (y > MAX.y) y = MIN.y;
      attr.setY(i, y);
      attr.setX(i, attr.getX(i) + Math.sin(t * 0.3 + i) * 0.0008);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Dust;
