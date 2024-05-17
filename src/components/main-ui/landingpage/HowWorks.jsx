import React from "react";
import bg4 from "../../../assets/landingpage/bg4.png";
import img from "../../../assets/landingpage/imgforbg4.png";

export const HowWorks = () => {
  return (
    <section>
      <div
        class="w-full"
        style={{
          backgroundImage: `url(${bg4})`,
          backgroundSize: "cover",
          //   objectFit:"cover"
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex px-12 pt-44 pb-48 max-sm:flex-col items-center justify-center max-sm:pt-4 flex-wrap max-sm:px-0 max-sm:pb-0 max-sm:pt-10 xl:ml-40 max-sm:pb-4 max-lg:flex max-lg:flex-col max-lg:py-4">
          <div className="w-[40%] max-sm:w-[100%] max-sm:text-center max-lg:w-full max-lg:text-center max-lg:w-[70%]">
            <button className="bg-[#353535] py-3 px-5 text-white rounded-lg text-xl font-semibold">
              How It Works
            </button>
            <h1 className="text-5xl mt-4 font-semibold text-bg-avatar leading-snug tracking-wide justify-center max-sm:text-5xl ">
              Celebrate The <br />
              Simplicity: Explore How <br />
              App{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(238,29,35, 0.5), rgb(0, 0, 0,0))",
                  color: "red",
                }}
              >
                Pilot Works
              </span>
            </h1>
            <p className="w-[80%] max-sm:w-full py-6 text-[#6a738b] text-lg max-lg:w-[100%]">
              Your security is our top priority. App Pilot is built with
              industry-leading encryption and security measures to safeguard
              your sensitive information. Rest easy knowing that your data is
              protected at all times.
            </p>
          </div>
          <div className="w-[35%] text-lg max-sm:w-[350px] max-sm:flex max-sm:items-center max-lg:w-[400px]">
            <img
              src={img}
              alt="ai"
              className="max-sm:flex max-sm:items-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
