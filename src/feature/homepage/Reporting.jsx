import { useState } from "react";
import { useAtom } from "jotai";
import { apiResponseAtom, financialDataAtom, isDataLoadedAtom } from "@/store/atoms";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Reporting() {
  const [reportType, setReportType] = useState("income");
  const [timeframe, setTimeframe] = useState("monthly");
  const [generatingReport, setGeneratingReport] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  
  // Get data from atoms
  const [financialData] = useAtom(financialDataAtom);
  const [apiResponse] = useAtom(apiResponseAtom);
  const [isDataLoaded] = useAtom(isDataLoadedAtom);

  // Sample reports data - will be replaced with dynamic data
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Q1 Financial Summary",
      date: "Jan 31, 2025",
      type: "quarterly",
    },
    {
      id: 2,
      name: "Annual Tax Statement",
      date: "Dec 15, 2024",
      type: "annual",
    },
    {
      id: 3,
      name: "Expense Analysis",
      date: "Feb 28, 2025",
      type: "custom",
    },
  ]);

  // Generate a report based on the financial data and API response
  const handleGenerateReport = () => {
    setGeneratingReport(true);
    
    // Create a new report from the data
    setTimeout(() => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      
      // Extract relevant data based on report type
      let reportData = {};
      
      if (isDataLoaded && financialData) {
        switch (reportType) {
          case "income":
            reportData = {
              totalRevenue: financialData.totalRevenue,
              recentTransactions: financialData.recentTransactions.filter(t => t.category === 'Income'),
              summary: apiResponse?.aiAnalysis?.summary || "Income statement summary not available",
            };
            break;
          case "expense":
            reportData = {
              totalExpenses: financialData.totalExpenses,
              recentTransactions: financialData.recentTransactions.filter(t => t.category === 'Expense'),
              summary: apiResponse?.aiAnalysis?.summary || "Expense analysis summary not available",
            };
            break;
          case "cashflow":
            reportData = {
              totalRevenue: financialData.totalRevenue,
              totalExpenses: financialData.totalExpenses,
              profit: financialData.profit,
              upcomingBills: financialData.upcomingBills,
              summary: apiResponse?.aiAnalysis?.cashflow || "Cash flow summary not available",
            };
            break;
          case "balance":
            reportData = {
              assets: apiResponse?.financialData?.assets || [],
              liabilities: apiResponse?.financialData?.liabilities || [],
              equity: financialData.profit, // Simplified
              summary: apiResponse?.aiAnalysis?.balance || "Balance sheet summary not available",
            };
            break;
          case "tax":
            reportData = {
              totalRevenue: financialData.totalRevenue,
              totalExpenses: financialData.totalExpenses,
              taxableIncome: financialData.profit,
              summary: apiResponse?.aiAnalysis?.tax || "Tax summary not available",
            };
            break;
          default:
            reportData = {
              summary: "Report data not available. Please upload financial data.",
            };
        }
      } else {
        reportData = {
          summary: "No financial data available. Please upload your financial data first.",
        };
      }
      
      // Create the new report
      const newReport = {
        id: reports.length + 1,
        name: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report (${timeframe})`,
        date: formattedDate,
        type: timeframe,
        data: reportData,
      };
      
      // Add to reports list and set as generated report
      setReports([newReport, ...reports]);
      setGeneratedReport(newReport);
      setGeneratingReport(false);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>

      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Report Type
              </label>
              <Select onValueChange={setReportType} defaultValue={reportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income Statement</SelectItem>
                  <SelectItem value="balance">Balance Sheet</SelectItem>
                  <SelectItem value="cashflow">Cash Flow</SelectItem>
                  <SelectItem value="tax">Tax Summary</SelectItem>
                  <SelectItem value="expense">Expense Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time Frame
              </label>
              <Select onValueChange={setTimeframe} defaultValue={timeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleGenerateReport}
                disabled={generatingReport}
                className="w-full"
              >
                {generatingReport ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate Report"
                )}
              </Button>
            </div>
          </div>

          {timeframe === "custom" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2"
                />
              </div>
            </div>
          )}
          
          {!isDataLoaded && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-lg">
              <p className="text-sm">
                No financial data available. Please upload your financial data first to generate accurate reports.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Report Preview */}
      {generatedReport && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>{generatedReport.name}</CardTitle>
              <CardDescription>Generated on {generatedReport.date}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Download PDF</Button>
              <Button variant="outline" size="sm">Share</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-md font-medium mb-2">Report Summary</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {generatedReport.data.summary}
                </p>
              </div>
              
              {reportType === "income" && generatedReport.data.totalRevenue !== undefined && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Total Revenue
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${generatedReport.data.totalRevenue.toLocaleString()}
                  </p>
                </div>
              )}
              
              {reportType === "expense" && generatedReport.data.totalExpenses !== undefined && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Total Expenses
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${generatedReport.data.totalExpenses.toLocaleString()}
                  </p>
                </div>
              )}
              
              {reportType === "cashflow" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Total Revenue
                    </h4>
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      ${generatedReport.data.totalRevenue?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Total Expenses
                    </h4>
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      ${generatedReport.data.totalExpenses?.toLocaleString() || "0"}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Net Profit
                    </h4>
                    <p className={`text-xl font-bold ${generatedReport.data.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      ${Math.abs(generatedReport.data.profit || 0).toLocaleString()}
                      {generatedReport.data.profit < 0 ? ' (Loss)' : ''}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Show transactions if available using shadcn Table */}
              {generatedReport.data.recentTransactions && generatedReport.data.recentTransactions.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-medium mb-2">Recent Transactions</h4>
                  <Table>
                    <TableCaption>Recent financial transactions from the selected period.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Category</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {generatedReport.data.recentTransactions.slice(0, 5).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.description}</TableCell>
                          <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              {/* Show upcoming bills if available using shadcn Table */}
              {reportType === "cashflow" && generatedReport.data.upcomingBills && generatedReport.data.upcomingBills.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-medium mb-2">Upcoming Bills</h4>
                  <Table>
                    <TableCaption>Upcoming bills and payments due.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {generatedReport.data.upcomingBills.map((bill, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{bill.description}</TableCell>
                          <TableCell>${bill.amount.toLocaleString()}</TableCell>
                          <TableCell>{bill.dueDate}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              bill.status === 'paid' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            }`}>
                              {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Reports */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Recent Reports</CardTitle>
          <Button variant="link" size="sm">View All Reports</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Date Generated</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                      {report.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Download</Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setGeneratedReport(report)}
                      >
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
