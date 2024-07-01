import React, { useState, useRef } from "react";
import QuestionMark from "../../assets/message-question.svg";
import QuestionModal from "./QuestionModal";
import { useChat } from "../../hooks/useChat";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { stopAudio } from "../AudioService";

const backendUrl = "http://13.234.218.130:8003";

let stepDescriptions = [];
let images = [];

// Function to fetch journeys using the updated endpoint
export const fetchJournies = async (question) => {
  try {
    const response = await fetch(
      `${backendUrl}/get_step_response`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: question }), // Sending question in the body
      }
    );

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

function SideBar({
  questions,
  specialQuestions,
  handleQuestionClick,
  sendMessage,
  navAddrSmall,
  navAddr,
}) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [features, setFeatures] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const {
    currentIndex,
    setCurrentIndex,
    modalContent,
    setModalContent,
    myContent,
    setMyContent,
    setMessages,
    showAvatar,
  } = useChat();

  handleQuestionClick = async (question) => {
    stopAudio();
    if (specialQuestions.includes(question)) {
      setModalContent(question);
      setModalLoading(false);
      setMyContent(true);
      setMessages([]);
      return;
    } else {
      setMyContent(false);
      setModalLoading(true);
      try {
        const result = await fetchJournies(question);
        stepDescriptions = result.top_results.Steps.map((step) => step.Step);
        // console.log("stepDescrippppption yaha dekho", stepDescriptions);
        images = result.top_results.Steps.map((step) => step.Image_URL);
        // console.log("images yaha dekho", images);
        setSelectedQuestion(question);
        setModalLoading(false);
      } catch (error) {
        console.error("Error fetching journeys:", error);
        setModalLoading(false);
      }
    }
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setShowModal(false);
    setFeatures("");
  };

  const handleNextClick = (length) => {
    if (currentIndex < length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div
      className="bg-[#fff] pb-[30px] px-[20px] rounded-3xl overflow-y-hidden"
      style={{ height: "420px" }}
    >
      <h1 className="text-center p-2.5 text-[20px] font-semibold h-[69px] flex items-center justify-center backdrop-blur-sm border-b-[1px] border-b-[#F0F0F0] mb-2 font-semibold">
        Frequently Asked Journeys
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
            handleNextClick={handleNextClick}
            currentIndex={currentIndex}
            showAvatar={showAvatar}
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

      <div className="max-h-[335px] pr-3 overflow-y-auto overflow-x-hidden sideBarQuestion">
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
    </div>
  );
}

export default SideBar;