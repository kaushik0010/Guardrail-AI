import { Users, Zap, Plug, Target } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: "Multi-Agent Pipeline",
    description: "A fast Triage agent for efficiency, and powerful Specialist agents for deep analysis of prompt injections and harmful content.",
    color: "blue"
  },
  {
    icon: Zap,
    title: "Rate Limiting",
    description: "Built-in protection against Denial of Service and Denial of Wallet attacks, ensuring your service remains stable and cost-effective.",
    color: "orange"
  },
  {
    icon: Plug,
    title: "Seamless Integration",
    description: "No custom SDK needed. Works with your existing tools by simply changing the API endpoint URL in your configuration.",
    color: "green"
  },
  {
    icon: Target,
    title: "False Positive Resistant",
    description: "Intelligently trained to understand user intent, allowing legitimate security questions without being incorrectly blocked.",
    color: "purple"
  }
];

const colorClasses = {
  blue: "bg-blue-900/50 text-blue-400",
  orange: "bg-orange-900/50 text-orange-400",
  green: "bg-green-900/50 text-green-400",
  purple: "bg-purple-900/50 text-purple-400"
};

export const FeaturesSection = () => (
  <section className="my-16 sm:my-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
        Core Features
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto px-4">
        Comprehensive security features designed specifically for AI applications
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="group bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className={`inline-flex p-2 sm:p-3 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200`}>
            <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-200">{feature.title}</h3>
          <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);