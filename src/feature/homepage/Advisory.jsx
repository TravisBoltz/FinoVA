import { useState } from "react";
export default function Advisory() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Advisory data
  const advisories = [
    {
      id: 1,
      title: "Increase your emergency fund",
      description:
        "Based on your current expenses, we recommend increasing your emergency fund to cover 6 months of expenses.",
      impact: "high",
      category: "savings",
      date: "Mar 20, 2025",
    },
    {
      id: 2,
      title: "Consider refinancing your business loan",
      description:
        "Current rates are 1.5% lower than your existing loan. Refinancing could save approximately $12,000 over the loan term.",
      impact: "high",
      category: "debt",
      date: "Mar 18, 2025",
    },
    {
      id: 3,
      title: "Optimize your tax deductions",
      description:
        "Your business may qualify for additional tax deductions. Schedule a consultation with a tax professional.",
      impact: "medium",
      category: "tax",
      date: "Mar 15, 2025",
    },
    {
      id: 4,
      title: "Diversify your investment portfolio",
      description:
        "Your portfolio is heavily weighted in technology stocks. Consider diversifying to reduce sector-specific risk.",
      impact: "medium",
      category: "investment",
      date: "Mar 12, 2025",
    },
    {
      id: 5,
      title: "Review your insurance coverage",
      description:
        "Your business has grown significantly but your liability insurance hasn't been updated in 2 years.",
      impact: "low",
      category: "insurance",
      date: "Mar 10, 2025",
    },
  ];

  const filteredAdvisories =
    selectedCategory === "all"
      ? advisories
      : advisories.filter((a) => a.category === selectedCategory);

  // Get impact badge style
  const getImpactBadge = (impact) => {
    switch (impact) {
      case "high":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300";
      case "low":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Advisory</h1>
      </div>

      {/* Advisory Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Advisory Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 bg-opacity-70 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-300 text-sm font-medium">
                Opportunities
              </p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-300 mt-1">
                3
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Current financial opportunities
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 bg-opacity-70 rounded-lg p-4 border border-red-200 dark:border-red-800">
              <p className="text-red-800 dark:text-red-300 text-sm font-medium">
                Risks
              </p>
              <p className="text-2xl font-bold text-red-800 dark:text-red-300 mt-1">
                2
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                Issues requiring attention
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 bg-opacity-70 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300 text-sm font-medium">
                Financial Health Score
              </p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-300 mt-1">
                82/100
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                Good condition
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 bg-opacity-70 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <p className="text-purple-800 dark:text-purple-300 text-sm font-medium">
                Next Review
              </p>
              <p className="text-2xl font-bold text-purple-800 dark:text-purple-300 mt-1">
                Apr 15
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                Scheduled financial review
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Personalized Recommendations
            </h2>
            <div className="flex space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1"
              >
                <option value="all">All Categories</option>
                <option value="savings">Savings</option>
                <option value="debt">Debt</option>
                <option value="tax">Tax</option>
                <option value="investment">Investment</option>
                <option value="insurance">Insurance</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredAdvisories.map((advisory) => (
              <div
                key={advisory.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {advisory.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {advisory.description}
                    </p>
                    <div className="mt-3 flex items-center space-x-3">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getImpactBadge(
                          advisory.impact
                        )}`}
                      >
                        {advisory.impact} impact
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {advisory.date}
                      </span>
                    </div>
                  </div>
                  <button className="ml-4 px-3 py-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-md">
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Financial Forecast */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">AI Financial Forecast</h2>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 bg-opacity-50 rounded-lg mb-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Based on your current financial patterns and market trends, our AI
              predicts the following outcomes for the next quarter:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-3">
                  <svg
                    className="h-5 w-5 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Revenue Growth
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Projected 8-12% increase in revenue based on current sales
                pipeline and market conditions.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mr-3">
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
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Cash Flow
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Stable cash flow expected with potential for 5% improvement if
                accounts receivable processes are optimized.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                  <svg
                    className="h-5 w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Market Trends
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Industry growth rate of 7% expected. Your business is positioned
                to outperform the market by 2-3%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Planning */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Financial Planning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                Short-Term Goals (Next 12 Months)
              </h3>
              <ul className="space-y-2">
                {[
                  "Increase emergency fund to 6 months of expenses",
                  "Refinance business loan to lower interest rate",
                  "Implement new accounting software",
                  "Review and optimize tax strategy",
                ].map((goal, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                  >
                    <svg
                      className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0"
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
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                Long-Term Goals (2-5 Years)
              </h3>
              <ul className="space-y-2">
                {[
                  "Expand business operations to new markets",
                  "Achieve 25% increase in annual revenue",
                  "Develop passive income streams",
                  "Establish retirement funding strategy",
                ].map((goal, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                  >
                    <svg
                      className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-md">
              Create Custom Financial Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
