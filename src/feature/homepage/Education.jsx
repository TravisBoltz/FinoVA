import { useState } from "react";
export default function Education() {
  const [, setCurrentModule] = useState(null);

  // Sample education modules
  const modules = [
    {
      id: 1,
      title: "Budgeting Basics",
      description:
        "Learn fundamental budgeting techniques to optimize cash flow",
      progress: 100,
      lessons: 5,
      duration: "45 min",
      category: "Finance Fundamentals",
    },
    {
      id: 2,
      title: "Effective Record-Keeping",
      description:
        "Establish efficient systems for financial record management",
      progress: 75,
      lessons: 4,
      duration: "35 min",
      category: "Finance Fundamentals",
    },
    {
      id: 3,
      title: "Cash Flow Management",
      description: "Strategies to improve and maintain positive cash flow",
      progress: 30,
      lessons: 6,
      duration: "50 min",
      category: "Advanced Finance",
    },
    {
      id: 4,
      title: "Tax Planning Strategies",
      description: "Learn effective approaches to minimize tax liability",
      progress: 0,
      lessons: 7,
      duration: "60 min",
      category: "Advanced Finance",
    },
    {
      id: 5,
      title: "Investment Fundamentals",
      description:
        "Understanding basic investment principles for business growth",
      progress: 0,
      lessons: 8,
      duration: "70 min",
      category: "Investment",
    },
    {
      id: 6,
      title: "Debt Management",
      description:
        "Strategies for managing and reducing business debt effectively",
      progress: 0,
      lessons: 5,
      duration: "40 min",
      category: "Advanced Finance",
    },
  ];

  // Recommended webinars
  const webinars = [
    {
      title: "Future-Proofing Your Business Finances",
      date: "April 5, 2025",
      time: "2:00 PM EST",
      instructor: "Jane Smith, CPA",
      registered: true,
    },
    {
      title: "Tax Strategies for Small Businesses",
      date: "April 12, 2025",
      time: "1:00 PM EST",
      instructor: "Michael Johnson, Tax Advisor",
      registered: false,
    },
    {
      title: "Scaling Your Business: Financial Considerations",
      date: "April 19, 2025",
      time: "11:00 AM EST",
      instructor: "Sarah Williams, MBA",
      registered: false,
    },
  ];

  return (
    <div className="p-6 space-y-6 text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Education</h1>
      </div>

      {/* Learning Progress */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 ">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Your Learning Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50  bg-opacity-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                Completed
              </h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">1</p>
              <p className="text-sm text-gray-500 ">Module</p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900 bg-opacity-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                In Progress
              </h3>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                2
              </p>
              <p className="text-sm text-gray-500 ">Modules</p>
            </div>

            <div className="bg-gray-100  rounded-lg p-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                Not Started
              </h3>
              <p className="text-2xl font-bold text-gray-600  mt-1">3</p>
              <p className="text-sm text-gray-500 ">Modules</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900 bg-opacity-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">
                Overall Progress
              </h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                35%
              </p>
              <p className="text-sm text-gray-500 ">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Modules */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 ">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Learning Modules</h2>
            <div className="flex items-center">
              <select className="text-sm rounded-md border border-gray-300  bg-white  text-gray-700 dark:text-gray-200 px-3 py-1">
                <option>All Categories</option>
                <option>Finance Fundamentals</option>
                <option>Advanced Finance</option>
                <option>Investment</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modules.map((module) => (
              <div
                key={module.id}
                className="border border-gray-200  rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className="h-2 bg-blue-600"
                  style={{ width: `${module.progress}%` }}
                ></div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 ">
                      {module.title}
                    </h3>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100  text-blue-800 ">
                      {module.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500  mt-1 mb-3">
                    {module.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500  mb-3">
                    <span>{module.lessons} lessons</span>
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 ">
                      {module.progress}% complete
                    </span>
                    <button
                      onClick={() => setCurrentModule(module.id)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        module.progress === 100
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : module.progress > 0
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          : "bg-blue-100  text-blue-800 "
                      }`}
                    >
                      {module.progress === 100
                        ? "Completed"
                        : module.progress > 0
                        ? "Continue"
                        : "Start"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Webinars */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 ">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Webinars</h2>
          <div className="space-y-4">
            {webinars.map((webinar, index) => (
              <div
                key={index}
                className="border border-gray-200  rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="mb-3 sm:mb-0">
                  <h3 className="font-medium text-gray-900 ">
                    {webinar.title}
                  </h3>
                  <p className="text-sm text-gray-500  mt-1">
                    {webinar.date} at {webinar.time}
                  </p>
                  <p className="text-sm text-gray-500 ">
                    Instructor: {webinar.instructor}
                  </p>
                </div>
                <button
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    webinar.registered
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {webinar.registered ? "Registered" : "Register Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Tips & Resources */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 ">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Financial Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Financial Calculators",
                description:
                  "Interactive tools to help with financial planning and analysis",
                icon: "calculator",
              },
              {
                title: "Template Library",
                description:
                  "Download pre-built templates for budgeting, forecasting, and more",
                icon: "document",
              },
              {
                title: "Expert Articles",
                description:
                  "Insights and advice from financial professionals on key topics",
                icon: "book",
              },
            ].map((resource, index) => (
              <div
                key={index}
                className="border border-gray-200  rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="h-10 w-10 rounded-full bg-blue-100  flex items-center justify-center mb-3">
                  <svg
                    className="h-5 w-5 text-blue-600 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 ">{resource.title}</h3>
                <p className="text-sm text-gray-500  mt-1">
                  {resource.description}
                </p>
                <button className="mt-3 text-sm text-blue-600 hover:text-blue-800  font-medium">
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
