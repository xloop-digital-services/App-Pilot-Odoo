import React, { useRef, useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import MicrophoneIcon from "./MicrophoneIcon"; // Import the MicrophoneIcon component
import { Image } from 'antd';
import { FaUserTie } from "react-icons/fa6";
import { PiChatCircleBold } from "react-icons/pi";

import Logo from '../assets/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash, faForward, faVolumeXmark, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { MuteProvider, MuteContext } from './Avatar';
import { useMuteContext } from "./Avatar2";


export const UI = ({ hidden, ...props }) => {
  const [micStart, setMicStart] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [startStopRecording, setStartStopRecording] = useState(true);
  const input = useRef();
  const { chat, currentIndex, selectLanguage, setSelectLanguage, setCurrentIndex, loading, micOn, setMicOn, cameraZoomed, setCameraZoomed, message, messages } = useChat();
  const { isMuted, setIsMuted , muteAudio, unmuteAudio } = useMuteContext();

  const chatContainerRef = useRef(null);

  console.log(messages);

  useEffect(() => {
    // console.log(messages)
    let recognition;

    const startRecognition = () => {
      if ("webkitSpeechRecognition" in window) {
        // console.log('kiya hua')
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = function (event) {
          let final_transcript = input.current.value;
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            }
          }
          input.current.value = final_transcript;
        };

        recognition.start();
      } else {
        alert("Web Speech API is not supported in this browser.");
      }
    };

    const stopRecognition = () => {
      if (recognition) {
        recognition.stop();
      }
    };

    const voiceButton = document.getElementById("voice-typing-button");
    const stopVoiceButton = document.getElementById("voice-stop-button");

    // console.log(stopVoiceButton, 'chali he')
    if (voiceButton || stopVoiceButton) {
      // console.log('aya hn')
      voiceButton.addEventListener("click", () => {
        if (recognition && recognition.isStarted) {
          console.log('Stop the recording')
          stopRecognition();
        } else {//#endregio
          console.log('Start the recording...')
          startRecognition();
        }
      });
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (voiceButton) {
        voiceButton.removeEventListener("click", () => {
          if (recognition) {
            recognition.start();
          }
        });
      }
    };
  }, [startStopRecording]);

  const sendMessage = (value = undefined) => {
    console.log('click', value)
    const text = input.current.value.length > 0 ? input.current.value : value ;
    console.log(text)
    setIsMuted(true)

    if(!text){
      return;
    }
    

    if (micOn) {
      setMicOn(false);
      setMicStart(false);
      setStartStopRecording('stop')
    }

    if (!loading) {
      chat(text);
      input.current.value = "";
    }
  };

  if (hidden) {
    return null;
  }


  const startStopHandle = (value) => {
    setStartStopRecording(value);
    setMicOn(!micOn);
    setMicStart(!micStart)
  }

  const toggleVolume = () => {

    if (!isMuted) {
      // console.log('Unmuting audio...');
      unmuteAudio();
    } else {
      // console.log('Muting audio...');
      muteAudio();
      // setIsMuted(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };


  const handleNextClick = (length)=>{
    console.log(length);
    if (currentIndex < length - 1) {

      setCurrentIndex(currentIndex + 1);
    }
  }


  const languageHandleChange = (value)=>{
    console.log(value);

    setSelectLanguage(value);
  }

  return (
    <>

      <div className="fixed top-0 left-0 font-mono right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">


        <div className="self-start  p-4 rounded-lg flex gap-2" >
          <span>
            <img src={Logo} alt="logo" />
          </span>
          <h1 className="text-white font-bold text-2xl">App Pilot</h1>
        </div>

        <div className="absolute left-0 bottom-0 top-[20%] w-[15%] h-[40%] pointer-events-auto text-black bg-[#d6d6d6] rounded-r-3xl hidden lg:block">
          <h1 className="text-black font-extrabold text-xl uppercase text-left border-b-2 py-3 px-5">FAQs</h1>

          <div className="p-5">
            <p onClick={(e)=> sendMessage(e.target.textContent)} className="cursor-pointer hover:text-[#da2d27] py-2 border-b-2 ">How to view e-statement?</p>
            <p onClick={(e)=> sendMessage(e.target.textContent)} className="cursor-pointer hover:text-[#da2d27] py-2 border-b-2">How to apply for loan?</p>
            <p onClick={(e)=> sendMessage(e.target.textContent)} className="cursor-pointer hover:text-[#da2d27] py-2 border-b-2">How to apply for BNPL?</p>
            <p onClick={(e)=> sendMessage(e.target.textContent)} className="cursor-pointer hover:text-[#da2d27] py-2 ">What is Alfa app?</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <div 
          className="lg:w-full"
          >

          <input
            className="w-full placeholder:text-gray-800 text-black placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md lg:w-full"
            placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          </div>
          <div
            className="flex items-center"
          //  className="three-buttons"
           > 
          <button
            // disabled={loading || message}
            onClick={()=>sendMessage()}
            className={`lg:text-white text-[#da2d27] hover:text-black lg:p-6 font-semibold uppercase flex items-center justify-center 
              ${loading ? "cursor-not-allowed opacity-30" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
          {
            micStart ?
              /* //stop the recording */
              <button
                id="voice-stop-button"
                // disabled={micOn}
                onClick={() => startStopHandle(!startStopRecording)}
                className={`lg:text-white text-[#da2d27] hover:text-black lg:p-6 font-semibold uppercase flex items-center justify-center micro-phone`}
              // loading || micOn ? "cursor-not-allowed opacity-30" : ""
              >
                <FontAwesomeIcon icon={faMicrophone} size="xl" />
              </button>
              :
              <button
                id="voice-typing-button"
                // disabled={micOn}
                onClick={() => {
                  setMicOn(prev => !prev);
                  setMicStart(!micStart)
                }}
                className={`lg:text-white text-[#da2d27] hover:text-black lg:p-6 font-semibold uppercase flex items-center justify-center micro-phone
                  ${loading || micOn ? "cursor-not-allowed opacity-30" : ""}`}
              >
                {/* MicrophoneIcon integrated into the button */}
                <FontAwesomeIcon icon={faMicrophoneSlash} size="xl" />
              </button>

          }
            {
              isMuted ?
                <button
                  onClick={toggleVolume}
                  className={`lg:text-white text-[#da2d27] hover:text-black lg:p-6 font-semibold uppercase flex items-center justify-center 
                ${loading ? "cursor-not-allowed opacity-30" : ""}`}
                >
                  <FontAwesomeIcon icon={faVolumeHigh} size="xl" />
                </button>
                :
                <button
                  onClick={toggleVolume}
                  className={`lg:text-white text-[#da2d27] hover:text-black lg:p-6 font-semibold uppercase flex items-center justify-center 
                ${loading ? "cursor-not-allowed opacity-30" : ""}`}
                >
                  <FontAwesomeIcon icon={faVolumeXmark} size="xl" />
                </button>
            }
        </div>
      </div>
      </div>

      {/* {
        messages.length > 0 ? */}
          <section
          ref={chatContainerRef}
           className="absolute font-mono overflow-y-auto right-5 w-[30%] h-[85%] z-10 max-sm:w-[80%] max-sm:h-[40%] max-sm:m-10 max-sm:mt-24 max-sm:bg-opacity-30 max-sm:bg-white max-sm:rounded-xl p-4;">
            <div className=" flex justify-end pt-3 pr-4 text-black rounded-b-3xl   ">
              {/* <h1 className="mt-5 font-mono flex justify-center text-2xl text-color font-bold">Ask Me</h1> */}
              <select onChange={(e)=> languageHandleChange(e.target.value)} value={selectLanguage} className="p-2.5 rounded-[20px]" >
                <option value={'en'} >English</option>
                <option value={'ur'} >Arabic</option>
              </select>
            </div>

            <div className="flex-1 overflow-y-aut p-4">
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 capitalize  ${message.sender === 'user' ? 'text-right font-semibold bg-[#da2d27] rounded-2xl' : 'text-left font-normal text-[#000] bg-[#d6d6d6] rounded-2xl'
                    }`}
                >
                  <span
                    className={`inline-block text-[1rem] p-2 rounded-lg flex  text-left text-2xl overflow-x-hidden  ${message.sender === 'user' ? 'ml-auto text-white' : 'mr-auto text-black flex flex-row-reverse justify-start '
                      }`}
                  >
                    <div className={`m-0 lg:mr-3 w-7 h-7  absolute flex justify-center items-center rounded-full text-xs text-white-900 text-[1rem] capitalize ${
                      message.sender === 'user' ? 'bg-[#fff] text-[#da2d27] ' : 'bg-white text-black lg:relative lg:ml-3 '
                    }`}>
                      {message.sender === 'user' ? <FaUserTie /> : <PiChatCircleBold />}
                    </div>
                    {
                      message.type === 'list' ?
                        <div>
                          {message.list.map((msg, index) =>{
                            return index <= currentIndex && (
                              <div key={index}>
                                <p className="ml-[0.5rem] mb-3 text-left  text-black font-normal">{msg.step}</p>
                                {
                                  msg.image &&
                                  <div className=" w-[100%] h-[50%] mb-3 flex justify-start ml-[2rem]">
                                    <Image width={'50%'} src={`data:image/png;base64, ${msg.image}`} alt={'result image'} />
                                  </div>
                                }
                              </div>
                            )
                          }
                          )}
                          { message.list.length -1 <= currentIndex ? null : 
                            <button className="text-black font-bold" onClick={()=> handleNextClick(message.list.length)}>Next step
                              <FontAwesomeIcon icon={faForward} size="xl" className="ml-4 " />
                            </button>
                          }
                        </div>
                        :
                        <>
                          {
                            message.image &&
                            <div className=" w-[100%] h-[50%] mb-3 flex justify-center items-center">
                              <Image width={'50%'} src={`data:image/png;base64, ${msg.image}`} alt={'result image'} />
                            </div>
                          }
                          <span className={`ml-[2.1rem] w-full ${message.sender != 'user' && 'ml-[0.5rem] text-inherit'}`} >
                            {message.text}
                          </span>
                        </>
                    }
                  </span>
                </div>
              ))}
            </div>
          </section>
          {/* :
          null
      } */}
    </>
  );
};

export default UI;