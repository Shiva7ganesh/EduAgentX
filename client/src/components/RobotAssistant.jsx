import React from 'react';



export default function RobotAssistant({ isProcessing, hasFile }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Robot Body */}
      <div className="relative">
        {/* Main Body */}
        <div className="w-32 h-40 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl border-2 border-gray-300 shadow-xl relative overflow-hidden">
          {/* Circuit Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-4 h-4 border border-[#007ACC] rounded-full"></div>
            <div className="absolute top-8 right-6 w-2 h-2 bg-[#007ACC] rounded-full"></div>
            <div className="absolute bottom-8 left-6 w-3 h-3 border border-[#007ACC]"></div>
          </div>
          
          {/* Head */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-b from-white to-gray-100 rounded-full border-2 border-gray-300 shadow-lg">
            {/* Eyes */}
            <div className="flex justify-center items-center space-x-3 mt-6">
              <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${
                isProcessing ? 'bg-yellow-400 animate-pulse' : hasFile ? 'bg-green-400' : 'bg-[#007ACC]'
              } shadow-lg`}>
                <div className={`w-2 h-2 bg-white rounded-full ml-1 mt-1 transition-transform ${
                  isProcessing ? 'animate-bounce' : ''
                }`}></div>
              </div>
              <div className={`w-4 h-4 rounded-full transition-colors duration-500 ${
                isProcessing ? 'bg-yellow-400 animate-pulse' : hasFile ? 'bg-green-400' : 'bg-[#007ACC]'
              } shadow-lg`}>
                <div className={`w-2 h-2 bg-white rounded-full ml-1 mt-1 transition-transform ${
                  isProcessing ? 'animate-bounce' : ''
                }`}></div>
              </div>
            </div>
            
            {/* Mouth */}
            <div className={`mx-auto mt-3 w-6 h-3 border-2 rounded-full transition-all duration-500 ${
              isProcessing ? 'border-yellow-400 animate-pulse' : hasFile ? 'border-green-400' : 'border-[#007ACC]'
            }`}></div>
          </div>
          
          {/* Chest Panel */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg border border-gray-300">
            <div className="flex flex-col items-center justify-center h-full space-y-1">
              <div className={`w-8 h-1 rounded-full transition-colors duration-300 ${
                isProcessing ? 'bg-yellow-400 animate-pulse' : hasFile ? 'bg-green-400' : 'bg-[#007ACC]'
              }`}></div>
              <div className={`w-6 h-1 rounded-full transition-colors duration-300 ${
                isProcessing ? 'bg-yellow-400 animate-pulse' : hasFile ? 'bg-green-400' : 'bg-[#007ACC]'
              }`}></div>
              <div className={`w-4 h-1 rounded-full transition-colors duration-300 ${
                isProcessing ? 'bg-yellow-400 animate-pulse' : hasFile ? 'bg-green-400' : 'bg-[#007ACC]'
              }`}></div>
            </div>
          </div>
        </div>
        
        {/* Arms */}
        <div className="absolute top-12 -left-8 w-6 h-16 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full border border-gray-300 shadow-md"></div>
        <div className="absolute top-12 -right-8 w-6 h-16 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full border border-gray-300 shadow-md"></div>
        
        {/* Clipboard in Right Hand */}
        <div className="absolute top-20 -right-12 w-8 h-10 bg-white rounded-sm border border-gray-400 shadow-md transform rotate-12">
          <div className="w-6 h-1 bg-gray-300 rounded-full mx-auto mt-2"></div>
          <div className="w-5 h-1 bg-gray-300 rounded-full mx-auto mt-1"></div>
          <div className="w-6 h-1 bg-gray-300 rounded-full mx-auto mt-1"></div>
          <div className="w-4 h-1 bg-gray-300 rounded-full mx-auto mt-1"></div>
        </div>
      </div>
      
      {/* Status Message */}
      <div className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
        <p className={`text-sm font-medium transition-colors duration-300 ${
          isProcessing ? 'text-yellow-600' : hasFile ? 'text-green-600' : 'text-[#007ACC]'
        }`}>
          {isProcessing ? 'Processing your file...' : hasFile ? 'Ready to process!' : 'Upload a file to begin'}
        </p>
      </div>
    </div>
  );
}