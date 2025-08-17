import React from 'react';



function ProgressBar({ progress, isVisible, info }) {
  if (!isVisible) return null;

  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Processing Progress</span>
          <span className="text-sm font-bold text-[#007ACC]">{progress}%</span>
        </div>
        
        <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#007ACC] to-blue-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          >
            <div className="h-full bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 text-center">
        {info}
      </p>
    </div>
  );
}

export default ProgressBar;