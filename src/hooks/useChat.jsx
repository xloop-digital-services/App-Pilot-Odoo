import { createContext, useContext, useEffect, useState } from "react";

const backendUrl = "http://localhost:3000";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const chat = async (message) => {
    setMessages([ ...messages, { text: message, sender: 'user' } ]);
    console.log(message)
    setLoading(true);
    // const data = await fetch(`${backendUrl}/chat`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ message }),
    // });

    setTimeout(()=>{
      setMessages( prevmsg=> [ ...prevmsg, { text: 'Sorry! We are under development...', sender: 'receiver' } ]);
      setLoading(false);
    }, 2000)
    
    // const resp = (await data.json()).messages;
    // setMessages((messages) => [...messages, ...resp]);
    // setLoading(false);
  };
  const [messages, setMessages] = useState([
    {
      text: 'How are you.',
      sender: 'user'
    },
    {
      text: 'I am good.',
      sender: 'receiver'
    }
  ]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
        messages
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
