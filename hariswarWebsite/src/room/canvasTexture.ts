import { useEffect, useMemo } from "react";
import * as THREE from "three";

// Web fonts only download once something asks for them, so request the ones the textures use.
let fontsReady: Promise<unknown> | null = null;
const loadFonts = () => {
  if (!fontsReady) {
    fontsReady = document.fonts
      ? Promise.all([
          document.fonts.load('700 64px "Caveat"'),
          document.fonts.load('700 64px "Playfair Display"'),
          document.fonts.load('500 32px "JetBrains Mono"'),
          document.fonts.load('600 32px "Inter"'),
        ]).catch(() => undefined)
      : Promise.resolve();
  }
  return fontsReady;
};

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

// Draws with the 2D canvas API and returns it as a Three.js texture.
// It redraws once the fonts have loaded so text never stays in a fallback font.
export function useCanvasTexture(width: number, height: number, draw: Draw, deps: unknown[] = []) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [width, height]);

  useEffect(() => {
    const canvas = texture.image as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let alive = true;
    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      draw(ctx, width, height);
      texture.needsUpdate = true;
    };

    paint();
    loadFonts().then(() => alive && paint());
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texture, ...deps]);

  useEffect(() => () => texture.dispose(), [texture]);

  return texture;
}

// Small deterministic random generator so the scene looks the same on every visit
export const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

// Wraps text to a max width and returns the lines
export const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
};
