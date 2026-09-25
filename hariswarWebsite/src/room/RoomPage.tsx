import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Selection } from "@react-three/postprocessing";
import { Navigate } from "react-router-dom";
import { RoomContext } from "./RoomContext";
import type { StationId } from "./stations";
import { FOV } from "./view";
import Scene from "./Scene";
import CameraRig from "./CameraRig";
import Intro from "./ui/Intro";
import Hud from "./ui/Hud";
import InfoPanel from "./ui/InfoPanel";
import { isCoarsePointer } from "@/lib/motion";

const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

// Projects render on the 3D monitor only when it is big enough to read
const wideEnough = () => window.innerWidth >= 700 && window.innerWidth / window.innerHeight >= 0.9;

// The 3D dorm room landing page
const RoomPage = () => {
  const [focus, setFocus] = useState<StationId | null>(null);
  const [hovered, setHovered] = useState<StationId | null>(null);
  const [arrived, setArrived] = useState(false);
  const [entered, setEntered] = useState(false);
  const [screenMode, setScreenMode] = useState(wideEnough);
  const [webgl] = useState(hasWebGL);
  const lowPower = useMemo(() => isCoarsePointer(), []);

  useEffect(() => {
    const onResize = () => setScreenMode(wideEnough());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
  }, [hovered]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocus(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.cursor = "";
    };
  }, []);

  const onArrive = useCallback((value: boolean) => setArrived(value), []);

  const value = useMemo(
    () => ({ focus, setFocus, hovered, setHovered, arrived, entered, screenMode }),
    [focus, hovered, arrived, entered, screenMode]
  );

  if (!webgl) return <Navigate to="/portfolio" replace />;

  const panelStation = focus && !(focus === "monitor" && screenMode) ? focus : null;

  return (
    <RoomContext.Provider value={value}>
      <div className="room-root">
        <Canvas
          shadows
          dpr={lowPower ? [1, 1.5] : [1, 2]}
          camera={{ fov: FOV, near: 0.05, far: 100, position: [10, 8, 11] }}
          gl={{ antialias: !lowPower, powerPreference: "high-performance" }}
          onPointerMissed={() => setFocus(null)}
        >
          {/* re-provide the context inside the WebGL renderer tree */}
          <RoomContext.Provider value={value}>
            <Suspense fallback={null}>
              <Selection>
                <Scene lowPower={lowPower} />
              </Selection>
              <CameraRig onArrive={onArrive} />
            </Suspense>
          </RoomContext.Provider>
        </Canvas>

        {entered && <Hud />}
        <InfoPanel station={panelStation} onClose={() => setFocus(null)} />
        <Intro visible={!entered} onEnter={() => setEntered(true)} />
      </div>
    </RoomContext.Provider>
  );
};

export default RoomPage;
