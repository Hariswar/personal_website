import { EffectComposer, Bloom, Outline, Vignette } from "@react-three/postprocessing";
import Shell from "./objects/Shell";
import Desk from "./objects/Desk";
import Bookshelf from "./objects/Bookshelf";
import Whiteboard from "./objects/Whiteboard";
import Posters from "./objects/Posters";
import Dust from "./objects/Dust";

// Everything inside the 3D canvas: lights, the room, and post-processing
const Scene = ({ lowPower }: { lowPower: boolean }) => (
  <>
    <color attach="background" args={["#0a0b1e"]} />
    <fog attach="fog" args={["#0a0b1e", 14, 40]} />

    {/* cool night fill; the lamp, monitor, neon and fairy lights do the rest */}
    <ambientLight intensity={0.45} color="#7c82d6" />
    <hemisphereLight args={["#6a70d8", "#2a1a14", 0.4]} />
    <directionalLight position={[5, 6, 6]} intensity={0.35} color="#aeb8ff" />

    <Shell />
    <Desk />
    <Bookshelf />
    <Whiteboard />
    <Posters />

    {/* dust drifting through the lamp light */}
    <Dust count={lowPower ? 30 : 60} />

    <EffectComposer multisampling={lowPower ? 0 : 4} autoClear={false}>
      <Outline blur visibleEdgeColor={0xfff1c9} hiddenEdgeColor={0xfff1c9} edgeStrength={5} width={1000} />
      <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.2} intensity={lowPower ? 0.5 : 0.9} radius={0.7} />
      <Vignette offset={0.25} darkness={0.65} />
    </EffectComposer>
  </>
);

export default Scene;
