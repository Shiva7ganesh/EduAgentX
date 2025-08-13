import React from 'react';



export default function ProgressBar({ progress, isVisible , info}) {
  if (!isVisible) return null;

  return (
    <div className="w-full mb-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Processing Progress</span>
        <span className="text-sm text-[#007ACC] font-semibold">{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#007ACC] to-blue-400 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full animate-shine"></div>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 text-center">
        {info}
      </div>
    </div>
  );
}