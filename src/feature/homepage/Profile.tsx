import React, { useState } from "react";
export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");

  const user = {
    name: "Alex Johnson",
    email: "alex@company.com",
    role: "Business Owner",
    plan: "Premium",
    joined: "January 2024",
    company: "Johnson Enterprises",
    industry: "Technology Services",
    employeeCount: "10-49",
    annualRevenue: "$1M - $5M",
    location: "New York, NY",
    preferences: {
      emailNotifications: true,
      monthlyReports: true,
      advisoryAlerts: true,
      twoFactorAuth: false,
      darkMode: false,
    },
  };

  return (
    <div className=" space-y-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
      </div>

      {/* Profile Header */}
      <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 ">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold mb-4 sm:mb-0 sm:mr-6">
              {user.name.charAt(0)}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900 ">{user.name}</h2>
              <p className="text-gray-500 ">{user.email}</p>
              <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100  text-blue-800 ">
                  {user.role}
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  {user.plan} Plan
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100  text-gray-800 dark:text-gray-200">
                  Member since {user.joined}
                </span>
              </div>
              <div className="mt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md mr-2">
                  Edit Profile
                </button>
                <button className="px-4 py-2 border border-gray-300  text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 ">
        <div className="border-b border-gray-200 ">
          <nav className="flex overflow-x-auto">
            {/* {["personal", "company", "preferences", "billing", "security"].map( */}
            {["personal", "company"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600 "
                    : "text-gray-500  hover:text-gray-700 dark:hover:text-gray-300"
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
              <h3 className="text-lg font-medium text-gray-900 ">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300   text-gray-900  px-3 py-2"
                    defaultValue={user.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-300   text-gray-900  px-3 py-2"
                    defaultValue={user.email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-gray-300   text-gray-900  px-3 py-2"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300   text-gray-900  px-3 py-2"
                    defaultValue={user.role}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md mr-2">
                  Save Changes
                </button>
                <button className="px-4 py-2 border border-gray-300  text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeTab === "company" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 ">
                Company Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300   text-gray-900  px-3 py-2"
                    defaultValue={user.company}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Industry
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300   text-gray-900  px-3 py-2"
                    defaultValue={user.industry}
                  >
                    <option>Technology Services</option>
                    <option>Retail</option>
                    <option>Manufacturing</option>
                    <option>Healthcare</option>
                    <option>Financial Services</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Company Size
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300   text-gray-900  px-3 py-2"
                    defaultValue={user.employeeCount}
                  >
                    <option>1-9</option>
                    <option>10-49</option>
                    <option>50-199</option>
                    <option>200-999</option>
                    <option>1000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Annual Revenue
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300   text-gray-900  px-3 py-2"
                    defaultValue={user.annualRevenue}
                  >
                    <option>Under $100K</option>
                    <option>$100K - $500K</option>
                    <option>$500K - $1M</option>
                    <option>$1M - $5M</option>
                    <option>$5M - $25M</option>
                    <option>$25M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Business Address
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300   text-gray-900  px-3 py-2"
                    defaultValue={user.location}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Tax ID / EIN
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300   text-gray-900  px-3 py-2"
                    placeholder="XX-XXXXXXX"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md mr-2">
                  Save Changes
                </button>
                <button className="px-4 py-2 border border-gray-300  text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
