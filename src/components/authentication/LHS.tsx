"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import { Eye, EyeOff, Mail, User, Lock, ArrowRight, Loader2 } from "lucide-react";
import { AuthFooter } from "./AuthFooter";
import "aos/dist/aos.css";
import { DashboardPreview } from "./RHS";
import React from "react";
import { z } from "zod";

// Define Zod schema for signup validation
const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});

// Type for form data based on Zod schema
type SignupFormData = z.infer<typeof signupSchema>;

interface FormData {
  name?: string;
  email: string;
  password: string;
}

// Loading Button Component
const LoadingButton = ({ 
  isLoading, 
  loadingText, 
  buttonText, 
  onClick = undefined,
  type = "submit"
}: { 
  isLoading: boolean; 
  loadingText: string; 
  buttonText: string; 
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) => (
  <button
    type={type as "button" | "submit" | "reset"}
    className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center dark:bg-indigo-700 dark:hover:bg-indigo-600 ${
      isLoading ? "opacity-80 cursor-not-allowed" : ""
    }`}
    disabled={isLoading}
    onClick={onClick}
  >
    {isLoading ? (
      <span className="flex items-center">
        <Loader2 size={18} className="mr-2 animate-spin" />
        {loadingText}
      </span>
    ) : (
      <span className="flex items-center">
        {buttonText}
        <ArrowRight size={18} className="ml-2" />
      </span>
    )}
  </button>
);

// Input Field Component
const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  autoComplete,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword = undefined,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  icon: React.ElementType;
  autoComplete?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}) => (
  <div className="mb-5">
    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon size={18} className="text-gray-400" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-10 px-4 py-3 border ${
          error ? "border-red-500" : "border-gray-300 dark:border-gray-700"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white transition duration-200`}
        autoComplete={autoComplete}
      />
      {showPasswordToggle && onTogglePassword && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          onClick={onTogglePassword}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Social Login Component
const SocialLogin = ({
  isSignIn,
  delay = 500,
  isLoading = false,
}: {
  isSignIn: boolean;
  delay?: number;
  isLoading?: boolean;
}) => (
  <>
    <div
      className="flex items-center my-6"
      data-aos="fade-up"
      data-aos-delay={delay - 50}
    >
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      <span className="mx-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
        OR CONTINUE WITH
      </span>
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
    </div>

    <div className="mb-6" data-aos="fade-up" data-aos-delay={delay}>
      <button
        disabled={isLoading}
        className={`w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white transition duration-200 ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <span className="flex items-center">
            <Loader2 size={20} className="animate-spin mr-2" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Connecting...
            </span>
          </span>
        ) : (
          <>
            <img
              src="/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="mr-2"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {isSignIn ? "Sign in with Google" : "Register with Google"}
            </span>
          </>
        )}
      </button>
    </div>
  </>
);

// Sign In Component
const SignIn = ({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [socialLoading, setSocialLoading] = useState<boolean>(false);

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

      // Use the same base URL as register but with /login endpoint
      const apiUrl = "";

      console.log("Using API URL:", apiUrl);

      // Simulate API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actual API call
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Handle successful login (e.g., store token, redirect)
      // This would typically redirect to a dashboard or home page
    } catch (error) {
      console.error("Error during login:", error);
      setErrors({
        email: "Login failed. Please check your credentials and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = () => {
    setSocialLoading(true);
    // Simulate social login process
    setTimeout(() => {
      setSocialLoading(false);
    }, 2000);
  };

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

      <SocialLogin isSignIn={true} isLoading={socialLoading} />
      <AuthFooter />
    </div>
  );
};

// Sign Up Component
const SignUp = ({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [socialLoading, setSocialLoading] = useState<boolean>(false);

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
    if (errors[name as keyof SignupFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data using Zod
    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      // Extract and format validation errors
      const formattedErrors: Partial<Record<keyof SignupFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const path = error.path[0] as keyof SignupFormData;
        formattedErrors[path] = error.message;
      });
      setErrors(formattedErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Registering with:", formData);

      // Use a hardcoded URL for authentication
      const apiUrl = ""; // Fallback URL for authentication

      console.log("Using API URL:", apiUrl);

      // Simulate API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actual API call
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      onSwitchToSignIn();
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors({
        email: "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = () => {
    setSocialLoading(true);
    // Simulate social login process
    setTimeout(() => {
      setSocialLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <h2
        className="text-3xl font-bold mb-2 dark:text-white"
        data-aos="fade-up"
      >
        Get Started
      </h2>
      <p
        className="text-gray-600 dark:text-gray-400 mb-8"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Create your account and access the Finova dashboard
      </p>

      <form onSubmit={handleSubmit}>
        {/* First Name Field */}
        <div data-aos="fade-up" data-aos-delay="150">
          <InputField
            label="First Name"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            error={errors.first_name}
            icon={User}
            autoComplete="given-name"
          />
        </div>

        {/* Last Name Field */}
        <div data-aos="fade-up" data-aos-delay="150">
          <InputField
            label="Last Name"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Enter your last name"
            error={errors.last_name}
            icon={User}
            autoComplete="family-name"
          />
        </div>

        {/* Email Field */}
        <div data-aos="fade-up" data-aos-delay="200">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            error={errors.email}
            icon={Mail}
            autoComplete="email"
          />
        </div>

        {/* Password Field */}
        <div data-aos="fade-up" data-aos-delay="250">
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            error={errors.password}
            icon={Lock}
            autoComplete="new-password"
            showPasswordToggle={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </div>

        {/* Action Button */}
        <div data-aos="fade-up" data-aos-delay="350">
          <LoadingButton 
            isLoading={isSubmitting} 
            loadingText="Creating Account..." 
            buttonText="Create Account" 
          />
        </div>
      </form>

      {/* Toggle Auth Mode Link */}
      <div
        className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Already have an account?{" "}
        <button
          onClick={onSwitchToSignIn}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
        >
          Sign in instead
        </button>
      </div>

      <SocialLogin isSignIn={false} isLoading={socialLoading} />
      <AuthFooter />
    </div>
  );
};

// Main Auth Container Component
const AuthContainer = () => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize AOS and handle initial loading state
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Simulate initial page load
      setTimeout(() => setLoading(false), 800);
      
      AOS.init({
        duration: 800,
        once: false,
        mirror: true,
      });
    }
  }, []);

  // Dashboard tab rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading Finova...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full transition-colors duration-300">
      {/* Left Panel - Auth Form */}
      <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col justify-center">
        {authMode === "signin" ? (
          <SignIn onSwitchToSignUp={() => setAuthMode("signup")} />
        ) : (
          <SignUp onSwitchToSignIn={() => setAuthMode("signin")} />
        )}
      </div>

      {/* Right Panel - Dashboard Preview */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-gray-900 p-10 flex-col justify-center items-center">
        <DashboardPreview activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default AuthContainer;