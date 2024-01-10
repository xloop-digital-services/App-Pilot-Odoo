import React, { useRef, useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import MicrophoneIcon from "./MicrophoneIcon"; // Import the MicrophoneIcon component
import { Image } from 'antd';

import { FaUserTie } from "react-icons/fa6";
import { PiChatCircleBold } from "react-icons/pi";

import Logo from '../assets/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";


export const UI = ({ hidden, ...props }) => {
  // const [newMessage, setNewMessage] = useState('');
  const [micStart, setMicStart] = useState(false);
  const [startStopRecording, setStartStopRecording] = useState(true);
  
  const input = useRef();
  const { chat, loading, micOn, setMicOn, cameraZoomed, setCameraZoomed, message, messages } = useChat();

  useEffect(() => {
    console.log(messages)
    let recognition;

    const startRecognition = () => {
      if ("webkitSpeechRecognition" in window) {
        console.log('kiya hua')
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

    console.log(stopVoiceButton, 'chali he')
    if (voiceButton || stopVoiceButton) {
      console.log('aya hn')
      voiceButton.addEventListener("click", () => {
        if (recognition && recognition.isStarted ) {
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

  const sendMessage = () => {
    console.log('click')
    if(micOn){
      setMicOn(false);
      setMicStart(false);
    }

    const text = input.current.value;
    if (!loading) {
    console.log('aya')
      chat(text);
      input.current.value = "";
    }
    // if (!loading && !message) {
    //   chat(text);
    //   input.current.value = "";
    // }
  };

  if (hidden) {
    return null;
  }


  const startStopHandle = (value)=>{
    setStartStopRecording(value);
    console.log(value)
    setMicOn(!micOn);
    setMicStart(!micStart)
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start   bg-opacity-50 p-4 rounded-lg flex gap-2 bg-slate-400">
          <span>
            <img src={Logo} alt="logo"/>
          </span>
          <h1 className="text-white font-bold text-2xl">App Pilot</h1>
          {/* <p>Chat with Me ❤️</p> */}
        </div>
        
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
            placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            // disabled={loading || message}
            onClick={sendMessage}
            className={`text-white hover:text-pink-600 p-6 font-semibold uppercase flex items-center justify-center 
              ${loading ? "cursor-not-allowed opacity-30" : ""}`}

            style={{
              border: "none",
              outline: "none",
              fontSize: "24px",
            }}
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
                  onClick={()=>startStopHandle(!startStopRecording)}
                  className={`text-white hover:text-pink-600 p-6 font-semibold uppercase flex items-center justify-center micro-phone`}
                    // loading || micOn ? "cursor-not-allowed opacity-30" : ""
                >
                  {/* MicrophoneIcon integrated into the button */}
                  {/* <MicrophoneIcon strokeWidth="2" /> */}
                  <FontAwesomeIcon icon={faMicrophone} size="xl" />
                </button>
                :
                <button
                  id="voice-typing-button"
                  // disabled={micOn}
                  onClick={()=>{
                    setMicOn(prev=> !prev);
                    setMicStart(!micStart)
                  }}
                  className={`text-white hover:text-pink-600 p-6 font-semibold uppercase flex items-center justify-center micro-phone
                  ${loading || micOn ? "cursor-not-allowed opacity-30" : ""}`}    
                >
                  {/* MicrophoneIcon integrated into the button */}
                  <FontAwesomeIcon icon={faMicrophoneSlash} size="xl" />
                </button>

            }
              

        </div>
      </div>
      
      {
        messages.length > 0 ?
          <section className="absolute overflow-y-auto right-5 w-[40%] h-[85%] z-10">
            <h1 className="mt-5 flex justify-center text-2xl font-semibold text-white">Ask Me</h1>
            
            <div className="flex-1 overflow-y-aut p-4">
              {messages?.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <span
                    className={`inline-block  text-[#eeeeee] p-2 rounded-lg flex  text-left text-xl font-semibold overflow-x-hidden  ${
                      message.sender === 'user' ? 'ml-auto ' : 'mr-auto '
                    }`}
                  >
                    <div className="m-0 mr-2 w-6 h-6 absolute flex justify-center items-center rounded-full bg-white text-xs text-gray-700 uppercase">
                      { message.sender === 'user'?  <FaUserTie />  : <PiChatCircleBold /> }
                    </div>

                    { 
                      message.type === 'list' ? 
                      <div>
                        {message.list.map((msg, index) => (
                          <div key={index}>
                            <p className="ml-[2rem] mb-3 text-left">{ msg.step }</p>
                            {
                              msg.image &&
                              <div className=" w-[100%] h-[50%] mb-3 flex justify-start ml-[2rem]">
                                <Image width={'50%'} src={`data:image/png;base64, ${msg.image}`} alt={'result image'} />
                              </div>
                            }
                          </div>
                        ))}
                      </div>
                      :
                      <>
                        {
                          message.image &&
                          <div className=" w-[100%] h-[50%] mb-3 flex justify-center items-center">
                            <Image width={'50%'} src={`data:image/png;base64, ${msg.image}`} alt={'result image'} />
                          </div>
                        }
                        <span className="ml-[2rem]">
                          {message.text}
                        </span>
                      </>
                    }
                  </span>
                </div>
              ))}
            </div>

            {/* chat history */}
            {/* <div> */}
              {/* sender */}
              {/* <div className="">
                
              </div> */}
              
              {/* receiver */}
              {/* <div className="">

              </div> */}

            {/* </div> */}

          </section>
        :
        null
      }
    </>
  );
};

export default UI;
