import { useState, useEffect } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback user data structure
  const fallbackUserData = {
    id: "f370b932-719f-49b4-8224-e8f12bff9029",
    first_name: "Faridu",
    last_name: "Musah",
    email: "travisboltz@gmail.com",
    avatar_url: null,
  };

  // Additional user data not provided by API
  const additionalUserData = {
    role: "Business Owner",
    plan: "Premium",
    joined: "January 2024",
    company: "Johnson Enterprises",
    industry: "Technology Services",
    employeeCount: "10-49",
    annualRevenue: "GH¢1M - GH¢5M",
    location: "New York, NY",
    preferences: {
      emailNotifications: true,
      monthlyReports: true,
      advisoryAlerts: true,
      twoFactorAuth: false,
      darkMode: false,
    },
  };

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Try to fetch from API first
        try {
          const storedToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjM3MGI5MzItNzE5Zi00OWI0LTgyMjQtZThmMTJiZmY5MDI5IiwiZXhwIjoxNzQzMzMyOTA2LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzQzMzMyMzA2fQ.w1cSYhDvKhAH3l1-XtlTQlfbgIkt7MOLVFzY7d8LHcQ";
          const userId = "f370b932-719f-49b4-8224-e8f12bff9029";

          // Set a timeout to prevent hanging on API requests
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

          const response = await fetch(
            `https://e5ed-102-208-89-6.ngrok-free.app/api/v1/auth/user/${userId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              credentials: "include", // Include cookies with the request
              signal: controller.signal,
            }
          );

          clearTimeout(timeoutId);

          // Check if the response is JSON by examining the content-type header
          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            // If not JSON, handle as text error but don't show the full HTML to the user
            await response.text(); // Consume the response
            throw new Error("API returned non-JSON response");
          }

          if (!response.ok) {
            throw new Error(
              `API request failed with status ${response.status}`
            );
          }

          const result = await response.json();

          if (result.status === "success" && result.data) {
            setApiResponse(result);
            setError(null); // Clear any previous errors
            setLoading(false);
            return; // Exit early if API call was successful
          } else {
            throw new Error("Invalid API response format");
          }
        } catch (apiError) {
          // Log the specific API error but continue to use fallback data
          console.warn("API request failed:", apiError.message);
          throw new Error("Could not connect to API. Using fallback data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);

        // Set a more user-friendly error message
        if (
          error.message.includes("HTML") ||
          error.message.includes("non-JSON")
        ) {
          setError(
            "The API is currently unavailable. Using fallback data instead."
          );
        } else if (error.message.includes("abort")) {
          setError("Request timed out. Using fallback data instead.");
        } else {
          setError(`Could not retrieve user data: ${error.message}`);
        }

        // Create fallback response in the same format as the API
        setApiResponse({
          status: "success",
          status_code: 200,
          message: "Using fallback user data",
          data: fallbackUserData,
        });
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Get user data from API response or use fallback
  const userData = apiResponse?.data || fallbackUserData;

  if (loading) {
    return (
      <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile & Settings</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile & Settings</h1>
      </div>

      {/* Error notification at the top if there's an error */}
      {error && (
        <div
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4"
          role="alert"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold mb-4 sm:mb-0 sm:mr-6">
              {userData.first_name.charAt(0)}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {`${userData.first_name} ${userData.last_name}`}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {userData.email}
              </p>
              <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                  {additionalUserData.role}
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300">
                  {additionalUserData.plan} Plan
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                  Member since {new Date().getFullYear()}
                </span>
              </div>
              <div className="mt-4">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto">
            {/* {["personal", "company", "preferences", "billing", "security"].map( */}
            {["personal", "company", "preferences"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-500"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Info
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "personal" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Personal Information
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-1  gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        First Name
                      </h4>
                      <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {userData.first_name}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Last Name
                      </h4>
                      <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {userData.last_name}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Email Address
                      </h4>
                      <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {userData.email}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        User ID
                      </h4>
                      <p className="text-base font-medium text-gray-900 dark:text-gray-100 truncate">
                        {userData.id}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "company" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Company Information
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Company Name
                      </h4>
                      <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {additionalUserData.company}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Industry
                      </h4>
                      <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {additionalUserData.industry}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Company Size
                      </h4>
                      <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {additionalUserData.employeeCount}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Annual Revenue
                      </h4>
                      <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {additionalUserData.annualRevenue}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Business Address
                  </h4>
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {additionalUserData.location}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-md mr-2">
                  Edit Company Info
                </button>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Preferences
              </h3>
              <div className="space-y-4">
                {[
                  {
                    id: "emailNotifications",
                    label: "Email Notifications",
                    description:
                      "Receive email notifications about account activity and updates",
                  },
                  {
                    id: "monthlyReports",
                    label: "Monthly Reports",
                    description:
                      "Receive monthly financial reports and summaries",
                  },
                  {
                    id: "advisoryAlerts",
                    label: "Advisory Alerts",
                    description:
                      "Get notified about new financial opportunities and risks",
                  },
                  {
                    id: "twoFactorAuth",
                    label: "Two-Factor Authentication",
                    description:
                      "Add an extra layer of security to your account",
                  },
                  {
                    id: "darkMode",
                    label: "Dark Mode",
                    description: "Use dark theme for the interface",
                  },
                ].map((pref) => (
                  <div
                    key={pref.id}
                    className="flex items-start bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div
                        className={`h-5 w-5 rounded-full ${
                          additionalUserData.preferences[pref.id]
                            ? "bg-green-500"
                            : "bg-gray-300 dark:bg-gray-600"
                        } flex items-center justify-center`}
                      >
                        {additionalUserData.preferences[pref.id] && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {pref.label}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {pref.description}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        Status:{" "}
                        {additionalUserData.preferences[pref.id] ? (
                          <span className="text-green-600 dark:text-green-400">
                            Enabled
                          </span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">
                            Disabled
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-md mr-2">
                  Edit Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
