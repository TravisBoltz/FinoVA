import { useState } from "react";
import { useAtom } from "jotai";
import {
  apiResponseAtom,
  financialDataAtom,
  isDataLoadedAtom,
} from "@/store/atoms";

export default function Advisory() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [apiResponse] = useAtom(apiResponseAtom);
  const [financialData] = useAtom(financialDataAtom);
  const [isDataLoaded] = useAtom(isDataLoadedAtom);

  // Generate advisories based on API response data if available
  const generateAdvisories = () => {
    if (!apiResponse || !apiResponse.aiAnalysis) {
      return [];
    }

    // Try to extract advisories from AI analysis
    try {
      const aiData = apiResponse.aiAnalysis;

      // If the AI analysis has recommendations or advisories, use them
      if (aiData.recommendations || aiData.advisories) {
        return (aiData.recommendations || aiData.advisories || []).map(
          (item, index) => ({
            id: index + 1,
            title:
              item.title ||
              item.name ||
              `Financial Recommendation ${index + 1}`,
            description: item.description || item.details || item.text || "",
            impact: item.impact || item.priority || "medium",
            category: item.category || item.type || "general",
            date:
              item.date ||
              new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
          })
        );
      }

      // If there's no structured recommendations, try to create some based on financial data
      if (financialData) {
        const advisories = [];

        // Add emergency fund recommendation if total revenue is available
        if (financialData.totalRevenue > 0) {
          advisories.push({
            id: 1,
            title: "Establish an emergency fund",
            description: `Based on your current revenue of ${financialData.totalRevenue.toLocaleString()}, we recommend setting aside 3-6 months of expenses in an emergency fund.`,
            impact: "high",
            category: "savings",
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          });
        }

        // Add profit margin recommendation if profit and revenue are available
        if (financialData.profit && financialData.totalRevenue) {
          const profitMargin =
            (financialData.profit / financialData.totalRevenue) * 100;
          const impact =
            profitMargin < 15 ? "high" : profitMargin < 25 ? "medium" : "low";

          advisories.push({
            id: 2,
            title: `${
              profitMargin < 20 ? "Improve" : "Maintain"
            } your profit margin`,
            description: `Your current profit margin is ${profitMargin.toFixed(
              1
            )}%. ${
              profitMargin < 20
                ? "Consider strategies to increase revenue or reduce expenses to improve profitability."
                : "You're doing well, but continue monitoring to maintain this performance."
            }`,
            impact,
            category: "profitability",
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          });
        }

        // Add expense management recommendation if expenses are available
        if (financialData.totalExpenses > 0) {
          advisories.push({
            id: 3,
            title: "Review expense categories",
            description: `Regular review of your ${financialData.totalExpenses.toLocaleString()} in expenses can identify opportunities for cost reduction and improved efficiency.`,
            impact: "medium",
            category: "expenses",
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          });
        }

        return advisories;
      }
    } catch (error) {
      console.error("Error generating advisories:", error);
    }

    // Fallback to empty array if we couldn't generate advisories
    return [];
  };

  // Use generated advisories or fallback to default ones if no data
  const advisories =
    isDataLoaded && apiResponse
      ? generateAdvisories()
      : [
          {
            id: 1,
            title: "Upload financial data to get personalized recommendations",
            description:
              "Upload your financial statements to receive AI-powered insights and recommendations tailored to your business.",
            impact: "high",
            category: "general",
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
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

  // Calculate summary metrics
  const getSummaryMetrics = () => {
    if (!advisories.length) {
      return { opportunities: 0, risks: 0, healthScore: 0 };
    }

    const opportunities = advisories.filter((a) => a.impact === "low").length;
    const risks = advisories.filter((a) => a.impact === "high").length;
    const healthScore = Math.min(
      100,
      Math.max(0, 70 + opportunities * 5 - risks * 10)
    );

    return { opportunities, risks, healthScore };
  };

  const { opportunities, risks, healthScore } = getSummaryMetrics();

  // Loading state
  if (!isDataLoaded && apiResponse === null) {
    return (
      <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Financial Advisory</h1>
        </div>

        {/* Loading indicator */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading financial insights...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
                {opportunities}
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
                {risks}
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
                {healthScore}/100
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                {healthScore >= 80
                  ? "Good condition"
                  : healthScore >= 60
                  ? "Fair condition"
                  : "Needs attention"}
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 bg-opacity-70 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <p className="text-purple-800 dark:text-purple-300 text-sm font-medium">
                Next Review
              </p>
              <p className="text-2xl font-bold text-purple-800 dark:text-purple-300 mt-1">
                {new Date(
                  Date.now() + 15 * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
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
                <option value="profitability">Profitability</option>
                <option value="expenses">Expenses</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredAdvisories.length > 0 ? (
              filteredAdvisories.map((advisory) => (
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
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No recommendations available for this category.
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Try selecting a different category or upload financial data.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Financial Forecast */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">AI Financial Forecast</h2>
          {apiResponse && apiResponse.aiAnalysis ? (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 bg-opacity-50 rounded-lg mb-4">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                {apiResponse.aiAnalysis.forecast ||
                  apiResponse.aiAnalysis.summary ||
                  "Based on your current financial patterns and market trends, our AI predicts stable growth over the next quarter. Continue monitoring cash flow and consider the recommendations above to optimize your financial health."}
              </p>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload your financial data to receive AI-powered forecasts and
                insights.
              </p>
            </div>
          )}

          {/* Rest of the AI Financial Forecast section remains the same */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Revenue Projection
              </h3>
              <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                {isDataLoaded && financialData.totalRevenue ? (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {financialData.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Current Revenue
                    </p>
                    <p className="text-green-600 dark:text-green-400 mt-2">
                      +5% projected growth
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No data available
                  </p>
                )}
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Expense Forecast
              </h3>
              <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                {isDataLoaded && financialData.totalExpenses ? (
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {financialData.totalExpenses.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Current Expenses
                    </p>
                    <p className="text-red-600 dark:text-red-400 mt-2">
                      +2% projected increase
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No data available
                  </p>
                )}
              </div>
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
