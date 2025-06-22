export function generateWorkoutPrompt(user) {
  const age = new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear();

  return (
    `Generate a detailed workout plan for a ${user.gender} with the following characteristics:\n` +
    `- Age: ${age} years\n` +
    `- Height: ${user.height} cm\n` +
    `- Weight: ${user.weight} kg\n` +
    `- Target Weight: ${user.targetWeight} kg\n` +
    `- Body Fat Percentage: ${user.bodyFatPercent}%\n` +
    `- Fitness Level: ${user.fitnessLevel}\n` +
    `- Fitness Goal: ${user.fitnessGoal}\n` +
    `- Activity Level: ${user.activityLevel}\n` +
    `- Preferred Training Types: ${user.preferredTrainingTypes.join(", ")}\n` +
    `- Focus Areas: ${user.focusAreas.join(", ")}\n` +
    `- Workout Duration: ${user.workoutDuration} minutes\n` +
    `- Workout Days Per Week: ${user.workoutDaysPerWeek}\n` +
    `- Workout Location: ${user.workoutLocation}\n` +
    `- Workout Time Preference: ${user.workoutTimePreference}\n` +
    `- Diet Plan: ${user.dietPlan}\n` +
    `- Medical Conditions: ${user.medicalConditions}\n` +
    `- Sleep Hours: ${user.sleepHours} per night\n` +
    `- Stress Level: ${user.stressLevel}\n` +
    `- Timeline to Reach Goal: ${user.timeline}\n\n` +

    `Please generate a structured workout plan in JSON format. The plan must follow these rules:\n` +
    `- Always include all 7 days of the week, starting from Sunday to Saturday.\n` +
    `- Sunday should always be a rest day with an empty exercise list.\n` +
    `- For the remaining 6 days, assign workouts to only ${user.workoutDaysPerWeek} best-suited days, and mark the rest as rest days.\n` +
    `- Each workout day must include 5 to 6 exercises.\n` +
    `- Each exercise must have name, sets, reps (as string), and notes.\n\n` +

    `Return the result in the following JSON format:\n` +
    `{\n` +
    `  "weeklySchedule": [\n` +
    `    {\n` +
    `      "day": "Sunday",\n` +
    `      "focus": "Rest Day",\n` +
    `      "exercises": []\n` +
    `    },\n` +
    `    {\n` +
    `      "day": "Monday",\n` +
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
    `    // ... repeat for all days up to Saturday\n` +
    `  ]\n` +
    `}`
  );
}

