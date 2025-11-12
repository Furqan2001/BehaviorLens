"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploaderProps {
  onUpload: (file: File) => void | Promise<void>;
  loading?: boolean;
}

export default function ImageUploader({
  onUpload,
  loading = false,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const allowedExts = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
      const fileNameLower = file.name.toLowerCase();
      const ext = fileNameLower.substring(fileNameLower.lastIndexOf("."));
      if (!allowedExts.includes(ext)) {
        window.alert(
          "Unsupported file type. Only PNG, JPG (JPEG), WEBP, and GIF files are allowed."
        );
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);

      // Call parent handler
      await onUpload(file);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
      "image/gif": [".gif"],
    },
    maxFiles: 1,
    disabled: loading,
  });

  const clearPreview = () => {
    setPreview(null);
    setFileName("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="uploader"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              {...getRootProps()}
              className={`
                relative border-3 border-dashed rounded-2xl p-12 
                transition-all duration-200 cursor-pointer
                ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50 scale-105"
                    : "border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/50"
                }
                ${loading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <input {...getInputProps()} />

              <div className="flex flex-col items-center justify-center gap-4">
                {/* Icon */}
                <motion.div
                  animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`
                    p-6 rounded-full 
                    ${isDragActive ? "bg-blue-100" : "bg-gray-100"}
                  `}
                >
                  {loading ? (
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                  ) : (
                    <Upload
                      className={`w-12 h-12 ${
                        isDragActive ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                  )}
                </motion.div>

                <div className="text-center">
                  <p className="text-xl font-semibold text-gray-900 mb-2">
                    {loading
                      ? "Analyzing your design..."
                      : isDragActive
                      ? "Drop your design here"
                      : "Upload UI Design or Screenshot"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {loading
                      ? "This may take a few seconds"
                      : "Drag & drop or click to browse"}
                  </p>
                </div>

                {!loading && (
                  <div className="flex items-center gap-2 mt-2">
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      PNG, JPG, WEBP up to 10MB
                    </span>
                  </div>
                )}
              </div>

              {/* Loading overlay */}
              {loading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl" />
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {/* Preview Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {/* Image Preview */}
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />

                <button
                  onClick={clearPreview}
                  className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                  disabled={loading}
                >
                  <X className="w-5 h-5" />
                </button>

                {loading && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-3" />
                      <p className="text-white font-medium">
                        Analyzing your design...
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ImageIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {fileName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Ready for analysis
                      </p>
                    </div>
                  </div>

                  {!loading && (
                    <button
                      onClick={clearPreview}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!preview && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        ></motion.div>
      )}
    </div>
  );
}
