'use client'

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export const CodeBlock = ({ children }: { children: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group w-full">
      <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
        <pre className="text-gray-100 p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm my-0 max-w-full">
          <code className="whitespace-pre block min-w-min">{children}</code>
        </pre>
      </div>
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-2 bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-700 border border-gray-600 shadow-lg"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-gray-400" />
        )}
      </button>
    </div>
  );
};