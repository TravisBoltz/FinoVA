import { useState, useEffect } from "react";
import AOS from "aos";
import { Mail, User, Lock } from "lucide-react";
import { AuthFooter } from "./AuthFooter";
import "aos/dist/aos.css";
import React from "react";
import { z } from "zod";

// Importing shared components
import { LoadingButton } from "@/feature/auth/authShared";
import { InputField } from "@/feature/auth/authShared";
import { SocialLogin } from "@/feature/auth/authShared";

// Define Zod schema for signup validation
const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
});

// Type for form data based on Zod schema
type SignupFormData = z.infer<typeof signupSchema>;

interface SignUpProps {
  onSwitchToSignIn: () => void;
}

const SignUp = ({ onSwitchToSignIn }: SignUpProps) => {
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
      const apiUrl = "https://e5ed-102-208-89-6.ngrok-free.app/api/v1/auth"; // Fallback URL for authentication

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

export default SignUp;
