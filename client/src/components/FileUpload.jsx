import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';


export default function FileUpload({ onFileSelect, hasFile, fileName }) {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith('.xlsx')) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="relative group"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className={`
          relative p-8 border-2 border-dashed rounded-2xl transition-all duration-300
          ${hasFile 
            ? 'border-green-400 bg-green-50/50' 
            : 'border-[#007ACC]/50 bg-white/10 hover:bg-white/20 hover:border-[#007ACC]'
          }
          backdrop-blur-sm shadow-xl group-hover:shadow-2xl
        `}>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="text-center">
            <div className={`
              mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300
              ${hasFile 
                ? 'bg-green-100 text-green-600' 
                : 'bg-[#007ACC]/10 text-[#007ACC] group-hover:bg-[#007ACC]/20'
              }
            `}>
              <Upload className="w-8 h-8" />
            </div>
            
            {hasFile ? (
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-2">File Ready!</h3>
                <p className="text-sm text-gray-600 truncate max-w-xs mx-auto">
                  {fileName}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Upload Excel File
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Drop your .xlsx file here or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supported formats: .xlsx, .xls
                </p>
              </div>
            )}
          </div>
          
          {/* Glassmorphism border effect */}
          <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}