// Every clickable spot in the room and where the camera goes to look at it.

export type StationId = "monitor" | "bookshelf" | "whiteboard" | "posters" | "phone";

export type Vec3 = [number, number, number];

export interface Station {
  id: StationId;
  label: string; // shown in the HUD and on hover
  short: string; // compact label for the bottom dock
  emoji: string;
  target: Vec3; // point the camera looks at
  direction: Vec3; // direction from the target towards the camera
  panelDirection?: Vec3; // used instead when the info panel is open (e.g. to see over the chair)
  fit: [number, number]; // width and height (in metres) that must fit on screen
  labelAt: Vec3; // where the hover label floats
  margin?: number;
}

export const stations: Record<StationId, Station> = {
  monitor: {
    id: "monitor",
    label: "Projects",
    short: "Projects",
    emoji: "🖥️",
    target: [0.2, 1.22, -2.655],
    direction: [0, 0, 1],
    panelDirection: [0.25, 0.75, 1],
    fit: [1.08, 0.64],
    labelAt: [0.2, 1.68, -2.6],
    margin: 1.04,
  },
  bookshelf: {
    id: "bookshelf",
    label: "Skills & Courses",
    short: "Skills",
    emoji: "📚",
    target: [-2.78, 1.05, 1.0],
    direction: [1, 0.12, 0.08],
    fit: [1.35, 2.1],
    labelAt: [-2.7, 2.25, 1.0],
  },
  whiteboard: {
    id: "whiteboard",
    label: "Learning now",
    short: "Learning",
    emoji: "✏️",
    target: [-2.96, 1.68, -0.9],
    direction: [1, 0, 0.05],
    fit: [1.75, 1.15],
    labelAt: [-2.8, 2.4, -0.9],
  },
  posters: {
    id: "posters",
    label: "Experience",
    short: "Experience",
    emoji: "🖼️",
    target: [-1.6, 1.84, -2.98],
    direction: [0.1, 0, 1],
    fit: [1.5, 1.1],
    labelAt: [-1.6, 2.55, -2.9],
  },
  phone: {
    id: "phone",
    label: "Contact",
    short: "Contact",
    emoji: "📱",
    target: [0.98, 0.79, -2.3],
    direction: [0, 1, 0.55],
    fit: [0.4, 0.4],
    labelAt: [0.98, 1.0, -2.3],
  },
};

export const stationOrder: StationId[] = ["monitor", "bookshelf", "whiteboard", "posters", "phone"];

// The wide shot of the whole room
export const overview = {
  target: [-0.25, 1.1, -0.7] as Vec3,
  direction: [0.62, 0.38, 0.7] as Vec3,
  fit: [7.2, 4.4] as [number, number],
};
