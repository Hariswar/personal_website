import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

// Loading screen that turns into an "Enter" button, like walking up to the door
const Intro = ({ visible, onEnter }: { visible: boolean; onEnter: () => void }) => {
  const { active, progress } = useProgress();
  const [minTimePassed, setMinTimePassed] = useState(false);

  // give shaders a moment to compile so the fly-in is smooth
  useEffect(() => {
    const id = setTimeout(() => setMinTimePassed(true), 1100);
    return () => clearTimeout(id);
  }, []);

  const ready = minTimePassed && !active;
  const shown = ready ? 100 : Math.max(progress, minTimePassed ? 90 : 35);

  return (
    <div className={`room-intro ${visible ? "" : "room-intro-hidden"}`} aria-hidden={!visible}>
      <div className="room-intro-card">
        <p className="room-kicker">welcome to my room</p>
        <h1 className="font-playfair text-5xl sm:text-6xl font-extrabold text-white">
          Hariswar<span className="text-[#ffb46b]">.</span>
        </h1>
        <p className="mt-3 text-slate-300 max-w-sm mx-auto">
          CS student at Missouri S&amp;T. Pull up a chair: my projects, skills and contact details are all around the room.
        </p>

        <div className="room-progress" role="progressbar" aria-valuenow={Math.round(shown)} aria-valuemin={0} aria-valuemax={100}>
          <div style={{ width: `${shown}%` }} />
        </div>

        <button className="room-enter" disabled={!ready} onClick={onEnter}>
          {ready ? "Enter the room" : "Turning on the lamp…"}
        </button>
        <p className="mt-5 text-xs text-slate-400">Drag to look around · click glowing things · Esc to step back</p>
      </div>
    </div>
  );
};

export default Intro;
