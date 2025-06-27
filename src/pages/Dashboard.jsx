import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Calendar } from "@/components/ui/calendar";
import { WorkoutGenerator } from "../components/WorkoutGenerator";
import WorkoutCard from "../components/custom/WorkoutCard";
import Blob1 from "../assets/blob-1.svg";
import Blob2 from "../assets/blob-2.svg";
import RestDaySVG from "../assets/rest-day.svg";
import Navbar from "../components/custom/Navbar";
import Logo from "../assets/logo.png";
import Insta from "../assets/insta.svg";
import Facebook from "../assets/fb.svg";
import Gmail from "../assets/gmail.svg";
import Twitter from "../assets/twiter.svg";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());

  const getWorkoutForDate = (selectedDate) => {
    const dayOfWeek = selectedDate.getDay();
    const workoutPlan = user?.workoutPlans?.find((plan) => plan.weeklySchedule);
    return workoutPlan?.weeklySchedule[dayOfWeek];
  };

  const workoutForSelectedDate = getWorkoutForDate(date);

  // console.log(user?.workoutPlans.weeklySchedule);
  // console.log(user);

  return (
    <div className="relative max-w-screen overflow-x-clip flex w-full flex-col min-h-screen ">
      <Navbar user={user} />
      <img
        src={Blob1}
        alt="blob-1"
        className="absolute -z-50 scale-150 opacity-10 right-[20%] blur-2xl"
      />
      <img
        src={Blob2}
        alt="blob-1"
        className="absolute -z-50 scale-200 opacity-20 left-[20%] top-[20%] blur-2xl"
      />
      <div className="md:w-2/3 flex-11/12  mx-auto mt-16 gap-6 justify-center flex flex-wrap">
        <div className="flex flex-col gap-4">
          <div className="bg-neutral-950 px-8 py-8 rounded-xl">
            <h2 className="font-bold text-2xl">
              Welcome back,
              <span className="text-yellow-500">{user?.firstName}! </span>
            </h2>
            <p className="text-[12px] text-white/50 mt-2 font-light">
              Let’s crush your goals today. Consistency builds results. 💪
            </p>
          </div>
          {!workoutForSelectedDate ? (
            <div className="bg-[#111] py-8 px-8 rounded-xl">
              <h1 className="font-semibold text-xl mb-4">Generate workout</h1>
              <WorkoutGenerator user={user} />
            </div>
          ) : (
            <div className="border border-white/10 backdrop-blur-3xl rounded-xl flex flex-col px-8 py-8 gap-2">
              <h3 className="text-xs font-light">
                Workout for {date.toDateString()}
              </h3>
              <h6 className="border border-white/10 bg-white/[5%] backdrop-blur-3xl px-4 py-2 rounded-md text-sm text-yellow-600">
                Focus: {workoutForSelectedDate.focus}
              </h6>
            </div>
          )}
        </div>
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
        </div>
      </div>

      {workoutForSelectedDate && (
        <>
          {workoutForSelectedDate.focus && (
            <div className="w-2/3 mx-auto">
              {console.log(workoutForSelectedDate.focus)}
              {workoutForSelectedDate.focus === "Rest Day" ? (
                <div className="w-full">
                  <div className="flex flex-col justify-center items-center my-16">
                    <img
                      src={RestDaySVG}
                      alt="svg for rest day"
                      className="h-[300px] w-auto mx-auto ,t-"
                    />
                    <p className="text-4xl text-center  text-white/50 mt-8">
                      Focus on recovery and rest.
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="flex flex-wrap-reverse gap-8 mt-16 items-center justify-center">
                  {workoutForSelectedDate.exercises.map((exercise, index) => (
                    <WorkoutCard exercise={exercise} key={index} />
                  ))}
                </ul>
              )}
            </div>
          )}
        </>
      )}
      {/* footer */}
      <div className="bg-[#111111] mt-32">
        <div className="md:w-4/6 mx-auto mt-8 flex flex-wrap justify-between md:items-start">
          <img src={Logo} className="w-30 h-[35px] " alt="logo" />
          <div>
            <ul className="text-xs flex flex-col gap-1 text-neutral-400">
              <li>
                <Link to="/">About us</Link>
              </li>
              <li>
                <Link to="/">Contact </Link>
              </li>
              <li>
                <Link to="/">Terms of service</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-sm text-right text-neutral-400">Contact us</h6>
            <ul className="flex gap-2 mt-2">
              <li>
                <Link to="/">
                  <img src={Insta} alt="ICON" className="w-4" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={Facebook} alt="ICON" className="w-4" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={Gmail} alt="ICON" className="w-4" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={Twitter} alt="ICON" className="w-4" />
                </Link>
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
