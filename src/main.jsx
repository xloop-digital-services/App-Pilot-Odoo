import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChatProvider } from "./hooks/useChat";
import "./index.css";
import { MuteProvider } from "./components/Avatar2";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ChatProvider>
        <MuteProvider>
            <App />
        </MuteProvider>
      </ChatProvider>
  </React.StrictMode>
);
