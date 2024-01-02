import React, { useRef, useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import MicrophoneIcon from "./MicrophoneIcon"; // Import the MicrophoneIcon component
import { Image } from 'antd';

export const UI = ({ hidden, ...props }) => {
  // const [messages, setMessages] = useState([
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   },
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   },
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   },
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   },
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   },
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   },
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   },
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   },
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   },
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   },
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   },
  //   {
  //     text: 'How are you.',
  //     sender: 'user'
  //   },
  //   {
  //     text: 'I am good.',
  //     sender: 'receiver'
  //   }
  //  ]);
  const [newMessage, setNewMessage] = useState('');
  // const [micOn, setMicOn] = useState(false);
  
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
  
    if (voiceButton) {
      voiceButton.addEventListener("click", () => {
        if (recognition && recognition.isStarted) {
          stopRecognition();
        } else {//#endregio
          console.log('hfhf')
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
  }, []);

  const sendMessage = () => {
    console.log('click')
    if(micOn){
      setMicOn(false);
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

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start   bg-opacity-50 p-4 rounded-lg">
          <h1 className="text-white font-normal text-xl">Virtual Assistance</h1>
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

          <button
            id="voice-typing-button"
            disabled={micOn}
            onClick={ ()=> setMicOn(!micOn) }
            className={`text-white hover:text-pink-600 p-6 font-semibold uppercase flex items-center justify-center 
            ${loading || micOn ? "cursor-not-allowed opacity-30" : ""}`}

              // loading || micOn ? "cursor-not-allowed opacity-30" : ""
            style={{
              border: "none",
              outline: "none",
              width: "70px",
              height: "70px",
              borderRadius: "10px",
            }}
          >
            {/* MicrophoneIcon integrated into the button */}
            <MicrophoneIcon strokeWidth="2" />
          </button>
        </div>
      </div>
      
      {
        messages.length > 0 ?
          <section className="absolute overflow-y-auto right-5 w-[32%] h-[85%] z-10">
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
                    className={`inline-block bg-[#8fbeee] text-gray p-2 rounded-lg flex  text-left  ${
                      message.sender === 'user' ? 'ml-auto' : 'mr-auto bg-[#abd2fd]'
                    }`}
                  >
                    <div className="m-0 mr-2 w-6 h-6 relative flex justify-center items-center rounded-full bg-gray-500 text-xs text-white uppercase">
                      { message.sender === 'user'?  'HB': 'VA' }
                    </div>

                    { 
                      message.type === 'list' ? 
                      <div>
                        {message.list.map((msg, index) => (
                          <div key={index}>
                            <p className="mt-3 mb-3 text-left">{ msg.step }</p>
                            {
                              msg.image &&
                              <div className=" w-[100%] h-[50%] mt-3 mb-3 flex justify-center items-center">
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
                          <div className=" w-[100%] h-[50%] mt-3 mb-3 flex justify-center items-center">
                            <Image width={'50%'} src={`data:image/png;base64, ${msg.image}`} alt={'result image'} />
                          </div>
                        }
                        {message.text}
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
