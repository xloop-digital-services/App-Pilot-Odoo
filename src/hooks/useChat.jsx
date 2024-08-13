// ATIQUE BHAI YEH STREAMING RESPONSE K LYE HE......................................

import { createContext, useContext, useState } from "react";
import { stopAudio } from "../components/AudioService";
import LimitReachedModal from "../components/LimitReachedModal";

// const backendUrl = "https://8nz0tgsd-8003.asse.devtunnels.ms/stream";
const backendUrl = "http://13.234.218.130:8000";

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
      question: "Tell me about IFL.",
      openModal: true,
    },
    {
      question: "How is the allocation of laptops determined",
      openModal: true,
    },
    { question: "Which employees are entitled to laptops, and how is this decided?", openModal: true },
    {
      question: "Can employees have both a Desktop PC and a Laptop?",
      openModal: true,
    },
    { question: "What is the useful life of a laptop, and what happens after it expires?", openModal: true },
  ]);

  const [showLimitModal, setShowLimitModal] = useState(false);
  const handleCloseModal = () => {
    setShowLimitModal(false);
    window.location.reload();
  };

  const navigateToDefaultPath = () => {
    setQuestions([
      {
        question: "Tell me about IFL.",
        openModal: true,
      },
      {
        question: "How is the allocation of laptops determined",
        openModal: true,
      },
      { question: "Which employees are entitled to laptops, and how is this decided?", openModal: true },
      {
        question: "Can employees have both a Desktop PC and a Laptop?",
        openModal: true,
      },
      { question: "What is the useful life of a laptop, and what happens after it expires?", openModal: true },
    ]);
    setMessages([]);
    setMyContent(false);
    setNavAddr("");
    setNavAddrSmall("");
    stopAudio();
  };

  const chat = async (message) => {

    const userId = localStorage.getItem('userId'); 
    console.log("userID ye aae he", userId);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
    setLoading(true);

    try {
      const response = await fetch(
        `${backendUrl}/stream/${userId}/${encodeURIComponent(message)}`
      );
      
      if (response.status === 429) {
        setShowLimitModal(true);
        setLoading(false);
        return;
      }
      

      const reader = response.body.getReader();
      let receivedData = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        receivedData += chunk;

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



  const playAudio = async (text) => {
    setLoadingAudio(true);

    try {
      // Create the POST request to send the text
      const response = await fetch(`${backendUrl}/voice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
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
      <LimitReachedModal
        show={showLimitModal}
        onClose={handleCloseModal}
        title="Limit Reached"
        message="You have tried too many times today."
      />
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
