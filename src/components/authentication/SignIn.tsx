import { useState, useEffect } from "react";
import AOS from "aos";
import { Mail, Lock } from "lucide-react";
import { AuthFooter } from "./AuthFooter";
import "aos/dist/aos.css";
import React from "react";
import Home from "@/feature/homepage/Home";
import { useAuth } from "@/contexts/AuthContext";

// Importing shared components
import { LoadingButton } from "@/feature/auth/authShared";
import { InputField } from "@/feature/auth/authShared";
import { SocialLogin } from "@/feature/auth/authShared";

interface FormData {
  email: string;
  password: string;
}

interface SignInProps {
  onSwitchToSignUp: () => void;
  onAuthSuccess?: () => void;
}

const SignIn = ({ onSwitchToSignUp, onAuthSuccess }: SignInProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [socialLoading, setSocialLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { login } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined" && AOS.refresh) {
      AOS.refresh();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Signing in with:", formData);

      const response = await login(formData.email, formData.password);

      if (response.success) {
        setIsAuthenticated(true);
        onAuthSuccess?.();
      } else {
        setErrors({
          email: response.error,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({
        email: "Login failed. Please check your credentials and try again.",
      });
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Home />;
  }

  return (
    <div className="max-w-md mx-auto w-full">
      <h2
        className="text-3xl font-bold mb-2 dark:text-white"
        data-aos="fade-up"
      >
        Welcome Back
      </h2>
      <p
        className="text-gray-600 dark:text-gray-400 mb-8"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Sign in to access your Finova dashboard
      </p>

      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div data-aos="fade-up" data-aos-delay="200">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            error={errors?.email}
            icon={Mail}
            autoComplete="email"
          />
        </div>

        {/* Password Field */}
        <div data-aos="fade-up" data-aos-delay="250">
          <div className="flex justify-between mb-2">
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              Password
            </label>
            <a
              href="#"
              className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              Forgot Password?
            </a>
          </div>
          <InputField
            label=""
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            error={errors?.password}
            icon={Lock}
            autoComplete="current-password"
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* Action Button */}
        <div data-aos="fade-up" data-aos-delay="300">
          <LoadingButton
            isLoading={isSubmitting}
            loadingText="Signing in..."
            buttonText="Sign In"
          />
        </div>
      </form>

      {/* Toggle Auth Mode Link */}
      <div
        className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Don&apos;t have an account?{" "}
        <button
          onClick={onSwitchToSignUp}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
        >
          Create account
        </button>
      </div>

      <div className="mb-8">
        <SocialLogin
          isSignIn={true}
          delay={500}
          isLoading={socialLoading}
          onAuthSuccess={() => {
            setIsAuthenticated(true);
            onAuthSuccess?.();
          }}
        />
      </div>
      <AuthFooter />
    </div>
  );
};

export default SignIn;
