import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { PasswordInput } from "../components/custom/Password";
import Logo from "../assets/logo.png";
import { Loader2, AlertCircle, Check, X } from "lucide-react";
import { z } from "zod";

// Password strength checker
const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let strength = "weak";
  if (score >= 4) strength = "strong";
  else if (score >= 3) strength = "medium";

  return { checks, score, strength };
};

// Zod validation schema
const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .max(254, "Email is too long"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password is too long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(null);

  const validateField = (field, value) => {
    try {
      if (field === "confirmPassword") {
        // Special handling for confirm password
        registerSchema.parse({ ...formData, [field]: value });
      } else {
        registerSchema.pick({ [field]: true }).parse({ [field]: value });
      }

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.errors[0].message,
        }));
      }
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Check password strength in real-time
    if (field === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    // Real-time validation for touched fields
    if (touched[field]) {
      validateField(field, value);
    }

    // Re-validate confirm password when password changes
    if (field === "password" && touched.confirmPassword) {
      validateField("confirmPassword", formData.confirmPassword);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate entire form
      registerSchema.parse(formData);
      setErrors({});

      await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );

      navigate("/complete-profile", { replace: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({
          submit: error.message || "Registration failed. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const PasswordStrengthIndicator = ({ strength }) => {
    if (!strength) return null;

    const getColor = () => {
      switch (strength.strength) {
        case "strong":
          return "text-green-600";
        case "medium":
          return "text-yellow-600";
        default:
          return "text-red-600";
      }
    };

    const getBarColor = () => {
      switch (strength.strength) {
        case "strong":
          return "bg-green-500";
        case "medium":
          return "bg-yellow-500";
        default:
          return "bg-red-500";
      }
    };

    return (
      <div className="mt-2 space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${getBarColor()}`}
              style={{ width: `${(strength.score / 5) * 100}%` }}
            />
          </div>
          <span className={`text-xs font-medium ${getColor()}`}>
            {strength.strength.charAt(0).toUpperCase() +
              strength.strength.slice(1)}
          </span>
        </div>

        <div className="flex flex-wrap justify-between gap-1 text-xs">
          {Object.entries({
            "8+ characters": strength.checks.length,
            Lowercase: strength.checks.lowercase,
            Uppercase: strength.checks.uppercase,
            Number: strength.checks.number,
          }).map(([label, met]) => (
            <div key={label} className="flex items-center gap-1">
              {met ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <X className="w-3 h-3 text-red-500" />
              )}
              <span className={met ? "text-green-600" : "text-red-600"}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center flex flex-col items-center">
          <Link to="/" className="mb-4">
            <img src={Logo} alt="fitprompt-Logo" />
          </Link>
          <h1 className="text-2xl font-bold">Welcome to Fitprompt</h1>
          <p className="mt-1">Create your account</p>
        </div>

        {errors.submit && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">
              {errors.submit}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              onBlur={() => handleBlur("firstName")}
              className={
                errors.firstName
                  ? "border-red-500 focus:border-red-500 mt-2"
                  : "mt-2"
              }
              disabled={loading}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              onBlur={() => handleBlur("lastName")}
              className={
                errors.lastName
                  ? "border-red-500 focus:border-red-500 mt-2"
                  : "mt-2"
              }
              disabled={loading}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={
                errors.email
                  ? "border-red-500 focus:border-red-500 mt-2"
                  : "mt-2"
              }
              disabled={loading}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <PasswordInput
              id="password"
              password={formData.password}
              setPassword={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              className={
                errors.password ? "border-red-500 focus:border-red-500" : ""
              }
              disabled={loading}
              placeholder="Enter your password"
            />
            {formData.password && (
              <PasswordStrengthIndicator strength={passwordStrength} />
            )}
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <PasswordInput
              id="confirmPassword"
              password={formData.confirmPassword}
              setPassword={(value) => handleChange("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              className={
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : ""
              }
              disabled={loading}
              placeholder="Confirm your password"
              label="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || passwordStrength?.strength === "weak"}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
