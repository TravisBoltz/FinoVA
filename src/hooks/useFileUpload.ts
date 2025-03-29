"use client";

import { useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { toast } from "sonner";

interface UseFileUploadOptions {
  maxSize?: number;
}

export const useFileUpload = (options?: UseFileUploadOptions) => {
  const [file, setFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    maxSize: options?.maxSize || 10 * 1024 * 1024, // 10MB default
    multiple: false,
    noClick: !!file,
    disabled: false,
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

  return {
    file,
    getRootProps,
    getInputProps,
    isDragActive,
    open
  };
};