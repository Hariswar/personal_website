import { Html } from "@react-three/drei";
import { projects } from "@/constants/project";
import { useCanvasTexture } from "../canvasTexture";
import { useRoom } from "../RoomContext";
import ProjectsOS from "../ui/ProjectsOS";

const SCREEN_W = 1.0;
const SCREEN_H = 0.56;
const SCREEN_Z = -2.6585;
// Html "transform" mode maps 400 / distanceFactor CSS pixels onto one world unit,
// so this factor makes a 1000px wide page exactly fill the 1m wide screen.
const PX_WIDTH = 1000;
const DISTANCE_FACTOR = (400 * SCREEN_W) / PX_WIDTH;

// Monitor with an idle "terminal" wallpaper; zooming in boots a small OS listing the projects
const Monitor = () => {
  const { focus, arrived, screenMode } = useRoom();
  const showOS = focus === "monitor" && arrived && screenMode;

  const idle = useCanvasTexture(1024, 574, (ctx, w, h) => {
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#0b1020");
    bg.addColorStop(1, "#111b33");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#1a2340";
    ctx.fillRect(0, 0, w, 44);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(28 + i * 26, 22, 8, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#8b95b8";
    ctx.font = '500 20px "JetBrains Mono", monospace';
    ctx.fillText("hariswar@dorm: ~/projects", 120, 29);

    ctx.font = '500 26px "JetBrains Mono", monospace';
    let y = 100;
    ctx.fillStyle = "#c678dd";
    ctx.fillText("$", 40, y);
    ctx.fillStyle = "#98c379";
    ctx.fillText("ls ./projects", 70, y);
    y += 44;
    projects.slice(0, 8).forEach((p, i) => {
      ctx.fillStyle = ["#61afef", "#e5c07b", "#56b6c2", "#e06c75"][i % 4];
      ctx.fillText(`${p.title.slice(0, 30)}/`, i % 2 ? 520 : 40, y);
      if (i % 2) y += 40;
    });
    y += 40;
    ctx.fillStyle = "#c678dd";
    ctx.fillText("$", 40, y);
    ctx.fillStyle = "#abb2bf";
    ctx.fillText("click the screen to open ▌", 70, y);
  });

  return (
    <group>
      {/* stand */}
      <mesh position={[0.2, 0.79, -2.66]} castShadow>
        <boxGeometry args={[0.32, 0.02, 0.2]} />
        <meshStandardMaterial color="#1c1d24" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.2, 0.96, -2.71]} castShadow>
        <boxGeometry args={[0.06, 0.34, 0.04]} />
        <meshStandardMaterial color="#1c1d24" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* bezel */}
      <mesh position={[0.2, 1.22, -2.68]} castShadow>
        <boxGeometry args={[SCREEN_W + 0.06, SCREEN_H + 0.06, 0.04]} />
        <meshStandardMaterial color="#14151b" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* screen */}
      <mesh position={[0.2, 1.22, SCREEN_Z]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial map={idle} toneMapped={false} color={showOS ? "#000" : [1.15, 1.15, 1.15]} />
      </mesh>
      {/* screen glow washing onto the desk and wall */}
      <pointLight position={[0.2, 1.2, -2.3]} color="#7fb2ff" intensity={1.6} distance={2.2} decay={2} />

      {showOS && (
        <Html
          transform
          position={[0.2, 1.22, SCREEN_Z + 0.002]}
          distanceFactor={DISTANCE_FACTOR}
          zIndexRange={[30, 10]}
        >
          <ProjectsOS width={PX_WIDTH} height={(PX_WIDTH * SCREEN_H) / SCREEN_W} />
        </Html>
      )}
    </group>
  );
};

export default Monitor;
