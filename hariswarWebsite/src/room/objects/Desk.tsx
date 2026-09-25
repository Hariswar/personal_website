import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Station from "./Station";
import Monitor from "./Monitor";
import { useCanvasTexture } from "../canvasTexture";
import { prefersReducedMotion } from "@/lib/motion";

const WOOD = "#8a6a4f";
const WOOD_DARK = "#5e4533";

// Desk against the back wall with everything on it
const Desk = () => (
  <group>
    {/* desktop and side panels */}
    <mesh position={[0.2, 0.75, -2.5]} castShadow receiveShadow>
      <boxGeometry args={[2.3, 0.06, 0.9]} />
      <meshStandardMaterial color={WOOD} roughness={0.6} />
    </mesh>
    {[-0.9, 1.3].map((x) => (
      <mesh key={x} position={[x, 0.36, -2.5]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.72, 0.85]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} />
      </mesh>
    ))}
    {/* drawer unit */}
    <mesh position={[1.0, 0.45, -2.5]} castShadow>
      <boxGeometry args={[0.55, 0.5, 0.8]} />
      <meshStandardMaterial color={WOOD_DARK} roughness={0.7} />
    </mesh>
    {[0.58, 0.34].map((y) => (
      <mesh key={y} position={[1.0, y, -2.09]}>
        <boxGeometry args={[0.16, 0.02, 0.02]} />
        <meshStandardMaterial color="#c9b8a0" metalness={0.8} roughness={0.3} />
      </mesh>
    ))}

    <Station id="monitor">
      <Monitor />
    </Station>

    <Keyboard />
    <Mug />
    <Lamp />
    <DeskPlant />
    <NeonSign />

    <Station id="phone">
      <Phone />
    </Station>

    <Chair />
  </group>
);

const Keyboard = () => {
  const keysTex = useCanvasTexture(512, 170, (ctx, w, h) => {
    ctx.fillStyle = "#1b1d2a";
    ctx.fillRect(0, 0, w, h);
    const cols = 15;
    const rows = 5;
    const kw = w / cols;
    const kh = h / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        ctx.fillStyle = (r + c) % 7 === 0 ? "#6d5bd0" : "#2e3144";
        ctx.fillRect(c * kw + 3, r * kh + 3, kw - 6, kh - 6);
      }
    }
  });

  return (
    <group position={[0.2, 0.785, -2.2]}>
      <mesh castShadow>
        <boxGeometry args={[0.62, 0.02, 0.2]} />
        <meshStandardMaterial color="#1b1d2a" />
      </mesh>
      <mesh position={[0, 0.0101, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 0.19]} />
        <meshStandardMaterial map={keysTex} emissiveMap={keysTex} emissive="#ffffff" emissiveIntensity={0.25} />
      </mesh>
      {/* RGB underglow */}
      <mesh position={[0, -0.009, 0.101]}>
        <boxGeometry args={[0.6, 0.004, 0.002]} />
        <meshBasicMaterial color={[0.6, 0.4, 2.2]} toneMapped={false} />
      </mesh>
      {/* mouse */}
      <mesh position={[0.45, 0.005, 0.02]} scale={[0.6, 0.35, 1]} castShadow>
        <sphereGeometry args={[0.05, 20, 12]} />
        <meshStandardMaterial color="#1b1d2a" roughness={0.4} />
      </mesh>
    </group>
  );
};

const Mug = () => {
  const steam = useRef<THREE.Group>(null);
  const steamTex = useCanvasTexture(64, 64, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

  // puffs rise, grow and fade, then loop
  useFrame(({ clock }) => {
    if (!steam.current || prefersReducedMotion()) return;
    steam.current.children.forEach((child, i) => {
      const t = (clock.elapsedTime * 0.35 + i / 3) % 1;
      child.position.set(Math.sin(t * 6 + i) * 0.015, t * 0.22, 0);
      child.scale.setScalar(0.05 + t * 0.08);
      ((child as THREE.Sprite).material as THREE.SpriteMaterial).opacity = Math.sin(t * Math.PI) * 0.5;
    });
  });

  return (
    <group position={[-0.32, 0.78, -2.25]}>
      <mesh position={[0, 0.055, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.11, 24, 1, true]} />
        <meshStandardMaterial color="#e8e2d6" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.005, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 24]} />
        <meshStandardMaterial color="#e8e2d6" />
      </mesh>
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.042, 24]} />
        <meshStandardMaterial color="#3b2416" roughness={0.3} />
      </mesh>
      <mesh position={[0.05, 0.055, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.025, 0.008, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#e8e2d6" />
      </mesh>
      <group ref={steam} position={[0, 0.12, 0]}>
        {[0, 1, 2].map((i) => (
          <sprite key={i}>
            <spriteMaterial map={steamTex} transparent depthWrite={false} opacity={0} />
          </sprite>
        ))}
      </group>
    </group>
  );
};

// Desk lamp: the warm key light of the whole room
const Lamp = () => {
  const [target] = useState(() => new THREE.Object3D());

  return (
    <group position={[-0.68, 0.78, -2.72]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.09, 0.1, 0.03, 24]} />
        <meshStandardMaterial color="#2b2b33" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0.06, 0.2, 0.02]} rotation={[0, 0, -0.35]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.42]} />
        <meshStandardMaterial color="#2b2b33" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0.17, 0.42, 0.08]} rotation={[0.3, 0, 0.9]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.28]} />
        <meshStandardMaterial color="#2b2b33" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* shade (open cone) and bulb */}
      <group position={[0.3, 0.36, 0.16]} rotation={[0.5, 0, -0.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.03, 0.1, 0.13, 24, 1, true]} />
          <meshStandardMaterial color="#e0a84f" side={THREE.DoubleSide} metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.03, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color={[4, 2.6, 1.3]} toneMapped={false} />
        </mesh>
      </group>
      <primitive object={target} position={[0.6, -0.05, 0.45]} />
      <spotLight
        position={[0.3, 0.33, 0.18]}
        target={target}
        color="#ffb46b"
        intensity={6}
        angle={0.95}
        penumbra={0.7}
        distance={4}
        decay={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <pointLight position={[0.3, 0.3, 0.2]} color="#ffb46b" intensity={0.8} distance={1.6} decay={2} />
    </group>
  );
};

const DeskPlant = () => (
  <group position={[1.18, 0.78, -2.78]}>
    <mesh position={[0, 0.05, 0]} castShadow>
      <cylinderGeometry args={[0.06, 0.05, 0.1, 16]} />
      <meshStandardMaterial color="#e6d3b3" />
    </mesh>
    {Array.from({ length: 6 }).map((_, i) => {
      const a = (i / 6) * Math.PI * 2;
      return (
        <mesh key={i} position={[Math.cos(a) * 0.03, 0.13, Math.sin(a) * 0.03]} rotation={[Math.sin(a) * 0.5, 0, Math.cos(a) * 0.5]} castShadow>
          <coneGeometry args={[0.02, 0.12, 6]} />
          <meshStandardMaterial color="#5aa469" />
        </mesh>
      );
    })}
  </group>
);

// "Hariswar" in glowing neon script above the monitor, with an occasional flicker
const NeonSign = () => {
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const tex = useCanvasTexture(1024, 300, (ctx, w, h) => {
    ctx.font = '700 170px "Caveat", cursive';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "#ff4fd8";
    ctx.shadowBlur = 30;
    ctx.strokeStyle = "#ffc2f2";
    ctx.lineWidth = 6;
    ctx.fillStyle = "#ff7ae3";
    ctx.fillText("Hariswar", w / 2, h / 2);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffe6fa";
    ctx.fillText("Hariswar", w / 2, h / 2);
  });

  useFrame(({ clock }) => {
    if (!mat.current || prefersReducedMotion()) return;
    const t = clock.elapsedTime % 7;
    const flicker = t > 6.2 && t < 6.5 && Math.sin(t * 90) > 0 ? 0.35 : 1;
    mat.current.color.setScalar(1.6 * flicker);
  });

  return (
    <group position={[0.2, 2.25, -2.985]}>
      <mesh>
        <planeGeometry args={[1.7, 0.5]} />
        <meshBasicMaterial ref={mat} map={tex} transparent toneMapped={false} depthWrite={false} />
      </mesh>
      <pointLight position={[0, 0, 0.35]} color="#ff5fd8" intensity={1.4} distance={2.5} decay={2} />
    </group>
  );
};

// Phone lying on the desk; buzzes every few seconds to invite a click
const Phone = () => {
  const group = useRef<THREE.Group>(null);
  const screen = useRef<THREE.MeshBasicMaterial>(null);

  const tex = useCanvasTexture(256, 512, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#241a4f");
    g.addColorStop(1, "#0b3a4a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = '600 64px "Inter", sans-serif';
    ctx.fillText("11:47", w / 2, 120);
    ctx.font = '500 20px "Inter", sans-serif';
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText("late night coding", w / 2, 155);
    // notification bubble
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    ctx.beginPath();
    ctx.roundRect(20, 220, w - 40, 90, 18);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.font = '600 22px "Inter", sans-serif';
    ctx.fillText("💬 New message", 40, 257);
    ctx.font = '500 19px "Inter", sans-serif';
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText("Tap to get in touch!", 40, 287);
  });

  useFrame(({ clock }) => {
    const t = clock.elapsedTime % 5;
    const buzzing = t < 0.5 && !prefersReducedMotion();
    if (group.current) group.current.rotation.y = -0.35 + (buzzing ? Math.sin(t * 80) * 0.04 : 0);
    if (screen.current) screen.current.color.setScalar(t < 1.2 ? 1.3 : 0.85);
  });

  return (
    <group ref={group} position={[0.98, 0.787, -2.3]} rotation={[0, -0.35, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.09, 0.012, 0.18]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.0065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.082, 0.168]} />
        <meshBasicMaterial ref={screen} map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
};

const Chair = () => (
  <group position={[0.25, 0, -1.55]} rotation={[0, 0.3, 0]}>
    <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.5, 0.07, 0.48]} />
      <meshStandardMaterial color="#303450" roughness={0.9} />
    </mesh>
    <mesh position={[0, 0.85, 0.24]} rotation={[-0.12, 0, 0]} castShadow>
      <boxGeometry args={[0.48, 0.62, 0.06]} />
      <meshStandardMaterial color="#303450" roughness={0.9} />
    </mesh>
    <mesh position={[0, 0.25, 0]} castShadow>
      <cylinderGeometry args={[0.025, 0.025, 0.42]} />
      <meshStandardMaterial color="#888" metalness={0.8} roughness={0.3} />
    </mesh>
    {Array.from({ length: 5 }).map((_, i) => {
      const a = (i / 5) * Math.PI * 2;
      return (
        <mesh key={i} position={[Math.cos(a) * 0.15, 0.04, Math.sin(a) * 0.15]} rotation={[0, -a, 0]} castShadow>
          <boxGeometry args={[0.3, 0.03, 0.04]} />
          <meshStandardMaterial color="#222" />
        </mesh>
      );
    })}
  </group>
);

export default Desk;
