import { FileText, Shield, HelpCircle, ChevronDown } from "lucide-react";
import React from "react";
export const AuthFooter = ({ delay = 550 }) => {
  return (
    <div
      className="mt-10 flex flex-col items-center text-sm text-gray-500 dark:text-gray-500"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="mb-4 flex flex-wrap justify-center gap-4">
        <a
          href="#"
          className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center"
        >
          <FileText size={14} className="mr-1" />
          Terms
        </a>
        <a
          href="#"
          className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center"
        >
          <Shield size={14} className="mr-1" />
          Privacy
        </a>
        <a
          href="#"
          className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center"
        >
          <HelpCircle size={14} className="mr-1" />
          Help
        </a>
      </div>
      <div className="flex items-center">
        <span className="relative inline-block mr-2 text-gray-600 dark:text-gray-400">
          English
          <ChevronDown size={14} className="inline-block ml-1" />
        </span>
        <span>© {new Date().getFullYear()} Finova. All Rights Reserved.</span>
      </div>
    </div>
  );
};
