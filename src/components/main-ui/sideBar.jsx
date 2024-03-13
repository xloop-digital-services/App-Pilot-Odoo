import React, { useState, useRef } from "react";
import QuestionMark from "../../assets/message-question.svg";
import QuestionModal from "./QuestionModal";
import { useChat } from "../../hooks/useChat";
import { useMuteContext } from "../Avatar2";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { faL } from "@fortawesome/free-solid-svg-icons";
// import { useChatModal } from "../../hooks/useChatModal";

const backendUrl = "http://13.233.132.194:8000";

let stepDescriptions = null;
let images = null;

//modal fetch function from simple chat
export const fetchJournies = async (question) => {
  const response = await fetch(
    `${backendUrl}/get_step_response/?user_input=${encodeURIComponent(
      question
    )}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
  return response.json();
};

function SideBar({
  questions,
  specialQuestions,
  handleQuestionClick,
  sendMessage,
  navAddrSmall,
  navAddr,
}) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false); // New state
  // const [modalContent, setModalContent] = useState("");
  const [features, setFeatures] = useState(""); // State to store modal content

  // const [activeStep, setActiveStep] = useState(0);

  const [micStart, setMicStart] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [startStopRecording, setStartStopRecording] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);

  const input = useRef();
  const {
    // chat,
    currentIndex,
    selectLanguage,
    // setSelectLanguage,
    setCurrentIndex,
    modalContent,
    setModalContent,
    myContent,
    setMyContent,
    // loading,
    // setLoading,
    // micOn,
    // setMicOn,
    // cameraZoomed,
    // setCameraZoomed,
    // message,
    // messages,
  } = useChat();

  handleQuestionClick = async (question) => {
    if (specialQuestions.includes(question)) {
      setModalContent(question);
      setModalLoading(false);
      setMyContent(true);
      return;
    } else {
      setMyContent(false);
      setModalLoading(true);
      const result = await fetchJournies(question);
      stepDescriptions = result.top_results.steps.map((step) => step.Step);
      images = result.top_results.steps.map((step) => step.Image_URL);
      setSelectedQuestion(question);
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setShowModal(false);
    setFeatures("");
  };

  const handleNextClick = (length) => {
    console.log(length);
    if (currentIndex < length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const buttonStyle = {
    border: "1px solid white",
    borderRadius: "10px",
    padding: "4px",
    backgroundColor: "#b30f13",
    color: "white",
    fontSize: "20px",
  };
  return (
    <div
      className="bg-[#fff] pb-[30px] px-[20px] rounded-3xl overflow-y-scroll"
      style={{ height: "420px" }}
    >
      <h1 className="text-center p-2.5 text-[20px] font-semQuestionModalibold h-[69px] flex items-center justify-center backdrop-blur-sm border-b-[1px] border-b-[#F0F0F0] mb-2">
        {" "}
        Frequently Asked journeys{" "}
      </h1>

      {modalLoading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      ) : (
        selectedQuestion && (
          <QuestionModal
            selectedQuestion={selectedQuestion}
            closeModal={closeModal}
            stepDescriptions={stepDescriptions}
            images={images}
            // modalLoading={modalLoading}
            // loading={loading}
            // chat={chat}
            // activeStep={activeStep}
            // inputRef={input}
            // sendMessage={sendMessage}
            // micStart={micStart}
            // micOn={micOn}
            // loading={loading}
            // setMicOn={setMicOn}
            // setMicStart={setMicStart}
            // startStopHandle={startStopHandle}
            // startStopRecording={startStopRecording}
            // messages={messages}
            handleNextClick={handleNextClick}
            currentIndex={currentIndex}
          />
        )
      )}

      {navAddr ? (
        <div className="text-sm text-center">
          {navAddr} /{" "}
          <span className="text-sm font-semibold">{navAddrSmall}</span>
        </div>
      ) : (
        <div></div>
      )}

      {questions.map((question, index) => (
        <div
          className={`bg-sidbar-color p-2.5 flex items-center mb-3 mt-3 gap-4 rounded-3xl w-[480px] ${
            selectedQuestion === question.question ? "border border-red" : ""
          }`}
          key={index}
        >
          <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#FFD2D2]">
            <img src={QuestionMark} alt="logo" />
          </div>
          <p
            className="text-[#2C2A2B] text-[12px] cursor-pointer w-[100%]"
            onClick={() =>
              question.openModal
                ? handleQuestionClick(question.question)
                : sendMessage(question.question)
            }
          >
            {question.question}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SideBar;
