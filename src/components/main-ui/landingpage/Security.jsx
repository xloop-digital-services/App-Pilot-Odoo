import React from "react";
import bg5 from "../../../assets/landingpage/bg3&5.png";
import img from "../../../assets/landingpage/imgforbg5.png";

export const Security = () => {
  return (
    <section id='security'>
      <div
        class="w-full"
        style={{
          backgroundImage: `url(${bg5})`,
          backgroundSize: "cover",
          //   objectFit:"cover"
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex gap-10 px-52 pt-44 pb-48 max-sm:flex-col items-center justify-center max-sm:pt-4 flex-wrap max-sm:px-0 max-sm:pb-0 max-sm:pt-10 max-lg:flex-col max-lg:text-center max-lg:py-4">
          <div className="w-[40%] text-lg max-sm:w-[350px] max-lg:w-[400px] max-sm:flex max-sm:items-center">
            <img
              src={img}
              alt="ai"
              className="max-sm:flex max-sm:items-center"
            />
          </div>
          <div className="w-[40%] max-sm:w-[100%] max-sm:text-center max-lg:w-full">
            <button className="bg-[#353535] py-3 px-5 text-white rounded-lg text-xl font-semibold ">
              Security
            </button>
            <h1 className="text-5xl mt-4 font-semibold text-white leading-tight tracking-wide w-[100%] max-sm:text-5xl">
              Your Security, Our <br />
              Priority: Trust in{" "}
              <span className="max-sm:text-bg-avatar text-bg-secondary max-lg:text-bg-avatar"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(238,29,35, 0.5), rgb(0, 0, 0,0))",
                  
                }}
              >
                App Pilot
              </span>
            </h1>
            <p className="w-[95%] max-sm:w-full py-6 text-white text-lg max-lg:w-[100%]">
              Your security is our top priority. App Pilot is built with
              industry-leading encryption and security measures to safeguard
              your sensitive information. Rest easy knowing that your data is
              protected at all times.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
