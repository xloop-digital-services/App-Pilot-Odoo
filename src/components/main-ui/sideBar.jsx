import React, { useState, useRef } from "react";
import QuestionMark from "../../assets/message-question.svg";
import QuestionModal from "./QuestionModal";
import { useChat } from "../../hooks/useChat";
import { useMuteContext } from "../Avatar2";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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

function SideBar({ questions, specialQuestions }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false); // New state
  const [modalContent, setModalContent] = useState("");
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
    // loading,
    // setLoading,
    // micOn,
    // setMicOn,
    // cameraZoomed,
    // setCameraZoomed,
    // message,
    // messages,
  } = useChat();

  // const handleQuestionClick = async (question) => {
  //   setModalLoading(true);
  //   const result = await fetchJournies(question);

  //   // console.log("Question response data", result);
  //   // console.log(result.top_results, ' result data');

  //   stepDescriptions = result.top_results.steps.map((step) => step.Step);
  //   images = result.top_results.steps.map((step) => step.Image_URL);
  //   setSelectedQuestion(question);
  //   setModalLoading(false);
  // };
  const handleQuestionClick = async (question) => {
    if (specialQuestions.includes(question)) {
      setShowModal(true);
      setModalContent(question);
      setModalLoading(false);
      return;
    } else {
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

      <Modal
        width="40%"
        visible={showModal}
        onCancel={closeModal}
        footer={null}
      >
        {
  modalContent === "Alfalah Kamyab Karobar Account" ||
  modalContent === "Alfalah PKR Current Account" ||
  modalContent === "Alfalah Basic Banking Account" ||
  modalContent === "Alfalah Asaan Remittance Current Account" ||
  modalContent === "Alfalah FCY Current Account" ||
  modalContent === "Alfalah Asaan Current Account" ||
  modalContent === "Alfalah Kashtkaar Current Account" ? (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "40px" }}
    >
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("")}
        >
          Product Features{" "}
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("")}
        >
          {" "}
          Target Market{" "}
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("")}
        >
          {" "}
          Eligibility Criteria{" "}
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("")}
        >
          {" "}
          Associated Charges{" "}
        </button>
      </div>
      {features && (
        <div style={{ fontSize: "14px" }}>
          {features.split(/[.?]/).map((part, index) => (
            <div key={index}>{part.trim()}</div>
          ))}
        </div>
      )}
    </div>
  ):(<p></p>)
}

{modalContent === "Alfalah Care Account" ||
 modalContent === "Alfalah Royal Profit Account" ||
 modalContent === "Alfalah Kifayat Account" ||
 modalContent === "Alfalah PLS Savings Account" ||
 modalContent === "Alfalah Asaan Remittance Savings Account" ||
 modalContent === "Alfalah FCY Saving account" ||
 modalContent === "Alfalah FCY Monthly Savings Account" ||
 modalContent === "Alfalah Asaan Savings Account" ? (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "40px" }}
    >
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Product Features")}
        >
          Product Features
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Target Market")}
        >
          Target Market
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Eligibility Criteria")}
        >
          Eligibility Criteria
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Associated Charges")}
        >
          Associated Charges
        </button>
      </div>
      {features && (
        <div style={{ fontSize: "14px" }}>
          {features.split(/[.?]/).map((part, index) => (
            <div key={index}>{part.trim()}</div>
          ))}
        </div>
      )}
    </div>
) : (
    <p></p>
)}

{modalContent === "Alfalah Term Deposit" ||
 modalContent === "Alfalah Mahana Amdan Term Deposit Account" ||
 modalContent === "Alfalah Floating Term Deposit" ||
 modalContent === "Alfalah FCY Term Deposit" ||
 modalContent === "Alfalah Care Senior Citizen Mahana Amdan Account" ? (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "40px" }}
    >
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Product Features")}
        >
          Product Features
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Target Market")}
        >
          Target Market
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Eligibility Criteria")}
        >
          Eligibility Criteria
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Associated Charges")}
        >
          Associated Charges
        </button>
      </div>
      {features && (
        <div style={{ fontSize: "14px" }}>
          {features.split(/[.?]/).map((part, index) => (
            <div key={index}>{part.trim()}</div>
          ))}
        </div>
      )}
    </div>
) : (
    <p></p>
)}

{modalContent === "Alfalah Islamic Foreign Currency Current Account" ||
 modalContent === "Alfalah Islamic Asaan Current Account" ||
 modalContent === "Alfalah Islamic Current Account" ||
 modalContent === "Alfalah Basic Banking account" ||
 modalContent === "Alfalah Islamic Business Way Deposit and Payroll Remunerative Current Account" ||
 modalContent === "Alfalah Islamic Asaan Remittance Current Account" ? (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "40px" }}
    >
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Product Features")}
        >
          Product Features
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Target Market")}
        >
          Target Market
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Eligibility Criteria")}
        >
          Eligibility Criteria
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Associated Charges")}
        >
          Associated Charges
        </button>
      </div>
      {features && (
        <div style={{ fontSize: "14px" }}>
          {features.split(/[.?]/).map((part, index) => (
            <div key={index}>{part.trim()}</div>
          ))}
        </div>
      )}
    </div>
) : (
    <p></p>
)}

{modalContent === "Falah Business Account" ||
 modalContent === "Alfalah Islamic Foreign Currency Savings Account" ||
 modalContent === "Falah Mahana Amdani Account" ||
 modalContent === "Alfalah Islamic Musharakah Savings Account" ||
 modalContent === "Falah Classic Savings Account" ||
 modalContent === "Alfalah Islamic Profex Saving Account" ||
 modalContent === "Falah Senior Citizens Savings Account" ||
 modalContent === "Alfalah Islamic Asaan Remittance Savings Account" ||
 modalContent === "Alfalah Islamic Asaan Saving Account" ? (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "40px" }}
    >
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Product Features")}
        >
          Product Features
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Target Market")}
        >
          Target Market
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Eligibility Criteria")}
        >
          Eligibility Criteria
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Associated Charges")}
        >
          Associated Charges
        </button>
      </div>
      {features && (
        <div style={{ fontSize: "14px" }}>
          {features.split(/[.?]/).map((part, index) => (
            <div key={index}>{part.trim()}</div>
          ))}
        </div>
      )}
    </div>
) : (
    <p></p>
)}

{modalContent === "Alfalah Islamic Foreign Currency Term Deposit" ||
 modalContent === "Alfalah Islamic Premium Term Deposit- Monthly" ||
 modalContent === "Alfalah Islamic Premium Term Deposit – Bullet Maturity" ||
 modalContent === "Falah Mahana Munafa Term Deposit" ||
 modalContent === "Falah Term Deposit" ||
 modalContent === "Alfalah Islamic Recurring Value Deposit" ||
 modalContent === "Falah 3 Year Term Deposit (Monthly Income Certificate)" ||
 modalContent === "Falah Senior Citizens Term Deposit" ||
 modalContent === "Target Saving Deposit" ? (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "40px" }}
    >
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Product Features")}
        >
          Product Features
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Target Market")}
        >
          Target Market
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Eligibility Criteria")}
        >
          Eligibility Criteria
        </button>
        <button
          style={buttonStyle}
          onClick={() => setFeatures("Associated Charges")}
        >
          Associated Charges
        </button>
      </div>
      {features && (
        <div style={{ fontSize: "14px" }}>
          {features.split(/[.?]/).map((part, index) => (
            <div key={index}>{part.trim()}</div>
          ))}
        </div>
      )}
    </div>
) : (
    <p></p>
)}
        
      </Modal>

      {questions.map((question, index) => (
        <div
          className="bg-sidbar-color p-2.5 flex items-center mb-3 mt-3 gap-4 rounded-3xl w-[480px]"
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
  );
}

export default SideBar;
