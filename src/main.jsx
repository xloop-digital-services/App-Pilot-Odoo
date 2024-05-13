import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import App from "./App";
import LandingPage from "./components/main-ui/landingpage/LandingPage";
import { ChatProvider } from "./hooks/useChat";
import { MuteProvider } from "./components/Avatar2";
import "./index.css";

const Root = () => (
  <React.StrictMode>
    <Router>
      <ChatProvider>
        <MuteProvider>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/app-pilot" element={<App/>} />
          </Routes>
        </MuteProvider>
      </ChatProvider>
    </Router>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
