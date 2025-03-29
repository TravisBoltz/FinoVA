import { BarChart2, PieChart, TrendingUp, CreditCard } from "lucide-react";
import React from "react";

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
  delay: string;
}

export const FeatureItem = ({ icon, text, delay }: FeatureItemProps) => (
  <div
    className="flex items-start"
    data-aos="fade-right"
    data-aos-delay={delay}
  >
    {icon}
    <span className="text-sm dark:text-gray-300">{text}</span>
  </div>
);

interface DashboardPreviewProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export const DashboardPreview = ({
  activeTab,
  setActiveTab,
}: DashboardPreviewProps) => {
  // Dashboard preview components
  const renderDashboardTab = (tabIndex: number) => {
    const tabClasses = `transition-opacity duration-500 ${
      activeTab === tabIndex ? "opacity-100" : "opacity-0 absolute"
    }`;

    switch (tabIndex) {
      case 0:
        return (
          <div className={tabClasses}>
            <h3 className="font-semibold flex items-center">
              <BarChart2
                size={16}
                className="mr-2 text-indigo-600 dark:text-indigo-400"
              />{" "}
              Financial Overview
            </h3>
            <div className="mt-3 space-y-2">
              <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-6 bg-indigo-500 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-6 bg-indigo-400 rounded-full"
                  style={{ width: "42%" }}
                ></div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Revenue
                </div>
                <div className="font-bold dark:text-white">GH¢24,500</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Profit
                </div>
                <div className="font-bold dark:text-white">GH¢8,200</div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className={tabClasses}>
            <h3 className="font-semibold flex items-center">
              <PieChart
                size={16}
                className="mr-2 text-indigo-600 dark:text-indigo-400"
              />{" "}
              Expense Breakdown
            </h3>
            <div className="mt-3 flex space-x-2">
              <div className="flex-1 h-20 bg-indigo-500 rounded-md"></div>
              <div className="flex-1 h-20 bg-indigo-400 rounded-md"></div>
              <div className="flex-1 h-16 bg-indigo-300 rounded-md"></div>
              <div className="flex-1 h-12 bg-indigo-200 rounded-md"></div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-1 text-xs dark:text-gray-300">
              <div>Housing</div>
              <div>Food</div>
              <div>Transport</div>
              <div>Others</div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={tabClasses}>
            <h3 className="font-semibold flex items-center">
              <TrendingUp
                size={16}
                className="mr-2 text-indigo-600 dark:text-indigo-400"
              />{" "}
              Investment Growth
            </h3>
            <div className="flex items-end h-20 mt-3 space-x-1">
              {[20, 45, 30, 50, 65, 40, 70, 55, 60, 80].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-indigo-400 rounded-t-sm"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs dark:text-gray-300">Last 10 months</span>
              <span className="text-xs font-semibold text-green-500 flex items-center">
                <TrendingUp size={12} className="mr-1" /> +24.8%
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Animated Dashboard Preview */}
      <div
        className="relative w-full max-w-lg"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-6">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-xl text-indigo-700 dark:text-indigo-400">
              Finova Dashboard
            </div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>

          {/* Dashboard Content based on active tab */}
          {renderDashboardTab(0)}
          {renderDashboardTab(1)}
          {renderDashboardTab(2)}
        </div>
      </div>

      {/* Text content */}
      <div
        className="text-center mt-10 max-w-md"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h3 className="text-2xl font-bold mb-4 dark:text-white">
          Financial Management Made Easy
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Start managing your finances today with our user-friendly dashboard,
          comprehensive analytics, and customizable reports.
        </p>

        {/* Features */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-left">
          <FeatureItem
            icon={
              <CreditCard
                className="mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0"
                size={20}
              />
            }
            text="Track expenses automatically"
            delay="300"
          />
          <FeatureItem
            icon={
              <TrendingUp
                className="mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0"
                size={20}
              />
            }
            text="Monitor investment growth"
            delay="400"
          />
          <FeatureItem
            icon={
              <BarChart2
                className="mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0"
                size={20}
              />
            }
            text="Visualize spending patterns"
            delay="500"
          />
          <FeatureItem
            icon={
              <PieChart
                className="mr-2 text-indigo-500 dark:text-indigo-400 flex-shrink-0"
                size={20}
              />
            }
            text="Set and track financial goals"
            delay="600"
          />
        </div>
      </div>

      {/* Pagination dots */}
      <div
        className="flex mt-10 space-x-3"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`h-3 w-3 ${
              activeTab === index
                ? "bg-indigo-600 dark:bg-indigo-400"
                : "bg-gray-300 dark:bg-gray-700"
            } rounded-full`}
          ></button>
        ))}
      </div>
    </>
  );
};
