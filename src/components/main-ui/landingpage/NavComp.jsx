import React, { useState } from "react";
import bg1 from "../../../assets/landingpage/bg1.png";
import { Link } from "react-router-dom";

export const NavComp = () => {
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };
  return (
    <section id="home">
      <div
        class="w-full pb-24 px-2"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
        }}
      >
        <ul class="flex items-center justify-evenly bg-gray-100  flex-wrap gap-10 text-white text-xl py-8 px-8">
          <li
            class="inline-block  font-semibold"
            style={{ fontFamily: "Lekton", fontSize:"40px" }}
          >
            App Pilot
          </li>
          <li>
            <button
              className={`mr-12 max-sm:mr-12 ${
                activeSection === "home" ? "active" : ""
              }`}
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>
            <button
              className={`mr-12 max-sm:mr-12 ${
                activeSection === "about" ? "active" : ""
              }`}
              onClick={() => scrollToSection("about")}
            >
              About Us
            </button>
            <button
              className={`mr-12 max-sm:mr-12 ${
                activeSection === "features" ? "active" : ""
              }`}
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>
            <button
              className={`mr-12 max-sm:mr-12 ${
                activeSection === "security" ? "active" : ""
              }`}
              onClick={() => scrollToSection("security")}
            >
              Security
            </button>
          </li>
          <li class="inline-block font-semibold text-lg">
            <button className="border rounded-lg p-4 px-11   ">
              <Link to="/app-pilot">Get Started</Link>
            </button>
          </li>
        </ul>
        <div className="d-flex flex-column flex-wrap items-center justify-center xl:ml-60 sm:justify-center mt-10 pb-10">
          <button className="text-bg-secondary font-semibold p-3 px-5 py-3 rounded-md mb-1 bg-[#2e2e2e] text-xl">
            Who We Are
          </button>
          <h1 className="text-6xl font-semibold text-white leading-snug tracking-wide">
            Welcome to App Pilot <br /> Your Personalized <br />
            Chatbot{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(238,29,35, 0.5), rgb(0, 0, 0,0))",
                color: "red",
              }}
            >
              Assistant
            </span>
          </h1>
          <p className="text-white mt-5 text-xl">
            An all-in-one platform to build and launch chatbots conversational{" "}
            <br /> without coding
          </p>
          <p
            className="font-bold text-4xl text-[#4b4b4b]"
          >
            {" "}
            <span className="text-red">___</span> _ _
          </p>
        </div>
      </div>
    </section>
  );
};
