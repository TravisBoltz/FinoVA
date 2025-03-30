import React from "react";
import { useFileUpload } from "@/hooks/useFileUpload";

interface FileUploaderProps {
  onUploadSuccess: () => void;
  endpoint?: string;
  showDashboard?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onUploadSuccess,
  endpoint,
  showDashboard = false,
}) => {
  const {
    file,
    uploadState,
    uploadFile,
    cancelUpload,
    resetUploadState,
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  } = useFileUpload({ endpoint });

  // When upload is successful, call the onUploadSuccess callback
  React.useEffect(() => {
    if (uploadState.success) {
      onUploadSuccess();
    }
  }, [uploadState.success, onUploadSuccess]);

  return (
    <div className="w-full mx-auto rounded-xl  dark:bg-gray-850 shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          {showDashboard ? "Update Financial Data" : "Upload Financial Data"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {showDashboard
            ? "Need to update your data? Upload a new file below."
            : "Upload your financial data to visualize trends, analyze performance, and gain insights."}
        </p>
      </div>

      <div className={`${showDashboard ? "opacity-80" : "opacity-100"}`}>
        {!file && !uploadState.isUploading && !uploadState.success && (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : showDashboard
                ? "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                : "border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10"
            } ${showDashboard ? "pointer-events-none" : ""}`}
          >
            <input {...getInputProps()} disabled={showDashboard} />
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-2">
                <svg
                  className="w-14 h-14 text-blue-500 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                {showDashboard && (
                  <div className="absolute -top-1 -right-1 bg-gray-200 dark:bg-gray-700 rounded-full p-1">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                {isDragActive
                  ? "Drop your file here..."
                  : showDashboard
                  ? "Upload locked while dashboard is active"
                  : "Drag and drop your financial file here"}
              </p>
              {!showDashboard && !isDragActive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                  className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Browse Files
                </button>
              )}
              <div className="flex items-center justify-center mt-2 space-x-2">
                <span className="inline-flex items-center justify-center p-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  CSV
                </span>

                <span className="inline-flex items-center justify-center p-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  XLS
                </span>

                <span className="inline-flex items-center justify-center p-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  XLSX
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Maximum file size: 10MB
              </p>
              {showDashboard && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetUploadState();
                  }}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  disabled={uploadState.isUploading}
                >
                  Reset & Upload New
                </button>
              )}
            </div>
          </div>
        )}

        {file && !uploadState.isUploading && !uploadState.success && (
          <div className="border rounded-xl p-5 mb-4 bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to upload
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => resetUploadState()}
                  className="px-3 py-2 text-sm text-red-600 dark:text-red-400 border border-red-600 dark:border-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  disabled={showDashboard}
                >
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    Remove
                  </span>
                </button>
                <button
                  onClick={uploadFile}
                  className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                    showDashboard ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={showDashboard}
                >
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      ></path>
                    </svg>
                    Upload Now
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {uploadState.isUploading && (
          <div className="border rounded-xl p-5 mb-4 bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-500 animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                      Uploading {file?.name}
                    </p>
                    <div className="flex items-center">
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        {uploadState.progress}% complete
                      </span>
                      {uploadState.progress < 100 && (
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          • Please wait...
                        </span>
                      )}
                      {uploadState.progress === 100 && (
                        <span className="ml-2 text-xs text-green-500 dark:text-green-400">
                          • Processing...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={cancelUpload}
                  className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  Cancel
                </button>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadState.progress}%` }}
                ></div>
              </div>
              {uploadState.progress === 100 && (
                <div className="flex justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Processing your data...
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skeleton loader with improved design */}
        {uploadState.isUploading && (
          <div className="animate-pulse space-y-6 mt-8">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl shadow"
                ></div>
              ))}
            </div>

            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl shadow"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl shadow"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl shadow"></div>
            </div>
          </div>
        )}

        {uploadState.error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  Error: {uploadState.error}
                </p>
                <p className="text-xs mt-1">
                  Please check your file and try again.
                </p>
              </div>
            </div>
            <button
              onClick={resetUploadState}
              className="mt-3 inline-flex items-center px-3 py-1.5 text-sm text-red-700 dark:text-red-400 border border-red-500 dark:border-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Try again
            </button>
          </div>
        )}

        {uploadState.success && (
          <div className="border rounded-xl p-5 bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Upload Complete
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your file has been uploaded successfully.
                  </p>
                </div>
              </div>
              
              {uploadState.analyzing && (
                <div className="flex items-center space-x-3 mt-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full animate-pulse">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      AI Analysis in Progress
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Our AI is analyzing your financial data...
                    </p>
                  </div>
                </div>
              )}
              
              {uploadState.analysisComplete && (
                <div className="flex items-center space-x-3 mt-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                    <svg
                      className="w-6 h-6 text-purple-600 dark:text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      AI Analysis Complete
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your financial insights are ready to view.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 mt-2">
                <button
                  onClick={resetUploadState}
                  className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Upload Another File
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
