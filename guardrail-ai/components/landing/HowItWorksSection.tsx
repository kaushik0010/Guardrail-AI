import { ArrowRight, Shield, Cpu, Cloud } from 'lucide-react';

export const HowItWorksSection = () => (
  <section className="my-16 sm:my-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
        How It Works
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto px-4">
        A seamless security layer that integrates directly into your existing workflow
      </p>
    </div>
    
    <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700 mx-4 sm:mx-0">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="p-2 sm:p-3 bg-green-900/50 rounded-lg">
            <Cloud className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
          </div>
          <span className="font-semibold text-gray-200 text-sm sm:text-base">Your App</span>
        </div>
        
        <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 transform rotate-90 md:rotate-0 flex-shrink-0" />
        
        <div className="flex items-center space-x-3 sm:space-x-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 sm:p-4 rounded-xl shadow-lg">
          <div className="p-1 sm:p-2 bg-white/20 rounded-lg">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <span className="font-bold text-sm sm:text-base">Guardrail AI</span>
        </div>
        
        <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 transform rotate-90 md:rotate-0 flex-shrink-0" />
        
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="p-2 sm:p-3 bg-purple-900/50 rounded-lg">
            <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
          </div>
          <span className="font-semibold text-gray-200 text-sm sm:text-base">LLM Provider</span>
        </div>
      </div>
      
      <p className="text-center mt-6 sm:mt-8 text-gray-400 leading-relaxed text-sm sm:text-base px-2">
        Instead of calling your LLM provider directly, you route API calls through the Guardrail AI service. 
        Our multi-agent pipeline inspects every request and response in real-time, blocking threats before they can cause harm.
      </p>
    </div>
  </section>
);