import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

function App() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <UI />
      <Canvas shadows camera={{ position: [2 , 1.5, 3], fov: 40 }}>
        <mesh position={[2,-0.25,-3]}>
          <Experience />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;
