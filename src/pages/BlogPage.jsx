import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [filter, setFilter] = useState('all'); // all, published, draft
  const [searchTerm, setSearchTerm] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, [filter]);

  const fetchBlogPosts = async () => {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply status filter
      if (filter === 'published') {
        query = query.eq('status', 'published');
      } else if (filter === 'draft') {
        query = query.eq('status', 'draft');
      }

      const { data, error } = await query;

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePostStatus = async (postId, newStatus) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', postId);

      if (error) throw error;
      
      // Update local state
      setBlogPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, status: newStatus } : post
      ));
      
      // Update selected post if open
      if (selectedPost?.id === postId) {
        setSelectedPost({ ...selectedPost, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  const updatePost = async (postId, updates) => {
    try {
      setSaveLoading(true);
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          ...updates, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', postId);

      if (error) throw error;
      
      // Update local state
      setBlogPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      ));
      
      // Update selected post if open
      if (selectedPost?.id === postId) {
        setSelectedPost({ ...selectedPost, ...updates });
      }
      
      return true;
    } catch (error) {
      console.error('Error updating post:', error);
      return false;
    } finally {
      setSaveLoading(false);
    }
  };

  const deletePost = async (postId) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      
      setBlogPosts(prev => prev.filter(post => post.id !== postId));
      
      if (selectedPost?.id === postId) {
        setSelectedPost(null);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditSave = async () => {
    if (!editingPost) return;

    const success = await updatePost(editingPost.id, {
      title: editingPost.title,
      content: editingPost.content,
      author: editingPost.author,
      seo_title: editingPost.seo_title,
      seo_description: editingPost.seo_description,
      seo_keywords: editingPost.seo_keywords
    });

    if (success) {
      setEditingPost(null);
    }
  };

  const handleEditCancel = () => {
    setEditingPost(null);
  };

  // Filter posts based on search term
  const filteredPosts = blogPosts.filter(post =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to render blog content with proper formatting
  const renderBlogContent = (content) => {
    if (!content) return '';
    
    // Convert line breaks to paragraphs and basic markdown to HTML
    return content
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.trim() === '') return '';
        
        // Handle headers (basic markdown)
        if (paragraph.startsWith('# ')) {
          return `<h1 class="text-3xl font-bold text-gray-900 mb-4">${paragraph.substring(2)}</h1>`;
        } else if (paragraph.startsWith('## ')) {
          return `<h2 class="text-2xl font-bold text-gray-900 mb-3">${paragraph.substring(3)}</h2>`;
        } else if (paragraph.startsWith('### ')) {
          return `<h3 class="text-xl font-bold text-gray-900 mb-2">${paragraph.substring(4)}</h3>`;
        } else {
          return `<p class="text-gray-700 mb-4 leading-relaxed">${paragraph}</p>`;
        }
      })
      .join('');
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading blog posts...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
              <p className="text-gray-600 mt-2">Manage and publish your blog posts</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {blogPosts.length} post{blogPosts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search posts by title, content, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex space-x-6 text-sm">
            <span className="text-gray-600">
              Total: <span className="font-semibold">{blogPosts.length}</span>
            </span>
            <span className="text-green-600">
              Published: <span className="font-semibold">{blogPosts.filter(p => p.status === 'published').length}</span>
            </span>
            <span className="text-yellow-600">
              Drafts: <span className="font-semibold">{blogPosts.filter(p => p.status === 'draft').length}</span>
            </span>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Blog Posts Found</h2>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Create your first blog post using the Blog Assistant!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border"
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
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(post.created_at)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {post.seo_description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.seo_description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500">By {post.author || 'Unknown Author'}</span>
                    
                    {/* Quick Actions */}
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPost(post);
                        }}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                        title="Edit Post"
                      >
                        Edit
                      </button>
                      
                      {post.status === 'draft' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updatePostStatus(post.id, 'published');
                          }}
                          className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
                        >
                          Publish
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updatePostStatus(post.id, 'draft');
                          }}
                          className="text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 transition-colors"
                        >
                          Unpublish
                        </button>
                      )}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePost(post.id);
                        }}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* SEO Keywords */}
                  {post.seo_keywords && post.seo_keywords.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {post.seo_keywords.slice(0, 3).map((keyword, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {keyword}
                          </span>
                        ))}
                        {post.seo_keywords.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{post.seo_keywords.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blog Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedPost.title}</h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(selectedPost.status)}`}>
                      {selectedPost.status}
                    </span>
                    <span className="text-gray-500">By {selectedPost.author || 'Unknown Author'}</span>
                    <span className="text-gray-500">{formatDate(selectedPost.created_at)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Featured Image */}
              {selectedPost.featured_image && (
                <img 
                  src={selectedPost.featured_image} 
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}

              {/* Additional Images */}
              {selectedPost.images && selectedPost.images.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Post Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedPost.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={image.url} 
                          alt={`Image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          {image.position}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SEO Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">SEO Information</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                    <p className="text-gray-900">{selectedPost.seo_title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                    <p className="text-gray-900">{selectedPost.seo_description}</p>
                  </div>
                  {selectedPost.seo_keywords && selectedPost.seo_keywords.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Keywords</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedPost.seo_keywords.map((keyword, index) => (
                          <span key={index} className="bg-white text-gray-700 px-2 py-1 rounded text-sm border">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Blog Content */}
              <div className="prose prose-lg max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Content</h3>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: renderBlogContent(selectedPost.content) }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setEditingPost(selectedPost);
                    setSelectedPost(null);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Post
                </button>
                
                {selectedPost.status === 'draft' ? (
                  <button
                    onClick={() => {
                      updatePostStatus(selectedPost.id, 'published');
                      setSelectedPost(null);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Publish Post
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      updatePostStatus(selectedPost.id, 'draft');
                      setSelectedPost(null);
                    }}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Unpublish
                  </button>
                )}
                
                <button
                  onClick={() => {
                    deletePost(selectedPost.id);
                    setSelectedPost(null);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Blog Post</h2>
                <button
                  onClick={handleEditCancel}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Author Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    value={editingPost.author || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter author name"
                  />
                </div>

                {/* Title Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter blog title"
                  />
                </div>

                {/* SEO Title Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Title
                    <span className="text-xs text-gray-500 ml-2">
                      ({editingPost.seo_title?.length || 0}/60 characters)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={editingPost.seo_title || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, seo_title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter SEO title"
                    maxLength={60}
                  />
                </div>

                {/* SEO Description Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Description
                    <span className="text-xs text-gray-500 ml-2">
                      ({editingPost.seo_description?.length || 0}/160 characters)
                    </span>
                  </label>
                  <textarea
                    value={editingPost.seo_description || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, seo_description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter SEO description"
                    maxLength={160}
                  />
                </div>

                {/* SEO Keywords Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={editingPost.seo_keywords?.join(', ') || ''}
                    onChange={(e) => setEditingPost({ 
                      ...editingPost, 
                      seo_keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) 
                    })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                {/* Content Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Content *
                  </label>
                  <textarea
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    rows={15}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="Enter blog content"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Supports basic markdown: # Header, ## Subheader, **bold**, *italic*
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleEditCancel}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    disabled={saveLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditSave}
                    disabled={saveLoading || !editingPost.title || !editingPost.content || !editingPost.author}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {saveLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;