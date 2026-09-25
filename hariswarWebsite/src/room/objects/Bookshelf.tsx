import { useMemo, useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import Station from "./Station";
import { useRoom } from "../RoomContext";
import { seeded } from "../canvasTexture";
import { skills, courses } from "../skills";

const X_FRONT = -2.62; // front edge of the shelves
const Z_START = 0.46;
const Z_END = 1.54;
const SHELF_TOPS = [0.035, 0.515, 1.015, 1.515];
const PALETTE = ["#b8484b", "#3f6fb0", "#d9a441", "#4f8f6a", "#7a5aa8", "#c46a3a", "#2f7f8f", "#d5d0c4", "#8a3f63"];

interface Book {
  label: string;
  kind: "skill" | "course";
  x: number;
  y: number;
  z: number;
  size: [number, number, number];
  color: string;
  tilt: number;
}

// Lay books out left to right along a shelf until it is full
const layoutShelf = (items: { label: string; kind: Book["kind"] }[], shelfTop: number, rand: () => number, thick: [number, number]) => {
  const books: Book[] = [];
  let z = Z_START;
  for (const item of items) {
    const t = thick[0] + rand() * (thick[1] - thick[0]);
    if (z + t > Z_END) break;
    const h = 0.26 + rand() * 0.14;
    const d = 0.24 + rand() * 0.06;
    books.push({
      ...item,
      x: X_FRONT - d / 2,
      y: shelfTop + h / 2,
      z: z + t / 2,
      size: [d, h, t],
      color: PALETTE[Math.floor(rand() * PALETTE.length)],
      tilt: 0,
    });
    z += t + 0.004;
  }
  // lean the last book against the others for a lived-in look
  if (books.length && z < Z_END - 0.1) books[books.length - 1].tilt = 0.18;
  return books;
};

const Bookshelf = () => {
  const books = useMemo(() => {
    const rand = seeded(11);
    const skillItems = skills.map((s) => ({ label: s.name, kind: "skill" as const }));
    const courseItems = courses.map((c) => ({ label: c.title, kind: "course" as const }));
    const shelf2 = layoutShelf(skillItems, SHELF_TOPS[1], rand, [0.04, 0.06]);
    const shelf3 = layoutShelf(skillItems.slice(shelf2.length), SHELF_TOPS[2], rand, [0.04, 0.06]);
    const shelf4 = layoutShelf(courseItems, SHELF_TOPS[3], rand, [0.07, 0.09]);
    return [...shelf2, ...shelf3, ...shelf4];
  }, []);

  return (
    <Station id="bookshelf">
      <group>
        {/* frame */}
        {[0.42, 1.58].map((z) => (
          <mesh key={z} position={[-2.8, 1.0, z]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 2.0, 0.04]} />
            <meshStandardMaterial color="#6e4f39" roughness={0.7} />
          </mesh>
        ))}
        <mesh position={[-2.99, 1.0, 1.0]} receiveShadow>
          <boxGeometry args={[0.02, 2.0, 1.16]} />
          <meshStandardMaterial color="#4d3627" roughness={0.9} />
        </mesh>
        {[0.02, 0.5, 1.0, 1.5, 1.99].map((y) => (
          <mesh key={y} position={[-2.8, y, 1.0]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 0.03, 1.12]} />
            <meshStandardMaterial color="#6e4f39" roughness={0.7} />
          </mesh>
        ))}

        {books.map((b, i) => (
          <BookMesh key={`${b.label}-${i}`} book={b} />
        ))}

        <ShelfDecor />
      </group>
    </Station>
  );
};

// A single book that slides out and names itself when hovered (only once zoomed in on the shelf)
const BookMesh = ({ book }: { book: Book }) => {
  const { focus } = useRoom();
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const active = focus === "bookshelf";

  useFrame((_, dt) => {
    if (!ref.current) return;
    const goal = book.x + (hovered && active ? 0.1 : 0);
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, goal, 12, dt);
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    if (!active) return;
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    setHovered(false);
    if (active) document.body.style.cursor = "";
  };

  return (
    <mesh
      ref={ref}
      position={[book.x, book.y, book.z]}
      rotation={[book.tilt, 0, 0]}
      onPointerOver={over}
      onPointerOut={out}
      castShadow
    >
      <boxGeometry args={book.size} />
      <meshStandardMaterial color={book.color} roughness={0.8} emissive={book.color} emissiveIntensity={hovered && active ? 0.35 : 0} />
      {hovered && active && (
        <Html position={[book.size[0] / 2 + 0.02, book.size[1] / 2 + 0.03, 0]} center style={{ pointerEvents: "none" }}>
          <div className="room-label room-label-sm">
            {book.kind === "skill" ? "🛠️" : "🎓"} {book.label}
          </div>
        </Html>
      )}
    </mesh>
  );
};

// A trophy and a lying stack of books on the bottom shelf
const ShelfDecor = () => (
  <group>
    {[0, 1, 2].map((i) => (
      <mesh key={i} position={[-2.78, 0.06 + i * 0.05, 0.7]} rotation={[0, i * 0.15, 0]} castShadow>
        <boxGeometry args={[0.26, 0.05, 0.34]} />
        <meshStandardMaterial color={PALETTE[(i * 3) % PALETTE.length]} roughness={0.8} />
      </mesh>
    ))}
    <group position={[-2.78, 0.035, 1.25]}>
      <mesh position={[0, 0.03, 0]} castShadow>
        <boxGeometry args={[0.12, 0.06, 0.12]} />
        <meshStandardMaterial color="#2b2b33" />
      </mesh>
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.16]} />
        <meshStandardMaterial color="#e2b84a" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.27, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.035, 0.12, 20]} />
        <meshStandardMaterial color="#e2b84a" metalness={0.9} roughness={0.25} />
      </mesh>
    </group>
  </group>
);

export default Bookshelf;
