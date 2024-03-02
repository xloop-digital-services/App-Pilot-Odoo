import React, { useState, useRef } from "react";
import QuestionMark from "../../assets/message-question.svg";
import QuestionModal from "./QuestionModal";
import { useChat } from "../../hooks/useChat";
import { useMuteContext } from "../Avatar2";

const questions = [
  {
    question: "How to view e-statement?",
  },
  {
    question: "How to apply for loan?",
  },
  {
    question: "How to apply for BNPL?",
  },
  {
    question: "What is Alfa app?",
  },
];

function SideBar() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  // const [activeStep, setActiveStep] = useState(0);
 
  


  const [micStart, setMicStart] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [startStopRecording, setStartStopRecording] = useState(true);
  const input = useRef();
  const {
    chat,
    currentIndex,
    selectLanguage,
    setSelectLanguage,
    setCurrentIndex,
    loading,
    micOn,
    setMicOn,
    cameraZoomed,
    setCameraZoomed,
    message,
    messages,
  } = useChat();
  const { isMuted, setIsMuted, muteAudio, unmuteAudio } = useMuteContext();



  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
  };


  const sendMessage = (value = undefined) => {
    console.log("click", value);
    const text = input.current.value.length > 0 ? input.current.value : value;
    console.log(text);
    // setIsMuted(true)

    if (!text) {
      return;
    }

    if (micOn) {
      setMicOn(false);
      setMicStart(false);
      setStartStopRecording("stop");
    }

    if (!loading) {
      chat(text);
      input.current.value = "";
    }
  };

  const startStopHandle = (value) => {
    setStartStopRecording(value);
    setMicOn(!micOn);
    setMicStart(!micStart);
  };

 

  const handleNextClick = (length) => {
    console.log(length);
    if (currentIndex < length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
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
    <div className="bg-[#fff] pb-[30px] px-[20px] rounded-3xl ">
      <h1 className="text-center p-2.5 text-[20px] font-semibold h-[69px] flex items-center justify-center backdrop-blur-sm border-b-[1px] border-b-[#F0F0F0] mb-2">
        {" "}
        Frequently Asked journeys{" "}
      </h1>

      {questions.map((question, index) => (
        <div
          className="bg-sidbar-color p-2.5 flex items-center mb-4 gap-4 rounded-3xl w-[480px]"
          key={index}
        >
          <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#FFD2D2]">
            <img src={QuestionMark} alt="logo" />
          </div>
          <p
            className="text-[#2C2A2B] text-[12px] cursor-pointer"
            // onClick={(e)=> sendMessage(e.target.textContent)}
            onClick={() => handleQuestionClick(question.question)}
          >
            {question.question}
          </p>
        </div>
      ))}

      {selectedQuestion && (
        <QuestionModal
          selectedQuestion={selectedQuestion}
          closeModal={closeModal}
          // loading={loading}
          // chat={chat}
          // activeStep={activeStep}
          inputRef={input}
          sendMessage={sendMessage}
          micStart={micStart}
          micOn={micOn}
          loading={loading}
          setMicOn={setMicOn}
          setMicStart={setMicStart}
          startStopHandle={startStopHandle}
          startStopRecording={startStopRecording}
          messages={messages}
          handleNextClick={handleNextClick}
          currentIndex={currentIndex}
        />
      
      )}
      {/* {console.log("activeStep", activeStep)} */}
    </div>
  );
}

export default SideBar;
