import React, { useState, useRef, useEffect } from "react";
import { Modal, Spin } from "antd";
import HorizontalLinearStepper from "./HorizontalLinearStepper";
import bflLogo from "../../assets/bfl-logo.png";
import { LoadingOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faMicrophone,
  faMicrophoneSlash,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import sender from "../../assets/send-2.svg";
import bg from "../../assets/bg.jpg";
import avatarLogo from "../../assets/avatar.png";
import mainPic from "../../assets/mainPic.svg";
import { Image } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

// const steps = ["Step-1", "Step-2", "Step-3", "Step-4"];

const backendUrl = "http://43.205.98.215:8000";

const QuestionModal = ({
  selectedQuestion,
  closeModal,
  handleNextClick,
  currentIndex,
  stepDescriptions,
  images,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const description = stepDescriptions[activeStep];
  const [messages, setMessages] = useState([]);
  const snap = images[activeStep];
  const [skipped, setSkipped] = useState(new Set());
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [micStart, setMicStart] = useState(false);
  const [startStopRecording, setStartStopRecording] = useState(true);
  const [micOn, setMicOn] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    let recognition;

    const startRecognition = () => {
      if ("webkitSpeechRecognition" in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = function (event) {
          let final_transcript = inputRef.current.value;
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            }
          }
          inputRef.current.value = final_transcript;
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

    const voiceButton = document.getElementById("voice-sending-button");
    const stopVoiceButton = document.getElementById("voice-stopSending-button");

    if (voiceButton || stopVoiceButton) {
      voiceButton.addEventListener("click", () => {
        if (recognition && recognition.isStarted) {
          console.log("Stop the recording");
          stopRecognition();
        } else {
          console.log("Start the recording...");
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

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const completedSteps = [];

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep < stepDescriptions.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    setSkipped(newSkipped);
  };

  const sendMessage = async () => {
    const input = inputRef.current.value;
    console.log("click sendMSG modal");
    setLoading(true);

    if (input) {
      if (micOn) {
        setMicOn(false);
        setMicStart(false);
        setStartStopRecording("stop");
      }

      setMessages([...messages, { text: input, sender: "user" }]);
      inputRef.current.value = "";

      try {
        const response = await fetch(
          `${backendUrl}/query_response/${encodeURIComponent(input)}/en`
        );
        const result = await response.json();
        console.log("response in modal", result);

        const myData =
          "en" === "en" ? { ...result.data } : { ...result.translate };
        console.log("only ai data", myData);
        setMessages((prevmsg) => [...prevmsg, myData[0]]);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const startStopHandle = (value) => {
    setStartStopRecording(value);
    setMicOn(!micOn);
    setMicStart(!micStart);
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <Modal
      title={<h1 className="bg-[#ebf2ff] mt-2">{selectedQuestion}</h1>}
      visible={true}
      onCancel={closeModal}
      footer={null}
      wrapClassName="modal-wrapper"
      width={"704px"}
      style={{ top: "40px" }}
    >
      <div className="modal-content">
        <div
          className={`${
            chatOpen
              ? "bg-[#ffffff] rounded-2xl lg:pb-7 lg:pt-0 p-7 ml-3 w-[650px] h-[400px] flex justify-center items-center mt-4"
              : "bg-[#ffffff] rounded-2xl lg:pb-7 lg:pt-0 p-7 ml-3 w-[650px] h-[681px] flex justify-center items-center mt-4"
          }`}
        >
          <div
            className={`${
              chatOpen
                ? "bg-[#ffffff] rounded-2xl border border-1 border-[#f0f0f0] p-5 flex items-center justify-center flex-col h-[364px]  w-[600px] mt-8"
                : "bg-[#ffffff] rounded-2xl border border-1 border-[#f0f0f0] p-5 flex items-center justify-center flex-col h-[640px]  w-[600px] mt-8"
            }`}
          >
            <HorizontalLinearStepper
              activeStep={activeStep}
              onChangeStep={handleStepChange}
              steps={stepDescriptions}
            />
            <div
              className={`${
                chatOpen
                  ? "bg-[#ffedfd] border border-2 border-[#ffc3c3] rounded-2xl mt-0 p-4 mb-7  w-[560px] h-[350px]"
                  : "bg-[#ffedfd] border border-2 border-[#ffc3c3] rounded-2xl mt-0 p-4 mb-7  w-[560px] h-[540px]"
              }`}
            >
              <div className="flex flex-row  w-full">
                <div>
                  <p className="bg-[#ffc3c3] rounded-full h-10 w-10 flex items-center justify-center font-semibold -mt-1 -mt-1">
                    {activeStep + 1}
                  </p>
                </div>
                <p className="text-sm mt-2 ml-3">{description}</p>
              </div>

              {/* STEPPER SHOULD CHANGE THIS End */}

              <hr class="w-[556px] border border-1 border-[#ffc3c3] mt-1 -ml-4"></hr>

              <div className="flex items-center justify-center flex-col mt-3">
                {/* mid content here */}
                {/* Conditionally render the image */}
                {snap ? (
                  <Image
                    width={!chatOpen ? "42%" : "16%"}
                    src={snap}
                    alt={"step image"}
                  />
                ) : (
                  <p className=" mt-10 bg-gray-200 font-semibold flex flex-row">
                    No Image Available
                  </p> // Adjust the height and width accordingly
                )}
              </div>
            </div>
            <React.Fragment>
              <div className="flex flex-row -mt-5 -mb-3">
                <button
                  className={`w-[110px] rounded-3xl py-2 border border-[#ee1d23] mr-4 ${
                    activeStep === 0
                      ? "bg-white text-[#ee1d23]"
                      : "bg-[#ee1d23] text-[#fff]"
                  } ${activeStep === 0 && "disabled-button"}`}
                  onClick={handleBack}
                  disabled={activeStep < 1}
                >
                  Back
                </button>
                <button
                  className={`w-[110px] rounded-3xl py-2 border border-[#ee1d23] ${
                    activeStep === stepDescriptions.length - 1
                      ? "bg-white text-[#ee1d23]"
                      : "bg-[#ee1d23] text-[#fff]"
                  } ${
                    activeStep === stepDescriptions.length - 1 &&
                    "disabled-button"
                  }`}
                  onClick={handleNext}
                  disabled={activeStep === stepDescriptions.length - 1}
                >
                  Next
                </button>
              </div>
            </React.Fragment>
          </div>
        </div>

        {/* </div> */}

        <div
          className={`bg-[#ffffff] rounded-2xl lg:pb-7 lg:pt-0 p-6 ml-3  w-[650px]  flex justify-center items-center mt-4 flex-col ${
            chatOpen ? "h-[350px]" : "h-[110px]"
          }`}
        >
          <div
            className={`bg-[#ffffff] rounded-2xl border border-1 border-[#f0f0f0] pt-2 h-[320px]  w-[100%] mt-6 -mb-2 overflow-hidden ${
              chatOpen ? "" : ""
            }`}
          >
            {/* <p className="ml-5 text-black font-inter font-semibold text-lg leading-[157%] flex flex-row">
                Ask Me
              </p> */}
            <div
              className={` rounded-2xl py-4  flex justify-around items-center -mt-2 -mb-5 w-[570px] ml-3 cursor-pointer   ${
                chatOpen
                  ? "bg-white text-[#000]"
                  : "bg-[#fff] text-[#000] mb-4 "
              }`}
              onClick={toggleChat}
            >
              {chatOpen ? (
                <p className="ml-0 -mt-2 text-black font-inter font-semibold text-lg leading-[157%] flex justify-around">
                  Ask Me <CaretUpOutlined style={{ marginLeft: "465px" }} />{" "}
                </p>
              ) : (
                <p className="ml-0 mt-1  text-black font-inter font-semibold text-lg leading-[157%] flex justify-around">
                  Ask Me <CaretDownOutlined style={{ marginLeft: "465px" }} />{" "}
                </p>
              )}
            </div>

            {chatOpen && (
              <>
                <hr class="w-[593px] border border-1 border-[#f0f0f0]  mt-4 -mb-5 ml-1"></hr>
                {/* FIRST MOVE LOADER THEN SHOW RESPONSE REPLY BY BOT  */}
                <>
                  {/* list of messages */}
                  <div className="overflow-y-auto lg:h-[62%] h-[77%] ">
                    {messages.length > 0 ? (
                      messages?.map((message, index) => {
                        return (
                          <div key={index}>
                            {/* USER MSG */}
                            {message.sender === "user" ? (
                              <div className="flex flex-row -mt-1">
                                <div className="ml-4 mt-4 bg-[#ebebeb] rounded-full h-10 w-10 flex flex-row items-center justify-center">
                                  <img
                                    src={bflLogo}
                                    alt="logo"
                                    className="w-6 h-6"
                                  />
                                </div>
                                <p className="mt-6 ml-4 font-inter font-semibold text-base leading-[157%] text-black">
                                  {message.text}
                                </p>
                              </div>
                            ) : (
                              <div className="bg-[#faf0f0]  rounded-2xl  p-4 ml-4 mt-3  w-[560px] h-[90px] flex flex-row overflow-y-auto">
                                <div>
                                  <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#FFD2D2] rounded-full flex items-center justify-center mt-2">
                                    <img
                                      src={avatarLogo}
                                      alt="chat avatar image"
                                    />
                                  </div>
                                </div>

                                {message.type === "list" ? (
                                  <div>
                                    {message.list.map((msg, index) => {
                                      return (
                                        index <= currentIndex && (
                                          <div key={index}>
                                            <p className="w-full flex items-center py-2">
                                              {msg.step}
                                            </p>
                                            {msg.image && (
                                              <div className=" w-[60%] h-[100%] mb-3 mt-4">
                                                <Image
                                                  width={"50%"}
                                                  src={`data:image/png;base64, ${msg.image}`}
                                                  alt={"result image"}
                                                />
                                              </div>
                                            )}
                                          </div>
                                        )
                                      );
                                    })}
                                    {message.list.length - 1 <=
                                    currentIndex ? null : (
                                      <button
                                        className="text-white bg-btn-color rounded-full font-semibold px-2.5 py-1.5 mt-1.5"
                                        onClick={() =>
                                          handleNextClick(message.list.length)
                                        }
                                      >
                                        Next step
                                        <FontAwesomeIcon
                                          icon={faForward}
                                          size="1x"
                                          className="ml-4 "
                                        />
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <div className="flex flex-col">
                                    <p className="text-[#2C2A2B] font-inter text-sm font-light mt-3 ml-3">
                                      {message.text}
                                    </p>

                                    {message.image && (
                                      <div className=" w-[60%] h-[100%] mb-3 mt-4 ">
                                        <Image
                                          width={"50%"}
                                          src={bg}
                                          alt={`data:image/png;base64, ${message.image}`}
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <img
                          src={mainPic}
                          alt="chat icon"
                          className="sm:w-[60%] sm:h-[100%] p-0 "
                        />
                      </div>
                    )}
                  </div>
                </>
                {/* )} */}

                {/* SEND INPUT BOX IN MAIN PAGE */}

                <div className="flex rounded-3xl bg-[#F3F3F3] text-[#9B9B9B] lg:p-4 p-4 ml-4  w-[560px] h-[60px] m-2 mt-1 mb-8  absolute bottom-7 ">
                  {loading && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-7 ">
                      <Spin />
                    </div>
                  )}
                  <input
                    ref={inputRef}
                    placeholder={loading ? "" : "Ask or search anything"}
                    className="w-full bg-[#F3F3F3]  text-btn-color rounded-3xl p-1 focus:outline-none"
                    disabled={loading}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                  />

                  <div className="flex gap-4">
                    {micStart ? (
                      // /* //stop the recording */
                      <button
                        id="voice-stopSending-button"
                        onClick={() => startStopHandle(!startStopRecording)}
                        className={`text-white bg-btn-color w-[37px] h-[37px] rounded-full font-semibold`}
                      >
                        <FontAwesomeIcon icon={faMicrophone} />
                      </button>
                    ) : (
                      <button
                        id="voice-sending-button"
                        onClick={() => {
                          setMicOn((prev) => !prev);
                          setMicStart(!micStart);
                        }}
                        className={`text-white bg-btn-color w-[37px] h-[37px] rounded-full font-semibold
                    ${loading || micOn ? "cursor-not-allowed opacity-30" : ""}`}
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

                {/* SEND INPUT BOX IN MAIN PAGE */}
              </>
            )}
          </div>
        </div>

        {/* {console.log("all msg by modal", messages)} */}
      </div>
      {/* <div className="flex flex-row mt-2 -mb-4  flex justify-center items-center">
          <button
            className={`w-[110px] rounded-3xl py-2 border border-[#ee1d23]  flex justify-center items-center ${
              chatOpen ? "bg-white text-[#ee1d23]" : "bg-[#ee1d23] text-[#fff]"
            }`}
            onClick={toggleChat}
          >
            {chatOpen ? <><CaretUpOutlined /> Ask Me</> : <><CaretDownOutlined /> Ask Me</>}
          </button>
        </div> */}
    </Modal>
  );
};

export default QuestionModal;
