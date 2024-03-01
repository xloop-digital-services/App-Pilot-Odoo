import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import MainUi from "./components/main-ui";
import { useEffect } from "react";

function App() {


  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(
  //       "https://app-pilot-suierlw5oa-uc.a.run.app/query_response/hi/en",
  //     );
  //     let flag = 1;
  //     const reader = response.body.getReader();
  //     const textDecoder = new TextDecoder();
  //     let temp = '';

  //     while(true){
  //       const { value, done } = await reader.read();
  //       if(done){
      
  //         break;
  //       }
  //       const chunk = textDecoder.decode(value,{ stream: true });
  //       temp += chunk;
  //       console.log(chunk, flag);
  //       flag++;
  //     }

  //     // console.log(JSON.parse(temp), 'parse');
      
  //   })();

  //   console.log("chal gaya");
  // }, []);


  return (
    <>
      <Loader />
      <Leva hidden />
      {/* <UI /> */}
      <MainUi />
      <Canvas shadows camera={{ position: [0 , 2.6, 11], fov: 38 }}>
        {/* <mesh position={[2,-0.25,-3]}> */}
          <Experience />
        {/* </mesh> */}
      </Canvas>
    </>
  );
}

export default App;
