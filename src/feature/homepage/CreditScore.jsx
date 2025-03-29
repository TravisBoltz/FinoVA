export default function CreditScore() {
  // Sample credit score data
  const creditScore = 720;
  const previousScore = 705;
  const scoreChange = creditScore - previousScore;

  // Credit score gauge calculation
  const scorePercentage = (creditScore / 850) * 100;

  // Sample credit factors
  const creditFactors = [
    { name: "Payment History", score: 85, impact: "Positive" },
    { name: "Debt Utilization", score: 70, impact: "Neutral" },
    { name: "Length of History", score: 65, impact: "Neutral" },
    { name: "Credit Mix", score: 90, impact: "Very Positive" },
  ];

  // Credit alerts
  const creditAlerts = [
    { message: "New credit inquiry detected on Mar 15", severity: "medium" },
    { message: "Credit utilization decreased by 5%", severity: "positive" },
    {
      message: "On-time payment recorded for business loan",
      severity: "positive",
    },
  ];

  // Get score rating
  const getScoreRating = (score) => {
    if (score >= 800) return { label: "Excellent", color: "text-green-500" };
    if (score >= 740) return { label: "Very Good", color: "text-green-500" };
    if (score >= 670) return { label: "Good", color: "text-blue-500" };
    if (score >= 580) return { label: "Fair", color: "text-yellow-500" };
    return { label: "Poor", color: "text-red-500" };
  };

  // Get alert severity style
  const getAlertStyle = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700";
      case "positive":
        return "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700";
      default:
        return "bg-blue-100  border-blue-300 dark:border-blue-700";
    }
  };

  const { label, color } = getScoreRating(creditScore);

  return (
    <div className="p-6 space-y-6 text-black dark:text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Credit Monitoring</h1>
      </div>

      {/* Credit Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 ">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              Business Credit Score
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-6 sm:mb-0 flex flex-col items-center">
                {/* Credit Score Gauge */}
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 120 120">
                    {/* Background circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="12"
                      className="dark:stroke-gray-700"
                    />
                    {/* Score indicator */}
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="12"
                      strokeDasharray="339.292"
                      strokeDashoffset={
                        339.292 - (339.292 * scorePercentage) / 100
                      }
                      strokeLinecap="round"
                      className="dark:stroke-blue-500"
                    />
                    {/* Score value */}
                    <text
                      x="60"
                      y="60"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontSize="24"
                      fontWeight="bold"
                      fill="#3B82F6"
                      className="dark:text-blue-500"
                    >
                      {creditScore}
                    </text>
                    <text
                      x="60"
                      y="78"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontSize="12"
                      fill="#6B7280"
                      className="dark:text-gray-400"
                    >
                      out of 850
                    </text>
                  </svg>
                </div>

                <div className="text-center">
                  <div className={`text-lg font-semibold ${color} dark:text-green-400`}>
                    {label}
                  </div>
                  <div className="flex items-center justify-center mt-1">
                    <span
                      className={
                        scoreChange >= 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
                      }
                    >
                      {scoreChange >= 0 ? "+" : ""}
                      {scoreChange} pts
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 text-sm ml-1">
                      since last month
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  Score Breakdown
                </h3>
                <div className="space-y-3">
                  {creditFactors.map((factor, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{factor.name}</span>
                        <span
                          className={
                            factor.impact.includes("Positive")
                              ? "text-green-600 dark:text-green-400"
                              : factor.impact.includes("Negative")
                              ? "text-red-600 dark:text-red-400"
                              : "text-yellow-600 dark:text-yellow-400"
                          }
                        >
                          {factor.impact}
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            factor.impact.includes("Positive")
                              ? "bg-green-500 dark:bg-green-400"
                              : factor.impact.includes("Negative")
                              ? "bg-red-500 dark:bg-red-400"
                              : "bg-yellow-500 dark:bg-yellow-400"
                          }`}
                          style={{ width: `${factor.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 ">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Credit Alerts</h2>
            <div className="space-y-3">
              {creditAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg text-sm ${getAlertStyle(
                    alert.severity
                  )}`}
                >
                  {alert.message}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-center text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 font-medium">
              View All Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Credit Improvement */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 ">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Credit Improvement Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="h-5 w-5 text-yellow-600 dark:text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 ">
                    Reduce Credit Utilization
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400  mt-1">
                    Your current credit utilization is at 42%. Reducing this to
                    below 30% could improve your score by 15-25 points.
                  </p>
                  <button className="mt-3 text-sm text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 font-medium">
                    View Strategy
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="h-5 w-5 text-blue-600 dark:text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 ">
                    Establish More Trade Lines
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400  mt-1">
                    Adding 1-2 more trade references could improve your business
                    credit profile and diversify your credit mix.
                  </p>
                  <button className="mt-3 text-sm text-blue-600 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 font-medium">
                    View Strategy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 ">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Credit Score History</h2>
            <select className="text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
            </select>
          </div>

          <div className="h-64 bg-opacity-10 rounded">
            {/* Placeholder for actual chart component */}
            <div className="w-full px-5 h-full">
              <div className="relative h-56">
                {/* Credit score line chart placeholder */}
                <svg className="w-full h-full" viewBox="0 0 400 150">
                  <path
                    d="M0,100 L40,95 L80,105 L120,90 L160,80 L200,85 L240,75 L280,65 L320,60 L360,50 L400,40"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    className="dark:stroke-blue-500"
                  />
                  <path
                    d="M0,100 L40,95 L80,105 L120,90 L160,80 L200,85 L240,75 L280,65 L320,60 L360,50 L400,40"
                    fill="url(#gradient)"
                    fillOpacity="0.2"
                    stroke="none"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Month labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-2 text-xs text-gray-500 dark:text-gray-400 ">
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Report Services */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-900 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-white dark:text-gray-100 mb-2">
                Ready for a comprehensive credit report?
              </h2>
              <p className="text-indigo-100 dark:text-gray-400">
                Get a detailed analysis of your business credit profile
              </p>
            </div>
            <button className="px-6 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200">
              Get Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
