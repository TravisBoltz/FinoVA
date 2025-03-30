"use client";

import { useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { toast } from "sonner";

interface UseFileUploadOptions {
  maxSize?: number;
  endpoint?: string;
}

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  success: boolean;
  analyzing: boolean;
  analysisComplete: boolean;
}

export const useFileUpload = (options?: UseFileUploadOptions) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    success: false,
    analyzing: false,
    analysisComplete: false,
  });
  const [responseData, setResponseData] = useState<any>(null);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    maxSize: options?.maxSize || 10 * 1024 * 1024, // 10MB default
    multiple: false,
    noClick: !!file,
    disabled: uploadState.isUploading,
    onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
      if (rejectedFiles.length > 0) {
        console.error("File rejected:", rejectedFiles[0].errors);
        toast.error("File is larger than 10MB", {
          duration: 5000,
          position: "bottom-right",
          style: {
            color: "red",
            fontSize: "16px",
          },
        });
      }
    },
  });

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a file to upload", {
        duration: 3000,
        position: "bottom-right",
      });
      return;
    }

    const endpoint = "https://c7c5-102-176-94-204.ngrok-free.app/api/v1/convert-excel-to-json";
    const formData = new FormData();
    formData.append("file", file);

    // Get auth token from localStorage (fallback mechanism)
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjM3MGI5MzItNzE5Zi00OWI0LTgyMjQtZThmMTJiZmY5MDI5IiwiZXhwIjoxNzQzMzM4NTk1LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzQzMzM3OTk1fQ.jeuraiBVkOCCEq0GYDso4_g1gpXaUEGp61YsbtY_GIc'
    if (!token) {
      toast.error("Authentication required. Please log in again.", {
        duration: 3000,
        position: "bottom-right",
      });
      return;
    }

    try {
      setUploadState({
        isUploading: true,
        progress: 0,
        error: null,
        success: false,
        analyzing: false,
        analysisComplete: false,
      });

      // Create an XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadState(prev => ({
            ...prev,
            progress,
          }));
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log('File upload response:', xhr.responseText);
          
          setUploadState({
            isUploading: false,
            progress: 100,
            error: null,
            success: true,
            analyzing: false,
            analysisComplete: false,
          });
          toast.success("File uploaded successfully!", {
            duration: 3000,
            position: "bottom-right",
          });
          
          // Send the response to the AI analysis endpoint
          try {
            const parsedData = JSON.parse(xhr.responseText);
            setResponseData(parsedData); // Store the response data
            sendToAIAnalysis(parsedData);
          } catch (error) {
            console.error("Error parsing upload response:", error);
            console.log('Raw response that failed to parse:', xhr.responseText);
            // Even if parsing fails, store the raw response
            setResponseData(xhr.responseText);
          }
        } else {
          console.log('File upload failed response:', xhr.status, xhr.statusText, xhr.responseText);
          
          handleUploadError(xhr.statusText || "Upload failed");
        }
      });

      xhr.addEventListener("error", () => {
        console.log('File upload network error');
        
        handleUploadError("Network error occurred");
      });

      xhr.addEventListener("abort", () => {
        console.log('File upload aborted');
        
        handleUploadError("Upload aborted");
      });

      xhr.open("POST", endpoint);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      
      // We're using token-based auth, so withCredentials is not needed
      // and causes CORS issues with wildcard origins
      // xhr.withCredentials = true;
      
      xhr.send(formData);
    } catch (error) {
      handleUploadError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const cancelUpload = () => {
    setUploadState({
      isUploading: false,
      progress: 0,
      error: null,
      success: false,
      analyzing: false,
      analysisComplete: false,
    });
    setFile(null);
  };

  const handleUploadError = (errorMessage: string) => {
    setUploadState({
      isUploading: false,
      progress: 0,
      error: errorMessage,
      success: false,
      analyzing: false,
      analysisComplete: false,
    });
    toast.error(`Upload failed: ${errorMessage}`, {
      duration: 5000,
      position: "bottom-right",
    });
  };

  const resetUploadState = () => {
    setUploadState({
      isUploading: false,
      progress: 0,
      error: null,
      success: false,
      analyzing: false,
      analysisComplete: false,
    });
    setFile(null);
    setResponseData(null); // Reset response data
  };

  // Function to send data to AI analysis endpoint
  const sendToAIAnalysis = async (data: any) => {
    // Use the same hardcoded token as in uploadFile
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjM3MGI5MzItNzE5Zi00OWI0LTgyMjQtZThmMTJiZmY5MDI5IiwiZXhwIjoxNzQzMzM4NTk1LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzQzMzM3OTk1fQ.jeuraiBVkOCCEq0GYDso4_g1gpXaUEGp61YsbtY_GIc'
    if (!token) {
      toast.error("Authentication required for AI analysis. Please log in again.", {
        duration: 3000,
        position: "bottom-right",
      });
      return;
    }

    try {
      setUploadState(prev => ({
        ...prev,
        analyzing: true,
      }));

      toast.info("Analyzing your financial data...", {
        duration: 3000,
        position: "bottom-right",
      });

      const analyzeEndpoint = "https://c7c5-102-176-94-204.ngrok-free.app/api/v1/ai/analyze";
      
      const xhr = new XMLHttpRequest();
      xhr.open("POST", analyzeEndpoint);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      // We're using token-based auth, so withCredentials is not needed
      // and causes CORS issues with wildcard origins
      // xhr.withCredentials = true;

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log('AI analysis response:', xhr.responseText);
          
          try {
            // Update response data with AI analysis results if available
            const aiResponse = JSON.parse(xhr.responseText);
            setResponseData(prevData => {
              // If we have previous data, merge it with AI analysis results
              if (prevData && typeof prevData === 'object') {
                return { ...prevData, aiAnalysis: aiResponse };
              }
              // Otherwise just return the AI analysis
              return { aiAnalysis: aiResponse };
            });
          } catch (error) {
            console.error("Error parsing AI analysis response:", error);
          }
          
          setUploadState(prev => ({
            ...prev,
            analyzing: false,
            analysisComplete: true,
          }));
          toast.success("AI analysis complete!", {
            duration: 3000,
            position: "bottom-right",
          });
        } else {
          console.log('AI analysis failed response:', xhr.status, xhr.statusText, xhr.responseText);
          
          setUploadState(prev => ({
            ...prev,
            analyzing: false,
          }));
          toast.error(`AI analysis failed: ${xhr.statusText || "Unknown error"}`, {
            duration: 5000,
            position: "bottom-right",
          });
        }
      });

      xhr.addEventListener("error", () => {
        console.log('AI analysis network error');
        
        setUploadState(prev => ({
          ...prev,
          analyzing: false,
        }));
        toast.error("Network error during AI analysis", {
          duration: 5000,
          position: "bottom-right",
        });
      });

      xhr.send(JSON.stringify(data));
    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        analyzing: false,
      }));
      toast.error(`AI analysis error: ${error instanceof Error ? error.message : "Unknown error"}`, {
        duration: 5000,
        position: "bottom-right",
      });
    }
  };

  return {
    file,
    setFile,
    uploadState,
    uploadFile,
    cancelUpload,
    resetUploadState,
    getRootProps,
    getInputProps,
    isDragActive,
    open,
    responseData // Return the response data
  };
};