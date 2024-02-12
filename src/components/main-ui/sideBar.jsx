import React from 'react';
import QuestionMark from '../../assets/message-question.svg'


const questions = [
    {
        question : "How to view e-statement?"
    },
    {
        question : "How to apply for loan?"
    },
    {
        question : "How to apply for BNPL?"
    },
    {
        question : "What is Alfa app?"
    },
]


function SideBar({ sendMessage }) {
  return (
    <div className='bg-white pb-[30px] px-[20px] rounded-3xl '>
        <h1 className='text-center p-2.5 text-[20px] font-semibold h-[69px] flex items-center justify-center backdrop-blur-sm border-b-[1px] border-b-[#F0F0F0] mb-2'> FAQs </h1>

        {
            questions.map((question, index)=>(
                <div className='bg-sidbar-color p-2.5 flex items-center mb-4 gap-4 rounded-3xl w-72' key={index}>
                    <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#FFD2D2]'>
                        <img src={QuestionMark} alt='logo'  />
                    </div>
                    <p className='text-[#2C2A2B] text-[12px] cursor-pointer ' onClick={(e)=> sendMessage(e.target.textContent)} >{question.question}</p>
                </div>       
            ))
        }

    </div>
  )
}

export default SideBar