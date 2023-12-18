import { createContext, useContext, useEffect, useState } from "react";

const backendUrl = "https://s5v65tj8-8000.inc1.devtunnels.ms";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const chat = async (message) => {
    setMessages([ ...messages, { text: message, sender: 'user' } ]);
    console.log(message)
    setLoading(true);
    try{
      const response = await fetch(`${backendUrl}/query_response/${message}`);
      const result = await response.json();
      console.log(result);
  
      if(result.data.length > 1){
        setMessages( prevmsg=> [ ...prevmsg, { type: 'list', list: [...result.data]} ]);
      }
      else{
        setMessages( prevmsg=> [ ...prevmsg, ...result.data ]);
      }
      setMessage(result);
      setLoading(false);
    }
    catch(err){
      console.log(err)
      setMessages([ ...messages, { text: 'Please check your network.', sender: 'receiver' } ]);
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
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);

  const onMessagePlayed = () => {
    setMessage(null);
  };

  useEffect(() => {
    if (message) {
      console.log(message, 'innser message')
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
