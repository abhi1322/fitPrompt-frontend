import { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { generateWorkoutPrompt } from "../lib/prompt";
import AIIcon from "../assets/ai-icon.svg";

export const WorkoutGenerator = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateWorkout = async () => {
    console.log("first step");

    setLoading(true);
    setError("");

    const API_KEY = import.meta.env.VITE_APP_RAPID_API_KEY;
    const API_WORKOUT_URL = import.meta.env.VITE_APP_WORKOUT_URL;
    const API_WORKOUT_HOST = import.meta.env.VITE_APP_WORKOUT_HOST;
    const API_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

    try {
      // Construct the prompt based on user's profile
      const prompt = generateWorkoutPrompt(user);

      const options = {
        method: "POST",
        url: API_WORKOUT_URL,
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_WORKOUT_HOST,
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
      console.log("sending response");

      const response = await axios.request(options);
      // console.log(response.data.choices[0].message.content);
      const rawContent = response.data.choices[0].message.content;
      console.log("raw content ", rawContent);

      const rawMessage = response.data.choices[0].message.content;

      const match = rawMessage.match(/```(?:json)?\s*([\s\S]*?)```/);

      console.log(match);

      if (match && match[1]) {
        try {
          // Step 2: Parse the JSON
          const workoutData = JSON.parse(match[1]);
          console.log("✅ Parsed JSON:", workoutData);

          // Save workout plan to database
          const saveResponse = await fetch(
            `${API_BACKEND_URL}/api/user/workout`,
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
        } catch (err) {
          console.error("❌ JSON Parse Error:", err.message);
        }
      } else {
        console.error("❌ No JSON block found");
      }
    } catch (err) {
      setError(err.message || "Failed to generate workout plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workout-generator">
      <Button
        onClick={generateWorkout}
        disabled={loading}
        className="generate-button rounded-full bg-orange-400"
      >
        <img src={AIIcon} alt="ai-icon" />
        {loading ? "Generating..." : "Generate Workout Plan"}
      </Button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
