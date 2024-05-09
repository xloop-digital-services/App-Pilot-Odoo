import React, { useState } from "react";
import bg6 from "../../../assets/landingpage/bg6.png";
import icon1 from "../../../assets/landingpage/iconaddress.png";
import icon2 from "../../../assets/landingpage/iconsms.png";
import icon3 from "../../../assets/landingpage/iconcell.png";

export const Footer = () => {

  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };


  return (
    <section className="">
      <div
        class="w-full "
        style={{
          backgroundImage: `url(${bg6})`,
          backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
        }}
      >
        <ul class="flex items-center justify-evenly bg-gray-100  flex-wrap  text-white text-xl py-10  max-sm:text-center">
          <div className="flex w-[80%] items-center justify-around pb-20 flex-wrap max-sm:pb-1">
            <li className="leading-snug tracking-wide ">
              <p
                className="inline-block text-4xl "
                style={{ fontFamily: "Roboto Mono" }}
              >
                App Pilot
              </p>
              <p className="font-semibold text-center flex items-center max-sm:justify-center">
                ________
                <span className="opacity-50 font-semibold">________</span>
              </p>
              <p className="text-xl w-[350px] pt-5">
                An all-in-one platform to build and launch chatbots
                conversational without coding
              </p>
            </li>
            <li class="inline-block text-xl leading-snug tracking-wide ">
              Contact
              <p className="font-semibold text-center flex items-center max-sm:justify-center">
              ________
                <span className="opacity-50 font-semibold">________</span>              </p>
              <div className="flex gap-3 mt-2">
                <img src={icon1} alt="address" />
                <p>Clifton, Karachi</p>
              </div>
              <div className="flex gap-3 mt-2">
                <img src={icon2} alt="address" />
                <p>abdulwasey@xloopdigital.com</p>
              </div>
              <div className="flex gap-3 mt-2">
                <img src={icon3} alt="address" />
                <p>0900-78601</p>
              </div>
            </li>
            <li class="inline-block text-xl leading-snug tracking-wide">
              Links
              <p className="font-semibold text-center flex items-center max-sm:justify-center">
              ________
                <span className="opacity-50 font-semibold">________</span>
              </p>
              <p className={`mt-2 ${activeSection === 'about' ? 'active' : ''} cursor-pointer`} onClick={() => scrollToSection('about')}>About Us</p>
              <p className={`mt-2 ${activeSection === 'features' ? 'active' : ''} cursor-pointer`} onClick={() => scrollToSection('features')}>Features</p>
              <p className={`mt-2 ${activeSection === 'security' ? 'active' : ''} cursor-pointer`} onClick={() => scrollToSection('security')}>Security</p>
            </li>
          </div>
          <div className="border-t-2 flex w-[69%] items-center justify-between pb-8 flex-wrap max-sm:text-center">
          <p className="mt-2 max-sm:px-12">PRIVACY POLICY</p>
              <p className="mt-2 max-sm:px-12">TERMS OF USE</p>
              <p className="mt-2 text-lg font-semibold">©2024 App Pilot. All Rights Reserved.</p>
</div>
        </ul>
      </div>
    </section>
  );
};
