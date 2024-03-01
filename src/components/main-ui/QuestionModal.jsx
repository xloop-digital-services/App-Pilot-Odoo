import React from "react";
import { Modal } from "antd";
import HorizontalLinearStepper from "./HorizontalLinearStepper";
import bflLogo from "../../assets/bfl-logo.png";
import avatar from "../../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faMicrophone,
  faMicrophoneSlash,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const QuestionModal = ({ selectedQuestion, closeModal }) => {
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
      <div className="bg-[#ffffff] rounded-2xl lg:pb-7 lg:pt-0 p-7 ml-3  w-[650px] h-[400px] flex justify-center items-center mt-7">
        <div className="bg-[#ffffff] rounded-2xl border border-1 border-[#f0f0f0] p-5 flex items-center justify-center flex-col h-[364px]  w-[600px] mt-8">
          <HorizontalLinearStepper />
          <div className="bg-[#ffeded] border border-2 border-[#ffc3c3] rounded-2xl  p-4 mb-8  w-[560px] h-[350px]">
            <div className="flex flex-row  w-full">
              <p className="bg-[#ffc3c3] rounded-full h-10 w-10 flex items-center justify-center -mt-1 -mt-1">
                1
              </p>
              <p className="text-sm mt-2 ml-3">
                Step 1: Please enter your 4-digit login PIN to proceed.{" "}
              </p>
            </div>
            <hr class="w-[556px] border border-1 border-[#ffc3c3] mt-1 -ml-4"></hr>

            <div className="flex items-center justify-center flex-col">
              {/* mid content here */}
            </div>
          </div>
          <div className="flex flex-row -mt-5 -mb-3">
            <button className="w-[110px] rounded-3xl py-3 border border-[#ee1d23] bg-white text-[#ee1d23] mr-4">
              Back
            </button>
            <button className="w-[110px] rounded-3xl py-3 border border-[#ee1d23] bg-[#ee1d23] text-[#fff]">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff] rounded-2xl lg:pb-7 lg:pt-0 p-7 ml-3  w-[650px] h-[350px] flex justify-center items-center mt-5">
        <div className="bg-[#ffffff] rounded-2xl border border-1 border-[#f0f0f0] pt-4 h-[310px]  w-[100%] mt-8">
          <p className="ml-5 text-black font-inter font-semibold text-lg leading-[157%]">
            Ask Me
          </p>
          <hr class="w-[593px] border border-1 border-[#f0f0f0] mt-3 "></hr>
          <div className="flex flex-row -mt-1">
            <div className="ml-4 mt-4 bg-[#ebebeb] rounded-full h-10 w-10 flex flex-row items-center justify-center">
              <img src={bflLogo} alt="logo" className="w-6 h-6" />
            </div>
            <p className="mt-6 ml-4 font-inter font-semibold text-base leading-[157%] text-black">
              What Can Artificial Intelligence do?
            </p>
          </div>

          <div className="bg-[#faf0f0]  rounded-2xl  p-4 ml-4 mt-3  w-[560px] h-[90px] flex flex-row">
            <div className="ml-1 mt-1 bg-[#ffd2d2] rounded-full h-[50px] w-[90px] flex flex-row items-center justify-center">
              <img src={avatar} alt="logo" className="w-9 h-9" />
            </div>
            <p className="text-[#2C2A2B] font-inter text-sm font-light mt-2 ml-3">
              I'm sorry, but it seems there is no query provided. Could you
              please provide me with a question or let me know how I can assist
              you further?
            </p>
          </div>

          <div className="flex rounded-3xl bg-[#F3F3F3] text-[#9B9B9B] lg:p-4 p-2 absolute ml-4 mt-5 w-[560px] h-[60px]">
            <input
              // ref={inputRef}
              placeholder="Ask or search anything"
              className="w-full bg-[#F3F3F3] text-btn-color rounded-3xl p-1 focus:outline-none"
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     sendMessage();
              //   }
              // }}
            />
            <div className="flex gap-4">
              <button
                id="voice-stop-button"
                // onClick={() => startStopHandle(!startStopRecording)}
                className={`text-white bg-btn-color w-[37px] h-[37px] rounded-full font-semibold`}
              >
                <FontAwesomeIcon icon={faMicrophoneSlash} />
              </button>
              {/* ) : ( */}

              {/* )} */}
              <button
                // onClick={() => sendMessage()}
                // className={`text-white bg-btn-color w-[37px] h-[37px] flex items-center justify-center rounded-full font-semibold first-letter
                //             ${loading ? "cursor-not-allowed opacity-30" : ""}
                // `}
                className={`text-white bg-btn-color w-[37px] h-[37px] rounded-full font-semibold`}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;
