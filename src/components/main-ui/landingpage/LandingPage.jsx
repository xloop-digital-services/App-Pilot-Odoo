import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LandingBG from "../../../assets/LandingBackground.jpg"
import { NavComp } from "./NavComp";
import Features from "./Features";
import { Aboutus } from "./Aboutus";
import { HowWorks } from "./HowWorks";
import { Security } from "./Security";
import Discover from "./Discover";
import { Footer } from "./Footer";

const LandingPage = () => (
<div className="overflow-hidden">
  <NavComp/>
  <Features/>
  <Aboutus/>
  <HowWorks/>
  <Security/>
  <Discover/>
  <Footer/>
  </div>
);

export default LandingPage;