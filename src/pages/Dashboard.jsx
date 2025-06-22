import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Calendar } from "@/components/ui/calendar";
import { WorkoutGenerator } from "../components/WorkoutGenerator";
import WorkoutCard from "../components/custom/WorkoutCard";
import Blob1 from "../assets/blob-1.svg";
import Blob2 from "../assets/blob-2.svg";
import RestDaySVG from "../assets/rest-day.svg";
import Navbar from "../components/custom/Navbar";

export const Dashboard = () => {
  const { user, logout } = useAuth();
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
    <div className="flex flex-col">
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
      <div className="w-2/3 mx-auto mt-16 gap-6 justify-center flex flex-wrap">
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

          <div className="border border-white/10 backdrop-blur-3xl rounded-xl flex flex-col px-8 py-8 gap-2">
            <h3 className="text-xs font-light">
              Workout for {date.toDateString()}
            </h3>
            <h6 className="border border-white/10 bg-white/[5%] backdrop-blur-3xl px-4 py-2 rounded-md text-sm text-yellow-600">
              Focus: {workoutForSelectedDate.focus}
            </h6>
          </div>
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

      {!workoutForSelectedDate ? (
        <div>
          <h1>Generate workout</h1>
          <WorkoutGenerator user={user} />
        </div>
      ) : null}

      {workoutForSelectedDate && (
        <>
          {workoutForSelectedDate.focus && (
            <div className="w-2/3 mx-auto">
              {workoutForSelectedDate.focus === "Rest day" ? (
                <>
                  <div className="flex">
                    <img
                      src={RestDaySVG}
                      alt="svg for rest day"
                      className="h-[200px] w-auto"
                    />
                  </div>
                </>
              ) : (
                <ul className="flex flex-wrap-reverse gap-8 mt-16 items-center justify-center">
                  {workoutForSelectedDate.exercises.map((exercise, index) => (
                    <WorkoutCard exercise={exercise} />
                  ))}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
