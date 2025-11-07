"use client";

import React, { useState, DragEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Trash2 } from "lucide-react";

const UploadSection = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // ✅ Add files
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // ✅ Drop files
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  // ✅ Delete file
  const handleDelete = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Send action
  const handleSend = () => {
    alert(`${files.length} file(s) sent successfully!`);
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-6 p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
      {/* LEFT: Upload Section */}
      <motion.div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`w-full lg:w-[45%] h-[320px] sm:h-[400px] border-2 border-dashed rounded-2xl flex flex-col justify-center items-center p-6 text-center cursor-pointer transition-all duration-300
          ${isDragging ? "border-blue-500 bg-blue-50 scale-105" : "border-gray-300 hover:border-blue-400"}`}
      >
        <Upload className="w-14 h-14 text-blue-600 mb-4" />
        <p className="text-gray-700 font-semibold mb-2">
          Drag & drop files here or
        </p>

        <label className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all">
          Browse Files
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <p className="text-xs text-gray-500 mt-3">
          Supported: Images, PDFs, Docs, etc.
        </p>
      </motion.div>

      {/* RIGHT: Uploaded Files Section */}
      <div className="w-full lg:w-[55%] min-h-[320px] sm:min-h-[400px] bg-white border border-gray-200 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center lg:text-left">
            Uploaded Files
          </h2>

          {files.length === 0 ? (
            <p className="text-gray-500 text-center mt-10 sm:mt-20">
              No files uploaded yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence>
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-50 border rounded-xl shadow-sm hover:shadow-lg transition-all relative group"
                  >
                    <div className="h-36 sm:h-40 flex items-center justify-center overflow-hidden rounded-t-xl bg-white">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-500">
                          <FileText className="w-10 h-10 mb-2" />
                          <p className="text-xs">
                            {file.name.split(".").pop()?.toUpperCase()}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="p-3 flex justify-between items-center overflow-hidden text-clip">
                       <div>
                         <p className="truncate text-sm font-semibold text-gray-800 "> {file.name} </p> 
                         <p className="text-xs text-gray-500"> {(file.size / 1024).toFixed(1)} KB </p> 
                         </div>
                          </div> 
                          <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700 transition-all opacity-0 group-hover:opacity-100 flex items-end-safe" title="Delete File" >
                       <Trash2 className="w-5 h-5" />
                        </button>
                   
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* ✅ Send Button */}
        {files.length > 0 && (
          <div className="mt-6 flex justify-center lg:justify-end">
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
