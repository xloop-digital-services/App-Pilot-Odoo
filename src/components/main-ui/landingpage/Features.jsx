import React from 'react';
import bg2 from "../../../assets/landingpage/bg2.png"
import icon1 from "../../../assets/landingpage/icon1.png"
import icon2 from "../../../assets/landingpage/icon2.png"
import icon3 from "../../../assets/landingpage/icon3.png"
import icon4 from "../../../assets/landingpage/icon4.png"
import icon5 from "../../../assets/landingpage/icon5.png"
import icon6 from "../../../assets/landingpage/icon6.png"
import icon7 from "../../../assets/landingpage/icon7.png"



import { Card } from 'antd';


const Features = () => {
  const features = [
    {
      icon: icon1,
      title: "User journeys",
      description: "Follow user journeys for step-by-step, tailored to your needs."
    },
    {
      icon: icon2,
      title: "Voice Input and Output",
      description: "Use voice commands and get responses in text, visuals and audio."
      },
    {
      icon: icon4,
      title: "Multiple Language Support",
      description: "Interact in your preferred language with our multilingual support."
    },
    {
      icon: icon5,
      title: "Avatar",
      description: "Choose customizable avatars to personalize your App Pilot experience."
    },
    {
      icon: icon6,
      title: "Tailored Personal Assistance",
      description: "Personalized assistance tailored to your individual needs and preferences."
    },
  ];
  return (
    <section id='features' >
        <div
        className='w-full pb-20 max-sm:text-center'
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundSize: "cover",
          objectFit:"cover"
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div className='flex flex-col justify-center text-center items-center flex-wrap py-20 max-sm:py-10'>
          <button className='bg-[#353535] py-3 px-5 text-white rounded-lg text-xl font-semibold w-[130px]'>Features</button>
          <h1 className='text-6xl font-semibold mt-8 max-md:text-5xl max-sm:text-5xl max-lg:p-1'> Unlock the Full Potential: Explore Our <span style={{backgroundImage:"linear-gradient(to right, rgb(238,29,35, 0.5), rgb(0, 0, 0,0))", color:"red"}}>Features</span></h1>
        </div>
        <div className='flex justify-evenly px-20 flex-wrap'>
          {features.map((feature,index) => (
          <div  key={index} className='w-[250px] text-lg max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center'>
            <img src={feature.icon} alt="ai" className='w-[110px] max-sm:mt-5 h-[100px]' style={{color:"red"}}/>
            <p className='py-2 w-[80%] font-bold h-[30%]'>{feature.title}</p>
            <p className='text-[#6a738b]'>{feature.description}</p>
          </div>
          ))}
         
        </div>
      </div>
    </section>
  )
}

export default Features