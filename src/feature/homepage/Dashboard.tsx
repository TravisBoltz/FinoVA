import React, { useEffect, useState, useRef } from "react";
import FileUploader from "@/components/FileUploader";
import { processFinancialData } from "@/utils/dataProcessor";
import { useAtom } from "jotai";
import { financialDataAtom, isDataLoadedAtom, showUploaderAtom, apiResponseAtom } from "@/store/atoms";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div
    className={`rounded-xl shadow-md overflow-hidden transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 ${className}`}
  >
    {children}
  </div>
);

interface DashboardProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  setActivePage: (page: string) => void;
}

// Define transaction interface to match the actual data structure
interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

// Define bill interface for upcoming bills
interface Bill {
  description: string;
  amount: number;
  dueDate: string;
  status: string;
}

const Dashboard = ({
  darkMode,
  setDarkMode,
  setActivePage,
}: DashboardProps) => {
  const [showUploader, setShowUploader] = useAtom(showUploaderAtom);
  const [isDataLoaded, setIsDataLoaded] = useAtom(isDataLoadedAtom);
  const [financialData, setFinancialData] = useAtom(financialDataAtom);
  
  // Use local state for API response instead of atom to avoid TypeScript issues
  const [apiResponse, setApiResponse] = useState<any>(null);
  
  // Use a ref to track if we've already processed this response
  const processedResponseRef = useRef<string | null>(null);

  // Handle successful file upload
  const handleUploadSuccess = (responseData: any) => {
    if (!responseData) return;
    
    // Generate a hash of the response to check if we've already processed it
    const responseHash = JSON.stringify(responseData).length.toString();
    
    // Only process if we haven't seen this exact response before
    if (processedResponseRef.current !== responseHash) {
      console.log("Upload success callback in Dashboard received data");
      
      // Store the API response in local state
      setApiResponse(responseData);
      
      // Process the data and update the financialData atom
      try {
        const processedData = processFinancialData(responseData);
        setFinancialData(processedData);
        
        // Update UI state
        setShowUploader(false);
        setIsDataLoaded(true);
        
        // Mark this response as processed
        processedResponseRef.current = responseHash;
      } catch (error) {
        console.error("Error processing data in Dashboard:", error);
      }
    }
  };

  // Function to toggle back to uploader view
  const showFileUploader = () => {
    setShowUploader(true);
    setIsDataLoaded(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <div className="hidden md:flex items-center space-x-4">
          {isDataLoaded && (
            <button
              onClick={showFileUploader}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload New File
            </button>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setActivePage("profile")}
            className="flex items-center"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
              A
            </div>
          </button>
        </div>
      </div>

      {/* Show file uploader when in uploader mode */}
      {showUploader && (
        <div className="mb-6">
          <FileUploader
            onUploadSuccess={handleUploadSuccess}
            endpoint="/api/v1/convert-excel-to-json"
            showDashboard={isDataLoaded}
          />
        </div>
      )}

      {/* Show dashboard content when data is loaded and not in uploader mode */}
      {isDataLoaded && !showUploader && financialData && (
        <>
          {/* Business Info Card */}
          <Card className="p-5 border mb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {financialData.businessInfo.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {financialData.businessInfo.industry} • {financialData.businessInfo.location}
                </p>
              </div>
              <div className="mt-2 md:mt-0">
                <button
                  onClick={showFileUploader}
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/10"
                >
                  Update Data
                </button>
              </div>
            </div>
          </Card>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Total Revenue Card */}
            <Card className="p-5">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Total Revenue
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    All income sources
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-500">
                GH¢{financialData.totalRevenue.toLocaleString()}
              </p>
              <div className="mt-2 flex items-center">
                <span className="text-xs font-medium text-green-500 bg-green-100 bg-opacity-50 rounded-full px-2 py-0.5">
                  +12%
                </span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  vs last period
                </span>
              </div>
            </Card>

            {/* Total Expenses Card */}
            <Card className="p-5">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Total Expenses
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    All outgoing costs
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold text-red-500 dark:text-red-600">
                GH¢{financialData.totalExpenses.toLocaleString()}
              </p>
              <div className="mt-2 flex items-center">
                <span className="text-xs font-medium text-red-500 bg-red-100 bg-opacity-50 rounded-full px-2 py-0.5">
                  +5%
                </span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  vs last period
                </span>
              </div>
            </Card>

            {/* Profit Card */}
            <Card className="p-5">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profit
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Revenue - Expenses
                  </p>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-500 dark:text-green-600">
                GH¢{financialData.profit.toLocaleString()}
              </p>
              <div className="mt-2 flex items-center">
                <span className="text-xs font-medium text-green-500 bg-green-100 bg-opacity-50 rounded-full px-2 py-0.5">
                  +18%
                </span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  vs last period
                </span>
              </div>
            </Card>
          </div>

          {/* Recent Transactions and Upcoming Bills */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Transactions */}
            <Card className="p-5">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Recent Transactions
              </h3>
              <div className="space-y-3">
                {financialData.recentTransactions.length > 0 ? (
                  financialData.recentTransactions.slice(0, 5).map(
                    (transaction: Transaction, index: number) => {
                      const transactionType =
                        transaction.amount > 0 ? "income" : "expense";
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                        >
                          <div className="flex items-center">
                            <div
                              className={`p-2 rounded-full mr-3 ${
                                transactionType === "income"
                                  ? "bg-green-100 dark:bg-green-900/20"
                                  : "bg-red-100 dark:bg-red-900/20"
                              }`}
                            >
                              {transactionType === "income" ? (
                                <svg
                                  className="w-4 h-4 text-green-600 dark:text-green-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  className="w-4 h-4 text-red-600 dark:text-red-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 13l-5 5m0 0l-5-5m5 5V6"
                                  ></path>
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {transaction.description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {transaction.date} • {transaction.category}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              transactionType === "income"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {transactionType === "income" ? "+" : ""}
                            GH¢{Math.abs(transaction.amount).toLocaleString()}
                          </div>
                        </div>
                      );
                    }
                  )
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400">
                      No recent transactions to display
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Upcoming Bills */}
            <Card className="p-5">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Upcoming Bills
              </h3>
              <div className="space-y-3">
                {financialData.upcomingBills && financialData.upcomingBills.length > 0 ? (
                  financialData.upcomingBills.map((bill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <div className="flex items-center">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-full mr-3">
                          <svg
                            className="w-4 h-4 text-orange-600 dark:text-orange-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {bill.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Due {bill.dueDate} • {bill.status}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        GH¢{bill.amount.toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400">
                      No upcoming bills to display
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
