import React from 'react';
import bg2 from "../../../assets/landingpage/bg2.png"
import icon1 from "../../../assets/landingpage/icon1.png"
import icon2 from "../../../assets/landingpage/icon2.png"
import icon3 from "../../../assets/landingpage/icon3.png"
import icon4 from "../../../assets/landingpage/icon4.png"

import { Card } from 'antd';


const Features = () => {
  const features = [
    {
      icon: icon1,
      title: "Instant Account Insights",
      description: "Access comprehensive information about all Bank Alfalah accounts with just a message."
    },
    {
      icon: icon2,
      title: "Cutting Edge AI Support",
      description: "Real-time insights and solutions powered by cutting-edge technology."
    },
    {
      icon: icon3,
      title: "Tailored Personal Assistance",
      description: "Personalized assistance tailored to your individual needs and preferences."
    },
    {
      icon: icon4,
      title: "Advance Security Measures",
      description: "Built with industry-leading encryption and security measures to safeguard your sensitive information."
    }
  ];
  return (
    <section id='features' >
        <div
        className='w-full pb-20'
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundSize: "cover",
          objectFit:"cover"
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div className='flex flex-col justify-center text-center items-center flex-wrap py-20'>
          <button className='bg-[#353535] py-3 px-5 text-white rounded-lg text-xl font-semibold w-[130px]'>Features</button>
          <h1 className='text-6xl font-semibold mt-8'> Unlock the Full Potential: Explore Our <span style={{backgroundImage:"linear-gradient(to right, rgb(238,29,35, 0.5), rgb(0, 0, 0,0))", color:"red"}}>Features</span></h1>
        </div>
        <div className='flex justify-evenly px-20 flex-wrap '>
          {features.map((feature,index) => (
          <div  key={index} className='w-[250px] text-lg'>
            <img src={feature.icon} alt="ai" className='w-[110px]'/>
            <p className='py-2 w-[70%] font-bold'>{feature.title}</p>
            <p className='text-[#6a738b]'>{feature.description}</p>
          </div>
          ))}
         
        </div>
      </div>
    </section>
  )
}

export default Features