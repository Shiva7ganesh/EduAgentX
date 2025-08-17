import React from 'react';
import { Play, Loader2 } from 'lucide-react';


function ProcessButton({ onClick, disabled, isProcessing }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-4 rounded-2xl font-semibold text-white shadow-xl transform transition-all duration-300
        ${disabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-[#007ACC] to-blue-600 hover:from-[#005a99] hover:to-blue-700 hover:scale-105 active:scale-95'
        }
        ${isProcessing ? 'animate-pulse' : ''}
      `}
    >
      <div className="flex items-center space-x-2">
        {isProcessing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Play className="w-5 h-5" />
        )}
        <span>
          {isProcessing ? 'Processing...' : 'Start Processing'}
        </span>
      </div>
    </button>
  );
}

export default ProcessButton;