import { ReactNode } from "react";
import { Html } from "@react-three/drei";
import { Select } from "@react-three/postprocessing";
import type { ThreeEvent } from "@react-three/fiber";
import { useRoom } from "../RoomContext";
import { stations, StationId } from "../stations";

// Makes a group of meshes hoverable (outline + label) and clickable (camera flies to it)
const Station = ({ id, children }: { id: StationId; children: ReactNode }) => {
  const { focus, setFocus, hovered, setHovered, entered } = useRoom();
  const station = stations[id];
  const canHover = entered && focus === null;
  const isHovered = canHover && hovered === id;

  const over = (e: ThreeEvent<PointerEvent>) => {
    if (!canHover) return;
    e.stopPropagation();
    setHovered(id);
  };
  const out = () => {
    if (hovered === id) setHovered(null);
  };
  const click = (e: ThreeEvent<MouseEvent>) => {
    if (!entered || focus === id) return;
    e.stopPropagation();
    setHovered(null);
    setFocus(id);
  };

  return (
    <Select enabled={isHovered}>
      <group onPointerOver={over} onPointerOut={out} onClick={click}>
        {children}
      </group>
      {isHovered && (
        <Html position={station.labelAt} center zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
          <div className="room-label">
            <span>{station.emoji}</span> {station.label}
          </div>
        </Html>
      )}
    </Select>
  );
};

export default Station;
