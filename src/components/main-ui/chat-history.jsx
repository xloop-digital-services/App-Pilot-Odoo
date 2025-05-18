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
  faMoneyBill,
  faFileText,
  faEnvelope,
  faCreditCard,
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
import iflLogo from "../../assets/PNG IFL.png";
import odoo from "../../assets/OdooChat.png";
import odooResponse from "../../assets/OdooResponse.png";
import MarkdownRenderer from "./MarkDown";

const backendUrl = "http://13.234.218.130:8000";

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
    playAudio,
  } = useChat();
  // console.log(modalContent);
  const [myQuest, setMyQuest] = useState([]);
  console.log(journey);

  // const [loadingAudio, setLoadingAudio] = useState(false);

  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [translatedText, setTranslatedText] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("es"); // Default language
  const [stepDescriptions, setStepDescriptions] = useState([]);
  const [images, setImages] = useState([]);
  const [noButton, setNoButton] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showTopFade, setShowTopFade] = useState(false);

  const chatEndRef = useRef(null);

  const handleNoButtonClick = () => {
    setNoButton(true);

    setTimeout(() => {
      setNoButton(false);
    }, 10000);
  };

  useEffect(() => {
    const container = chatContainerRef.current;

    const handleScroll = () => {
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;

      // Show fade when scrolled down from top
      setShowTopFade(scrollTop > 5);

      // Your existing scroll button logic
      setShowScrollButton(scrollTop + clientHeight < scrollHeight - 100);
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

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
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
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
      question: "What are the types of payments in Odoo?",
      icon: faMoneyBill,
    },
    {
      question: "⁠What are tax groups in Odoo, and how are they used?",
      icon: faFileText,
    },
    {
      question:
        "⁠How does Odoo handle email scheduling and what options are available?",
      icon: faEnvelope,
    },
    {
      question: "⁠How do you set up default sales and purchase taxes in Odoo?",
      icon: faCreditCard,
    },
  ];

  const translateText = async (text, index) => {
    setLoadingTranslation(true);
    try {
      const response = await fetch(`${backendUrl}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: "ur", text: text }), // Send the text in the reqdfdfduest body
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
  };

  useEffect(() => {
    const container = chatContainerRef.current;

    const handleScroll = () => {
      if (!container) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollButton(scrollTop + clientHeight < scrollHeight - 100);
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className=" bg-[#fff] lg:ml-9 rounded-3xl h-[820px] px-5 relative">
        <div
          className="overflow-y-auto lg:h-[85%] h-[77%]"
          ref={chatContainerRef}
        >
          <div
            className={`pointer-events-none absolute top-0 left-0 w-full h-20 z-10 transition-opacity duration-300 ${
              showTopFade ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,1),rgba(255,255,255,0.6), rgba(255,255,255,0.5), rgba(255,255,255,0))",
            }}
          />

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
                      <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px]  flex items-center justify-center">
                        <img
                          src={odoo}
                          alt="sender image"
                          className="w-12 h-12 max-sm:w-9 max-sm:h-9"
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
                ) : (journey.journey_available === 0 &&
                    index >= messages.length - 1) ||
                  noButton ? (
                  <div className="message-container flex flex-col gap-4 mt-3 bg-[#9c4485] bg-opacity-20 lg:p-5 py-2 rounded-3xl relative">
                    <div className="flex gap-4">
                      <div>
                        <div>
                          <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#ffffff] max-sm:ml-1 rounded-full flex items-center justify-center">
                            <img
                              src={odooResponse}
                              alt="chat avatar image"
                              width="65%"
                              className=""
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="message-content w-full flex flex-col"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        <MarkdownRenderer markdownText={message.text} />

                        {translatedText[index] && (
                          <p className="translated-text mt-2 text-blue-600">
                            {translatedText[index]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : journey.journey_available === 1 &&
                  index >= messages.length - 1 ? (
                  <div className="message-container flex flex gap-4 mt-3 bg-[#9c4485] bg-opacity-20 lg:p-5 py-2 rounded-3xl relative">
                    <div>
                      <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#ffffff] rounded-full flex items-center justify-center">
                        <img
                          src={odooResponse}
                          alt="chat avatar image"
                          width="65%"
                          className=""
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="w-full mt-2">
                        This is a journey question. Do you want to start the
                        journey?
                      </p>
                      <div className="flex flex-row -mb-3">
                        <button
                          className="w-[62px] h-[37px] rounded-lg py-0 border border-[#ee1d23] bg-[#faf0f0] text-[#ee1d23] mr-4"
                          onClick={handleNoButtonClick}
                        >
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
                  <div className="message-container flex flex-col gap-4 mt-3 bg-[#9c4485] bg-opacity-20 lg:p-5 py-2 rounded-3xl relative">
                    <div className="flex gap-4">
                      <div>
                        <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#ffffff] rounded-full flex items-center justify-center">
                          <img
                            src={odooResponse}
                            alt="chat avatar image"
                            width="65%"
                            className=""
                          />
                        </div>
                      </div>
                      <div
                        className="message-content w-full flex flex-col"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        <MarkdownRenderer markdownText={message.text} />

                        {translatedText[index] && (
                          <p className="translated-text mt-2 text-blue-600">
                            {translatedText[index]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          {!myContent && !messages.length > 0 && (
            <div className="justify-start items-start text-start ">
              <div className="text-center mt-8 w-[100%]">
                <p className="flex text-6xl gradient-text -tracking-[0.12em] pb-1">
                  Hello, User{" "}
                </p>

                <p className="text-5xl justify-start items-start text-start font-semibold mt-3 text-[#c4c7c5] -tracking-[0.05em]">
                  How can I help you today?
                </p>
              </div>
              <div className="flex justify-start p-1 gap-5 flex-wrap max-sm:justify-center max-sm:grid max-sm:grid-col-1 max-sm:gap-2">
                {defaultQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="h-[150px] mt-7 flex justify-start items-start text-left rounded-2xl w-[250px] font-medium p-3 relative max-sm:justify-between max-sm:text-left max-sm:h-auto"
                    onClick={() => {
                      handleDefaultQuestionClick(question.question);
                    }}
                    style={{
                      boxShadow: "0px 0px 7px 3px rgb(156, 68, 133,0.25)",
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
        {showScrollButton && messages.length > 0 && (
          <button
            onClick={scrollToBottom}
            className="fixed z-50 bottom-[170px] right-5 sm:right-28 p-3 bg-[#edc8f4] w-8 h-8 border border-[#9c4485] text-black rounded-full shadow-lg hover:scale-110 transition duration-200 flex items-center justify-center"
          >
            <CaretDownOutlined className="text-xs" />
          </button>
        )}
      </div>
    </>
  );
}

export default ChatHistory;
