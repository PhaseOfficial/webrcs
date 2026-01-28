import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import logo from '/weblogo.png';

const ReaderBlog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    fetchPublishedPosts();
  }, []);

  const fetchPublishedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const publishedPosts = data || [];
      setBlogPosts(publishedPosts);
      
      // Set the most recent post as featured
      if (publishedPosts.length > 0) {
        setFeaturedPost(publishedPosts[0]);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter posts based on search term
  const filteredPosts = blogPosts.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.seo_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.seo_keywords?.some(keyword => 
      keyword.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderBlogContent = (content) => {
    if (!content) return '';
    
    // Process inline formatting
    const processInlineFormatting = (text) => {
      // Handle bold: **text**
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Handle italic: *text*
      text = text.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
      
      return text;
    };

    return content
      .split('\n\n')
      .map(paragraph => {
        const trimmedParagraph = paragraph.trim();
        if (trimmedParagraph === '') return '';
        
        // Process inline formatting first
        let processedParagraph = processInlineFormatting(trimmedParagraph);
        
        // Handle headings and paragraphs
        if (trimmedParagraph.startsWith('# ')) {
          const headingText = processInlineFormatting(trimmedParagraph.substring(2));
          return `<h1 class="text-4xl font-bold text-gray-900 mb-6 mt-8">${headingText}</h1>`;
        } else if (trimmedParagraph.startsWith('## ')) {
          const headingText = processInlineFormatting(trimmedParagraph.substring(3));
          return `<h2 class="text-3xl font-bold text-gray-900 mb-4 mt-6">${headingText}</h2>`;
        } else if (trimmedParagraph.startsWith('### ')) {
          const headingText = processInlineFormatting(trimmedParagraph.substring(4));
          return `<h3 class="text-2xl font-bold text-gray-900 mb-3 mt-5">${headingText}</h3>`;
        } else if (trimmedParagraph.startsWith('#### ')) {
          const headingText = processInlineFormatting(trimmedParagraph.substring(5));
          return `<h4 class="text-xl font-bold text-gray-900 mb-2 mt-4">${headingText}</h4>`;
        } else {
          return `<p class="text-gray-700 mb-4 leading-relaxed text-lg">${processedParagraph}</p>`;
        }
      })
      .join('');
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
    <Navbar />
    <div className="min-h-screen mt-16">
    
      {/* Header */}
      <header className="bg-white shadow-sm mb-8 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-20 rounded-lg flex items-center justify-center">
                <img src={logo} alt="Logo" className="w-20" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Our Blog</h1>
                <p className="text-gray-600">Insights, stories, and updates</p>
              </div>
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-md ml-8">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Featured Post */}
      {featuredPost && !searchTerm && (
        <section className="bg-white rounded-3xl border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    Featured Post
                  </span>
                  <span className="text-gray-500 text-sm">
                    {formatDate(featuredPost.created_at)}
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.seo_description}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <span>By {featuredPost.author}</span>
                  <span>•</span>
                  <span>{getReadingTime(featuredPost.content)} min read</span>
                </div>
                <button
                  onClick={() => setSelectedPost(featuredPost)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Read Full Article
                </button>
              </div>
              
              {featuredPost.featured_image && (
                <div className="relative">
                  <img 
                    src={featuredPost.featured_image} 
                    alt={featuredPost.title}
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchTerm ? `Search Results (${filteredPosts.length})` : 'Latest Articles'}
          </h2>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Blog Posts Grid */}
        {currentPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No posts found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'No blog posts have been published yet.'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Posts
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.map((post, index) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.featured_image && (
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        {formatDate(post.created_at)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {getReadingTime(post.content)} min read
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    {post.seo_description && (
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {post.seo_description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        By {post.author}
                      </span>
                      
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                        <span>Read More</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    {/* Keywords */}
                    {post.seo_keywords && post.seo_keywords.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-1">
                          {post.seo_keywords.slice(0, 3).map((keyword, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border rounded-lg ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Blog Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 overflow-hidden">
            {/* Header */}
            <div className="relative">
              {selectedPost.featured_image && (
                <img 
                  src={selectedPost.featured_image} 
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              {/* Article Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {selectedPost.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">By {selectedPost.author}</span>
                    <span>•</span>
                    <span>{formatDate(selectedPost.created_at)}</span>
                    <span>•</span>
                    <span>{getReadingTime(selectedPost.content)} min read</span>
                  </div>
                </div>

                {selectedPost.seo_description && (
                  <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-4 py-2">
                    {selectedPost.seo_description}
                  </p>
                )}
              </div>

              {/* Additional Images */}
              {selectedPost.images && selectedPost.images.length > 1 && (
                <div className="mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedPost.images.slice(1).map((image, index) => (
                      <img 
                        key={index}
                        src={image.url} 
                        alt={`${selectedPost.title} - Image ${index + 2}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Article Content */}
              <article className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderBlogContent(selectedPost.content) }}
                />
              </article>

              {/* Keywords */}
              {selectedPost.seo_keywords && selectedPost.seo_keywords.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.seo_keywords.map((keyword, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Share</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    <span>Tweet</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
    </div>
  );
};

export default ReaderBlog;