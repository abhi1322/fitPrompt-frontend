import React from "react";
import VideoFrame from "./VideoFrame";

const WorkoutCard = ({ exercise }) => {
  console.log(exercise);
  return (
    <div className="border w-full md:w-96  bg-neutral-950 rounded-2xl overflow-clip ">
      <VideoFrame exercise={exercise?.name} />

      <div className="px-4 pb-2">
        <h2 className="mt-4 text-lg font-semibold">{exercise.name}</h2>
        <div className="flex gap-2 mt-2">
          <div className="flex justify-center items-center bg-neutral-600/20  gap-2 w-fit px-4 py-2 rounded-3xl font-[500]  text-xs text-yellow-600">
            <p>Sets:{exercise.sets}</p>
          </div>
          <div className="flex justify-center items-center bg-neutral-600/20 gap-1 w-fit px-4 py-1 rounded-3xl  font-[500] text-xs text-yellow-600">
            <p>Reps:{exercise.reps}</p>
          </div>
        </div>
        <div className="bg-neutral-600/10 text-xs flex px-2 py-3 mt-3 rounded-lg text-white/30">
          <p>Note: {exercise.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
