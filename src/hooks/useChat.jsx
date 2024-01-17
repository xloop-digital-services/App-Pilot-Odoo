import { createContext, useContext, useEffect, useState } from "react";

const backendUrl = "https://chatbot-new-yv3usc4lcq-de.a.run.app";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const chat = async (message) => {
    setMessages([ ...messages, { text: message, sender: 'user' } ]);
    // console.log(message)
    setLoading(true);
    try{
      const response = await fetch(`${backendUrl}/query_response/${message}`);
      const result = await response.json();
      // console.log(result);
  
      if(result.data.length > 1){
        setMessages( prevmsg=> [ ...prevmsg, { type: 'list', list: [...result.data]} ]);
      }
      else{
        setMessages( prevmsg=> [ ...prevmsg, ...result.data ]);
      }
      setMessage(result);
      setLoading(false);
      setMicOn(false);
    }
    catch(err){
      console.log(err)
      setMessages(prev=> [ ...prev, { text: 'Please check your network.', sender: 'receiver' } ]);
      setLoading(false);
    }

    // setTimeout(()=>{
    //   setMessages( prevmsg=> [ ...prevmsg, { text: 'Sorry! We are under development...', sender: 'receiver' } ]);
    //   setLoading(false);
    // }, 2000)
    
    // const resp = (await data.json()).messages;
    // setMessages((messages) => [...messages, ...resp]);
    // setLoading(false);
  };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const [micOn, setMicOn] = useState(false);
  const [animation, setAnimation] = useState('Idle');

  const onMessagePlayed = () => {
    setMessage(null);
  };

  useEffect(() => {
    if (message) {
      // console.log(message, 'innser message')
      setMessage(prev=>  prev);
    } else {
      setMessage(null);
    }
  }, [message]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        setMessage,
        onMessagePlayed,
        loading,
        micOn,
        setMicOn,
        cameraZoomed,
        setCameraZoomed,
        messages,
        animation,
        setAnimation
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
