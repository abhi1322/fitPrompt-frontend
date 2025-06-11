import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../components/ui/button";
import VideoFrame from "../components/custom/VideoFrame";

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [date, setDate] = useState(new Date());

  const getWorkoutForDate = (selectedDate) => {
    const dayOfWeek = selectedDate.getDay();
    const workoutPlan = user?.workoutPlans?.find((plan) => plan.weeklySchedule);
    return workoutPlan?.weeklySchedule[dayOfWeek];
  };

  const workoutForSelectedDate = getWorkoutForDate(date);

  console.log(workoutForSelectedDate);

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.firstName}!</h2>
      <Button onClick={() => logout()}>Log out</Button>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
      <h3>Workout for {date.toDateString()}:</h3>
      <h6>{workoutForSelectedDate?.day}</h6>
      {workoutForSelectedDate && (
        <>
          {workoutForSelectedDate.focus && (
            <>
              <h6>Focus: {workoutForSelectedDate.focus}</h6>
              {workoutForSelectedDate.focus === "Rest day" ? null : (
                <ul>
                  {workoutForSelectedDate.exercises.map((exercise, index) => (
                    <div className="border flex w-1/2 flex-col gap-5">
                      <VideoFrame exercise={exercise.name} />

                      <li key={index}>
                        {exercise.name} - {exercise.sets} sets x {exercise.reps}{" "}
                        reps
                      </li>
                    </div>
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
