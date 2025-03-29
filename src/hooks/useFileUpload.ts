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
}

export const useFileUpload = (options?: UseFileUploadOptions) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    success: false,
  });

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

    const endpoint = options?.endpoint || "https://e5ed-102-208-89-6.ngrok-free.app/api/v1/upload";
    const formData = new FormData();
    formData.append("file", file);

    // Get auth token from localStorage (fallback mechanism)
    const token = localStorage.getItem("auth_token");
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
          setUploadState({
            isUploading: false,
            progress: 100,
            error: null,
            success: true,
          });
          toast.success("File uploaded successfully!", {
            duration: 3000,
            position: "bottom-right",
          });
        } else {
          handleUploadError(xhr.statusText || "Upload failed");
        }
      });

      xhr.addEventListener("error", () => {
        handleUploadError("Network error occurred");
      });

      xhr.addEventListener("abort", () => {
        handleUploadError("Upload aborted");
      });

      xhr.open("POST", endpoint);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      
      // Include credentials to ensure cookies are sent with the request
      xhr.withCredentials = true;
      
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
    });
    setFile(null);
  };

  const handleUploadError = (errorMessage: string) => {
    setUploadState({
      isUploading: false,
      progress: 0,
      error: errorMessage,
      success: false,
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
    });
    setFile(null);
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
    open
  };
};