import React, { useEffect, useRef, useState } from 'react'
import ChatHistory from './chat-history'
import SideBar from './sideBar'
import Logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeXmark, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { useChat } from '../../hooks/useChat';
import { useMuteContext } from '../Avatar2';

function MainUi() {
    const [micStart, setMicStart] = useState(false);
    // const [currentIndex, setCurrentIndex] = useState(0);
    const [startStopRecording, setStartStopRecording] = useState(true);
    const input = useRef();
    const { chat, currentIndex, selectLanguage, setSelectLanguage, setCurrentIndex, loading, micOn, setMicOn, cameraZoomed, setCameraZoomed, message, messages } = useChat();
    const { isMuted, setIsMuted , muteAudio, unmuteAudio } = useMuteContext();


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

      const startStopHandle = (value) => {
        setStartStopRecording(value);
        setMicOn(!micOn);
        setMicStart(!micStart)
      }


      const languageHandleChange = (value)=>{
        console.log(value);
        setSelectLanguage(value);
      }

      const handleNextClick = (length)=>{
        console.log(length);
        if (currentIndex < length - 1) {
    
          setCurrentIndex(currentIndex + 1);
        }
      }


      const toggleVolume = () => {

        if (!isMuted) {
        //   console.log('Unmuting audio...');
          unmuteAudio();
        } else {
        //   console.log('Muting audio...');
          muteAudio();
          // setIsMuted(false);
        }
      };

  return (
    <>
        <div className='lg:p-[2.125rem] absolute z-30 w-full '>
            <header className='flex justify-between w-[100%] items-center lg:pb-9 py-4 px-4'>
                <div className='flex gap-2 items-center'>
                    <img src={Logo} alt="logo" className='lg:w-[2.468rem] w-5 h-5 lg:h-[2.101rem]' />   
                    <h3 className='text-h-color lg:text-[2.106rem]  font-[600]'>App Pilot</h3>
                </div>
                <div className="flex items-center gap-4 ">

                    {
                        isMuted ?
                        <button
                            onClick={toggleVolume}
                            className={`text-white bg-btn-color lg:w-[37px] w-[30px] h-[30px] lg:h-[37px] rounded-full font-semibold
                            ${loading ? "cursor-not-allowed opacity-30" : ""}`}
                        >
                            <FontAwesomeIcon icon={faVolumeHigh} />
                        </button>
                        :
                        <button
                            onClick={toggleVolume}
                            className={`text-white bg-btn-color lg:w-[37px] w-[30px] h-[30px] lg:h-[37px] rounded-full font-semibold
                            ${loading ? "cursor-not-allowed opacity-30" : ""}`}
                        >
                            <FontAwesomeIcon icon={faVolumeXmark} />
                        </button>
                    }

                    <select onChange={(e)=> languageHandleChange(e.target.value)} value={selectLanguage} className="lg:px-5 lg:py-3 p-1 lg:w-[9.688rem] w-[5rem]  rounded-[20px] bg-bg-secondary text-white" >
                        <option className='text-btn-color bg-bg-primary rounded-lg'  value={'en'} >English</option>
                        <option className='text-btn-color bg-bg-primary' value={'ur'} >Urdu</option>
                        <option className='text-btn-color bg-bg-primary' value={'ar'} >Arabic</option>
                    </select>
                </div>
            </header>

            {/* main dashboard css */}
            <div className='flex justify-between w-[100%]'>
                <div className=' hidden lg:block '>
                    <SideBar sendMessage={sendMessage} />
                </div>
                <div className='lg:h-[85vh] h-[65vh] lg:w-[50%] w-full'>
                    <ChatHistory 
                        inputRef={input} 
                        sendMessage={sendMessage} 
                        loading={loading}
                        micStart={micStart}
                        micOn={micOn}
                        setMicOn={setMicOn}
                        setMicStart={setMicStart}
                        startStopHandle={startStopHandle}
                        startStopRecording={startStopRecording}
                        messages={messages}
                        handleNextClick={handleNextClick}
                        currentIndex={currentIndex}
                        />
                </div>
            </div>
        </div>
    </>
  )
}

export default MainUi