import React, { useState } from 'react';

const useCopyToClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return [isCopied, copy];
};

const CopyButton = ({ textToCopy }) => {
    const [isCopied, copy] = useCopyToClipboard();
    return (
        <button onClick={() => copy(textToCopy)} title="Copy to clipboard" className="absolute top-2 right-2 p-1.5 bg-slate-600/50 rounded-md text-slate-400 hover:text-white hover:bg-slate-500 transition">
            {isCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-400"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" /></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.121A1.5 1.5 0 0 1 17 6.621V16.5A1.5 1.5 0 0 1 15.5 18h-9A1.5 1.5 0 0 1 5 16.5v-13A1.5 1.5 0 0 1 6.5 2H7V1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V2h-.5A1.5 1.5 0 0 0 10.5 3.5v3.879a1.5 1.5 0 0 1-.44 1.06L6.94 11.56a.5.5 0 0 0 0 .707l.001.001.002.002.002.002.001.001a.5.5 0 0 0 .707 0l3.12-3.121A1.5 1.5 0 0 0 11.5 8.38V7H9.5A2.5 2.5 0 0 1 7 4.5V3.5Z" /></svg>
            )}
        </button>
    );
};

const SeoSuggestions = ({ analysis, isLoading }) => {
  if (isLoading) {
    return (
        <div className="bg-slate-900/50 p-6 rounded-lg border-2 border-slate-700 animate-pulse mt-6">
            <div className="h-6 bg-slate-700 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
                <div className="h-10 bg-slate-700 rounded w-full"></div>
                <div className="h-10 bg-slate-700 rounded w-full"></div>
                <div className="h-10 bg-slate-700 rounded w-2/3"></div>
            </div>
        </div>
    );
  }

  if (!analysis || (!analysis.metaTitle && analysis.keywords.length === 0)) return null;

  const keywordsString = analysis.keywords.join(', ');

  return (
    <div className="bg-slate-900/50 p-6 rounded-lg border-2 border-slate-700 mt-6">
      <h3 className="text-xl font-bold text-white mb-4">SEO Suggestions</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Meta Title</label>
          <div className="relative">
            <p className="bg-slate-700 text-white p-3 pr-12 rounded-lg text-sm font-mono">{analysis.metaTitle}</p>
            <CopyButton textToCopy={analysis.metaTitle} />
          </div>
           <p className="text-xs text-slate-500 mt-1 text-right">{analysis.metaTitle.length} / 60 characters</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Meta Description</label>
           <div className="relative">
            <p className="bg-slate-700 text-white p-3 pr-12 rounded-lg text-sm font-mono">{analysis.metaDescription}</p>
            <CopyButton textToCopy={analysis.metaDescription} />
          </div>
          <p className="text-xs text-slate-500 mt-1 text-right">{analysis.metaDescription.length} / 160 characters</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Keywords</label>
           <div className="relative">
             <p className="bg-slate-700 text-white p-3 pr-12 rounded-lg text-sm font-mono">{keywordsString}</p>
            <CopyButton textToCopy={keywordsString} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoSuggestions;