import React from "react";
import { Home, ArrowLeft, Search, RefreshCw } from "lucide-react";

const Error404Page = () => {
  const handleGoHome = () => {
    // For React Router, you would use: navigate('/');
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-600/20 rounded-full blur-lg animate-bounce delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Large 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-black text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 bg-clip-text leading-none animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-orange-500/20 blur-sm leading-none">
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the
            digital void. Don't worry, even the best explorers sometimes take a
            wrong turn.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={handleGoHome}
            className="group flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
          >
            <Home size={20} />
            <span>Go Home</span>
            <div className="w-0 group-hover:w-2 h-2 bg-black rounded-full transition-all duration-300"></div>
          </button>

          <button
            onClick={handleGoBack}
            className="group flex items-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-600 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>

          <button
            onClick={handleRefresh}
            className="group flex items-center gap-3 px-8 py-4 bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white font-semibold rounded-lg border border-gray-600 transition-all duration-300"
          >
            <RefreshCw
              size={20}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            <span>Refresh</span>
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-orange-500/20 rounded-full">
              <Search className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Try Searching
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Maybe we can help you find what you're looking for
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search our site..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-orange-500 transition-colors duration-300">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Fun Quote */}
        <div className="mt-12 text-center">
          <blockquote className="text-gray-500 italic text-lg">
            "Not all who wander are lost... but this page definitely is."
          </blockquote>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 right-10 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
      <div className="absolute bottom-10 left-10 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-700"></div>
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-orange-600 rounded-full animate-ping delay-300"></div>
    </div>
  );
};

export default Error404Page;
