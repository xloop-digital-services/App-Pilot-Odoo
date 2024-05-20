import React from "react";
import bg3 from "../../../assets/landingpage/bg3&5.png";
import img from "../../../assets/landingpage/imgforbg3.png";

export const Aboutus = () => {
  return (
    <section id="about">
      <div
        class="w-full "
        style={{
          backgroundImage: `url(${bg3})`,
          backgroundSize: "cover",
          //   objectFit:"cover"
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex gap-10 px-52 pt-44 pb-48 max-sm:flex-col items-center justify-center max-sm:pt-4 flex-wrap max-sm:px-0 max-sm:pb-0 max-sm:pt-10 max-lg:flex max-lg:flex-col max-lg:text-center max-lg:py-4">
          <div className="w-[40%] text-lg max-sm:w-[350px] max-sm:flex max-sm:items-center max-lg:w-[400px]">
            <img src={img} alt="ai" className="max-sm:flex max-sm:items-center" />
          </div>
          <div className="w-[40%] max-lg:w-[100%] ">
            <button className="bg-[#353535] py-3 px-5 text-white rounded-lg text-xl font-semibold ">
              About Us
            </button>
            <h1 className="text-5xl mt-4 font-semibold text-white leading-snug tracking-wide max-sm:text-5xl max-lg:text-6xl max-lg:w-[100%] ">
              Unlock Seamless <br />
              Banking With{" "}
              <span className="max-lg:text-bg-avatar text-bg-secondary"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(238,29,35, 0.5), rgb(0, 0, 0,0))",
                  
                }}
              >
                App Pilot
              </span>
            </h1>
            <p className="w-[76%] max-sm:w-full py-6 text-white text-lg max-lg:w-[100%] max-lg:text-xl">
              Unlock the power of intelligent assistance with App Pilot, your
              go-to knowledge platform for all things Bank Alfalah. Seamlessly integrated
              with Bank Alfalah's systems, App Pilot is here to make your
              banking experience smoother, faster, and more efficient than ever
              before.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
