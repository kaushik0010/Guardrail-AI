import { Shield, ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection = () => (
  <section className="relative text-center py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute top-10 left-10 opacity-10">
      <Shield className="h-32 w-32 text-blue-400" />
    </div>
    <div className="absolute bottom-10 right-10 opacity-10">
      <Shield className="h-32 w-32 text-blue-400" />
    </div>
    
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
      <div className="inline-flex items-center space-x-2 bg-blue-900/50 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse border border-blue-800/50">
        <Sparkles className="h-4 w-4" />
        <span>Secure Your AI Applications</span>
      </div>
      
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
        Guardrail AI
      </h1>
      
      <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
        The Real-Time Security Layer for GenAI Applications.
        <br className="hidden sm:block" />
        Secure your LLM calls with a one-line configuration change.
      </p>
      
      <a 
        href="#get-started" 
        className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
      >
        <span>Get Started</span>
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
      </a>
    </div>
  </section>
);