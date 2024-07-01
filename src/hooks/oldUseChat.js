// OLD USECHAT BY HUNAID......................

// import { createContext, useContext, useEffect, useState } from "react";
// import { stopAudio } from "../components/AudioService";

// // const backendUrl = "https://chatbot-new-yv3usc4lcq-de.a.run.app";
// const backendUrl = "http://43.205.98.215:8000";

// const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [selectLanguage, setSelectLanguage] = useState("en");
//   const [cameraZoomed, setCameraZoomed] = useState(true);
//   const [micOn, setMicOn] = useState(false);
//   const [animation, setAnimation] = useState("Idle");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [modalContent, setModalContent] = useState("");
//   const [myContent, setMyContent] = useState(false);
//   const [showAvatar, setShowAvatar] = useState("avatar-fgenz");
//   const [floatingButton, setFloatingButton] = useState(false);
//   const [minimize, setMinimize] = useState(false);
//   const [navAddr, setNavAddr] = useState("");
//   const [navAddrSmall, setNavAddrSmall] = useState("");
//   const [showAddr, setShowAddr] = useState(false);
//   const [questions, setQuestions] = useState([
//     {
//       question: "How to load a mobile package via a banking app?",
//       openModal: true,
//     },
//     {
//       question:
//         "How to online apply for a new cheque book using Bank Alfalah Alfa App?",
//       openModal: true,
//     },
//     {
//       question: "How to register for Bank Alfalah App?",
//       openModal: true,
//     },
//     {
//       question: "How to Open Bank Alfalah Roshan Digital Account Online?",
//       openModal: true,
//     },
//     {
//       question: "How to create Alfa Savings Account?",
//       openModal: true,
//     },
//     {
//       question: "How to do INSTANT REGISTRATION TO ALFALAH INTERNET BANKING?",
//       openModal: true,
//     },
//     {
//       question: "How to activate a credit card?",
//       openModal: true,
//     },
//     {
//       question: "How to activate Debit Card via WhatsApp?",
//       openModal: true,
//     },
//     {
//       question: "How to view e-statement?",
//       openModal: true,
//     },
//   ]);

//   const navigateToDefaultPath = () => {
//     const defaultQuestions = [
//       {
//         question: "How to load a mobile package via a banking app?",
//         openModal: true,
//       },
//       {
//         question:
//           "How to online apply for a new cheque book using Bank Alfalah Alfa App?",
//         openModal: true,
//       },
//       {
//         question: "How to register for Bank Alfalah App?",
//         openModal: true,
//       },
//       {
//         question: "How to Open Bank Alfalah Roshan Digital Account Online?",
//         openModal: true,
//       },
//       {
//         question: "How to create Alfa Savings Account?",
//         openModal: true,
//       },
//       {
//         question: "How to do INSTANT REGISTRATION TO ALFALAH INTERNET BANKING?",
//         openModal: true,
//       },
//       {
//         question: "How to activate a credit card?",
//         openModal: true,
//       },
//       {
//         question: "How to activate Debit Card via WhatsApp?",
//         openModal: true,
//       },
//       {
//         question: "How to view e-statement?",
//         openModal: true,
//       },
//     ];

//     setQuestions(defaultQuestions);
//     setMessages([]);
//     setMyContent(false);
//     setNavAddr("");
//     setNavAddrSmall("");
//     stopAudio();
//   };

//   const chat = async (message) => {
//     setMessages([...messages, { text: message, sender: "user" }]);
//     console.log("message given to chat func", message);
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `${backendUrl}/query_response/${encodeURIComponent(
//           message
//         )}/${selectLanguage}`
//       );
//       const result = await response.json();
//       console.log("result by useChat", result);

//       if (result.data.length > 1) {
//         setCurrentIndex(0);
//         const list =
//           selectLanguage === "en" ? [...result.data] : [...result.translate];

//         setMessages((prevmsg) => [...prevmsg, { type: "list", list }]);
//       } else {
//         const myData =
//           selectLanguage === "en"
//             ? [{ ...result.data, is_journey: result.is_journey }]
//             : [{ ...result.translate, is_journey: result.is_journey }];
//         console.log(myData, "inner data");
//         setMessages((prevmsg) => [...prevmsg, myData[0]]);
//       }

//       setMessage(result);
//       setLoading(false);
//       // setMicOn(false);
//       console.log("data comes from response in mainUI", messages);
//     } catch (err) {
//       console.log("errOr", err);
//       setMessages((prev) => [
//         ...prev,
//         { text: "Please check your network.", sender: "receiver" },
//       ]);
//       setLoading(false);
//     }

//     // setTimeout(()=>{
//     //   setMessages( prevmsg=> [ ...prevmsg, { text: 'Sorry! We are under development...', sender: 'receiver' } ]);
//     //   setLoading(false);
//     // }, 2000)

//     // const resp = (await data.json()).messages;
//     // setMessages((messages) => [...messages, ...resp]);
//     // setLoading(false);
//   };

//   const onMessagePlayed = () => {
//     setMessage(null);
//   };

//   useEffect(() => {
//     if (message) {
//       // console.log(message, 'innser message')
//       setMessage((prev) => prev);
//     } else {
//       setMessage(null);
//     }
//   }, [message]);

//   // console.log("data comes from response in mainUI2",messages[1]);
//   // console.log("Image URL:", messages[1]?.list[0]?.image);

//   return (
//     <ChatContext.Provider
//       value={{
//         currentIndex,
//         setCurrentIndex,
//         selectLanguage,
//         setSelectLanguage,
//         chat,
//         message,
//         setMessage,
//         onMessagePlayed,
//         loading,
//         setLoading,
//         micOn,
//         setMicOn,
//         cameraZoomed,
//         setCameraZoomed,
//         messages,
//         animation,
//         setAnimation,
//         modalContent,
//         setModalContent,
//         myContent,
//         setMyContent,
//         setMessages,
//         showAvatar,
//         setShowAvatar,
//         floatingButton,
//         setFloatingButton,
//         minimize,
//         setMinimize,
//         navAddr,
//         setNavAddr,
//         navAddrSmall,
//         setNavAddrSmall,
//         questions,
//         setQuestions,
//         showAddr,
//         setShowAddr,
//         navigateToDefaultPath
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => {
//   const context = useContext(ChatContext);
//   if (!context) {
//     throw new Error("useChat must be used within a ChatProvider");
//   }
//   return context;
// };

// ATIQUE BHAI YEH STREAMING RESPONSE K LYE HE......................................

// import { createContext, useContext, useState } from "react";
// import { stopAudio } from "../components/AudioService";

// const backendUrl = "https://1j2gvgq1-8002.asse.devtunnels.ms";

// const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectLanguage, setSelectLanguage] = useState("en");
//   const [cameraZoomed, setCameraZoomed] = useState(true);
//   const [micOn, setMicOn] = useState(false);
//   const [animation, setAnimation] = useState("Idle");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [modalContent, setModalContent] = useState("");
//   const [myContent, setMyContent] = useState(false);
//   const [showAvatar, setShowAvatar] = useState("avatar-fgenz");
//   const [floatingButton, setFloatingButton] = useState(false);
//   const [minimize, setMinimize] = useState(false);
//   const [navAddr, setNavAddr] = useState("");
//   const [navAddrSmall, setNavAddrSmall] = useState("");
//   const [showAddr, setShowAddr] = useState(false);
//   const [streamingData, setStreamingData] = useState("");

//   const [questions, setQuestions] = useState([
//     {
//       question: "How to load a mobile package via a banking app?",
//       openModal: true,
//     },
//     {
//       question:
//         "How to online apply for a new cheque book using Bank Alfalah Alfa App?",
//       openModal: true,
//     },
//     { question: "How to register for Bank Alfalah App?", openModal: true },
//     {
//       question: "How to Open Bank Alfalah Roshan Digital Account Online?",
//       openModal: true,
//     },
//     { question: "How to create Alfa Savings Account?", openModal: true },
//     {
//       question: "How to do INSTANT REGISTRATION TO ALFALAH INTERNET BANKING?",
//       openModal: true,
//     },
//     { question: "How to activate a credit card?", openModal: true },
//     { question: "How to activate Debit Card via WhatsApp?", openModal: true },
//     { question: "How to view e-statement?", openModal: true },
//   ]);

//   const navigateToDefaultPath = () => {
//     setQuestions([
//       {
//         question: "How to load a mobile package via a banking app?",
//         openModal: true,
//       },
//       {
//         question:
//           "How to online apply for a new cheque book using Bank Alfalah Alfa App?",
//         openModal: true,
//       },
//       { question: "How to register for Bank Alfalah App?", openModal: true },
//       {
//         question: "How to Open Bank Alfalah Roshan Digital Account Online?",
//         openModal: true,
//       },
//       { question: "How to create Alfa Savings Account?", openModal: true },
//       {
//         question: "How to do INSTANT REGISTRATION TO ALFALAH INTERNET BANKING?",
//         openModal: true,
//       },
//       { question: "How to activate a credit card?", openModal: true },
//       { question: "How to activate Debit Card via WhatsApp?", openModal: true },
//       { question: "How to view e-statement?", openModal: true },
//     ]);
//     setMessages([]);
//     setMyContent(false);
//     setNavAddr("");
//     setNavAddrSmall("");
//     stopAudio();
//   };

//   const chat = async (message) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: message, sender: "user" },
//     ]);
//     setLoading(true);
//     setStreamingData("");

//     try {
//       const response = await fetch(
//         `${backendUrl}/stream/${encodeURIComponent(message)}`
//       );

//       // if (response.headers.get("content-type").includes("text/event-stream")) {
//       const reader = response.body.getReader();
//       let receivedData = "";
//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         const chunk = new TextDecoder().decode(value);
//         receivedData += chunk;

//         // Update the last message with the new chunk
//         setMessages((prevMessages) => {
//           const newMessages = [...prevMessages];
//           if (
//             newMessages.length > 0 &&
//             newMessages[newMessages.length - 1].sender === "receiver"
//           ) {
//             newMessages[newMessages.length - 1].text += chunk;
//           } else {
//             newMessages.push({ text: chunk, sender: "receiver" });
//           }
//           return newMessages;
//         });

//         setStreamingData((prev) => prev + chunk);
//       }

//       console.log("Final receivedData:", receivedData);

//       setLoading(false);
//     } catch (err) {
//       console.error("Error:", err);
//       setLoading(false);
//     }
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         currentIndex,
//         setCurrentIndex,
//         selectLanguage,
//         setSelectLanguage,
//         chat,
//         loading,
//         setLoading,
//         micOn,
//         setMicOn,
//         cameraZoomed,
//         setCameraZoomed,
//         messages,
//         animation,
//         setAnimation,
//         modalContent,
//         setModalContent,
//         myContent,
//         setMyContent,
//         setMessages,
//         showAvatar,
//         setShowAvatar,
//         floatingButton,
//         setFloatingButton,
//         minimize,
//         setMinimize,
//         navAddr,
//         setNavAddr,
//         navAddrSmall,
//         setNavAddrSmall,
//         showAddr,
//         setShowAddr,
//         questions,
//         setQuestions,
//         navigateToDefaultPath,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => {
//   const context = useContext(ChatContext);
//   if (!context) {
//     throw new Error("useChat must be used within a ChatProvider");
//   }
//   return context;
// };
