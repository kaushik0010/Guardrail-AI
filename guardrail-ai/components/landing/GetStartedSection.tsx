import { CodeBlock } from './CodeBlock';
import { Download, Key, Settings, Code } from 'lucide-react';

const steps = [
  {
    icon: Download,
    title: "Install Dependencies",
    description: "In your application's backend, you'll need an HTTP client like `axios` to call the Guardrail AI service."
  },
  {
    icon: Key,
    title: "Get Your API Keys",
    description: "You will need two keys: Your LLM provider key and your Guardrail AI API key."
  },
  {
    icon: Settings,
    title: "Set Environment Variables",
    description: "Add your keys and the Guardrail AI endpoint URL to your project's environment file."
  },
  {
    icon: Code,
    title: "Secure Your API Calls",
    description: "Create a route in your backend that calls the Guardrail AI service instead of the LLM provider directly."
  }
];

export const GetStartedSection = () => (
  <section id="get-started" className="my-16 sm:my-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
        Get Started in Minutes
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto px-4">
        Simple integration that takes just a few steps to implement
      </p>
    </div>
    
    <div className="bg-gray-800 p-4 sm:p-8 rounded-2xl shadow-lg border border-gray-700 space-y-8 sm:space-y-12 mx-4 sm:mx-0">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col lg:flex-row gap-4 sm:gap-8 items-start">
          <div className="flex items-start space-x-3 sm:space-x-4 lg:w-1/3">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-blue-900/50 rounded-lg">
              <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl mb-2 text-gray-200">{step.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{step.description}</p>
            </div>
          </div>
          
          <div className="lg:w-2/3 w-full">
            {index === 0 && (
              <CodeBlock>{`pnpm add axios`}</CodeBlock>
            )}
            
            {index === 1 && (
              <div className="space-y-3 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <p className="text-gray-300 text-sm sm:text-base">You will need two keys:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm sm:text-base">
                  <li>Your own API key from the underlying LLM provider (e.g., Cerebras).</li>
                  <li>Your Guardrail AI API key (for this demo, use the master key below).</li>
                </ul>
              </div>
            )}
            
            {index === 2 && (
              <CodeBlock>
{`# The key you get from us (Guardrail AI)
GUARDRAIL_API_KEY="HAdXvTPSHwdzOdDEr6aMxvfLMGjT75YkfxoBrT+aAFM="

# The URL for the Guardrail AI service
GUARDRAIL_API_URL="https://guardrail-ai-2trd.vercel.app/api/guard/v1/chat/completions"

# Your own key for the target LLM provider
CEREBRAS_API_KEY="sk-..."`}
              </CodeBlock>
            )}
            
            {index === 3 && (
              <CodeBlock>
{`// In your backend, e.g., /app/api/ask-ai/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { message, model } = await request.json();

    const response = await axios.post(
      process.env.GUARDRAIL_API_URL!,
      {
        message,
        model,
      },
      {
        headers: {
          'x-guardrail-api-key': process.env.GUARDRAIL_API_KEY!,
          'Authorization': \`Bearer \${process.env.CEREBRAS_API_KEY}\`
        },
      }
    );

    return NextResponse.json(response.data);

  } catch (error: any) {
    // Handle errors, including blocks from Guardrail AI
    return NextResponse.json(
      error.response?.data || { error: 'An unexpected error occurred' },
      { status: error.response?.status || 500 }
    );
  }
}`}
              </CodeBlock>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);