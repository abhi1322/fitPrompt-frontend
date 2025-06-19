import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/custom/Navbar";
import LandingContent from "../lib/LandingPageContent";
import HeroImg from "../assets/hero-img.png";
import AIIcon from "../assets/ai-icon.svg";
import PlayIconSVG from "../assets/play-icon.svg";
import Arrow1 from "../assets/arrow 1.svg";
import Arrow2 from "../assets/arrow 2.svg";
import QuateIcon from "../assets/qoutes.svg";
import Avatars from "../assets/avatars.png";
import { Button } from "../components/ui/button";

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="font-[Poppins] flex flex-col min-h-screen w-full -z-40 pt-4">
      <Navbar user={user} />
      {/* hero section */}
      <div className="w-4/5 h-full mx-auto relative mt-40 mb-80">
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
      <div className="flex justify-center items-center flex-col">
        <h6 className="text-4xl font-semibold">How it Works</h6>
        <p className="text-xs mt-2 text-neutral-400">
          Generate your personalize plan by completing 3 steps.
        </p>

        <div className="relative mt-24 mb-20 flex gap-8">
          <img
            src={Arrow1}
            alt="Arrow one"
            className="absolute -top-[25%] scale-75 left-[10%]"
          />
          <img
            src={Arrow2}
            alt="Arrow two"
            className="absolute -bottom-[20%] scale-75 right-[15%]"
          />
          <div className="bg-[#111111] p-4 w-[280px] rounded-xl">
            <h6 className="text-2xl font-semibold text-[#D55900]">Step 1</h6>
            <p className="mt-4 font-semibold leading-[18px]">
              Create <br />
              Your Profile
            </p>
            <p className="text-xs mt-2 text-neutral-400">
              Tell us your fitness level, goals, and training preferences.
            </p>
          </div>
          <div className="bg-[#111111] p-4 w-[280px] rounded-xl">
            <h6 className="text-2xl font-semibold text-[#D55900]">Step 2</h6>
            <p className="mt-4 font-semibold leading-[18px]">
              Generate <br />
              Your Plan
            </p>
            <p className="text-xs mt-2 text-neutral-400">
              Our AI crafts a weekly workout schedule tailored to your body.
            </p>
          </div>
          <div className="bg-[#D55900] p-4 w-[280px] rounded-xl">
            <h6 className="text-2xl font-semibold text-white">Step 3</h6>
            <p className="mt-4 font-semibold leading-[18px] text-black">
              Track &
              <br />
              Improve
            </p>
            <p className="text-xs mt-2 text-neutral-800">
              Log workouts, adjust focus areas, and progress over time.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial section */}
      <div className="mt-20 overflow-x-hidden overflow-clip">
        <h6 className="text-4xl font-semibold text-center">Testimonials</h6>
        <p className="text-xs mt-2 text-neutral-400 text-center">
          What people are saying about us.
        </p>
        {/* <div className="mt-10 flex justify-center items-center gap-4"></div>
         */}
        <div className="relative flex gap-4 my-16 w-screen ">
          <div className="absolute z-50 -top-[30%] -left-[2%] h-[400px] w-[100px] bg-[#000000] blur-[15px]" />
          <div className="absolute z-50 -top-[30%] -right-[2%] h-[400px] w-[100px] bg-[#000000] blur-[15px]" />

          {LandingContent.testimonials.entries.map((entry, index) => (
            <div
              className="relative bg-[#111111] w-[300px]  p-6  rounded-xl"
              key={index}
            >
              <img src={QuateIcon} alt="Quote" className="absolute -top-6" />
              <p className="text-xs font-light text-neutral-400">
                {entry.quote}
              </p>
              <p className="text-xs text-right mt-6 text-neutral-400">
                {entry.name}, {entry.age}, {entry.profession}
              </p>
            </div>
          ))}
          <div className="flex flex-col text-center items-center justify-center bg-[#111111] w-[300px]   rounded-xl">
            <img src={Avatars} className="w-[60%]" alt="avatars" />
            <p className="text-xs  w-2/3  mt-2 text-[#D55900]">
              100+ People transformed through Fitprompt
            </p>
          </div>
        </div>
        <div></div>
      </div>

      {/* CTA section */}
      <div className="flex my-16  flex-col items-center justify-center">
        <h6 className="text-4xl text-[#F8501B] text-center">
          <span className="text-white">Ready to Transform Your</span>
          <br />
          Fitness Journey?
        </h6>
        <p className="mt-2 text-xs text-neutral-400">
          {LandingContent.ctaSection.subheadline}
        </p>
        <Button className="rounded-full bg-[#BB4D00] mt-4">
          <Link
            className="flex gap-2 items-center justify-center"
            to={isAuthenticated ? "/dashboard" : "/login"}
          >
            <img src={AIIcon} alt="ICON" />
            {isAuthenticated ? "Dashboard" : "Get Started"}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
