import { createContext, useContext } from "react";
import type { StationId } from "./stations";

interface RoomState {
  focus: StationId | null;
  setFocus: (id: StationId | null) => void;
  hovered: StationId | null;
  setHovered: (id: StationId | null) => void;
  arrived: boolean; // true once the camera has finished flying to the focused station
  entered: boolean; // true after the visitor presses "Enter"
  screenMode: boolean; // true when projects are shown on the 3D monitor (wide screens)
}

export const RoomContext = createContext<RoomState | null>(null);

export const useRoom = () => {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error("useRoom must be used inside the room");
  return ctx;
};
