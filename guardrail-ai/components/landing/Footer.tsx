import { Github, Mail, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 border-t border-gray-800">
      <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left Side */}
          <div className="text-center md:text-left">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg sm:text-xl">Guardrail AI</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">© 2025. All rights reserved.</p>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200 hover:scale-105"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            <a 
              href="#" 
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200 hover:scale-105"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};