import {
  CameraControls,
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  Text,
  useTexture,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { Avatar } from "./Avatar";
import { useThree } from "@react-three/fiber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { Avatar2 } from "./Avatar2";

const Dots = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText(
          <FontAwesomeIcon icon={faCommentDots} bounce size='2xl'
          style={{ color: "#DA2D27",}} />)
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);

  if (!loading) return null;
  return (
    <group {...props}>
      {/* <Text fontSize={0.3} anchorX={"left"} anchorY={"bottom"}> */}
      <Html>
        {loadingText}
      </Html>
      {/* </Text> */}
    </group>
  );
};

export const Experience = () => {
  const cameraControls = useRef();
  const myControl = useRef();
  const { cameraZoomed } = useChat();

  // useEffect(() => {
  //   // myControl.current.target.set(0, 0, 0);
  //   myControl.current.target.set(7, 5, -50);
  //   // cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);

  // }, []);


  useEffect(() => {
    const handleResize = () => {
      // Adjust the target values based on screen size
      if (window.innerWidth <= 600) {
        myControl.current.target.set(3, 8, -50);
      } else {
        myControl.current.target.set(24, 5, -50);
      }
    };

    // Initial setup
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myControl]);

  // useEffect(() => {
  //   if (cameraZoomed) {
  //     cameraControls.current.setLookAt(0, 1.5, 1.5, 0, 1.5, 0, true);
  //   } else {
  //     cameraControls.current.setLookAt(0, 2.2, 5, 0, 1.0, 0, true);
  //   }
  // }, [cameraZoomed]);


  return (
    <>
      {/* <CameraControls ref={cameraControls} /> */}
      <OrbitControls ref={myControl} enableRotate={false} enableZoom={false} />
      <Environment preset="sunset" />
      {/* Wrapping Dots into Suspense to prevent Blink when Troika/Font is loaded */}
      <Suspense>
        <Dots position-y={1.6} position-x={-1.2} />
      </Suspense>

      {/* <Avatar /> */}

<Avatar2 position={[-0.7, -2.3, 2]} />

      <ContactShadows opacity={0.7} />
    </>
  );
};