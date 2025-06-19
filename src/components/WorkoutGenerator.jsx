import { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { generateWorkoutPrompt } from "../lib/prompt";
import AIIcon from "../assets/ai-icon.svg";
import { ToastContainer, toast } from "react-toastify";

export const WorkoutGenerator = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateWorkout = async () => {
    console.log("first step");

    setLoading(true);
    setError("");

    try {
      // Construct the prompt based on user's profile
      const prompt = generateWorkoutPrompt(user);

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
      toast.success("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};
