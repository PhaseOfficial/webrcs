import React, { useState } from 'react';

const ContentPlanner = ({ posts, onAddPost, onDeletePost, onGenerateFromPost }) => {
    const [topic, setTopic] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!topic || !date) return;
        onAddPost({ topic, date, notes });
        setTopic('');
        setDate('');
        setNotes('');
    };
    
    return (
        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Content Planner</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                 <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Blog Post Topic"
                    required
                    className="w-full bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:border-sky-500 focus:ring-sky-500 transition"
                />
                 <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:border-sky-500 focus:ring-sky-500 transition"
                />
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional notes..."
                    rows={2}
                    className="w-full bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:border-sky-500 focus:ring-sky-500 transition"
                />
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 disabled:bg-slate-500 transition-colors">
                    Add to Plan
                </button>
            </form>
            
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                <h3 className="text-xl font-bold text-white sticky top-0 bg-slate-800 py-2">Scheduled Posts</h3>
                {posts.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center py-4">No posts planned yet.</p>
                ) : (
                    posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(post => (
                        <div key={post.id} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-start gap-2">
                           <div className="flex-1 min-w-0">
                                <p className="font-bold text-white truncate">{post.topic}</p>
                                <p className="text-sm text-sky-300">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
                                {post.notes && <p className="text-xs text-slate-400 mt-1 truncate">{post.notes}</p>}
                           </div>
                           <div className="flex items-center gap-1 flex-shrink-0">
                                <button onClick={() => onGenerateFromPost(post.topic)} title="Use this topic to generate content" className="p-2 text-slate-300 hover:text-white hover:bg-slate-600 rounded-md transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M13.44 4.22a.75.75 0 0 0-1.06-.04L8.5 7.636V5.25a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 0-1.5H9.636l3.804-3.454a.75.75 0 0 0 .04-1.06Z" /><path d="M3.75 2A2.75 2.75 0 0 0 1 4.75v10.5A2.75 2.75 0 0 0 3.75 18h12.5A2.75 2.75 0 0 0 19 15.25V8.75a.75.75 0 0 0-1.5 0v6.5c0 .69-.56 1.25-1.25 1.25H3.75c-.69 0-1.25-.56-1.25-1.25V4.75c0-.69.56-1.25 1.25-1.25h6.5a.75.75 0 0 0 0-1.5h-6.5Z" /></svg>
                                </button>
                                <button onClick={() => onDeletePost(post.id)} title="Delete Plan" className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded-md transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193v-.443A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" /></svg>
                                </button>
                           </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContentPlanner;