import React from 'react'
import bg2 from "../../../assets/landingpage/bg2.png"
import { Link } from 'react-router-dom'

const Discover = () => {
  return (
    <section >
    <div
    className='w-full pt-10'
    style={{
      backgroundImage: `url(${bg2})`,
      backgroundSize: "cover",
      objectFit:"cover"
      // backgroundRepeat: "no-repeat",
    }}
  >
    <div className='flex flex-col justify-center text-center items-center flex-wrap py-20 max-sm:py-4'>
      <button className='bg-[#353535] py-3 px-5 text-white rounded-lg text-xl font-semibold w-[260px]'>Experience The Future</button>
      <h1 className='text-5xl font-semibold mt-6 leading-snug tracking-wide'> Discover How App Pilot Transforms {" "}<span style={{backgroundImage:"linear-gradient(to right, rgb(238,29,35, 0.5), rgb(0, 0, 0,0))", color:"red"}}>Banking</span></h1>
      <p className='text-[#6a738b] text-lg mt-4'>Explore more about App Pilot and discover how it can revolutionize your banking experience.</p>
      <Link to="/app-pilot"><button className='bg-[#353535] py-4 px-5 text-white rounded-lg text-md font-semibold w-[160px] mt-7' style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(238, 29, 35, 1), rgba(178, 0, 0, 1)",
                  color: "white",
                }}>Try Me</button></Link>
    </div>
  </div>
</section>
  )
}

export default Discover