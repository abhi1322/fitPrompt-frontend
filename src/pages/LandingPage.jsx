import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/custom/Navbar";
import LandingContent from "../lib/LandingPageContent";
import HeroImg from "../assets/hero-img.png";
import AIIcon from "../assets/ai-icon.svg";
import PlayIconSVG from "../assets/play-icon.svg";

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="font-[Poppins] min-h-screen w-full -z-40 pt-4">
      <Navbar user={user} />
      {/* hero section */}
      <div className="w-4/5 mx-auto relative mt-40">
        <div className="absolute -top-[100%] -right-[10%] bottom-0 -z-10">
          <img src={HeroImg} alt="" className="h-screen" />
        </div>
        <div className="">
          <h2 className="font-bold text-5xl bg-gradient-to-b from-[#FFFFFF] to-[#555555] bg-clip-text text-transparent">
            Achieve Your Fitness Goals with
          </h2>
          <h2
            className="relative  font-bold text-5xl bg-gradient-to-b from-[#FFFFFF] to-[#555555] bg-clip-text text-transparent "
            data-text="AI-Powered Workout Plans"
          >
            AI-Powered Workout Plans
          </h2>
          <p className="text-xs mt-4 text-[#ffffff72] ">
            {LandingContent.hero.subheadline}
          </p>

          <div className="mt-5 flex items-center gap-10">
            <div className="relative inline-block group">
              <a
                href={isAuthenticated ? "/dashboard" : "/login"}
                className="relative z-10 mt-4 bg-[#D55900] py-2 rounded-full flex w-[150px] gap-2 items-center justify-center text-sm text-black font-semibold hover:bg-amber-700 transition duration-300 ease-in-out"
              >
                <img src={AIIcon} alt="ICON" />
                <p>{isAuthenticated ? "Dashboard" : "Get Started"}</p>
              </a>
            </div>

            <button className="mt-4 flex gap-2 text-sm text-neutral-400 justify-center items-center hover:text-white transition-all ease-in-out duration-300">
              <img src={PlayIconSVG} alt="How it works" />
              <p>How it works</p>
            </button>
          </div>
        </div>
      </div>

      {/* features section */}
      <div>
        <h6>How it Works</h6>
      </div>
    </div>
  );
};

export default LandingPage;
