import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export const PasswordInput = ({
  password,
  setPassword,
  onBlur,
  className,
  disabled,
  placeholder = "Enter your password",
  id = "password",
  label = "Password",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={onBlur}
          className={`pr-10 ${className || ""}`}
          disabled={disabled}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary disabled:opacity-50"
          tabIndex={-1}
          disabled={disabled}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};
