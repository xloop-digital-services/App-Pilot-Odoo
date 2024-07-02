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
import { FaWindowRestore } from "react-icons/fa6";
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
  faWindowRestore,
  faList,
  faQuestion,
  faBuildingColumns,
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
    journey,
  } = useChat();
  // console.log(modalContent);
  const [myQuest, setMyQuest] = useState([]);
  console.log(journey);

  const [loadingAudio, setLoadingAudio] = useState(false);

  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [translatedText, setTranslatedText] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("es"); // Default language
  const [stepDescriptions, setStepDescriptions] = useState([]);
  const [images, setImages] = useState([]);
  const [noButton, setNoButton] = useState(false);

  const handleNoButtonClick = () => {
    setNoButton(true); 

    setTimeout(() => {
      setNoButton(false);
    }, 10000);
  };

  const fetchJournies = async (question) => {
    try {
      const response = await fetch(`${backendUrl}/get_step_response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: question }), // Sending question in the body
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      // console.log("result",result);
      // console.log("result",result.top_results.Steps);
      return result;
    } catch (error) {
      console.error("Error fetching journeys:", error);
      throw error;
    }
  };

  let img = [];
  let stepDesc = [];
  const handleQuestionClick = async (question) => {
    stopAudio();
    setMyContent(false);
    setModalLoading(true);

    try {
      const result = await fetchJournies(question);
      stepDesc = result.top_results.Steps.map((step) => step.Step);
      setStepDescriptions(stepDesc);
      console.log(stepDescriptions);
      img = result.top_results.Steps.map((step) => step.Image_URL);
      setImages(img);
      console.log(images);
      setSelectedQuestion(question);
      setModalLoading(false);
      // Further processing or state updates can be added here
    } catch (error) {
      console.error("Error fetching journeys:", error);
      setModalLoading(false);
      // Handle error state or display error message as needed
    }
  };

  const playAudio = async (text) => {
    setLoadingAudio(true);
    try {
      // Encode the text to be URL-safe
      const encodedText = encodeURIComponent(text);
      const response = await fetch(`${backendUrl}/voice/${encodedText}`);

      if (!response.ok) {
        console.error("Error fetching audio:", response.statusText);
        setLoadingAudio(false);
        return;
      }

      const data = await response.json();
      const audioData = data.audio; // Assuming the backend returns the audio data directly

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
    {
      question: "What are the different types of Accounts?",
      icon: faWindowRestore,
    },
    {
      question:
        "What are the product features of Alfalah Kamyab Karobar Account?",
      icon: faList,
    },
    {
      question:
        "Can a Pehchaan Premier accountholder get Premier Visa Signature Debit Card?",
      icon: faQuestion,
    },
    { question: "What is BAFL?", icon: faBuildingColumns },
  ];

  const translateText = async (text, index) => {
    setLoadingTranslation(true);
    try {
      const encodedText = encodeURIComponent(text);
      const response = await fetch(`${backendUrl}/translate/ur/${encodedText}`);

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
  };
  console.log(journey.journey_available);

  return (
    <>
      <div className=" bg-[#fff] lg:ml-9 rounded-3xl h-[685px] px-5 relative">
        {myContent && (
          <h1 className=" lg:text-[20px] t-[16px] font-semibold lg:h-[69px] h-[55px] flex items-center  border-b-[#F0F0F0] backdrop-blur-2xl justify-between">
            Ask me
            {floatingButton && (
              <FloatButton
                shape="circle"
                name="name"
                type="danger"
                icon={<CaretDownOutlined />}
                style={{ top: 15, border: "1px solid", boxShadow: "none" }}
                className="hover:text-white hover:bg-bg-secondary"
                onClick={MinimizeFunction}
              />
            )}
          </h1>
        )}{" "}
        <div className="overflow-y-auto lg:h-[80%] h-[77%]">
          {myContent && !loading && (
            <div>
              <div>
                <h1 className="text-xl mt-5">
                  Please select any option for {modalContent}.
                </h1>
              </div>
              <div className="flex justify-center flex-wrap gap-4">
                {buttons.map((button, index) => (
                  <button
                    key={index}
                    className="h-[100%] mt-10 flex items-center rounded-xl w-[270px]"
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
                ) : journey.journey_available === 0 &&
                  index >= messages.length - 1 || noButton ? (
                  <div className="message-container flex flex-col gap-4 mt-3 bg-[#FAF0F0] lg:p-5 py-2 rounded-3xl relative">
                    <div className="flex gap-4">
                      <div>
                      {showAvatar === "black" && (
                        <div>
                          <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#FFD2D2] rounded-full flex items-center justify-center">
                            <img
                              src={avatarLogo2}
                              alt="chat avatar image"
                              width="65%"
                              className="mb-2"
                            />
                          </div>
                        </div>
                      )}
                      {showAvatar === "avatar-fgenz" && (
                        <div>
                          <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#FFD2D2] rounded-full flex items-center justify-center">
                            <img
                              src={avatarFGenzLogo}
                              alt="chat avatar image"
                              width="75%"
                              className="mb-2"
                            />
                          </div>
                        </div>
                      )}
                      {showAvatar === "avatar-fformal" && (
                        <div>
                          <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#FFD2D2] rounded-full flex items-center justify-center">
                            <img
                              src={avatarFFormalLogo}
                              alt="chat avatar image"
                              width="75%"
                              className="mb-2"
                            />
                          </div>
                        </div>
                      )}
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
                ) : journey.journey_available === 1 &&
                  index >= messages.length - 1 ? (
                  <div className="message-container flex flex gap-4 mt-3 bg-[#FAF0F0] lg:p-5 py-2 rounded-3xl relative">
                    <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#FFD2D2] rounded-full flex items-center justify-center">
                      <img
                        src={avatarLogo}
                        alt="chat avatar image"
                        className="w-9 h-10 mb-1"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="w-full mt-2">
                        This is a journey question. Do you want to start the
                        journey?
                      </p>
                      <div className="flex flex-row -mb-3">
                        <button className="w-[62px] h-[37px] rounded-lg py-0 border border-[#ee1d23] bg-[#faf0f0] text-[#ee1d23] mr-4" onClick={handleNoButtonClick}>
                          No
                        </button>
                        <button
                          className="w-[62px] h-[37px] rounded-lg py-0 border border-[#ee1d23] bg-[#ee1d23] text-[#fff]"
                          onClick={() => handleQuestionClick(journey.question)}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
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
          {!myContent && !messages.length > 0 && (
            <div className="justify-start items-start text-start ">
              <div className="text-center mt-8 w-[100%]">
                <p
                  className="flex text-6xl gradient-text -tracking-[0.12em] pb-1"
                  style={{ color: "red" }}
                >
                  Hello, Wasey{" "}
                </p>

                <p className="text-5xl justify-start items-start text-start font-semibold mt-3 text-[#c4c7c5] -tracking-[0.05em]">
                  How can I help you today?
                </p>
              </div>
              <div className="flex justify-start p-1 gap-5 flex-wrap max-sm:justify-center">
                {defaultQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="h-[150px] mt-7 flex justify-start items-start text-left rounded-2xl w-[250px] font-medium p-3 relative"
                    onClick={() => {
                      handleDefaultQuestionClick(question.question);
                    }}
                    style={{
                      boxShadow: "0px 0px 7px 3px rgba(220, 0, 0, 0.2)",
                    }}
                  >
                    <span className="ml-0 ">{question.question}</span>
                    <FontAwesomeIcon
                      icon={question.icon}
                      className="absolute bottom-3 right-3 text-xl" // Positioned absolutely
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          
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
