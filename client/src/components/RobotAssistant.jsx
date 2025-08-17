import React from 'react';
import { Bot, FileCheck, Loader2, Image, FileSpreadsheet } from 'lucide-react';


function RobotAssistant({ isProcessing, hasLogo, hasExcel }) {
  const allFilesUploaded = hasLogo && hasExcel;
  
  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#007ACC] to-blue-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
      
      {/* Main robot container */}
      <div className="relative bg-white/30 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-2xl transform transition-all duration-500 hover:scale-105">
        <div className="text-center">
          {/* Robot Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#007ACC] to-blue-600 rounded-full flex items-center justify-center shadow-xl">
              {isProcessing ? (
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              ) : allFilesUploaded ? (
                <FileCheck className="w-12 h-12 text-white" />
              ) : (
                <Bot className="w-12 h-12 text-white" />
              )}
            </div>
            
            {/* Status indicator */}
            <div className="absolute -bottom-2 -right-2">
              <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${
                isProcessing ? 'bg-yellow-400 animate-pulse' : 
                allFilesUploaded ? 'bg-green-400' : 'bg-gray-400'
              }`}></div>
            </div>
          </div>
          
          {/* Status text */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {isProcessing ? 'Processing...' : allFilesUploaded ? 'Ready to Process' : 'Waiting for Files'}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4">
            {isProcessing 
              ? 'Your file is being processed by our AI assistant' 
              : allFilesUploaded 
                ? 'All files uploaded successfully. Ready to begin processing.'
                : 'Upload all required files and enter your institution name to get started'
            }
          </p>
          
          {/* File status indicators */}
          <div className="space-y-2 text-xs">
            
            <div className={`flex items-center space-x-2 ${hasLogo ? 'text-green-600' : 'text-gray-400'}`}>
              <Image className="w-3 h-3" />
              <span>College Logo</span>
            </div>
            <div className={`flex items-center space-x-2 ${hasExcel ? 'text-green-600' : 'text-gray-400'}`}>
              <FileSpreadsheet className="w-3 h-3" />
              <span>Student Data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RobotAssistant;