

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import * as THREE from "three";
import { useChat } from "../hooks/useChat";
import { playAudio, muteAudio, stopAudio, audioInstance } from './AudioService';
import { useMuteContext } from "./Avatar2";

const facialExpressions = {
  default: {},
  smile: {
    browInnerUp: 0.17,
    eyeSquintLeft: 0.4,
    eyeSquintRight: 0.44,
    noseSneerLeft: 0.1700000727403593,
    noseSneerRight: 0.14000002836874015,
    mouthPressLeft: 0.61,
    mouthPressRight: 0.41000000000000003,
  },
  funnyFace: {
    jawLeft: 0.63,
    mouthPucker: 0.53,
    noseSneerLeft: 1,
    noseSneerRight: 0.39,
    mouthLeft: 1,
    eyeLookUpLeft: 1,
    eyeLookUpRight: 1,
    cheekPuff: 0.9999924982764238,
    mouthDimpleLeft: 0.414743888682652,
    mouthRollLower: 0.32,
    mouthSmileLeft: 0.35499733688813034,
    mouthSmileRight: 0.35499733688813034,
  },

};

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

let setupMode = false;

export function AvatarScarf(props) {
    const { nodes, materials, scene } = useGLTF("/models/my-avatar-scarf.glb");

    const { message, onMessagePlayed, chat, setMessage, setAnimation, animation } = useChat();
    const { isMuted } = useMuteContext();
  
  
    const [lipsync, setLipsync] = useState();
  
    useEffect(() => {
      if (!message) {
        setAnimation("Idle");
        return;
      }
      setAnimation('Idle');
      setFacialExpression(message.facialExpression);
      setLipsync(message.lipsync);
      playAudio(message.audio, onMessagePlayed, isMuted);
      
      setAudio(audioInstance);
    }, [message]);
  
    const { animations } = useGLTF("/models/animations.glb");
  
    const group = useRef();
    const { actions, mixer } = useAnimations(animations, group);
    
  
    useEffect(() => {
      actions[animation]
        .reset()
        .fadeIn(mixer.stats.actions.inUse === 0 ? 0 : 0.5)
        .play();
      return () => actions[animation]?.fadeOut(0.5);
    }, [animation]);
  
    const lerpMorphTarget = (target, value, speed = 0.1) => {
      scene.traverse((child) => {
        if (child.isSkinnedMesh && child.morphTargetDictionary) {
          const index = child.morphTargetDictionary[target];
          if (
            index === undefined ||
            child.morphTargetInfluences[index] === undefined
          ) {
            return;
          }
          child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
            child.morphTargetInfluences[index],
            value,
            speed
          );
  
          if (!setupMode) {
            try {
              set({
                [target]: value,
              });
            } catch (e) {}
          }
        }
      });
    };
  
    const [blink, setBlink] = useState(false);
    const [winkLeft, setWinkLeft] = useState(false);
    const [winkRight, setWinkRight] = useState(false);
    const [facialExpression, setFacialExpression] = useState("");
    const [audio, setAudio] = useState();
  
    useFrame(() => {
      !setupMode &&
        Object.keys(nodes.EyeLeft.morphTargetDictionary).forEach((key) => {
          const mapping = facialExpressions[facialExpression];
          if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
            return; // eyes wink/blink are handled separately
          }
          if (mapping && mapping[key]) {
            lerpMorphTarget(key, mapping[key], 0.1);
          } else {
            lerpMorphTarget(key, 0, 0.1);
          }
        });
  
      lerpMorphTarget("eyeBlinkLeft", blink || winkLeft ? 1 : 0, 0.5);
      lerpMorphTarget("eyeBlinkRight", blink || winkRight ? 1 : 0, 0.5);
  
      // LIPSYNC
      if (setupMode) {
        return;
      }
  
      const appliedMorphTargets = [];
      if (message && lipsync) {
        const currentAudioTime = audio.currentTime;
        // console.log(currentAudioTime, 'currentTime')
        for (let i = 0; i < lipsync.mouthCues.length; i++) {
          const mouthCue = lipsync.mouthCues[i];
          // console.log(mouthCue,' mouthCue')
          if (
            currentAudioTime >= mouthCue.start &&
            currentAudioTime <= mouthCue.end
          ) {
            // console.log('aya bro')
            appliedMorphTargets.push(corresponding[mouthCue.value]);
            lerpMorphTarget(corresponding[mouthCue.value], 1, 0.2);
            break;
          }
        }
      }
  
      Object.values(corresponding).forEach((value) => {
        if (appliedMorphTargets.includes(value)) {
          return;
        }
        lerpMorphTarget(value, 0, 0.1);
      });
    });
  
    useControls("FacialExpressions", {
      chat: button(() => chat()),
      winkLeft: button(() => {
        setWinkLeft(true);
        setTimeout(() => setWinkLeft(false), 300);
      }),
      winkRight: button(() => {
        setWinkRight(true);
        setTimeout(() => setWinkRight(false), 300);
      }),
      animation: {
        value: animation,
        options: animations.map((a) => a.name),
        onChange: (value) => setAnimation(value),
      },
      facialExpression: {
        options: Object.keys(facialExpressions),
        onChange: (value) => setFacialExpression(value),
      },
      enableSetupMode: button(() => {
        setupMode = true;
      }),
      disableSetupMode: button(() => {
        setupMode = false;
      }),
      logMorphTargetValues: button(() => {
        const emotionValues = {};
        // console.log(nodes, 'nodes...')
        Object?.keys(nodes.EyeLeft.morphTargetDictionary).forEach((key) => {
          if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") {
            return; // eyes wink/blink are handled separately
          }
          const value =
            nodes.EyeLeft.morphTargetInfluences[
              nodes.EyeLeft.morphTargetDictionary[key]
            ];
          if (value > 0.01) {
            emotionValues[key] = value;
          }
        });
        // console.log(JSON.stringify(emotionValues, null, 2));
      }),
    });
  
    const [, set] = useControls("MorphTarget", () =>
      Object.assign(
        {},
        ...Object.keys(nodes.EyeLeft.morphTargetDictionary).map((key) => {
          return {
            [key]: {
              label: key,
              value: 0,
              min: nodes.EyeLeft.morphTargetInfluences[
                nodes.EyeLeft.morphTargetDictionary[key]
              ],
              max: 1,
              onChange: (val) => {
                if (setupMode) {
                  lerpMorphTarget(key, val, 1);
                }
              },
            },
          };
        })
      )
    );
  
    useEffect(() => {
      let blinkTimeout;
      const nextBlink = () => {
        blinkTimeout = setTimeout(() => {
          setBlink(true);
          setTimeout(() => {
            setBlink(false);
            nextBlink();
          }, 200);
        }, THREE.MathUtils.randInt(1000, 5000));
      };
      nextBlink();
      return () => clearTimeout(blinkTimeout);
    }, []);
  
  
    const lookAtTarget = new THREE.Vector3(2, 0, -1);
    nodes.Wolf3D_Head.lookAt(lookAtTarget);
    
  
    return (
      <group {...props} dispose={null} ref={group} scale={2.3} >
  
          <primitive object={nodes.Hips} />
          <skinnedMesh
              name="EyeLeft"
              geometry={nodes.EyeLeft.geometry}
              material={materials.Wolf3D_Eye}
              skeleton={nodes.EyeLeft.skeleton}
              morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
              morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
  
          />
          <skinnedMesh
              name="EyeRight"
              geometry={nodes.EyeRight.geometry}
              material={materials.Wolf3D_Eye}
              skeleton={nodes.EyeRight.skeleton}
              morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
              morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          
          />
          <skinnedMesh
              name="Wolf3D_Head"
              geometry={nodes.Wolf3D_Head.geometry}
              material={materials.Wolf3D_Skin}
              skeleton={nodes.Wolf3D_Head.skeleton}
              morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
              morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
          />
          <skinnedMesh
              name="Wolf3D_Teeth"
              geometry={nodes.Wolf3D_Teeth.geometry}
              material={materials.Wolf3D_Teeth}
              skeleton={nodes.Wolf3D_Teeth.skeleton}
              morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
              morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
          />
          <skinnedMesh
              geometry={nodes.Wolf3D_Glasses.geometry}
              material={materials.Wolf3D_Glasses}
              skeleton={nodes.Wolf3D_Glasses.skeleton}
          />
          <skinnedMesh
              geometry={nodes.Wolf3D_Headwear.geometry}
              material={materials.Wolf3D_Headwear}
              skeleton={nodes.Wolf3D_Headwear.skeleton}
          />
          <skinnedMesh
              name="Wolf3D_Body"
              geometry={nodes.Wolf3D_Body.geometry}
              material={materials.Wolf3D_Body}
              skeleton={nodes.Wolf3D_Body.skeleton}
          />
          <skinnedMesh
              name="Wolf3D_Outfit_Bottom"
              geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
              material={materials.Wolf3D_Outfit_Bottom}
              skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
          />
          <skinnedMesh
              name="Wolf3D_Outfit_Footwear"
              geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
              material={materials.Wolf3D_Outfit_Footwear}
              skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
          />
          <skinnedMesh
              name="Wolf3D_Outfit_Top"
              geometry={nodes.Wolf3D_Outfit_Top.geometry}
              material={materials.Wolf3D_Outfit_Top}
              skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
          />
      </group>
    );
  }
  
  useGLTF.preload("/models/my-avatar-red.glb");
  useGLTF.preload("/models/animations.glb");


export const MuteContext = createContext();

export const MuteProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);

  const muteAudio = () => {
    setIsMuted(true);
    stopAudio();
  };

  const unmuteAudio = () => {
    setIsMuted(false);
    playAudio();
  };

  return (
    <MuteContext.Provider value={{ isMuted, muteAudio, unmuteAudio }}>
      {children}
    </MuteContext.Provider>
  );
};