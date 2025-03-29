"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import { Loader2 } from "lucide-react";
import "aos/dist/aos.css";
import React from "react";

// Import separated components
import SignIn from "@/components/authentication/SignIn";
import SignUp from "@/components/authentication/SignUp";
import { DashboardPreview } from "@/components/authentication/RHS";
import { useNavigate } from "react-router-dom";

// Main Auth Container Component
const AuthContainer = () => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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

      // Check if user is already authenticated
      const token = localStorage.getItem("auth_token");
      if (token) {
        setIsAuthenticated(true);
      }
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
          <Loader2
            size={48}
            className="animate-spin text-indigo-600 mx-auto mb-4"
          />
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
          <SignIn
            onSwitchToSignUp={() => setAuthMode("signup")}
            onAuthSuccess={() => setIsAuthenticated(true)}
          />
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
