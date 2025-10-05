'use client';

import { useState, FormEvent } from 'react';
import axios, { isAxiosError } from 'axios';

interface Message {
  role: 'user' | 'assistant' | 'error';
  content: string;
}

const availableModels = [
  'llama-4-scout-17b-16e-instruct',
  'gpt-oss-120b',
  'qwen-3-32b',
  'qwen-3-235b-a22b-thinking-2507',
  'llama-3.3-70b',
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [selectedModel, setSelectedModel] = useState(availableModels[0]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    const apiEndpoint = isProtected ? '/api/protected' : '/api/unprotected';

    try {
      const response = await axios.post(apiEndpoint, { 
        message: input,
        model: selectedModel 
      });
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response.data.choices[0].message.content 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      let errorMessageContent = 'An unexpected error occurred.';
      if (isAxiosError(error)) {
        errorMessageContent = error.response?.data?.error?.message || 'An error from the server.';
      } else if (error instanceof Error) {
        errorMessageContent = error.message;
      }
      
      const errorMessage: Message = { 
        role: 'error', 
        content: errorMessageContent
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 font-sans">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">🛡️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Guardrail AI</h1>
        </div>
        <p className="text-lg text-gray-600 mt-2 font-medium">The Customer Demo</p>
      </div>

      {/* Model Selection */}
      <div className="w-full max-w-3xl mx-auto mb-6">
        <label htmlFor="model-select" className="block text-sm font-semibold text-gray-700 mb-2">
          Select Target Model
        </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white transition-colors"
        >
          {availableModels.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>

      {/* Protection Toggle */}
      <div className="w-full max-w-3xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`text-center flex-1 ${!isProtected ? 'text-red-600' : 'text-gray-400'}`}>
              <div className="text-sm font-semibold mb-1">Unprotected</div>
              <div className="text-xs">Vulnerable to attacks</div>
            </div>
            
            <div className="mx-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isProtected} 
                  onChange={() => setIsProtected(!isProtected)} 
                  className="sr-only peer" 
                />
                <div className="w-16 h-8 bg-red-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500 shadow-inner"></div>
              </label>
            </div>

            <div className={`text-center flex-1 ${isProtected ? 'text-green-600' : 'text-gray-400'}`}>
              <div className="text-sm font-semibold mb-1">Protected</div>
              <div className="text-xs">Guardrails active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col h-[600px] border border-gray-300 rounded-2xl bg-white shadow-xl overflow-hidden">
          {/* Messages Area */}
          <div className="flex-grow p-6 overflow-y-auto bg-gradient-to-b from-white to-gray-50/50">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <p className="text-lg font-medium text-gray-600">Start a conversation</p>
                <p className="text-sm text-gray-400 mt-1">Your messages will appear here</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 p-4 rounded-2xl max-w-[85%] whitespace-pre-wrap shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto rounded-br-md' 
                      : msg.role === 'assistant' 
                      ? 'bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-md'
                      : 'bg-red-50 text-red-800 border border-red-200 rounded-bl-md'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${
                      msg.role === 'user' ? 'bg-blue-200' :
                      msg.role === 'assistant' ? 'bg-gray-400' :
                      'bg-red-400'
                    }`}></span>
                    <strong className="text-sm font-semibold capitalize">{msg.role}</strong>
                  </div>
                  <div className="text-sm leading-relaxed">{msg.content}</div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-100 text-gray-500 max-w-[85%] border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm">Thinking...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all"
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium disabled:from-blue-300 disabled:to-blue-400 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}