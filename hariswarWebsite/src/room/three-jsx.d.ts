// The project uses @types/react 19, where JSX types live under React.JSX,
// but React Three Fiber v8 registers <mesh>, <group>, … on the old global JSX namespace.
// This re-registers them where React 19's types look.
import type { ThreeElements } from "@react-three/fiber";

declare global {
  namespace React {
    namespace JSX {
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}
