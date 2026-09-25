import Station from "./Station";
import { useCanvasTexture, wrapText } from "../canvasTexture";
import { currentlyLearning } from "@/constants/room";

// Whiteboard on the left wall, "hand-written" with what I'm learning right now
const Whiteboard = () => {
  const tex = useCanvasTexture(1400, 900, (ctx, w, h) => {
    ctx.fillStyle = "#f4f4f0";
    ctx.fillRect(0, 0, w, h);
    // faint smudges of old notes
    ctx.fillStyle = "rgba(120,130,150,0.06)";
    ctx.beginPath();
    ctx.ellipse(1100, 700, 220, 90, 0.3, 0, Math.PI * 2);
    ctx.ellipse(300, 780, 160, 60, -0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1f3b8a";
    ctx.font = '700 96px "Caveat", cursive';
    ctx.fillText("Currently learning", 70, 130);
    ctx.strokeStyle = "#1f3b8a";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(70, 150);
    ctx.bezierCurveTo(300, 165, 600, 140, 760, 155);
    ctx.stroke();

    const colors = ["#c0392b", "#1e8449", "#7d3c98", "#b9770e"];
    let y = 260;
    currentlyLearning.forEach((item, i) => {
      const color = colors[i % colors.length];
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.font = '700 70px "Caveat", cursive';
      ctx.fillText(`→ ${item.title}`, 90, y);

      // progress bar drawn like a marker sketch
      const barX = 820;
      const barW = 480;
      ctx.lineWidth = 4;
      ctx.strokeRect(barX, y - 42, barW, 40);
      ctx.globalAlpha = 0.55;
      for (let s = 0; s < barW * item.progress; s += 12) {
        ctx.beginPath();
        ctx.moveTo(barX + s, y - 2);
        ctx.lineTo(barX + s + 20, y - 42);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = "#4a4a55";
      ctx.font = '500 40px "Caveat", cursive';
      wrapText(ctx, item.detail, 1150).slice(0, 2).forEach((line, li) => {
        ctx.fillText(line, 130, y + 52 + li * 40);
      });
      y += 200;
    });

    // doodle: small lightbulb
    ctx.strokeStyle = "#b9770e";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(1250, 110, 45, Math.PI * 0.8, Math.PI * 2.2);
    ctx.stroke();
    ctx.strokeRect(1230, 150, 40, 25);
  });

  return (
    <Station id="whiteboard">
      <group position={[-2.975, 1.68, -0.9]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.72, 1.12, 0.03]} />
          <meshStandardMaterial color="#c8ccd4" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[1.64, 1.05]} />
          <meshStandardMaterial map={tex} roughness={0.25} emissiveMap={tex} emissive="#ffffff" emissiveIntensity={0.08} />
        </mesh>
        {/* marker tray with markers */}
        <mesh position={[0, -0.58, 0.04]}>
          <boxGeometry args={[1.2, 0.02, 0.06]} />
          <meshStandardMaterial color="#c8ccd4" metalness={0.6} roughness={0.35} />
        </mesh>
        {["#c0392b", "#1f3b8a", "#1e8449"].map((c, i) => (
          <mesh key={c} position={[-0.3 + i * 0.14, -0.56, 0.05]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.012, 0.012, 0.12, 10]} />
            <meshStandardMaterial color={c} />
          </mesh>
        ))}
      </group>
    </Station>
  );
};

export default Whiteboard;
