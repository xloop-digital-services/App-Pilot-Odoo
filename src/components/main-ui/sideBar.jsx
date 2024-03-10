import React, { useState, useRef } from "react";
import QuestionMark from "../../assets/message-question.svg";
import QuestionModal from "./QuestionModal";
import { useChat } from "../../hooks/useChat";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const backendUrl = "http://13.233.132.194:8000";

const questions = [
  {
    question: "How to view eStatement?",
  },
  {
    question: "How do you load a mobile package via a banking app?",
  },
  {
    question:
      "How to online apply for new cheque book using Bank Alfalah Alfa App",
  },
  {
    question: "How to register for Bank Alfalah App",
  },
  {
    question: "How to Open Bank Alfalah Roshan Digital Account Online",
  },
  {
    question: "How to create Alfa Savings Account",
  },
  {
    question: "How to do INSTANT REGISTRATION TO ALFALAH INTERNET BANKING",
  },
  {
    question: "How to activate credit card?",
  },
  {
    question: "How to activate Debit Card via WhatsApp?",
  },
];

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

function SideBar() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const { currentIndex, setCurrentIndex } = useChat();

  const handleQuestionClick = async (question) => {
    setModalLoading(true);
    const result = await fetchJournies(question);

    // console.log("Question response data", result);
    // console.log(result.top_results, ' result data');

    stepDescriptions = result.top_results.steps.map((step) => step.Step);
    images = result.top_results.steps.map((step) => step.Image_URL);
    setSelectedQuestion(question);
    setModalLoading(false);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
  };

  const handleNextClick = (length) => {
    console.log(length);
    if (currentIndex < length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="bg-[#fff] pb-[30px] px-[20px] rounded-3xl  ">
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
            handleNextClick={handleNextClick}
            currentIndex={currentIndex}
          />
        )
      )}

      <div className="max-h-[335px] overflow-y-auto overflow-x-hidden sideBarQuestion">
        {questions.map((question, index) => (
          <div
            className="bg-sidbar-color p-2.5 flex items-center mb-3 mt-3 mr-2 gap-4 rounded-3xl w-[480px] ] "
            key={index}
          >
            <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#FFD2D2]">
              <img src={QuestionMark} alt="logo" />
            </div>
            <p
              className="text-[#2C2A2B] text-[12px] cursor-pointer"
              onClick={() => handleQuestionClick(question.question)}
            >
              {question.question}
            </p>
          </div>
        ))}
      </div>
      {/* {console.log("activeStep", activeStep)} */}
      {/* {console.log("chatting messagee", messages)} */}
    </div>
  );
}

export default SideBar;
