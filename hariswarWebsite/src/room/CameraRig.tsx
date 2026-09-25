import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { useRoom } from "./RoomContext";
import { overview, stations } from "./stations";
import { computeView } from "./view";
import { prefersReducedMotion } from "@/lib/motion";

// Flies the camera between the overview and each station, and limits how far visitors can orbit
const CameraRig = ({ onArrive }: { onArrive: (arrived: boolean) => void }) => {
  const ref = useRef<CameraControls>(null);
  const { size } = useThree();
  const { focus, entered, screenMode } = useRoom();

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    c.smoothTime = prefersReducedMotion() ? 0.12 : 0.65;
    c.truckSpeed = 0; // no panning: the room should always stay in frame
    c.dollyToCursor = false;
  }, []);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;

    const hasPanel = focus !== null && !(focus === "monitor" && screenMode);
    const portrait = size.width / size.height < 1;
    const station = focus ? stations[focus] : null;
    const spec = station
      ? { ...station, direction: (hasPanel && station.panelDirection) || station.direction }
      : { ...overview, fit: (portrait ? [4.6, 3.8] : overview.fit) as [number, number] };
    const view = computeView(spec, size, hasPanel, focus ? stations[focus].margin : 1.05);

    // lift the limits while flying so the camera is never clamped mid-transition
    c.minAzimuthAngle = -Infinity;
    c.maxAzimuthAngle = Infinity;
    c.minPolarAngle = 0;
    c.maxPolarAngle = Math.PI;
    c.minDistance = 0.1;
    c.maxDistance = 60;

    if (!entered) {
      // before entering: hang back and high, looking down at the room like a diorama
      const [x, y, z] = view.position;
      const [tx, ty, tz] = view.target;
      c.setLookAt(tx + (x - tx) * 1.7, ty + (y - ty) * 2.2, tz + (z - tz) * 1.7, tx, ty, tz, false);
      return;
    }

    let cancelled = false;
    onArrive(false);
    Promise.all([
      c.setLookAt(...view.position, ...view.target, true),
      c.setFocalOffset(...view.offset, true),
    ]).then(() => {
      if (cancelled) return;
      onArrive(true);

      const spread = focus ? 0.12 : 0.45; // how far visitors may look around
      c.minAzimuthAngle = c.azimuthAngle - spread;
      c.maxAzimuthAngle = c.azimuthAngle + spread;
      c.minPolarAngle = Math.max(0.05, c.polarAngle - (focus ? 0.1 : 0.35));
      c.maxPolarAngle = Math.min(Math.PI / 2 - 0.02, c.polarAngle + (focus ? 0.1 : 0.25));
      c.minDistance = view.distance * (focus ? 0.85 : 0.6);
      c.maxDistance = view.distance * (focus ? 1.1 : 1.2);
    });

    return () => {
      cancelled = true;
    };
  }, [focus, entered, screenMode, size, onArrive]);

  return <CameraControls ref={ref} makeDefault />;
};

export default CameraRig;
