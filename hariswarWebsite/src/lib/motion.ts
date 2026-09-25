// Shared helpers for the interactive animations

// true when the viewer asked their OS to reduce motion
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// true on touch devices, where hover effects like tilt don't make sense
export const isCoarsePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;
