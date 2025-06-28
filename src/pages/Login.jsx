import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { PasswordInput } from "../components/custom/Password";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";
import { z } from "zod";
import Logo from "../assets/logo.png";

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(128, "Password is too long"),
});

export const Login = ({ className, ...props }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateField = (field, value) => {
    try {
      loginSchema.pick({ [field]: true }).parse({ [field]: value });
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

    // Real-time validation for touched fields
    if (touched[field]) {
      validateField(field, value);
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
      loginSchema.parse(formData);
      setErrors({});

      const { user } = await login(formData.email, formData.password);
      if (!user.profileCompleted) {
        navigate("/complete-profile", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({
          submit: error.message || "Login failed. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className={cn("flex flex-col gap-6 ", className)} {...props}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Link
                to="/"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex items-center justify-center rounded-md">
                  <img src={Logo} alt="logo" />
                </div>
                <span className="sr-only">Fitprompt.</span>
              </Link>
              <h1 className="text-xl font-bold">Welcome to FitPrompt.</h1>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>

            {errors.submit && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-600">
                  {errors.submit}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={
                    errors.email ? "border-red-500 focus:border-red-500" : ""
                  }
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="grid gap-2">
                <PasswordInput
                  password={formData.password}
                  setPassword={(value) => handleChange("password", value)}
                  onBlur={() => handleBlur("password")}
                  className={
                    errors.password ? "border-red-500 focus:border-red-500" : ""
                  }
                  disabled={loading}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </div>
        </form>

        <div className="text-muted-foreground text-center text-xs text-balance">
          By clicking continue, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
};
