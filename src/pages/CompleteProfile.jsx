import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const CompleteProfile = () => {
  const navigate = useNavigate();

  const { token, setUser } = useAuth();
  const [error, setError] = useState("");
  const [newTrainingType, setNewTrainingType] = useState("");
  const [formData, setFormData] = useState({
    // Basic Info
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    bodyFatPercent: "",

    // Fitness Goals
    fitnessGoal: "",
    targetWeight: "",
    timeline: "",

    // Fitness Experience
    fitnessLevel: "",
    workoutLocation: "",
    workoutDaysPerWeek: "",
    preferredTrainingTypes: [], // Array for training type tags
    dietPlan: "",
    medicalConditions: "",

    // Lifestyle & Activity
    activityLevel: "",
    sleepHours: "",
    stressLevel: "Medium", // Default value to prevent validation error

    // Workout Preferences
    focusAreas: [],
    workoutDuration: 30, // Default value from enum
    workoutTimePreference: "Morning", // Default value to prevent validation error
  });

  function formatDateForInput(isoString) {
    if (!isoString) return ""; // handle empty case
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        // if (data.profileCompleted) {
        //   setUser(data);
        //   navigate("/dashboard", { replace: true });
        //   return;
        // }

        if (response.ok) {
          // Pre-fill form data with existing user data
          setFormData((prevData) => ({
            ...prevData,
            ...data,
            dateOfBirth: data.dateOfBirth
              ? formatDateForInput(data.dateOfBirth)
              : "",
          }));
        }
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [token, navigate, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Update the user data in AuthContext after successful profile completion
      const userResponse = await fetch("http://localhost:5000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await userResponse.json();
      if (userResponse.ok) {
        setUser(userData); // Update the user state with the latest data
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const array = [...formData[name]];
      const index = array.indexOf(value);
      if (index === -1) {
        array.push(value);
      } else {
        array.splice(index, 1);
      }
      setFormData({ ...formData, [name]: array });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddTrainingType = (e) => {
    e.preventDefault();
    if (
      newTrainingType.trim() &&
      !formData.preferredTrainingTypes.includes(newTrainingType.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        preferredTrainingTypes: [
          ...prev.preferredTrainingTypes,
          newTrainingType.trim(),
        ],
      }));
      setNewTrainingType("");
    }
  };

  const handleRemoveTrainingType = (typeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      preferredTrainingTypes: prev.preferredTrainingTypes.filter(
        (type) => type !== typeToRemove
      ),
    }));
  };

  return (
    <div className="complete-profile">
      <h2>Complete Your Fitness Profile</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <section>
          <h3>Basic Information</h3>
          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formatDateForInput(formData.dateOfBirth)}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Body Fat Percentage</label>
            <input
              type="number"
              name="bodyFatPercent"
              value={formData.bodyFatPercent}
              onChange={handleChange}
              min="1"
              max="100"
            />
          </div>
        </section>

        {/* Fitness Goals */}
        <section>
          <h3>Fitness Goals</h3>
          <div>
            <label>Fitness Goal</label>
            <select
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleChange}
              required
            >
              <option value="">Select Goal</option>
              <option value="Fat loss">Fat loss</option>
              <option value="Muscle gain">Muscle gain</option>
              <option value="Endurance">Endurance</option>
              <option value="Body recomposition">Body recomposition</option>
              <option value="Health">Health</option>
              <option value="Sports prep">Sports prep</option>
            </select>
          </div>
          <div>
            <label>Target Weight (kg)</label>
            <input
              type="number"
              name="targetWeight"
              value={formData.targetWeight}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Timeline (e.g., "3 months", "6 months")</label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        {/* Fitness Experience */}
        <section>
          <h3>Fitness Experience</h3>
          <div>
            <label>Fitness Level</label>
            <select
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label>Workout Location</label>
            <select
              name="workoutLocation"
              value={formData.workoutLocation}
              onChange={handleChange}
              required
            >
              <option value="">Select Location</option>
              <option value="Gym">Gym</option>
              <option value="Home">Home</option>
              <option value="Both">Both</option>
              <option value="Neither">Neither</option>
            </select>
          </div>
          <div>
            <label>Workout Days Per Week</label>
            <input
              type="number"
              name="workoutDaysPerWeek"
              value={formData.workoutDaysPerWeek}
              onChange={handleChange}
              min="0"
              max="7"
              required
            />
          </div>
          <div>
            <label>Diet Plan</label>
            <textarea
              name="dietPlan"
              value={formData.dietPlan}
              onChange={handleChange}
              placeholder="Describe your current diet plan"
            />
          </div>
          <div>
            <label>Medical Conditions</label>
            <textarea
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              placeholder="List any relevant medical conditions"
            />
          </div>
        </section>

        {/* Lifestyle */}
        <section>
          <h3>Lifestyle & Activity</h3>
          <div>
            <label>Activity Level</label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select Activity Level</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Lightly Active">Lightly Active</option>
              <option value="Active">Active</option>
              <option value="Very Active">Very Active</option>
            </select>
          </div>
          <div>
            <label>Sleep Hours</label>
            <input
              type="number"
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleChange}
              min="0"
              max="24"
              required
            />
          </div>
          <div>
            <label>Stress Level</label>
            <select
              name="stressLevel"
              value={formData.stressLevel}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </section>

        {/* Workout Preferences */}
        <section>
          <h3>Workout Preferences</h3>
          <div>
            <label>Focus Areas</label>
            <div className="checkbox-group">
              {[
                "Upper Body",
                "Lower Body",
                "Core",
                "Cardio",
                "Flexibility",
              ].map((area) => (
                <label key={area}>
                  <input
                    type="checkbox"
                    name="focusAreas"
                    value={area}
                    checked={formData.focusAreas.includes(area)}
                    onChange={handleChange}
                  />
                  {area}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label>Workout Duration (minutes)</label>
            <select
              name="workoutDuration"
              value={formData.workoutDuration}
              onChange={handleChange}
              required
            >
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
            </select>
          </div>
          <div>
            <label>Preferred Workout Time</label>
            <select
              name="workoutTimePreference"
              value={formData.workoutTimePreference}
              onChange={handleChange}
              required
            >
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
              <option value="No preference">No preference</option>
            </select>
          </div>
        </section>

        {/* Add this section where appropriate in your form */}
        <section>
          <h3>Training Preferences</h3>
          <div className="training-types-input">
            <label>Preferred Training Types</label>
            <div className="tag-input-container">
              <div className="tags-container">
                {formData.preferredTrainingTypes.map((type, index) => (
                  <span key={index} className="tag">
                    {type}
                    <button
                      type="button"
                      onClick={() => handleRemoveTrainingType(type)}
                      className="remove-tag"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="tag-input-form">
                <input
                  type="text"
                  value={newTrainingType}
                  onChange={(e) => setNewTrainingType(e.target.value)}
                  placeholder="Add training type (e.g., 'Weightlifting', 'Yoga')"
                />
                <button
                  type="button"
                  onClick={handleAddTrainingType}
                  className="add-tag"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </section>

        <button type="submit">Complete Profile</button>
      </form>
    </div>
  );
};
