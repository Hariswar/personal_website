import type * as THREE from "three";
import Station from "./Station";
import { useCanvasTexture, wrapText } from "../canvasTexture";
import { jobExperiences } from "@/constants/jobexperience";
import { researchPapers } from "@/constants/researchPapers";

// Two framed posters on the back wall: a career "tour poster" and a research poster
const Posters = () => {
  const experienceTex = useCanvasTexture(600, 850, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#ff7a59");
    g.addColorStop(0.55, "#b8386f");
    g.addColorStop(1, "#3a1d5e");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // retro sun
    ctx.fillStyle = "#ffd36e";
    ctx.beginPath();
    ctx.arc(w / 2, 300, 150, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = "#b8386f";
    for (let i = 0; i < 5; i++) ctx.fillRect(w / 2 - 160, 200 + i * 22, 320, 6 + i * 2);

    ctx.fillStyle = "#fff4e0";
    ctx.textAlign = "center";
    ctx.font = '800 76px "Playfair Display", serif';
    ctx.fillText("EXPERIENCE", w / 2, 120);
    ctx.font = '600 22px "Inter", sans-serif';
    ctx.fillText("THE WORLD TOUR", w / 2, 160);

    ctx.textAlign = "left";
    let y = 380;
    jobExperiences.slice(0, 4).forEach((job) => {
      ctx.fillStyle = "#ffd36e";
      ctx.font = '600 20px "Inter", sans-serif';
      ctx.fillText(job.period.toUpperCase(), 50, y);
      ctx.fillStyle = "#fff4e0";
      ctx.font = '700 28px "Playfair Display", serif';
      wrapText(ctx, job.title, 500).slice(0, 2).forEach((line, i) => ctx.fillText(line, 50, y + 36 + i * 32));
      y += 110;
    });
  });

  const researchTex = useCanvasTexture(500, 650, (ctx, w, h) => {
    ctx.fillStyle = "#10233f";
    ctx.fillRect(0, 0, w, h);
    // blueprint grid
    ctx.strokeStyle = "rgba(120,180,255,0.15)";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 25) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }
    for (let i = 0; i < h; i += 25) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }
    // atom doodle
    ctx.strokeStyle = "#7ad7ff";
    ctx.lineWidth = 3;
    for (let r = 0; r < 3; r++) {
      ctx.beginPath();
      ctx.ellipse(w / 2, 250, 130, 45, (r * Math.PI) / 3, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = "#7ad7ff";
    ctx.beginPath();
    ctx.arc(w / 2, 250, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#e8f4ff";
    ctx.textAlign = "center";
    ctx.font = '800 64px "Playfair Display", serif';
    ctx.fillText("RESEARCH", w / 2, 100);
    ctx.font = '600 26px "JetBrains Mono", monospace';
    ctx.fillStyle = "#7ad7ff";
    ctx.fillText(`${researchPapers.length} papers & reports`, w / 2, 430);
    ctx.font = '500 20px "Inter", sans-serif';
    ctx.fillStyle = "rgba(232,244,255,0.7)";
    ctx.fillText("read them all ↗", w / 2, 470);
  });

  return (
    <Station id="posters">
      <Frame position={[-1.98, 1.8, -2.985]} size={[0.62, 0.88]} texture={experienceTex} />
      <Frame position={[-1.2, 1.98, -2.985]} size={[0.48, 0.62]} texture={researchTex} />
    </Station>
  );
};

const Frame = ({ position, size, texture }: { position: [number, number, number]; size: [number, number]; texture: THREE.Texture }) => (
  <group position={position}>
    <mesh castShadow>
      <boxGeometry args={[size[0] + 0.05, size[1] + 0.05, 0.025]} />
      <meshStandardMaterial color="#141418" roughness={0.5} />
    </mesh>
    <mesh position={[0, 0, 0.0135]}>
      <planeGeometry args={size} />
      <meshStandardMaterial map={texture} roughness={0.6} emissiveMap={texture} emissive="#ffffff" emissiveIntensity={0.12} />
    </mesh>
  </group>
);

export default Posters;
