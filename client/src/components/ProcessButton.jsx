import React from 'react';
import { Play, Loader } from 'lucide-react';


export default function ProcessButton({ onClick, disabled, isProcessing }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isProcessing}
      className={`
        w-full max-w-md mx-auto px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform
        ${disabled || isProcessing
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed scale-95'
          : 'bg-gradient-to-r from-[#007ACC] to-blue-600 text-white hover:from-blue-600 hover:to-[#007ACC] hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
        }
        relative overflow-hidden group
      `}
    >
      {/* Background animation */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full transition-transform duration-1000
        ${!disabled && !isProcessing ? 'group-hover:translate-x-full' : ''}
      `}></div>
      
      <div className="relative flex items-center justify-center space-x-2">
        {isProcessing ? (
          <Loader className="w-6 h-6 animate-spin" />
        ) : (
          <Play className="w-6 h-6" />
        )}
        <span>
          {isProcessing ? 'Processing...' : 'Process File'}
        </span>
      </div>
    </button>
  );
}