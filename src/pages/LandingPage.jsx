import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/custom/Navbar";
import LandingContent from "../lib/LandingPageContent";
import HeroImg from "../assets/hero-img.png";

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="bg-[#070707] min-h-screen w-full">
      <Navbar user={user} />
      <div className="w-4/5 mx-auto relative">
        <div className="">
          <h2>{LandingContent.hero.headline}</h2>
        </div>
        <img src={HeroImg} alt="" className="absolute right-[-10%] top-[20%] -z-50" />
      </div>
    </div>
  );
};

export default LandingPage;
