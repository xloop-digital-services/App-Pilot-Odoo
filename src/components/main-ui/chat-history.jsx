// new ONEE...........

import React, { useEffect, useRef, useState } from "react";
import sender from "../../assets/send-2.svg";
import bflLogo from "../../assets/bfl-logo.png";
import bg from "../../assets/bg.jpg";
import avatarLogo from "../../assets/avatarScarf.png";
import avatarLogo2 from "../../assets/avatarHair.png";
import avatarRed from "../../assets/avatarRedLogo.png";
import avatarFGenzLogo from "../../assets/avatarFGenzLogo.png";
import avatarMGenzLogo from "../../assets/avatarMGenzLogo.png";
import avatarFFormalLogo from "../../assets/avatarFFormalLogo.png";
import avatarMFormalLogo from "../../assets/avatarMFormalLogo.png";
import mainPic from "../../assets/mainPic.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  KeyOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  faCircleInfo,
  faCommentDots,
  faMicrophone,
  faMicrophoneSlash,
  faPause,
  faVolumeUp,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Image, Modal, Spin } from "antd";
import QuestionModal from "./QuestionModal";
import { fetchJournies } from "./sideBar";
import { useMuteContext } from "../Avatar2";
import { useChat } from "../../hooks/useChat";
import prodf from "../../assets/card01.png";
import targmed from "../../assets/card02.png";
import eligibile from "../../assets/card03.png";
import charges from "../../assets/card04.png";
import App from "../../App";
import { stopAudio } from "../AudioService";
import { FloatButton } from "antd";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const backendUrl = "http://13.234.218.130:8003";


let stepDescriptions = null;
let images = null;

function ChatHistory({
  inputRef,
  sendMessage,
  handleNextClick,
  loading,
  micOn,
  setMicOn,
  micStart,
  setMicStart,
  startStopHandle,
  startStopRecording,
  messages,
  currentIndex,
  specialQuestions,
  handleQuestionClick,
  setQuestions,
  setNavAddr,
  setNavAddrSmall,
  MinimizeFunction,
}) {
  const {
    modalContent,
    setModalContent,
    myContent,
    setMyContent,
    setMessages,
    showAvatar,
    floatingButton,
    setFloatingButton,
    navigateToDefaultPath,
    receivedData,
  } = useChat();
  // console.log(modalContent);
  const [myQuest, setMyQuest] = useState([]);

  const [loadingAudio, setLoadingAudio] = useState(false);

  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [translatedText, setTranslatedText] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("es"); // Default language

  const playAudio = async (text) => {
    setLoadingAudio(true);
    // try {
    //   // Encode the text to be URL-safe
    //   const encodedText = encodeURIComponent(text);
    //   const response = await fetch(`${backendUrl}/voice/${encodedText}`);

    //   if (!response.ok) {
    //     console.error("Error fetching audio:", response.statusText);
    //     setLoadingAudio(false);
    //     return;
    //   }

    //   const data = await response.json();
    //   const audioData = data.audio; // Assuming the backend returns the audio data directly

    //   if (!audioData) {
    //     console.error("No audio data returned");
    //     setLoadingAudio(false);
    //     return;
    //   }

    //   // Convert the base64 audio data to a Blob
    //   const byteCharacters = atob(audioData);
    //   const byteNumbers = new Array(byteCharacters.length);
    //   for (let i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    //   }
    //   const byteArray = new Uint8Array(byteNumbers);
    //   const audioBlob = new Blob([byteArray], { type: "audio/wav" });
    //   const audioUrl = URL.createObjectURL(audioBlob);

    //   const audio = new Audio(audioUrl);
    //   audio.play();
    // } catch (error) {
    //   console.error("Error fetching audio:", error);
    // }
    // setLoadingAudio(false);

    try {
      // Create the POST request to send the text
      const response = await fetch(`${backendUrl}/voice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }), // Send the text in the request body
      });
    
      if (!response.ok) {
        console.error("Error fetching audio:", response.statusText);
        setLoadingAudio(false);
        return;
      }
    
      const data = await response.json();
      const audioData = data.audio; // Assuming the backend returns the audio data in base64 format
    
      if (!audioData) {
        console.error("No audio data returned");
        setLoadingAudio(false);
        return;
      }
    
      // Convert the base64 audio data to a Blob
      const byteCharacters = atob(audioData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const audioBlob = new Blob([byteArray], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
    
      // Play the audio
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
    setLoadingAudio(false);
    
  };

  useEffect(() => {
    if (specialQuestions.includes(modalContent)) {
      setMyContent(true);
      setMyQuest(modalContent);
      console.log(modalContent);
      setFloatingButton(true);
    }
  }, [modalContent]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      const firstMessage = chatContainerRef.current.firstChild;
      if (firstMessage) {
        firstMessage.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      const lastMessage = chatContainerRef.current.lastChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  const { isMuted, setIsMuted, muteAudio, unmuteAudio } = useMuteContext();

  const journeyRef = useRef();
  const journeyRefDiv = useRef();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const handleNoJourney = (text) => {
    journeyRef.current.textContent = text;
    journeyRefDiv.current.style.display = "none";
    unmuteAudio();
  };

  const handleProductFeatures = () => {
    setMyContent(true);
    sendMessage(`What are the product features of ${modalContent}?`);
  };

  const handleTargetMarket = () => {
    setMyContent(true);
    sendMessage(`What is the target market of ${modalContent}?`);
  };

  const handleEligibilityCriteria = () => {
    setMyContent(true);
    sendMessage(`What is the eligibility criteria of ${modalContent}?`);
  };

  const handleAssociatedCharges = () => {
    setMyContent(true);
    sendMessage(`What is the associated charges of ${modalContent}?`);
  };

  handleQuestionClick = async (question) => {
    setModalLoading(true);

    const result = await fetchJournies(question);

    console.log("Question response data", result);

    console.log(result.top_results, " result data");

    stepDescriptions = result.top_results.steps.map((step) => step.Step);
    images = result.top_results.steps.map((step) => step.Image_URL);

    setSelectedQuestion(question);
    setModalLoading(false);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
  };

  const toggleVolumeWhenModalOpen = () => {
    if (!isMuted) {
      unmuteAudio();
    } else {
      muteAudio();
    }
  };

  const buttons = [
    {
      label: "Product Features",
      onClick: handleProductFeatures,
      image: prodf,
    },
    {
      label: "Target Market",
      onClick: handleTargetMarket,
      image: targmed,
    },
    {
      label: "Eligibility Criteria",
      onClick: handleEligibilityCriteria,
      image: eligibile,
    },
    {
      label: "Associated Charges",
      onClick: handleAssociatedCharges,
      image: charges,
    },
  ];

  const handleDefaultQuestionClick = (question) => {
    sendMessage(question);
  };

  const defaultQuestions = [
    "What can I help you with?",
    "How can you assist me?",
    "Do you have any questions?",
    "What is BAFL?",
  ];

  const translateText = async (text, index) => {
    setLoadingTranslation(true);
  //   try {
  //     const encodedText = encodeURIComponent(text);
  //     const response = await fetch(`${backendUrl}/translate/ur/${encodedText}`);

  //     if (!response.ok) {
  //       console.error("Error fetching translation:", response.statusText);
  //       setLoadingTranslation(false);
  //       return;
  //     }

  //     const data = await response.json();
  //     console.log("Translation API response:", data); // Log the response

  //     if (!data.translation) {
  //       console.error("Translated text is missing in the response");
  //       setLoadingTranslation(false);
  //       return;
  //     }

  //     const translation = data.translation;

  //     // Update the translatedText state
  //     setTranslatedText((prev) => ({
  //       ...prev,
  //       [index]: translation,
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching translation:", error);
  //   }
  //   setLoadingTranslation(false);
  // };
  try {
    const response = await fetch(`${backendUrl}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language:"ur",
        text: text }), // Send the text in the request body
    });
  
    if (!response.ok) {
      console.error("Error fetching translation:", response.statusText);
      setLoadingTranslation(false);
      return;
    }
  
    const data = await response.json();
    console.log("Translation API response:", data); // Log the response
  
    if (!data.translation) {
      console.error("Translated text is missing in the response");
      setLoadingTranslation(false);
      return;
    }
  
    const translation = data.translation;
  
    // Update the translatedText state
    setTranslatedText((prev) => ({
      ...prev,
      [index]: translation,
    }));
  } catch (error) {
    console.error("Error fetching translation:", error);
  }
  setLoadingTranslation(false);
}

  return (
    <>
      <div className=" bg-[#fff] lg:ml-9 rounded-3xl h-[685px] px-5 relative">
        {/* list of messages */}
        <div className="overflow-y-auto lg:h-[80%] h-[77%]">
          {myContent && !loading && (
            <div>
              <div>
                <h1 className="text-xl mt-5">
                  Please select any option for {modalContent}.
                </h1>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  justifyContent: "center",
                }}
              >
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    className="h-[100%] mt-10 flex items-center rounded-xl w-[33%]"
                    onClick={button.onClick}
                    style={{ boxShadow: "0 0 15px 5px rgba(255, 0, 0, 0.09)" }}
                  >
                    <Image src={button.image} className="mr-2" height={80} />
                    <span className="ml-5">{button.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 111111111 */}

          <div className="chat-history">
            {messages.map((message, index) => (
              <div key={index}>
                {message.sender === "user" ? (
                  <div className="flex gap-4 lg:p-5 lg:mt-3 mt-1">
                    <div>
                      <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#9B9B9B] rounded-full flex items-center justify-center">
                        <img
                          src={bflLogo}
                          alt="sender image"
                          className="w-9 h-9"
                        />
                      </div>
                    </div>
                    <p className="w-full flex items-center">{message.text}</p>
                    {translatedText[index] && (
                      <p className="translated-text mt-2 text-blue-600">
                        {translatedText[index]}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="message-container flex flex-col gap-4 mt-3 bg-[#FAF0F0] lg:p-5 py-2 rounded-3xl relative">
                    <div className="flex gap-4">
                      <div>
                        <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#FFD2D2] rounded-full flex items-center justify-center">
                          <img
                            src={avatarLogo}
                            alt="chat avatar image"
                            className="w-9 h-10 mb-1"
                          />
                        </div>
                      </div>
                      <div
                        className="message-content w-full flex flex-col mt-2"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        <p>{message.text}</p>
                        {translatedText[index] && (
                          <p className="translated-text mt-2 text-blue-600">
                            {translatedText[index]}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="audio-icon-container flex items-end justify-start ml-14 mb-1">
                      <FontAwesomeIcon
                        icon={faVolumeUp}
                        className="ml-2 cursor-pointer"
                        onClick={() => playAudio(message.text)}
                        title="Play Audio"
                      />
                      <FontAwesomeIcon
                        icon={faLanguage}
                        className={`ml-2 cursor-pointer ${
                          loadingTranslation ? "text-gray-500" : "text-black"
                        }`}
                        onClick={() =>
                          !loadingTranslation &&
                          translateText(message.text, index)
                        }
                        title="Translate Text"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 111111111 */}
        </div>
        {selectedQuestion && (
          <QuestionModal
            selectedQuestion={selectedQuestion}
            closeModal={closeModal}
            stepDescriptions={stepDescriptions}
            images={images}
            handleNextClick={handleNextClick}
            currentIndex={currentIndex}
            showAvatar={showAvatar}
          />
        )}

        {/* SEND INPUT BOX IN MAIN PAGE */}

        <div className="flex rounded-3xl bg-[#F3F3F3] text-[#9B9B9B] lg:p-4 p-2 absolute bottom-3 right-5 left-5">
          {loading && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-7 ">
              <Spin />
            </div>
          )}
          <input
            ref={inputRef}
            placeholder={loading ? "" : "Ask or search anything"}
            className="w-full bg-[#F3F3F3] text-btn-color rounded-3xl p-1 focus:outline-none"
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          {micStart && (
            <FontAwesomeIcon
              icon={faPause}
              flip="horizontal"
              className="text-xl text-bg-secondary relative p-2"
            />
          )}
          <div className="flex gap-4">
            {micStart ? (
              // /* //stop the recording */

              <button
                id="voice-stop-button"
                // disabled={micOn}
                onClick={() => startStopHandle(!startStopRecording)}
                className={`text-white bg-btn-color w-[37px] h-[37px] rounded-full font-semibold`}
                // loading || micOn ? "cursor-not-allowed opacity-30" : ""
              >
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
            ) : (
              <button
                id="voice-typing-button"
                // disabled={micOn}
                onClick={() => {
                  setMicOn((prev) => !prev);
                  setMicStart(!micStart);
                }}
                className={`text-white bg-btn-color w-[37px] h-[37px] rounded-full font-semibold
                    ${loading || micOn ? "cursor-not-allowed opacity-30" : ""}
                    `}
              >
                <FontAwesomeIcon icon={faMicrophoneSlash} />
              </button>
            )}
            <button
              onClick={() => sendMessage()}
              className={`text-white bg-btn-color w-[37px] h-[37px] flex items-center justify-center rounded-full font-semibold first-letter 
                        ${loading ? "cursor-not-allowed opacity-30" : ""}
                    `}
            >
              <img src={sender} alt="sender btn" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatHistory;
