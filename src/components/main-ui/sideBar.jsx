import React, { useState } from "react";
import QuestionMark from "../../assets/message-question.svg";
import QuestionModal from "./QuestionModal";

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

function SideBar({ sendMessage }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
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
        />
      )}
    </div>
  );
}

export default SideBar;
