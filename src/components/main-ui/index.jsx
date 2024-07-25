import React, { useEffect, useRef, useState } from "react";
import ChatHistory from "./chat-history";
import SideBar from "./sideBar";
import Logo from "../../assets/logo.png";
import bflLogo from "../../assets/bfl-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faHome } from "@fortawesome/free-solid-svg-icons";
import { faVolumeXmark, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { useChat } from "../../hooks/useChat";
import { useMuteContext } from "../Avatar2";
import { Select, MenuItem } from "@mui/material";
import CustomModal from "./CustomModal";
import StaticData from "./StaticData";

function MainUi() {
  const [micStart, setMicStart] = useState(false);
  const [startStopRecording, setStartStopRecording] = useState(true);

  const [specialQuestions] = useState([
    "Alfalah Kamyab Karobar Account",
    "Alfalah PKR Current Account",
    "Alfalah Basic Banking Account",
    "Alfalah Asaan Remittance Current Account",
    "Alfalah FCY Current Account",
    "Alfalah Asaan Current Account",
    "Alfalah Kashtkaar Current Account",
    "Alfalah Care Account",
    "Alfalah Royal Profit Account",
    "Alfalah Kifayat Account",
    "Alfalah PLS Savings Account",
    "Alfalah Asaan Remittance Savings Account",
    "Alfalah FCY Saving account",
    "Alfalah FCY Monthly Savings Account",
    "Alfalah Asaan Savings Account",
    "Alfalah Term Deposit",
    "Alfalah Mahana Amdan Term Deposit Account",
    "Alfalah Floating Term Deposit",
    "Alfalah FCY Term Deposit",
    "Alfalah Care Senior Citizen Mahana Amdan Account",
    "Alfalah Islamic Foreign Currency Current Account",
    "Alfalah Islamic Asaan Current Account",
    "Alfalah Islamic Current Account",
    "Alfalah Basic Banking account",
    "Alfalah Islamic Business Way Deposit and Payroll Remunerative Current Account",
    "Alfalah Islamic Asaan Remittance Current Account",
    "Falah Business Account",
    "Alfalah Islamic Foreign Currency Savings Account",
    "Falah Mahana Amdani Account",
    "Alfalah Islamic Musharakah Savings Account",
    "Falah Classic Savings Account",
    "Alfalah Islamic Profex Saving Account",
    "Falah Senior Citizens Savings Account",
    "Alfalah Islamic Asaan Remittance Savings Account",
    "Alfalah Islamic Asaan Saving Account",
    "Alfalah Islamic Foreign Currency Term Deposit",
    "Alfalah Islamic Premium Term Deposit- Monthly",
    "Alfalah Islamic Premium Term Deposit – Bullet Maturity",
    "Falah Mahana Munafa Term Deposit",
    "Falah Term Deposit",
    "Alfalah Islamic Recurring Value Deposit",
    "Falah 3 Year Term Deposit (Monthly Income Certificate)",
    "Falah Senior Citizens Term Deposit",
    "Target Saving Deposit",
  ]);
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
    modalContent,
    setModalContent,
    myContent,
    setMyContent,
    showAvatar,
    setShowAvatar,
    setFloatingButton,
    minimize,
    setMinimize,
    navAddr,
    setNavAddr,
    navAddrSmall,
    setNavAddrSmall,
    questions,
    setQuestions,
    showAddr,
    setShowAddr,
    navigateToDefaultPath
  } = useChat();
  const { isMuted, setIsMuted, muteAudio, unmuteAudio } = useMuteContext();

  const handleQuestionClick = async (question) => {};
  const dropdownRef = useRef(null);

  useEffect(() => {
    // console.log(messages)
    let recognition;

    const startRecognition = () => {
      if ("webkitSpeechRecognition" in window) {
        // console.log('kiya hua')
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = function (event) {
          let final_transcript = input.current.value;
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            }
          }
          input.current.value = final_transcript;
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

    const voiceButton = document.getElementById("voice-typing-button");
    const stopVoiceButton = document.getElementById("voice-stop-button");

    // console.log(stopVoiceButton, 'chali he')
    if (voiceButton || stopVoiceButton) {
      // console.log('aya hn')
      voiceButton.addEventListener("click", () => {
        if (recognition && recognition.isStarted) {
          console.log("Stop the recording");
          stopRecognition();
        } else {
          //#endregio
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

  const sendMessage = (value = undefined) => {
    const text = input.current.value.length > 0 ? input.current.value : value;
    console.log("given text : ", text);
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

  const languageHandleChange = (value) => {
    console.log(value);
    setSelectLanguage(value);
  };

  const avatarHandleChange = (newValue) => {
    setShowAvatar(newValue);
    console.log(showAvatar);
  };

  const handleNextClick = (length) => {
    console.log(length);
    if (currentIndex < length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const toggleVolume = () => {
    if (!isMuted) {
      unmuteAudio();
    } else {
      muteAudio();
    }
  };

  const toggleDropdown = (index) => {
    setBankingOptions((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index
          ? { ...option, isOpen: !option.isOpen }
          : { ...option, isOpen: false }
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, close all dropdowns
        setBankingOptions((prevOptions) =>
          prevOptions.map((option) => ({ ...option, isOpen: false }))
        );
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const [bankingOptions, setBankingOptions] = useState([
    {
      label: "Conventional Banking",
      isOpen: false,
      firstHeading: "Premier - Conventional",
      options: [
        ["Premier Banking", "Alfalah Premier Cards", "Alfalah Orbit Rewards"],
      ],
      secondHeading: "Customer Onboarding",
      secondOptions: [["Process"]],
      thirdHeading: "Deposits",
      thirdOptions: [
        [
          "Current account",
          "Saving account",
          "Term Deposit",
          "Alfalah at Work",
          "Roshan Digital Account (for NRPs)",
          "Alfalah RAPID",
          "Asaan Roshan Digital Account",
        ],
      ],
    },
    {
      label: "Islamic Banking",
      isOpen: false,
      firstHeading: "Islamic Premier",
      options: [
        [
          "Alfalah Islamic Premier Card",
          "Complimentary Takaful Coverage",
          "Zindagi Premier Takaful Savings (Vitality) Plan",
        ],
      ],
      secondHeading: "Customer OnBoarding",
      secondOptions: [["Documentation"]],
      thirdHeading: "Deposits",
      thirdOptions: [
        [
          "Islamic Current Account",
          "Islamic Saving Account",
          "Islamic Term Deposit",
          "Islamic Roshan Digital Account (FOR NRPS)",
          "Asaan Roshan Digital Account(for Islamic)",
          "Islamic Roshan Digital Business Account",
        ],
      ],
    },
    {
      label: "Consumer Banking",
      isOpen: false,
      firstHeading: "Conventional",
      options: [["Credit Card", "Auto Loan", "Debit Card"]],
      secondHeading: "Islamic",
      secondOptions: [
        ["Car Ijarah", "Home Musharaka", "Islamic Roshan Apni Car"],
      ],
      thirdHeading: "",
      thirdOptions: [],
    },
  ]);

  function handleOptionSelection(option) {
    const questionsMap = {
      "Premier Banking": [
        {
          question:
            "Can a Pehchaan Premier accountholder get Premier Visa Signature Debit Card?",
        },
        {
          question:
            "What is the procedure of upgrading a regular account to Premier?",
        },
        {
          question:
            "Will the Premier customer automatically get upgraded Debit Card and Cheque book after getting the account tagged to Premier?",
        },
        {
          question:
            "What is the qualification criteria for existing Premier client?",
        },
      ],
      "Alfalah Premier Cards": [
        {
          question:
            "What are the product features of ALFALAH PREMIER VISA SIGNATURE DEBIT CARD?",
        },
        {
          question:
            "What is the eligibility criteria for ALFALAH PREMIER VISA SIGNATURE DEBIT CARD?",
        },
        {
          question:
            "What is the ATM Withdrawal limit & Fund Transfer Limit for ALFALAH PREMIER VISA SIGNATURE DEBIT CARD?",
        },
        {
          question:
            "What are the documentation required for ALFALAH PREMIER VISA SIGNATURE DEBIT CARD?",
        },
        {
          question:
            "What are the product features of ALFALAH PREMIER VISA PLATINUM DEBIT CARD?",
        },
        {
          question:
            "What is the eligibility criteria for ALFALAH PREMIER VISA PLATINUM DEBIT CARD?",
        },
        {
          question:
            "What is the ATM Withdrawal limit & Fund Transfer Limit for ALFALAH PREMIER VISA PLATINUM DEBIT CARD?",
        },
        {
          question:
            "What are the documentation required for ALFALAH PREMIER VISA PLATINUM DEBIT CARD?",
        },
      ],
      "Alfalah Orbit Rewards": [
        { question: "What is Alfalah Orbit Rewards?" },
        { question: "What are Orbits?" },
        { question: "Which customers are eligible for Alfalah Orbit Rewards?" },
        { question: "How do I enroll for Alfalah Orbit Rewards?" },
      ],
      "Customer Onboarding": [
        { question: "What are the different types of Current Accounts?" },
        { question: "What are the different types of Saving Accounts?" },
        { question: "What are the account related deliverables?" },
        {
          question:
            "What are the BASIC DOCUMENTATION REQUIRED FOR ACCOUNT OPENING for Salaried Accounts?",
        },
      ],
      Process: [
        { question: "What are the different types of Current Accounts?" },
        { question: "What are the different types of Saving Accounts?" },
        { question: "What are the account related deliverables?" },
        {
          question:
            "What are the BASIC DOCUMENTATION REQUIRED FOR ACCOUNT OPENING for Salaried Accounts?",
        },
      ],

      "Current account": [
        { question: "Alfalah Kamyab Karobar Account", openModal: true },
        { question: "Alfalah PKR Current Account", openModal: true },
        { question: "Alfalah Basic Banking Account", openModal: true },
        {
          question: "Alfalah Asaan Remittance Current Account",
          openModal: true,
        },
        { question: "Alfalah FCY Current Account", openModal: true },
        { question: "Alfalah Asaan Current Account", openModal: true },
        { question: "Alfalah Kashtkaar Current Account", openModal: true },
      ],
      "Saving account": [
        { question: "Alfalah Care Account", openModal: true },
        { question: "Alfalah Royal Profit Account", openModal: true },
        { question: "Alfalah Kifayat Account", openModal: true },
        { question: "Alfalah PLS Savings Account", openModal: true },
        {
          question: "Alfalah Asaan Remittance Savings Account",
          openModal: true,
        },
        { question: "Alfalah FCY Saving account", openModal: true },
        { question: "Alfalah FCY Monthly Savings Account", openModal: true },
        { question: "Alfalah Asaan Savings Account", openModal: true },
      ],
      "Term Deposit": [
        { question: "Alfalah Term Deposit", openModal: true },
        {
          question: "Alfalah Mahana Amdan Term Deposit Account",
          openModal: true,
        },
        { question: "Alfalah Floating Term Deposit", openModal: true },
        { question: "Alfalah FCY Term Deposit", openModal: true },
        {
          question: "Alfalah Care Senior Citizen Mahana Amdan Account",
          openModal: true,
        },
      ],
      "Alfalah at Work": [
        { question: "What are the product features of ALFALAH AT WORK?" },
        { question: "What is the eligibility criteria for ALFALAH AT WORK?" },
        { question: "What is ALFALAH AT WORK?" },
      ],
      "Roshan Digital Account (for NRPs)": [
        {
          question:
            "What are the product features of Conventional banking ROSHAN DIGITAL ACCOUNT (FOR NRPS)?",
        },
        {
          question:
            "What is the eligibility criteria for Conventional banking ROSHAN DIGITAL ACCOUNT (FOR NRPS)?",
        },
        {
          question:
            "What is Conventional banking ROSHAN DIGITAL ACCOUNT (FOR NRPS)?",
        },
        {
          question:
            "What is the account type and which currencies are available in the Conventional banking ROSHAN DIGITAL ACCOUNT (FOR NRPS)?",
        },
      ],
      "Alfalah RAPID": [
        {
          question:
            "What are the product features of Conventional banking ALFALAH RAPID?",
        },
        {
          question:
            "What is the eligibility criteria for Conventional banking ALFALAH RAPID?",
        },
        { question: "What is Conventional banking ALFALAH RAPID?" },
        {
          question:
            "What services can be availed through Conventional banking Alfalah RAPID?",
        },
      ],
      "Asaan Roshan Digital Account": [
        {
          question:
            "What are the product features of Conventional banking ASAAN ROSHAN DIGITAL ACCOUNT?",
        },
        {
          question:
            "What is the eligibility criteria for Conventional banking ASAAN ROSHAN DIGITAL ACCOUNT?",
        },
        {
          question:
            "What is Conventional banking ASAAN ROSHAN DIGITAL ACCOUNT?",
        },
        {
          question:
            "How different or simple is Conventional banking Alfalah Asaan Roshan Digital Account opening process?",
        },
      ],

      "Islamic Premier": [
        {
          question:
            "What are the product features of ALFALAH ISLAMIC PREMIER CARD?",
        },
        {
          question:
            "What is the Claim Amount limits for Accidental Death and Permanent Disability Takaful in ISLAMIC BANKING COMPLIMENTARY TAKAFUL COVERAGE?",
        },
        {
          question:
            "What are the product features for ZINDAGI PREMIER TAKAFUL SAVINGS (VITALITY) PLAN?",
        },
        {
          question:
            "What is the eligibility criteria for ISLAMIC PREMIER Account?",
        },
        {
          question:
            "What are the eligibility criteria for ALFALAH ISLAMIC PREMIER CARD?",
        },
      ],
      "Alfalah Islamic Premier Card": [
        {
          question:
            "What are the product features of ALFALAH ISLAMIC PREMIER CARD?",
        },
        {
          question:
            "What is the eligibility criteria for ISLAMIC PREMIER Account?",
        },
        {
          question:
            "What are the eligibility criteria for ALFALAH ISLAMIC PREMIER CARD?",
        },
      ],
      "Complimentary Takaful Coverage": [
        {
          question:
            "What is the Claim Amount limits for Accidental Death and Permanent Disability Takaful in ISLAMIC BANKING COMPLIMENTARY TAKAFUL COVERAGE?",
        },
      ],
      "Zindagi Premier Takaful Savings (Vitality) Plan": [
        {
          question:
            "What are the product features for ZINDAGI PREMIER TAKAFUL SAVINGS (VITALITY) PLAN?",
        },
      ],
      "Customer OnBoarding": [
        {
          question:
            "What are the different types of Bank Alfalah Islamic Banking Current Accounts?",
        },
        {
          question:
            "What are the different types of Bank Alfalah Islamic Banking Saving Accounts?",
        },
        {
          question:
            "What are the account related deliverables for Bank Alfalah Islamic Banking?",
        },
        {
          question:
            "What are the BASIC DOCUMENTATION REQUIRED FOR ACCOUNT OPENING for Salaried Accounts?",
        },
      ],
      Documentation: [
        {
          question:
            "What are the different types of Bank Alfalah Islamic Banking Current Accounts?",
        },
        {
          question:
            "What are the different types of Bank Alfalah Islamic Banking Saving Accounts?",
        },
        {
          question:
            "What are the account related deliverables for Bank Alfalah Islamic Banking?",
        },
        {
          question:
            "What are the BASIC DOCUMENTATION REQUIRED FOR ACCOUNT OPENING for Salaried Accounts?",
        },
      ],
      "Islamic Current Account": [
        {
          question: "Alfalah Islamic Foreign Currency Current Account",
          openModal: true,
        },
        { question: "Alfalah Islamic Asaan Current Account", openModal: true },
        { question: "Alfalah Islamic Current Account", openModal: true },
        { question: "Alfalah Basic Banking account", openModal: true },
        {
          question:
            "Alfalah Islamic Business Way Deposit and Payroll Remunerative Current Account",
          openModal: true,
        },
        {
          question: "Alfalah Islamic Asaan Remittance Current Account",
          openModal: true,
        },
      ],
      "Islamic Saving Account": [
        { question: "Falah Business Account", openModal: true },
        {
          question: "Alfalah Islamic Foreign Currency Savings Account",
          openModal: true,
        },
        { question: "Falah Mahana Amdani Account", openModal: true },
        {
          question: "Alfalah Islamic Musharakah Savings Account",
          openModal: true,
        },
        { question: "Falah Classic Savings Account", openModal: true },
        { question: "Alfalah Islamic Profex Saving Account", openModal: true },
        { question: "Falah Senior Citizens Savings Account", openModal: true },
        {
          question: "Alfalah Islamic Asaan Remittance Savings Account",
          openModal: true,
        },
        { question: "Alfalah Islamic Asaan Saving Account", openModal: true },
      ],
      "Islamic Term Deposit": [
        {
          question: "Alfalah Islamic Foreign Currency Term Deposit",
          openModal: true,
        },
        {
          question: "Alfalah Islamic Premium Term Deposit- Monthly",
          openModal: true,
        },
        {
          question: "Alfalah Islamic Premium Term Deposit – Bullet Maturity",
          openModal: true,
        },
        { question: "Falah Mahana Munafa Term Deposit", openModal: true },
        { question: "Falah Term Deposit", openModal: true },
        {
          question: "Alfalah Islamic Recurring Value Deposit",
          openModal: true,
        },
        {
          question: "Falah 3 Year Term Deposit (Monthly Income Certificate)",
          openModal: true,
        },
        { question: "Falah Senior Citizens Term Deposit", openModal: true },
        { question: "Target Saving Deposit", openModal: true },
      ],
      "Islamic Roshan Digital Account (FOR NRPS)": [
        { question: "What is Roshan Digital Account?" },
        { question: "How can individuals apply for Roshan Digital Accounts?" },
        {
          question:
            "What is the account type and currencies available in Roshan Digital Account?",
        },
        {
          question:
            "What is a Mudarabah-based account and why is Bank Alfalah Islamic’s Roshan Digital Savings Account, a Mudarabah-based account?",
        },
      ],
      "Asaan Roshan Digital Account(for Islamic)": [
        {
          question: "What is an Alfalah Asaan Islamic Roshan Digital Account?",
        },
        {
          question:
            "What are the product features of Alfalah Asaan Islamic Roshan Digital Account?",
        },
        {
          question:
            "How different or simple is Alfalah Asaan Islamic Roshan Digital Account opening process?",
        },
      ],
      "Islamic Roshan Digital Business Account": [
        {
          question:
            "What are the documentation required for ISLAMIC ROSHAN DIGITAL BUSINESS ACCOUNT?",
        },
      ],
      Conventional: [
        { question: "What are different variants of CREDIT CARD?" },
        {
          question:
            "What are the documentation required for Alfalah Platinum credit cards?",
        },
        { question: "What is the minimum limit for all credit cards?" },
        {
          question: "How much loan facility can I avail for Alfalah Auto Loan?",
        },
        { question: "What is the period of the Alfalah Auto Loan?" },
        {
          question:
            "How is Alfalah Auto Loan different from other financing schemes available in Pakistan?",
        },
        { question: "What are different variants of DEBIT CARD?" },
        {
          question:
            "What are the documentation required for Alfalah Platinum DEBIT CARD?",
        },
        { question: "What is the minimum limit for all DEBIT CARD?" },
      ],
      "Credit Card": [
        { question: "What are different variants of CREDIT CARD?" },
        {
          question:
            "What are the documentation required for Alfalah Platinum credit cards?",
        },
        { question: "What is the minimum limit for all credit cards?" },
      ],
      "Auto Loan": [
        {
          question: "How much loan facility can I avail for Alfalah Auto Loan?",
        },
        { question: "What is the period of the Alfalah Auto Loan?" },
        {
          question:
            "How is Alfalah Auto Loan different from other financing schemes available in Pakistan?",
        },
      ],
      "Debit Card": [
        { question: "What are different variants of DEBIT CARD?" },
        // { question: "What are the documentation required for Alfalah Platinum DEBIT CARD?" },
        { question: "What is the minimum limit for all DEBIT CARD?" },
      ],
      Islamic: [
        { question: "What is Alfalah Car Ijarah?" },
        { question: "How is Alfalah Car Ijarah interest free?" },
        { question: "What is the Takaful arrangement in Alfalah Car Ijarah?" },
        { question: "What is Takaful or Islamic Insurance?" },
        { question: "What are the different segments for HOME MUSHARAKA?" },
        { question: "What should be property age for the HOME MUSHARAKA?" },
        {
          question:
            "What is the Maximum financing for Category 1 in HOME MUSHARAKA?",
        },
        {
          question:
            "What are the documentation required for HOME MUSHARAKA if I am a Salaried Person?",
        },
        {
          question:
            "What are the different product types for ISLAMIC ROSHAN APNI CAR?",
        },
        {
          question:
            "What are the eligibility criteria for ISLAMIC ROSHAN APNI CAR?",
        },
        {
          question:
            "What are the documentation required for ISLAMIC ROSHAN APNI CAR?",
        },
        {
          question:
            "What is the registration process for ISLAMIC ROSHAN APNI CAR?",
        },
      ],
      "Car Ijarah": [
        { question: "What is Alfalah Car Ijarah?" },
        { question: "How is Alfalah Car Ijarah interest free?" },
        { question: "What is the Takaful arrangement in Alfalah Car Ijarah?" },
        { question: "What is Takaful or Islamic Insurance?" },
      ],
      "Home Musharaka": [
        { question: "What are the different segments for HOME MUSHARAKA?" },
        { question: "What should be property age for the HOME MUSHARAKA?" },
        {
          question:
            "What is the Maximum financing for Category 1 in HOME MUSHARAKA?",
        },
        {
          question:
            "What are the documentation required for HOME MUSHARAKA if I am a Salaried Person?",
        },
      ],
      "Islamic Roshan Apni Car": [
        {
          question:
            "What are the different product types for ISLAMIC ROSHAN APNI CAR?",
        },
        {
          question:
            "What are the eligibility criteria for ISLAMIC ROSHAN APNI CAR?",
        },
        {
          question:
            "What are the documentation required for ISLAMIC ROSHAN APNI CAR?",
        },
        {
          question:
            "What is the registration process for ISLAMIC ROSHAN APNI CAR?",
        },
      ],
    };

    const selectedQuestions = questionsMap[option] || [];
    setQuestions(selectedQuestions);
  }

  const setMinimizeText = () => {
    setMinimize(true);
  };

  // console.log(minimize);

  // ]

  return (
    <>
      <div className="lg:p-[2rem]  absolute z-30 w-full ">
        <header className="flex justify-between w-[100%] items-center lg:pb-7 lg:pt-0 py-4 px-4 max-md:flex-col">
          <div className="flex gap-2 items-center">
            <img
              src={Logo}
              alt="logo"
              className="lg:w-[2.468rem] w-5 h-5 lg:h-[2.101rem]"
            />
            {/* <img
              src={bflLogo}
              alt="logo"
              className="lg:w-[2.468rem] w-5 h-5 lg:h-[2.101rem]"
            /> */}
            <h3 className="text-h-color lg:text-[2.106rem]  font-semibold cursor-pointer" onClick={navigateToDefaultPath} style={{fontFamily:"lekton"}}>
              App Pilot
            </h3>
          </div>
          <div className="flex items-center gap-4 ">
            {/* Select Avatar :  */}
            <CustomModal buttonName={"Select Avatar"} />
            {/* <select
              onChange={(e) => avatarHandleChange(e.target.value)}
              value={showAvatar}
              className="p-1  lg:w-[6rem] w-[5rem] rounded-[5px] bg-bg-avatar text-white text-center"
            >
              <option
                value="black"
                className="text-btn-color bg-bg-primary rounded-lg"
              >
                Black
              </option>
              <option value="black-noscarf" className="text-btn-color bg-bg-primary">
                Black 2
              </option>
              <option value="red" className="text-btn-color bg-bg-primary">
                Red
              </option>
            </select> */}
            {isMuted ? (
              <button
                onClick={toggleVolume}
                className={`text-white bg-btn-color lg:w-[37px] w-[30px] h-[30px] lg:h-[37px] rounded-full font-semibold
                            ${loading ? "cursor-not-allowed opacity-30" : ""}`}
              >
                <FontAwesomeIcon icon={faVolumeHigh} />
              </button>
            ) : (
              <button
                onClick={toggleVolume}
                className={`text-white bg-btn-color lg:w-[37px] w-[30px] h-[30px] lg:h-[37px] rounded-full font-semibold
                            ${loading ? "cursor-not-allowed opacity-30" : ""}`}
              >
                <FontAwesomeIcon icon={faVolumeXmark} />
              </button>
            )}

            <select
              onChange={(e) => languageHandleChange(e.target.value)}
              value={selectLanguage}
              className=" lg:w-[6.688rem] p-2 w-[5rem]  rounded-[20px] bg-[#1572c2] text-white font-semibold"
            >
              <option
                className="text-btn-color bg-bg-primary rounded-lg"
                value={"en"}
              >
                English
              </option>
              <option className="text-btn-color bg-bg-primary" value={"ur"}>
                Urdu
              </option>
              <option className="text-btn-color bg-bg-primary" value={"ar"}>
                Arabic
              </option>
            </select>
          </div>
        </header>

        {/* Banking Options */}
        {/* <div className="bg-[#ffffff] rounded-3xl lg:pb-7 lg:pt-0 py-4 items-center h-auto mb-7 flex justify-center">
          <div
            className="flex flex-row space-x-20 mt-8 max-md:mt-0  max-md:flex-col max-md:items-start max-md:text-center"
            ref={dropdownRef}
          >
            {bankingOptions.map((option, index) => (
              <div
                key={index}
                className={`relative  ${
                  option.isOpen ? "text-[#000] z-10 " : ""
                }`}
              >
                <span
                  className={`text-lg font-semibold cursor-pointer ${
                    option.isOpen ? "text-[#ee1d23]" : ""
                  }`}
                  onClick={() => {
                    toggleDropdown(index);
                    setModalContent("");
                    setMyContent(false);
                    setFloatingButton(false);
                    setMinimize(false);
                  }}
                >
                  {option.label}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-lg ml-2 ${
                      option.isOpen ? "transform rotate-180 text-[#ee1d23]" : ""
                    }`}
                  />
                </span>

                {option.isOpen && (
                  <div className="absolute top-full left-0 mt-3 bg-white rounded-lg shadow-lg p-4 w-[500%] h-[1000%] flex overflow-y-scroll">
                    <ul className="w-1/3 p-2">
                      <li className="mb-4 text-[#ff5555] font-inter font-semibold text-lg cursor-pointer">
                        {option.firstHeading}
                      </li>
                      {option.options.map((list, listIndex) => (
                        <ul key={listIndex}>
                          {list.map((item, itemIndex) => (
                            <li
                              onClick={() => {
                                handleOptionSelection(item);
                                setNavAddrSmall(item);
                                setNavAddr(option.label);
                              }}
                              key={itemIndex}
                              className="mb-4 rounded-md hover:bg-[#f8a5a7] hover:text-[red] p-2 cursor-pointer"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ))}
                    </ul>

                    <ul className="w-1/3 p-2">
                      <li className="mb-4 text-[#ff5555] font-inter font-semibold text-lg cursor-pointer">
                        {option.secondHeading}
                      </li>
                      {option.secondOptions.map((list, listIndex) => (
                        <ul key={listIndex}>
                          {list.map((item, itemIndex) => (
                            <li
                              onClick={() => {
                                handleOptionSelection(item);
                                setNavAddrSmall(item);
                                setNavAddr(option.label);
                              }}
                              key={itemIndex}
                              className="mb-4 rounded-md hover:bg-[#f8a5a7] hover:text-[red] p-2 cursor-pointer"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ))}
                    </ul>
                    <ul className="w-1/3 p-2">
                      <li className="mb-4 text-[#ff5555] font-inter font-semibold text-lg cursor-pointer">
                        {option.thirdHeading}
                      </li>
                      {option.thirdOptions.map((list, listIndex) => (
                        <ul key={listIndex}>
                          {list.map((item, itemIndex) => (
                            <li
                              onClick={() => {
                                handleOptionSelection(item);
                                setNavAddrSmall(item);
                                setNavAddr(option.label);
                              }}
                              key={itemIndex}
                              className="mb-4 rounded-md hover:bg-[#f8a5a7] hover:text-[red] p-2 cursor-pointer"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* main dashboard css */}
        <div className="flex justify-between w-[100%]">
          <div className=" hidden lg:block">
            <SideBar
              sendMessage={sendMessage}
              questions={questions}
              specialQuestions={specialQuestions}
              handleQuestionClick={handleQuestionClick}
              navAddr={navAddr}
              navAddrSmall={navAddrSmall}
            />
          </div>

          <div className="  lg:w-[100%] w-full">
            {!minimize ? (
              <ChatHistory
                specialQuestions={specialQuestions}
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
                handleQuestionClick={handleQuestionClick}
                setQuestions={setQuestions}
                setNavAddr={setNavAddr}
                setNavAddrSmall={setNavAddrSmall}
                MinimizeFunction={setMinimizeText}
              />
            ) : (
              <StaticData />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainUi;
