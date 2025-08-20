import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative">
        {/* Main spinning circle */}
        <div className="w-20 h-20 border-4 border-transparent border-t-purple-500 border-r-purple-400 rounded-full animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
        
        {/* Outer glow ring */}
        <div className="absolute -inset-2 border-2 border-purple-500/20 rounded-full animate-ping"></div>
        
        {/* Background blur effect */}
        <div className="absolute -inset-8 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
      </div>
      
      {/* Loading text with typing effect */}
      <div className="absolute mt-32 flex items-center space-x-1">
        <span className="text-2xl font-light text-white/90 tracking-wider">Loading</span>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-20 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-300/40 rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-300/40 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-purple-300/30 rounded-full animate-ping" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}></div>
      </div>
    </div>
  )
}

export default Loading