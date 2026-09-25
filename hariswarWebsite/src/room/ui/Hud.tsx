import { Link } from "react-router-dom";
import { ArrowLeft, FileText, LayoutList } from "lucide-react";
import { useRoom } from "../RoomContext";
import { stationOrder, stations } from "../stations";

// Fixed overlay: name, links out of the room, and a menu of stations for keyboard / touch users
const Hud = () => {
  const { focus, setFocus } = useRoom();

  return (
    <>
      <header className="room-hud-top">
        {focus ? (
          <button className="room-chip" onClick={() => setFocus(null)}>
            <ArrowLeft size={16} /> Back to room
          </button>
        ) : (
          <div className="leading-tight">
            <div className="font-playfair text-xl font-bold text-white">Hariswar Baburaj</div>
            <div className="text-xs text-slate-400">CS @ Missouri S&amp;T</div>
          </div>
        )}
        <nav className="flex items-center gap-2">
          <a href="/Hariswar_Resume.pdf" target="_blank" rel="noopener noreferrer" className="room-chip">
            <FileText size={16} /> <span className="hidden sm:inline">Resume</span>
          </a>
          <Link to="/portfolio" className="room-chip">
            <LayoutList size={16} /> <span className="hidden sm:inline">Classic site</span>
          </Link>
        </nav>
      </header>

      {!focus && (
        <footer className="room-hud-bottom">
          <div className="room-dock" role="toolbar" aria-label="Room stations">
            {stationOrder.map((id) => (
              <button key={id} className="room-dock-btn" onClick={() => setFocus(id)} aria-label={stations[id].label}>
                <span className="text-lg" aria-hidden>{stations[id].emoji}</span>
                <span>{stations[id].short}</span>
              </button>
            ))}
          </div>
        </footer>
      )}
    </>
  );
};

export default Hud;
