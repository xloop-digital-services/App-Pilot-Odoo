// ATIQUE BHAI YEH STREAMING RESPONSE K LYE HE......................................

import { createContext, useContext, useState } from "react";
import { stopAudio } from "../components/AudioService";

const backendUrl = "http://13.234.218.130:8003";
// const backendUrl = "https://8nz0tgsd-8003.asse.devtunnels.ms";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState("en");
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const [micOn, setMicOn] = useState(false);
  const [animation, setAnimation] = useState("Idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalContent, setModalContent] = useState("");
  const [myContent, setMyContent] = useState(false);
  const [showAvatar, setShowAvatar] = useState("avatar-fgenz");
  const [floatingButton, setFloatingButton] = useState(false);
  const [minimize, setMinimize] = useState(false);
  const [navAddr, setNavAddr] = useState("");
  const [navAddrSmall, setNavAddrSmall] = useState("");
  const [showAddr, setShowAddr] = useState(false);
  const [streamingData, setStreamingData] = useState("");
  const [journey, setJourney] = useState("");

  const [receivedData, setReceivedData] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "How to load a mobile package via a banking app",
      openModal: true,
    },
    {
      question:
        "How to online apply for a new cheque book using Bank Alfalah Alfa App",
      openModal: true,
    },
    { question: "How to register for Bank Alfalah App", openModal: true },
    {
      question: "How to Open Bank Alfalah Roshan Digital Account Online",
      openModal: true,
    },
    { question: "How to create Alfa Savings Account", openModal: true },
    {
      question: "How to do INSTANT REGISTRATION TO ALFALAH INTERNET BANKING",
      openModal: true,
    },
    { question: "How to activate a credit card", openModal: true },
    { question: "How to activate Debit Card via WhatsApp", openModal: true },
    { question: "How to view eStatement", openModal: true },
  ]);

  const navigateToDefaultPath = () => {
    setQuestions([
      {
        question: "How to load a mobile package via a banking app?",
        openModal: true,
      },
      {
        question:
          "How to online apply for a new cheque book using Bank Alfalah Alfa App?",
        openModal: true,
      },
      { question: "How to register for Bank Alfalah App?", openModal: true },
      {
        question: "How to Open Bank Alfalah Roshan Digital Account Online?",
        openModal: true,
      },
      { question: "How to create Alfa Savings Account?", openModal: true },
      {
        question: "How to do INSTANT REGISTRATION TO ALFALAH INTERNET BANKING?",
        openModal: true,
      },
      { question: "How to activate a credit card?", openModal: true },
      { question: "How to activate Debit Card via WhatsApp?", openModal: true },
      { question: "How to view e-statement?", openModal: true },
    ]);
    setMessages([]);
    setMyContent(false);
    setNavAddr("");
    setNavAddrSmall("");
    stopAudio();
  };

  const chat = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
    setLoading(true);
    setStreamingData("");

    try {
      const response = await fetch(
        `${backendUrl}/stream/${encodeURIComponent(message)}`
      );

      const reader = response.body.getReader();
      let receivedData = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        receivedData += chunk;

        // Update the last message with the new chunk
        setMessages((prevMessages) => {
          const lastMessageIndex = prevMessages.length - 1;
          const lastMessage = prevMessages[lastMessageIndex];

          // Check if the last message is from the receiver
          if (lastMessage && lastMessage.sender === "receiver") {
            const newMessages = [...prevMessages];
            newMessages[lastMessageIndex] = {
              ...lastMessage,
              text: lastMessage.text + chunk,
            };
            return newMessages;
          } else {
            // Add a new message if it's the first response chunk
            return [...prevMessages, { text: chunk, sender: "receiver" }];
          }
        });

        setStreamingData((prev) => prev + chunk);
      }
      setReceivedData(receivedData);
      console.log("Final receivedData:", receivedData);
      const isJourneyResponse = await fetch(
        `${backendUrl}/is_journey`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: receivedData })
        }
      );
      const isJourneyData = await isJourneyResponse.json();
      setJourney(isJourneyData);
      
      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        receivedData,
        currentIndex,
        setCurrentIndex,
        selectLanguage,
        setSelectLanguage,
        chat,
        loading,
        setLoading,
        micOn,
        setMicOn,
        cameraZoomed,
        setCameraZoomed,
        messages,
        animation,
        setAnimation,
        modalContent,
        setModalContent,
        myContent,
        setMyContent,
        setMessages,
        showAvatar,
        setShowAvatar,
        floatingButton,
        setFloatingButton,
        minimize,
        setMinimize,
        navAddr,
        setNavAddr,
        navAddrSmall,
        setNavAddrSmall,
        showAddr,
        setShowAddr,
        questions,
        setQuestions,
        navigateToDefaultPath,
        journey,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
