import React, { useState } from 'react';
import { suggestImagePrompts } from '../services/geminiService';
import Spinner from './Spinner';

const ImagePromptSuggester = ({ blogContent, onSelectPrompt }) => {
  const [prompts, setPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!blogContent.trim()) return;
    setIsLoading(true);
    try {
      const suggestions = await suggestImagePrompts(blogContent);
      setPrompts(suggestions);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!blogContent.trim()) return null;

  return (
    <div className="mt-4 mb-6 border-t border-slate-700 pt-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-slate-400">AI Suggestions</label>
        <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="text-xs bg-indigo-900/50 text-indigo-300 hover:bg-indigo-800/50 px-2 py-1 rounded transition-colors flex items-center gap-1"
        >
            {isLoading ? <Spinner className="w-3 h-3" /> : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.96l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.96 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.96l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.683a1 1 0 0 1 .633.633l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684Z" />
                    </svg>
                    Suggest from Content
                </>
            )}
        </button>
      </div>
      
      {prompts.length > 0 && (
          <div className="space-y-2 animate-fade-in">
              {prompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectPrompt(prompt)}
                    className="w-full text-left text-xs bg-slate-700 hover:bg-slate-600 p-2 rounded text-slate-300 border border-transparent hover:border-indigo-500 transition-all"
                  >
                    {prompt}
                  </button>
              ))}
          </div>
      )}
    </div>
  );
};

export default ImagePromptSuggester;