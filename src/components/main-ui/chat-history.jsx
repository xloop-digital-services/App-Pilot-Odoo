import React, { useRef, useState } from "react";
import sender from "../../assets/send-2.svg";
import bflLogo from "../../assets/bfl-logo.png";
import bg from "../../assets/bg.jpg";
import avatarLogo from "../../assets/avatar.png";
import mainPic from "../../assets/mainPic.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingOutlined } from "@ant-design/icons";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Image, Spin } from "antd";
import QuestionModal from "./QuestionModal";
import { fetchJournies } from "./sideBar";
import { useMuteContext } from "../Avatar2";


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
}) {
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

  const handleQuestionClick = async (question) => {
    setModalLoading(true);

    const result = await fetchJournies(question);

    console.log("Question response data", result);

    console.log(result.top_results, " result data");

    stepDescriptions = result.top_results.steps.map((step) => step.Step);
    images = result.top_results.steps.map((step) => step.Image_URL);

    setSelectedQuestion(question);
    setModalLoading(false);
    // journeyRefDiv.current.style.display = 'none';
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
  // console.log("messages", messages);
  // console.log("DataMessage me data he", dataMessage);
  return (
    <>
      <div className="bg-[#ffffff] lg:ml-9 rounded-3xl h-[685px] px-5 relative">
        <h1 className=" lg:text-[20px] t-[16px] font-semibold lg:h-[69px] h-[55px] flex items-center border-b-[1px] border-b-[#F0F0F0] backdrop-blur-2xl">
          Ask me
        </h1>

        {/* list of messages */}
        <div className="overflow-y-auto lg:h-[80%] h-[77%]">
          {messages.length > 0 ? (
            messages?.map((message, index) => {
              return (
                <div key={index}>
                  {/* USER MSG */}
                  {message.sender === "user" ? (
                    <div className="flex gap-4 lg:p-5 lg:mt-3 mt-1">
                      <div>
                        <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#ebebeb] rounded-full flex items-center justify-center">
                          <img
                            src={bflLogo}
                            alt="sender image"
                            className="w-9 h-9"
                          />
                        </div>
                      </div>
                      <p className="w-full flex items-center">{message.text}</p>
                    </div>
                  ) : (
                    <div className="flex gap-4 mt-3 bg-[#FAF0F0] lg:p-5 py-2 rounded-3xl ">
                      <div>
                        <div className="lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] bg-[#FFD2D2] rounded-full flex items-center justify-center">
                          <img src={avatarLogo} alt="chat avatar image" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        {message.is_journey &&
                        message.is_journey &&
                        message.is_journey.journey_avalible == 1 ? (
                         
                          <div>
                            {/* REPLY CHAT BUTTON START */}
                            <p ref={journeyRef} className="w-full mt-2">
                              This is a journey question, Do you want to start
                              journey ?
                            </p>
                            <div
                              className="flex flex-row mt-3 -mb-3"
                              ref={journeyRefDiv}
                            >
                              <button
                                className="w-[62px] h-[37px] rounded-lg py-0 border border-[#ee1d23] bg-[#faf0f0] text-[#ee1d23] mr-4"
                                onClick={() => handleNoJourney(message[0].text)}
                              >
                                No
                              </button>
                              <button
                                className="w-[62px] h-[37px] rounded-lg py-0 border border-[#ee1d23] bg-[#ee1d23] text-[#fff]"
                                onClick={() => {
                                  toggleVolumeWhenModalOpen();
                              
                                  handleQuestionClick(
                                    message.is_journey.question_list[0]
                                  );
                                }}
                              >
                                {modalLoading ? (
                                  <Spin
                                    indicator={
                                      <LoadingOutlined
                                        style={{ fontSize: 20, color: "white" }}
                                        spin
                                      />
                                    }
                                  />
                                ) : (
                                  "Yes"
                                )}
                              </button>
                            </div>
                            {/* REPLY CHAT BUTTON END */}
                          </div>
                        ) : (
                          <p className="w-full mt-2">{message[0].text}</p>
                        )}

                        {message.image && (
                          <div className=" w-[60%] h-[100%] mb-3 mt-4">
                            <Image
                              width={"50%"}
                              src={bg}
                              alt={`data:image/png;base64, ${message.image}`}
                            />
                          </div>
                        )}
                      </div>
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
                className="sm:w-[60%] sm:h-[100%]"
              />
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
          />
        )}

        {/* SEND INPUT BOX IN MAIN PAGE */}

        <div className="flex rounded-3xl bg-[#F3F3F3] text-[#9B9B9B] lg:p-4 p-2 absolute bottom-3 right-5 left-5">
          {loading && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-7 ">
              {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 38 }} spin />}/> */}
              <Spin/>
            </div>
          //   <div className="example">
          //   <Spin/>
          // </div>
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
                onClick={() => {
                  setMicOn((prev) => !prev);
                  setMicStart(!micStart);
                }}
                className={`text-white bg-btn-color w-[37px] h-[37px] rounded-full font-semibold
                    ${loading || micOn ? "cursor-not-allowed opacity-30" : ""}
                    `}
              >
                {/* MicrophoneIcon integrated into the button */}
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
      </div>
    </>
  );
}

export default ChatHistory;
