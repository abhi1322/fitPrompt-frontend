import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import {
  User,
  Target,
  Dumbbell,
  Calendar,
  Activity,
  Heart,
  Clock,
} from "lucide-react";

export const CompleteProfile = () => {
  const navigate = useNavigate();
  const { token, setUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newTrainingType, setNewTrainingType] = useState("");
  const API_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  // Only include essential form fields that users should fill
  const [formData, setFormData] = useState({
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    bodyFatPercent: "",
    fitnessGoal: "",
    targetWeight: "",
    timeline: "",
    fitnessLevel: "",
    workoutLocation: "",
    workoutDaysPerWeek: "",
    preferredTrainingTypes: [],
    dietPlan: "",
    medicalConditions: "",
    activityLevel: "",
    sleepHours: "",
    stressLevel: "Medium",
    focusAreas: [],
    workoutDuration: "30",
    workoutTimePreference: "Morning",
  });

  const formatDateForInput = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BACKEND_URL}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          // Only update form fields that exist in our formData structure
          const filteredData = Object.keys(formData).reduce((acc, key) => {
            if (data[key] !== undefined) {
              acc[key] =
                key === "dateOfBirth" && data[key]
                  ? formatDateForInput(data[key])
                  : data[key];
            }
            return acc;
          }, {});

          setFormData((prevData) => ({
            ...prevData,
            ...filteredData,
          }));
        }
      } catch (err) {
        setError("Failed to fetch user data", err?.message);
      }
    };
    fetchUserData();
  }, [token, API_BACKEND_URL, formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BACKEND_URL}/api/user/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      const userResponse = await fetch(`${API_BACKEND_URL}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await userResponse.json();
      if (userResponse.ok) {
        setUser(userData);
      }

      // Navigate to dashboard with replace to prevent going back to profile form
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleFocusAreaChange = (area) => {
    const updated = formData.focusAreas.includes(area)
      ? formData.focusAreas.filter((item) => item !== area)
      : [...formData.focusAreas, area];
    setFormData({ ...formData, focusAreas: updated });
  };

  const addTrainingType = () => {
    if (
      newTrainingType.trim() &&
      !formData.preferredTrainingTypes.includes(newTrainingType.trim())
    ) {
      setFormData({
        ...formData,
        preferredTrainingTypes: [
          ...formData.preferredTrainingTypes,
          newTrainingType.trim(),
        ],
      });
      setNewTrainingType("");
    }
  };

  const removeTrainingType = (typeToRemove) => {
    setFormData({
      ...formData,
      preferredTrainingTypes: formData.preferredTrainingTypes.filter(
        (type) => type !== typeToRemove
      ),
    });
  };

  const formatLabel = (key) => {
    const labelMap = {
      dateOfBirth: "Date of Birth",
      bodyFatPercent: "Body Fat Percentage (%)",
      fitnessGoal: "Fitness Goal",
      targetWeight: "Target Weight (kg)",
      fitnessLevel: "Fitness Level",
      workoutLocation: "Workout Location",
      workoutDaysPerWeek: "Workout Days Per Week",
      preferredTrainingTypes: "Preferred Training Types",
      dietPlan: "Diet Plan",
      medicalConditions: "Medical Conditions",
      activityLevel: "Activity Level",
      sleepHours: "Sleep Hours",
      stressLevel: "Stress Level",
      focusAreas: "Focus Areas",
      workoutDuration: "Workout Duration (minutes)",
      workoutTimePreference: "Workout Time Preference",
    };
    return (
      labelMap[key] ||
      key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
    );
  };

  const renderField = (key) => {
    const value = formData[key];
    const commonProps = {
      id: key,
      value: value || "",
      onChange: (e) => handleInputChange(key, e.target.value),
    };

    // Textarea fields
    if (["dietPlan", "medicalConditions"].includes(key)) {
      return (
        <Textarea
          {...commonProps}
          placeholder={`Enter your ${formatLabel(key).toLowerCase()}...`}
          rows={3}
        />
      );
    }

    // Date field
    if (key === "dateOfBirth") {
      return <Input type="date" {...commonProps} />;
    }

    // Number fields
    if (
      [
        "height",
        "weight",
        "bodyFatPercent",
        "targetWeight",
        "workoutDaysPerWeek",
        "sleepHours",
      ].includes(key)
    ) {
      const placeholders = {
        height: "Height in cm",
        weight: "Weight in kg",
        bodyFatPercent: "Body fat %",
        targetWeight: "Target weight in kg",
        workoutDaysPerWeek: "Days per week",
        sleepHours: "Hours per night",
      };
      return (
        <Input type="number" {...commonProps} placeholder={placeholders[key]} />
      );
    }

    // Select fields
    const selectOptions = {
      gender: ["Male", "Female", "Non-binary", "Prefer not to say"],
      fitnessGoal: [
        "Fat loss",
        "Muscle gain",
        "Endurance",
        "Body recomposition",
        "Health",
        "Sports prep",
      ],
      timeline: ["1 month", "3 months", "6 months", "1 year", "Long term"],
      fitnessLevel: ["Beginner", "Intermediate", "Advanced"],
      workoutLocation: ["Gym", "Home", "Both", "Outdoor"],
      activityLevel: ["Sedentary", "Lightly Active", "Active", "Very Active"],
      stressLevel: ["Low", "Medium", "High"],
      workoutDuration: ["30", "45", "60", "90"],
      workoutTimePreference: [
        "Morning",
        "Afternoon",
        "Evening",
        "No preference",
      ],
    };

    if (selectOptions[key]) {
      return (
        <Select
          value={value}
          onValueChange={(newValue) => handleInputChange(key, newValue)}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={`Select ${formatLabel(key).toLowerCase()}`}
            />
          </SelectTrigger>
          <SelectContent>
            {selectOptions[key].map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        type="text"
        {...commonProps}
        placeholder={`Enter ${formatLabel(key).toLowerCase()}`}
      />
    );
  };

  const focusAreaOptions = [
    "Upper Body",
    "Lower Body",
    "Core",
    "Cardio",
    "Flexibility",
  ];

  return (
    <div className="min-h-screen bg-[#111] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-3xl font-bold text-neutral-400">
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-sm text-neutral-600">
              Help us personalize your fitness journey by providing some details
              about yourself
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-700 bg-red-900">
                <AlertDescription className="text-black">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-semibold text-neutral-400">
                    Personal Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "gender",
                    "dateOfBirth",
                    "height",
                    "weight",
                    "bodyFatPercent",
                  ].map((key) => (
                    <div key={key} className="space-y-2">
                      <Label
                        htmlFor={key}
                        className="text-sm font-medium text-neutral-700"
                      >
                        {formatLabel(key)}
                      </Label>
                      {renderField(key)}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Fitness Goals */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-semibold text-neutral-600">
                    Fitness Goals
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "fitnessGoal",
                    "targetWeight",
                    "timeline",
                    "fitnessLevel",
                  ].map((key) => (
                    <div key={key} className="space-y-2">
                      <Label
                        htmlFor={key}
                        className="text-sm font-medium text-neutral-700"
                      >
                        {formatLabel(key)}
                      </Label>
                      {renderField(key)}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Workout Preferences */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Dumbbell className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-semibold text-neutral-600">
                    Workout Preferences
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "workoutLocation",
                    "workoutDaysPerWeek",
                    "workoutDuration",
                    "workoutTimePreference",
                  ].map((key) => (
                    <div key={key} className="space-y-2">
                      <Label
                        htmlFor={key}
                        className="text-sm font-medium text-neutral-700"
                      >
                        {formatLabel(key)}
                      </Label>
                      {renderField(key)}
                    </div>
                  ))}
                </div>

                {/* Focus Areas */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-neutral-600">
                    Focus Areas
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {focusAreaOptions.map((area) => (
                      <label
                        key={area}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.focusAreas.includes(area)}
                          onChange={() => handleFocusAreaChange(area)}
                          className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-neutral-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preferred Training Types */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-neutral-700">
                    Preferred Training Types
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.preferredTrainingTypes.map((type) => (
                      <Badge
                        key={type}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {type}
                        <button
                          type="button"
                          onClick={() => removeTrainingType(type)}
                          className="ml-2 text-neutral-500 hover:text-neutral-700"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTrainingType}
                      onChange={(e) => setNewTrainingType(e.target.value)}
                      placeholder="Add training type (e.g., Yoga, HIIT, Swimming)"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addTrainingType())
                      }
                    />
                    <Button
                      type="button"
                      onClick={addTrainingType}
                      variant="outline"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Lifestyle & Health */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-red-600" />
                  <h3 className="text-xl font-semibold text-neutral-600">
                    Lifestyle & Health
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["activityLevel", "sleepHours", "stressLevel"].map((key) => (
                    <div key={key} className="space-y-2">
                      <Label
                        htmlFor={key}
                        className="text-sm font-medium text-neutral-700"
                      >
                        {formatLabel(key)}
                      </Label>
                      {renderField(key)}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="dietPlan"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Diet Plan
                  </Label>
                  {renderField("dietPlan")}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="medicalConditions"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Medical Conditions
                  </Label>
                  {renderField("medicalConditions")}
                  <p className="text-xs text-neutral-500">
                    Please list any medical conditions, injuries, or physical
                    limitations we should know about
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-orange-400 hover:bg-orange-300 text-black py-3 text-lg font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving Profile...
                    </div>
                  ) : (
                    "Complete Profile"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
