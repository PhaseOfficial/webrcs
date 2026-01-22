import React, { useState } from 'react';
import { generateBlogContent, analyzeSeo } from '../services/geminiService';
import SeoSuggestions from './SeoSuggestions';

const SeoAnalyzer = () => {
    const [topic, setTopic] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!topic) return;

        setIsLoading(true);
        setAnalysis(null);

        try {
            const blogContent = await generateBlogContent(topic);
            const seoAnalysis = await analyzeSeo(topic, blogContent);
            setAnalysis(seoAnalysis);
        } catch (error) {
            console.error("Error during SEO analysis:", error);
            // You might want to set an error state here to show in the UI
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold text-center mb-4">SEO Topic Analyzer</h2>
            <div className="flex justify-center">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your SEO topic (e.g., red cup series' web services)"
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading || !topic}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r-md disabled:bg-gray-400 hover:bg-blue-700 transition"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze'}
                </button>
            </div>
            {analysis && <SeoSuggestions analysis={analysis} isLoading={isLoading} />}
        </div>
    );
};

export default SeoAnalyzer;
