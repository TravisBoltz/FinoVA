import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdvisoryComponent() {
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

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "savings", label: "Savings" },
    { value: "debt", label: "Debt" },
    { value: "tax", label: "Tax" },
    { value: "investment", label: "Investment" },
    { value: "insurance", label: "Insurance" },
  ];

  const summaryCards = [
    {
      title: "Opportunities",
      value: "3",
      description: "Current financial opportunities",
      colorClass: "bg-green-50 border-green-200 text-green-800",
    },
    {
      title: "Risks",
      value: "2",
      description: "Issues requiring attention",
      colorClass: "bg-red-50 border-red-200 text-red-800",
    },
    {
      title: "Financial Health Score",
      value: "82/100",
      description: "Good condition",
      colorClass: "bg-blue-50 border-blue-200 text-blue-800",
    },
    {
      title: "Next Review",
      value: "Apr 15",
      description: "Scheduled financial review",
      colorClass: "bg-purple-50 border-purple-200 text-purple-800",
    },
  ];

  const forecasts = [
    {
      title: "Revenue Forecast",
      description: "Projected to increase by 12% compared to current quarter",
      colorClass: "bg-blue",
      data: [6, 7, 8, 9, 12],
    },
    {
      title: "Expense Forecast",
      description: "Expected to stabilize with a slight decrease of 3%",
      colorClass: "bg-red",
      data: [8, 9, 10, 8, 7],
    },
    {
      title: "Cash Flow Prediction",
      description: "Positive trend with 18% improvement in free cash flow",
      colorClass: "bg-green",
      data: [5, 7, 6, 9, 11],
    },
  ];

  const filteredAdvisories =
    selectedCategory === "all"
      ? advisories
      : advisories.filter((a) => a.category === selectedCategory);

  // Get impact badge style
  const getImpactVariant = (impact) => {
    switch (impact) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Advisory</h1>
      </div>

      {/* Advisory Summary */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Advisory Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {summaryCards.map((card, index) => (
              <div
                key={index}
                className={`${card.colorClass} bg-opacity-70 rounded-lg p-4 border`}
              >
                <p className="text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
                <p className="text-sm mt-1">{card.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advisory Recommendations */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Personalized Recommendations
            </h2>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredAdvisories.map((advisory) => (
              <div
                key={advisory.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {advisory.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {advisory.description}
                    </p>
                    <div className="mt-3 flex items-center space-x-3">
                      <Badge variant={getImpactVariant(advisory.impact)}>
                        {advisory.impact} impact
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {advisory.date}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" className="ml-4">
                    Take Action
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Financial Forecast */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">AI Financial Forecast</h2>
          <div className="p-4 bg-blue-50 bg-opacity-50 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              Based on your current financial patterns and market trends, our AI
              predicts the following outcomes for the next quarter:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {forecasts.map((forecast, index) => (
              <div
                key={index}
                className="rounded-lg p-4 border border-gray-200"
              >
                <h3 className="font-medium text-gray-900 mb-2">
                  {forecast.title}
                </h3>
                <div className="h-12 flex items-end mb-2">
                  {forecast.data.map((height, i) => {
                    const intensity = 200 - (i * 100) / forecast.data.length;
                    return (
                      <div
                        key={i}
                        className={`w-1/5 h-${height} ${
                          forecast.colorClass
                        }-${Math.floor(intensity)} rounded-sm`}
                      ></div>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-500">{forecast.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Consultation */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-semibold text-white mb-2">
                Need personalized financial advice?
              </h2>
              <p className="text-blue-100">
                Schedule a one-on-one consultation with a financial advisor
              </p>
            </div>
            <Button variant="secondary">Schedule a Call</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
