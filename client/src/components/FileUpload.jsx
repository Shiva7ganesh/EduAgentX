import React, { useRef } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';


function FileUpload({ onFileSelect, hasFile, fileName }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Document Upload
      </label>
      
      <div
        onClick={handleClick}
        className="relative w-full p-8 border-2 border-dashed border-white/40 rounded-2xl bg-white/20 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-[#007ACC]/50 hover:bg-white/30 group"
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
        />
        
        <div className="text-center">
          {hasFile ? (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <div>
                <p className="text-lg font-semibold text-gray-800">File Uploaded</p>
                <p className="text-sm text-gray-600 flex items-center justify-center mt-2">
                  <FileText className="w-4 h-4 mr-2" />
                  {fileName}
                </p>
              </div>
              <p className="text-xs text-gray-500">Click to upload a different file</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-[#007ACC] mx-auto group-hover:scale-110 transition-transform duration-300" />
              <div>
                <p className="text-lg font-semibold text-gray-800">Upload Document</p>
                <p className="text-sm text-gray-600">
                  Click to select or drag and drop your file here
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Supported formats: PDF, DOC, DOCX, TXT
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;