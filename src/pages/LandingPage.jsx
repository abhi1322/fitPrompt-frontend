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
import Illustration from "../assets/Illustration.png";
import Logo from "../assets/logo.png";
import Insta from "../assets/insta.svg";
import Facebook from "../assets/fb.svg";
import Gmail from "../assets/gmail.svg";
import Twitter from "../assets/twiter.svg";

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className=" font-[Poppins] flex flex-col md:min-h-screen w-full pt-4">
      <Navbar user={user} />
      {/* hero section */}
      <div className="relative w-full md:w-4/5 h-full mx-auto  lg:mt-40 lg:mb-80">
        {/* hero img for small devices */}
        <img src={HeroImg} alt="hero-img" className="lg:hidden -z-50 -mb-20" />
        <img
          src={HeroImg}
          alt=""
          className="hidden lg:flex absolute top-[80%] left-[72%] translate-x-[-50%] translate-y-[-50%] -z-50"
        />

        <div className="px-10 relative pt-20 ">
          <h2 className="font-bold text-[1.5rem] md:text-5xl bg-gradient-to-b from-[#FFFFFF] to-[#555555] bg-clip-text text-transparent">
            Achieve Your Fitness Goals with
          </h2>
          <h2
            className="relative font-bold text-[1.6rem] md:text-5xl bg-gradient-to-b from-[#FFFFFF] to-[#555555] bg-clip-text text-transparent "
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
        {/* hero img for large devices */}
      </div>

      {/* features section */}
      <div className="flex mt-40 lg:mt-0 justify-center items-center flex-col">
        <h6 className="text-4xl font-semibold">How it Works</h6>
        <p className="text-xs mt-2 text-neutral-400">
          Generate your personalize plan by completing 3 steps.
        </p>
        {/* display on large screen */}

        <div className="relative hidden lg:flex mt-24 mb-20 gap-8">
          <img
            src={Arrow1}
            alt="Arrow one"
            className="absolute -top-[25%] scale-75 left-[10%]  hover:-rotate-3 transition-all ease-in-out duration-300"
          />
          <img
            src={Arrow2}
            alt="Arrow two"
            className="absolute -bottom-[20%] scale-75 right-[15%]  hover:rotate-3 transition-all ease-in-out duration-300"
          />
          <div className="bg-[#111111] hover:bg-[#121212] transition-all ease-in-out duration-300 hover:rotate-3 p-4 w-[280px] rounded-xl">
            <h6 className="text-2xl font-semibold text-[#ec6504]">Step 1</h6>
            <p className="mt-4 font-semibold leading-[18px]">
              Create <br />
              Your Profile
            </p>
            <p className="text-xs mt-2 text-neutral-400">
              Tell us your fitness level, goals, and training preferences.
            </p>
          </div>
          <div className="bg-[#111111]  hover:bg-[#121212] transition-all ease-in-out duration-300 hover:-rotate-3 p-4 w-[280px] rounded-xl">
            <h6 className="text-2xl font-semibold text-[#D55900]">Step 2</h6>
            <p className="mt-4 font-semibold leading-[18px]">
              Generate <br />
              Your Plan
            </p>
            <p className="text-xs mt-2 text-neutral-400">
              Our AI crafts a weekly workout schedule tailored to your body.
            </p>
          </div>
          <div className="bg-[#D55900] p-4 w-[280px] rounded-xl  hover:bg-[#d55900e7] transition-all ease-in-out duration-300 hover:rotate-3">
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
        {/* Display on small and medium screens  */}
        <div className="relative flex flex-col lg:hidden mt-24 mb-20 gap-8">
          <img
            src={Arrow1}
            alt="Arrow one"
            className="absolute top-[30%] scale-90 lg:scale-75 -right-[50%] rotate-90  hover:-rotate-3 transition-all ease-in-out duration-300"
          />
          <img
            src={Arrow2}
            alt="Arrow two"
            className="absolute bottom-[30%] scale-90 lg:scale-75 -left-[55%] rotate-90  hover:rotate-3 transition-all ease-in-out duration-300"
          />
          <div className="bg-[#111111] hover:bg-[#121212] transition-all ease-in-out duration-300 hover:rotate-3 p-4 w-[280px] rounded-xl">
            <h6 className="text-2xl font-semibold text-[#ec6504]">Step 1</h6>
            <p className="mt-4 font-semibold leading-[18px]">
              Create <br />
              Your Profile
            </p>
            <p className="text-xs mt-2 text-neutral-400">
              Tell us your fitness level, goals, and training preferences.
            </p>
          </div>
          <div className="bg-[#111111]  hover:bg-[#121212] transition-all ease-in-out duration-300 hover:-rotate-3 p-4 w-[280px] rounded-xl">
            <h6 className="text-2xl font-semibold text-[#D55900]">Step 2</h6>
            <p className="mt-4 font-semibold leading-[18px]">
              Generate <br />
              Your Plan
            </p>
            <p className="text-xs mt-2 text-neutral-400">
              Our AI crafts a weekly workout schedule tailored to your body.
            </p>
          </div>
          <div className="bg-[#D55900] p-4 w-[280px] rounded-xl  hover:bg-[#d55900e7] transition-all ease-in-out duration-300 hover:rotate-3">
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
      <div className="mt-20 overflow-hidden">
        <h6 className="text-4xl font-semibold text-center">Testimonials</h6>
        <p className="text-xs mt-2 text-neutral-400 text-center">
          What people are saying about us.
        </p>

        <div className="relative mt-16 mb-8 overflow-hidden">
          {/* Add padding top to prevent quote icon clipping */}
          <div className="pt-8">
            {/* Gradient overlays for fade effect */}
            <div className="absolute z-10 left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent" />
            <div className="absolute z-10 right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent" />

            {/* Infinite scroll container */}
            <div className="flex gap-4 animate-scroll">
              {/* First set of testimonials */}
              {LandingContent.testimonials.entries.map((entry, index) => (
                <div
                  className="relative bg-[#111111] w-[300px] h-[250px] p-6 rounded-xl flex-shrink-0 flex flex-col justify-between"
                  key={`first-${index}`}
                >
                  <img
                    src={QuateIcon}
                    alt="Quote"
                    className="absolute -top-6 left-6"
                  />
                  <p className="text-xs font-light text-neutral-400 flex-1 overflow-hidden">
                    {entry.quote}
                  </p>
                  <p className="text-xs text-right mt-4 text-neutral-400">
                    {entry.name}, {entry.age}, {entry.profession}
                  </p>
                </div>
              ))}

              {/* Stats card */}
              <div className="flex flex-col text-center items-center justify-center bg-[#111111] w-[300px] h-[250px] rounded-xl flex-shrink-0 p-6">
                <img
                  src={Avatars}
                  className="w-[60%] max-w-[120px]"
                  alt="avatars"
                />
                <p className="text-xs w-2/3 mt-4 text-[#D55900]">
                  100+ People transformed through Fitprompt
                </p>
              </div>

              {/* Duplicate set for seamless loop */}
              {LandingContent.testimonials.entries.map((entry, index) => (
                <div
                  className="relative bg-[#111111] w-[300px] h-[250px] p-6 rounded-xl flex-shrink-0 flex flex-col justify-between"
                  key={`second-${index}`}
                >
                  <img
                    src={QuateIcon}
                    alt="Quote"
                    className="absolute -top-6 left-6"
                  />
                  <p className="text-xs font-light text-neutral-400 flex-1 overflow-hidden">
                    {entry.quote}
                  </p>
                  <p className="text-xs text-right mt-4 text-neutral-400">
                    {entry.name}, {entry.age}, {entry.profession}
                  </p>
                </div>
              ))}

              {/* Duplicate stats card */}
              <div className="flex flex-col text-center items-center justify-center bg-[#111111] w-[300px] h-[250px] rounded-xl flex-shrink-0 p-6">
                <img
                  src={Avatars}
                  className="w-[60%] max-w-[120px]"
                  alt="avatars"
                />
                <p className="text-xs w-2/3 mt-4 text-[#D55900]">
                  100+ People transformed through Fitprompt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="flex lg:my-16 mt-20 flex-col items-center justify-center">
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

      {/* Mission sections */}
      <div className="w-full mt-20 lg:w-3/6 lg:mb-20 justify-between gap-20 mx-auto flex flex-col lg:flex-row items-center">
        <div>
          <h6 className="text-center lg:text-left text-5xl">Our Mission</h6>
          <p className="text-center lg:text-left text-xs text-neutral-400 mt-4 w-[400px] ">
            We're a team of developers, trainers, and AI engineers on a mission
            to make fitness accessible, personalized, and effective for
            everyone. No gym? No problem. We help you stay fit – anytime,
            anywhere.
          </p>
        </div>
        <img
          src={Illustration}
          alt="illustration"
          className="w-[80vw] md:[60vw] lg:w-[50vw]"
        />
      </div>

      {/* footer */}
      <div className="bg-[#111111]">
        <div className="w-full md:w-4/6  md:mx-auto mt-8 flex flex-col md:flex-row gap-5 justify-center md:justify-between items-center md:items-start">
          <img src={Logo} className="w-30 " alt="logo" />
          <div>
            <ul className="w-fit text-xs flex flex-col items-center gap-1 text-neutral-400">
              <li>
                <a href="/">About us</a>
              </li>
              <li>
                <a href="/">Contact </a>
              </li>
              <li>
                <a href="/">Terms of service</a>
              </li>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-sm text-right text-neutral-400">Contact us</h6>
            <ul className="flex gap-2 mt-2">
              <li>
                <a href="/">
                  <img src={Insta} alt="ICON" className="w-4" />
                </a>
              </li>
              <li>
                <a href="/">
                  <img src={Facebook} alt="ICON" className="w-4" />
                </a>
              </li>
              <li>
                <a href="/">
                  <img src={Gmail} alt="ICON" className="w-4" />
                </a>
              </li>
              <li>
                <a href="/">
                  <img src={Twitter} alt="ICON" className="w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full border-t mt-20 py-4">
          <p className="text-xs text-center text-neutral-400">
            &copy; 2023 Fitprompt. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
