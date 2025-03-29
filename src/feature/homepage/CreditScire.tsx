import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";

export default function CreditScore() {
  // Sample credit score data
  const creditScore = 720;
  const maxScore = 850;
  const scorePercentage = Math.round((creditScore / maxScore) * 100);
  const scoreChange = 15;

  // Credit factors
  const creditFactors = [
    { name: "Payment History", score: 85, impact: "Positive" },
    { name: "Debt Utilization", score: 70, impact: "Neutral" },
    { name: "Credit Mix", score: 90, impact: "Very Positive" },
  ];

  // Credit alerts
  const creditAlerts = [
    { message: "New credit inquiry detected", severity: "warning" },
    { message: "Credit utilization decreased by 5%", severity: "success" },
  ];

  // Improvement opportunities
  const improvements = [
    {
      title: "Reduce Credit Utilization",
      description:
        "Lower utilization to below 30% to improve score by 15-25 points",
    },
    {
      title: "Establish More Trade Lines",
      description: "Add 1-2 trade references to diversify your credit mix",
    },
  ];

  // Get score rating
  const getScoreRating = (score) => {
    if (score >= 740) return { label: "Very Good", variant: "success" };
    if (score >= 670) return { label: "Good", variant: "success" };
    if (score >= 580) return { label: "Fair", variant: "warning" };
    return { label: "Poor", variant: "destructive" };
  };

  const { label, variant } = getScoreRating(creditScore);

  return (
    <div className=" mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-bold">Credit Monitoring</h1>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Score Card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Business Credit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-8">
              {/* Score Circle */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                    />
                    {/* Score indicator */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * scorePercentage) / 100}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    {/* Score text */}
                    <text
                      x="50"
                      y="45"
                      textAnchor="middle"
                      fontSize="22"
                      fontWeight="bold"
                      fill="#3b82f6"
                    >
                      {creditScore}
                    </text>
                    <text
                      x="50"
                      y="65"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#6b7280"
                    >
                      of {maxScore}
                    </text>
                  </svg>
                </div>
                <div className="mt-2 text-center">
                  <Badge variant={variant} className="mb-1">
                    {label}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    <span className="text-green-500">+{scoreChange}</span> since
                    last month
                  </div>
                </div>
              </div>

              {/* Factors */}
              <div className="flex-1 space-y-4">
                <h3 className="text-sm font-medium">Key Factors</h3>
                {creditFactors.map((factor, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{factor.name}</span>
                      <Badge
                        variant={
                          factor.impact.includes("Positive")
                            ? "success"
                            : factor.impact.includes("Negative")
                            ? "destructive"
                            : "secondary"
                        }
                        className="ml-2"
                      >
                        {factor.impact}
                      </Badge>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {creditAlerts.map((alert, index) => (
              <Alert key={index} variant={alert.severity}>
                {alert.message}
              </Alert>
            ))}
            <Button variant="link" className="px-0">
              View all alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Improvement Opportunities */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Improvement Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {improvements.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.description}
                </p>
                <Button variant="link" className="p-0 h-auto">
                  View Strategy
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Score History</CardTitle>
          <Select defaultValue="12months">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12months">12 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <svg className="w-full h-full" viewBox="0 0 400 150">
              <path
                d="M0,100 L40,95 L80,105 L120,90 L160,80 L200,85 L240,75 L280,65 L320,60 L360,50 L400,40"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
              />
              <path
                d="M0,100 L40,95 L80,105 L120,90 L160,80 L200,85 L240,75 L280,65 L320,60 L360,50 L400,40 L400,150 L0,150 Z"
                fill="url(#gradient)"
                fillOpacity="0.2"
                stroke="none"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
        <CardContent className="flex flex-wrap justify-between items-center gap-4 p-6">
          <div>
            <h2 className="text-lg font-medium mb-1">
              Get a comprehensive credit report
            </h2>
            <p className="text-blue-100 text-sm">
              Detailed analysis of your business credit profile
            </p>
          </div>
          <Button variant="secondary" size="lg">
            Get Full Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
