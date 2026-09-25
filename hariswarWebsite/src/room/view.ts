import * as THREE from "three";
import type { Vec3 } from "./stations";

export const FOV = 42;

interface ViewSpec {
  target: Vec3;
  direction: Vec3;
  fit: [number, number];
}

// Where the camera must sit so `fit` fills the part of the screen not covered by the info panel.
// Returns the camera position plus a focal offset that slides the object out from under the panel.
export function computeView(spec: ViewSpec, size: { width: number; height: number }, hasPanel: boolean, margin = 1.15) {
  const t = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  let availW = size.width;
  let availH = size.height;
  let offX = 0;
  let offY = 0;

  if (hasPanel) {
    if (size.width >= 768) {
      const panel = Math.min(460, size.width * 0.42); // side panel on the right
      availW -= panel;
      offX = panel / 2 / size.width;
    } else {
      const panel = size.height * 0.52; // bottom sheet on phones
      availH -= panel;
      offY = panel / 2 / size.height;
    }
  }

  const byHeight = (spec.fit[1] * margin) / (2 * t * (availH / size.height));
  const byWidth = (spec.fit[0] * margin) / (2 * t * (availW / size.height));
  const distance = Math.max(byHeight, byWidth);

  const dir = new THREE.Vector3(...spec.direction).normalize();
  const position = new THREE.Vector3(...spec.target).addScaledVector(dir, distance);
  const visibleH = 2 * distance * t;
  const visibleW = (visibleH * size.width) / size.height;

  return {
    position: position.toArray() as Vec3,
    target: spec.target,
    // camera-controls treats +y focal offset as "down" (screen space), which is what the bottom sheet needs
    offset: [visibleW * offX, visibleH * offY, 0] as Vec3,
    distance,
  };
}
