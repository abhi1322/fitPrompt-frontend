import { useState } from "react";
import axios from "axios";

export const WorkoutGenerator = ({ user }) => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateWorkout = async () => {
    setLoading(true);
    setError("");

    try {
      // Construct the prompt based on user's profile
      const prompt =
        `Generate a detailed workout plan for a ${user.gender} with the following characteristics:\n
` +
        `- Fitness Level: ${user.fitnessLevel}\n` +
        `- Fitness Goal: ${user.fitnessGoal}\n` +
        `- Preferred Training Types: ${user.preferredTrainingTypes.join(
          ", "
        )}\n` +
        `- Focus Areas: ${user.focusAreas.join(", ")}\n` +
        `- Workout Duration: ${user.workoutDuration} minutes\n` +
        `- Workout Days Per Week: ${user.workoutDaysPerWeek}\n` +
        `- Workout Location: ${user.workoutLocation}\n\n` +
        `Please provide a structured workout plan in JSON format with the following structure:\n` +
        `{\n` +
        `  "weeklySchedule": [\n` +
        `    {\n` +
        `      "day": "Day 1",\n` +
        `      "focus": "target area",\n` +
        `      "exercises": [\n` +
        `        {\n` +
        `          "name": "exercise name",\n` +
        `          "sets": "number of sets",\n` +
        `          "reps": "reps per set",\n` +
        `          "notes": "any special instructions"\n` +
        `        }\n` +
        `      ]\n` +
        `    }\n` +
        `  ]\n` +
        `}`;

      const options = {
        method: "POST",
        url: "https://free-gpt-api.p.rapidapi.com/v1/chat/completions",
        headers: {
          "x-rapidapi-key":
            "dbf6408eadmshd81259e50dc8b54p115474jsn61e0097af264",
          "x-rapidapi-host": "free-gpt-api.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
      };

      const response = await axios.request(options);
      console.log(response.data);
      const workoutData = JSON.parse(response.data.choices[0].message.content);
      console.log("workout data ", workoutData);
      // Save workout plan to database
      const saveResponse = await fetch(
        "http://localhost:5000/api/user/workout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(workoutData),
        }
      );

      if (!saveResponse.ok) {
        throw new Error("Failed to save workout plan");
      }

      setWorkoutPlan(workoutData);
    } catch (err) {
      setError(err.message || "Failed to generate workout plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workout-generator">
      <button
        onClick={generateWorkout}
        disabled={loading}
        className="generate-button"
      >
        {loading ? "Generating..." : "Generate Workout Plan"}
      </button>

      {error && <p className="error">{error}</p>}

      {workoutPlan && (
        <div className="workout-plan">
          <h3>Your Personalized Workout Plan</h3>
          {workoutPlan.weeklySchedule.map((day, index) => (
            <div key={index} className="workout-day">
              <h4>
                {day.day} - {day.focus}
              </h4>
              <div className="exercises">
                {day.exercises.map((exercise, exIndex) => (
                  <div key={exIndex} className="exercise">
                    <h5>{exercise.name}</h5>
                    <p>Sets: {exercise.sets}</p>
                    <p>Reps: {exercise.reps}</p>
                    {exercise.notes && <p>Notes: {exercise.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
