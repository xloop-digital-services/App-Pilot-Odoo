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

  const [loadingAudio, setLoadingAudio] = useState(false);

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
    { question: "How to view e-statement", openModal: true },
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
      // Fetch data from the streaming endpoint
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
        // console.log(receivedData);
  
        // Update the last message with the new chunk
        setMessages((prevMessages) => {
          const lastMessageIndex = prevMessages.length - 1;
          const lastMessage = prevMessages[lastMessageIndex];
  
          if (lastMessage && lastMessage.sender === "receiver") {
            const newMessages = [...prevMessages];
            newMessages[lastMessageIndex] = {
              ...lastMessage,
              text: lastMessage.text + chunk,
            };
            return newMessages;
          } else {
            return [...prevMessages, { text: chunk, sender: "receiver" }];
          }
        });
  
        setStreamingData((prev) => prev + chunk);
      }
  
      // Now that all data is received, call the /is_journey endpoint
      console.log("Final receivedData:", receivedData);
      console.log("Sending request to /is_journey with data:", receivedData);
  
      const isJourneyResponse = await fetch(`${backendUrl}/is_journey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: receivedData }),
      });
  
      const isJourneyData = await isJourneyResponse.json();
      setJourney(isJourneyData);
      console.log("journey", isJourneyData);
  
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  


  const playAudio = async (text) => {
    setLoadingAudio(true);

    try {
      // Create the POST request to send the text
      const response = await fetch(`${backendUrl}/voice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }), // Send the text in the request body
      });

      if (!response.ok) {
        console.error("Error fetching audio:", response.statusText);
        setLoadingAudio(false);
        console.log("Atique audio console yaha he");
        return;
      }

      const data = await response.json();
      const audioData = data.audio; // Assuming the backend returns the audio data in base64 format

      if (!audioData) {
        console.error("No audio data returned");
        setLoadingAudio(false);
        return;
      }

      // Convert the base64 audio data to a Blob
      const byteCharacters = atob(audioData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const audioBlob = new Blob([byteArray], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Play the audio
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
    setLoadingAudio(false);
  };

  return (
    <ChatContext.Provider
      value={{
        playAudio,
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
