import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import App from "./App";
import LandingPage from "./components/main-ui/landingpage/LandingPage";
import { ChatProvider } from "./hooks/useChat";
import { MuteProvider } from "./components/Avatar2";
import Login from "./components/main-ui/Login";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute";

const Root = () => (
  <React.StrictMode>
    <Router>
      <ChatProvider>
        <MuteProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/landing-page"
              element={
                <PrivateRoute>
                  <LandingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/app-pilot"
              element={
                <PrivateRoute>
                  <App />
                </PrivateRoute>
              }
            />
          </Routes>
        </MuteProvider>
      </ChatProvider>
    </Router>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
