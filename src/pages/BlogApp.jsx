import React, { useState, useCallback } from 'react';
import { generateBlogContent, generateImage, analyzeSeo, fixGrammar, generateTrendingTitles, suggestImagePrompts, editImage, saveBlogPost } from '../services/geminiService';
import { supabase } from '../lib/supabaseClient';
import ImageEditor from '../components/ImageEditor';
import Spinner from '../components/Spinner';
import SeoSuggestions from '../components/SeoSuggestions';
import ContentPlanner from '../components/ContentPlanner';
import TitleSuggester from '../components/TitleSuggester';
import ImagePromptSuggester from '../components/ImagePromptSuggester';

const Header = () => (
  <header className="bg-slate-800/50 backdrop-blur-sm p-4 sticky top-0 z-10 border-b border-slate-700">
    <div className="container mx-auto flex items-center gap-3">
      <h1 className="text-2xl font-bold text-white">AI Blog Assistant</h1>
    </div>
  </header>
);

const imageStyles = ['Photorealistic', 'Cartoon', 'Watercolor', 'Abstract', 'Minimalist', 'Retro', 'Cyberpunk', 'Fantasy'];
const imagePositions = ['Top', 'Center', 'Bottom', 'Left', 'Right', 'Full Width'];

const BlogApp = () => {
  const [blogTitle, setBlogTitle] = useState('My Awesome AI-Generated Blog Post');
  const [blogContent, setBlogContent] = useState('');
  const [images, setImages] = useState([]);
  
  const [contentPrompt, setContentPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [selectedImageStyle, setSelectedImageStyle] = useState(null);
  const [selectedImagePosition, setSelectedImagePosition] = useState('Top');
  
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isAnalyzingSeo, setIsAnalyzingSeo] = useState(false);
  const [isFixingGrammar, setIsFixingGrammar] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [seoAnalysis, setSeoAnalysis] = useState(null);
  const [plannedPosts, setPlannedPosts] = useState([]);
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [editingImage, setEditingImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleGenerateContent = async () => {
    if (!contentPrompt) return;
    setIsGeneratingContent(true);
    setSeoAnalysis(null);
    setError(null);
    setSuccess(null);
    try {
      const content = await generateBlogContent(contentPrompt);
      setBlogContent(content);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const handleAnalyzeSeo = async () => {
    if (!blogContent) return;
    setIsAnalyzingSeo(true);
    setError(null);
    setSuccess(null);
    try {
      const analysis = await analyzeSeo(blogTitle, blogContent);
      setSeoAnalysis(analysis);
    } catch (err) {
      setError('Failed to analyze SEO. Please try again.');
    } finally {
      setIsAnalyzingSeo(false);
    }
  };
  
  const handleFixGrammar = async () => {
    if (!blogContent) return;
    setIsFixingGrammar(true);
    setError(null);
    setSuccess(null);
    try {
      const fixed = await fixGrammar(blogContent);
      setBlogContent(fixed);
      setSuccess('Grammar and spelling fixed successfully!');
    } catch (err) {
      setError("Failed to fix grammar.");
    } finally {
      setIsFixingGrammar(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    setError(null);
    setSuccess(null);
    try {
      const finalPrompt = selectedImageStyle
        ? `${imagePrompt}, in a ${selectedImageStyle.toLowerCase()} style`
        : imagePrompt;

      const result = await generateImage(finalPrompt);
      
      if (result && result.base64) {
        const newImage = {
          id: new Date().toISOString(),
          src: `data:${result.mimeType};base64,${result.base64}`,
          prompt: imagePrompt,
          mimeType: result.mimeType,
          position: selectedImagePosition,
          base64: result.base64
        };
        setImages(prev => [...prev, newImage]);
        setImagePrompt('');
        setSuccess('AI image generated successfully!');
      } else if (result && result.text) {
        setError(`Image generation returned text: ${result.text}`);
      } else {
        setError('Failed to generate image. Please try again.');
      }
    } catch (err) {
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setIsUploadingImage(true);
    setError(null);
    setSuccess(null);
    setUploadedFileName(file.name);

    try {
      // Convert file to base64 for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result.split(',')[1];
        const newImage = {
          id: new Date().toISOString(),
          src: e.target.result,
          prompt: `Uploaded: ${file.name}`,
          mimeType: file.type,
          position: selectedImagePosition,
          base64: base64,
          fileName: file.name,
          isUploaded: true,
          file: file
        };
        setImages(prev => [...prev, newImage]);
        setSuccess(`Image "${file.name}" uploaded successfully!`);
        setIsUploadingImage(false);
        
        // Reset file input
        event.target.value = '';
      };
      reader.onerror = () => {
        setError('Failed to read image file');
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      setIsUploadingImage(false);
    }
  };

  const handleUploadToStorage = async (file) => {
    try {
      const fileName = `blog-images/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading to storage:', error);
      throw error;
    }
  };

  const handleImageEdited = useCallback((imageId, newSrc, newMimeType) => {
    setImages(prevImages =>
      prevImages.map(img =>
        img.id === imageId ? { ...img, src: newSrc, mimeType: newMimeType } : img
      )
    );
    setSuccess('Image edited successfully!');
  }, []);

  const deleteImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
    setSuccess('Image deleted successfully!');
  };

  const updateImagePosition = (imageId, position) => {
    setImages(prevImages =>
      prevImages.map(img =>
        img.id === imageId ? { ...img, position } : img
      )
    );
  };

  const moveImage = (imageId, direction) => {
    setImages(prevImages => {
      const index = prevImages.findIndex(img => img.id === imageId);
      if (index === -1) return prevImages;

      const newImages = [...prevImages];
      if (direction === 'up' && index > 0) {
        [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      } else if (direction === 'down' && index < newImages.length - 1) {
        [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]];
      }
      return newImages;
    });
  };
  
  const addPlannedPost = (post) => {
    const newPost = { ...post, id: new Date().toISOString() };
    setPlannedPosts(prev => [...prev, newPost]);
    setSuccess('Post added to content planner!');
  };

  const deletePlannedPost = (id) => {
    setPlannedPosts(prev => prev.filter(p => p.id !== id));
    setSuccess('Post removed from content planner!');
  };
  
  const startGenerationFromPlan = (topic) => {
    setContentPrompt(topic);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSuccess(`Started generating content for: ${topic}`);
  };

  const handleTitleSelection = (title) => {
    setBlogTitle(title);
    setContentPrompt(title);
  };

  const handleSaveBlogPost = async () => {
    if (!blogTitle.trim() || !blogContent.trim()) {
      setError('Please provide both a title and content before saving.');
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const uploadedImageUrls = [];
      
      for (const image of images) {
        let imageUrl;
        
        if (image.isUploaded && image.file) {
          // Handle file uploads
          imageUrl = await handleUploadToStorage(image.file);
        } else if (image.base64) {
          // Handle base64 images (AI-generated)
          try {
            const response = await fetch(image.src);
            const blob = await response.blob();
            const fileName = `blog-images/${Date.now()}-${Math.random().toString(36).substring(7)}.${image.mimeType.split('/')[1] || 'jpg'}`;
            
            const { data, error } = await supabase.storage
              .from('blog-images')
              .upload(fileName, blob, {
                contentType: image.mimeType,
                upsert: false
              });

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
              .from('blog-images')
              .getPublicUrl(fileName);

            imageUrl = publicUrl;
          } catch (uploadError) {
            console.error('Error uploading AI image:', uploadError);
            continue; // Skip this image but continue with others
          }
        }

        if (imageUrl) {
          uploadedImageUrls.push({
            url: imageUrl,
            position: image.position,
            prompt: image.prompt,
            isUploaded: image.isUploaded || false
          });
        }
      }

      // Prepare blog post data
      const blogData = {
        title: blogTitle,
        content: blogContent,
        featured_image: uploadedImageUrls.length > 0 ? uploadedImageUrls[0].url : null,
        images: uploadedImageUrls,
        seo_title: seoAnalysis?.metaTitle || blogTitle.substring(0, 60),
        seo_description: seoAnalysis?.metaDescription || blogContent.substring(0, 160),
        seo_keywords: seoAnalysis?.keywords || [],
        status: 'draft',
        author: 'Admin',
        image_positions: uploadedImageUrls.reduce((acc, img, index) => {
          acc[index] = img.position;
          return acc;
        }, {})
      };

      // Save to Supabase
      const savedPost = await saveBlogPost(blogData);
      
      setSuccess('Blog post saved successfully!');
      setImages([]); // Clear images after successful save
      
    } catch (err) {
      setError(`Failed to save blog post: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
    setUploadedFileName('');
  };

  return (
    <div className="min-h-screen text-slate-300">
      <Header />
      
      {/* Status Messages */}
      {(error || success) && (
        <div className="container mx-auto px-4 pt-4">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg mb-4 flex justify-between items-center">
              <span>{error}</span>
              <button onClick={clearMessages} className="text-red-400 hover:text-red-200">✕</button>
            </div>
          )}
          {success && (
            <div className="bg-green-900/50 border border-green-700 text-green-300 p-4 rounded-lg mb-4 flex justify-between items-center">
              <span>{success}</span>
              <button onClick={clearMessages} className="text-green-400 hover:text-green-200">✕</button>
            </div>
          )}
        </div>
      )}

      <main className="container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Blog Content</h2>
            <button
              onClick={handleSaveBlogPost}
              disabled={isSaving || !blogTitle.trim() || !blogContent.trim()}
              className="flex items-center space-x-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? <Spinner /> : '💾 Save Post'}
            </button>
          </div>
          
          <TitleSuggester onSelectTitle={handleTitleSelection} />

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-400 mb-2">Blog Title</label>
              <input 
                id="title"
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:border-sky-500 focus:ring-sky-500 transition"
              />
            </div>
            
            <div>
              <label htmlFor="content-prompt" className="block text-sm font-medium text-slate-400 mb-2">Content Prompt</label>
              <div className="flex gap-2">
                <input
                  id="content-prompt"
                  type="text"
                  value={contentPrompt}
                  onChange={(e) => setContentPrompt(e.target.value)}
                  placeholder="e.g., The future of renewable energy"
                  className="flex-grow w-full bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:border-sky-500 focus:ring-sky-500 transition"
                />
                <button
                  onClick={handleGenerateContent}
                  disabled={isGeneratingContent || !contentPrompt}
                  className="flex-shrink-0 flex items-center justify-center bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                  {isGeneratingContent ? <Spinner /> : 'Generate'}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-400 mb-2">Blog Post Body</label>
              <textarea
                id="content"
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                rows={20}
                className="w-full bg-slate-900/50 text-white p-4 rounded-lg border-2 border-slate-700 focus:border-sky-500 focus:ring-sky-500 transition"
                placeholder="Your generated blog content will appear here. You can also start writing directly!"
              />
            </div>
            
            {blogContent && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleFixGrammar}
                  disabled={isFixingGrammar}
                  className="flex items-center justify-center bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                  {isFixingGrammar ? <Spinner /> : 'Fix Grammar & Spelling'}
                </button>
                <button
                  onClick={handleAnalyzeSeo}
                  disabled={isAnalyzingSeo}
                  className="flex items-center justify-center bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                  {isAnalyzingSeo ? <Spinner /> : 'Analyze SEO'}
                </button>
              </div>
            )}
            <SeoSuggestions analysis={seoAnalysis} isLoading={isAnalyzingSeo} />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <ContentPlanner 
            posts={plannedPosts}
            onAddPost={addPlannedPost}
            onDeletePost={deletePlannedPost}
            onGenerateFromPost={startGenerationFromPlan}
          />
          
          <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Image Tools</h2>
            
            {/* Upload Section */}
            <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Upload Image
              </label>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                    className="w-full text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 opacity-0 absolute inset-0 z-10 cursor-pointer"
                    id="file-upload"
                  />
                  <label 
                    htmlFor="file-upload"
                    className="w-full bg-slate-700 text-white py-3 px-4 rounded-lg border-2 border-slate-600 hover:border-indigo-500 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    {isUploadingImage ? (
                      <div className="flex items-center space-x-2">
                        <Spinner />
                        <span>Uploading {uploadedFileName}...</span>
                      </div>
                    ) : uploadedFileName ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>{uploadedFileName}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>📁 Choose Image File</span>
                      </div>
                    )}
                  </label>
                </div>
                <p className="text-xs text-slate-400">
                  Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Artistic Style</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {imageStyles.map(style => (
                  <button 
                    key={style}
                    onClick={() => setSelectedImageStyle(prev => prev === style ? null : style)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedImageStyle === style ? 'bg-indigo-500 text-white font-semibold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {style}
                  </button>
                ))}
              </div>

              <label className="block text-sm font-medium text-slate-400 mb-2">Image Position</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {imagePositions.map(position => (
                  <button 
                    key={position}
                    onClick={() => setSelectedImagePosition(position)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedImagePosition === position ? 'bg-green-500 text-white font-semibold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {position}
                  </button>
                ))}
              </div>
              
              <ImagePromptSuggester 
                blogContent={blogContent} 
                onSelectPrompt={(prompt) => setImagePrompt(prompt)} 
              />

              <label htmlFor="image-prompt" className="block text-sm font-medium text-slate-400 mb-2">AI Image Prompt</label>
              <div className="flex flex-col gap-2">
                <textarea
                  id="image-prompt"
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="e.g., A futuristic city skyline at sunset"
                  className="w-full bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:border-sky-500 focus:ring-sky-500 transition"
                  rows={3}
                />
                <button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage || !imagePrompt}
                  className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors"
                >
                  {isGeneratingImage ? <Spinner /> : 'Generate AI Image'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white px-2">Image Gallery</h3>
              {images.length > 0 && (
                <span className="text-sm text-slate-400 bg-slate-700 px-3 py-1 rounded-full">
                  {images.length} image{images.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            {isGeneratingImage && <div className="text-center p-4">Generating your masterpiece...</div>}
            {images.length === 0 && !isGeneratingImage && (
              <p className="text-slate-400 text-center p-4">Your generated or uploaded images will appear here.</p>
            )}
            <div className="space-y-4">
              {images.map((image, index) => (
                <div key={image.id} className="group relative bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700">
                  {/* Image Header with Controls */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                      {/* Badge for uploaded images */}
                      {image.isUploaded && (
                        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded flex items-center">
                          <span className="mr-1">📁</span>
                          <span>Uploaded</span>
                        </div>
                      )}
                      <span className="text-xs text-slate-400">
                        Position: {index + 1}
                      </span>
                    </div>
                    
                    {/* Move Controls */}
                    <div className="flex space-x-1">
                      <button
                        onClick={() => moveImage(image.id, 'up')}
                        disabled={index === 0}
                        className="p-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move up"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveImage(image.id, 'down')}
                        disabled={index === images.length - 1}
                        className="p-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move down"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <img src={image.src} alt={image.prompt} className="rounded-md w-full max-h-48 object-contain bg-slate-900" />
                  
                  {/* Position Controls */}
                  <div className="mt-3 space-y-2">
                    <label className="block text-xs text-slate-400">Layout Position</label>
                    <select
                      value={image.position}
                      onChange={(e) => updateImagePosition(image.id, e.target.value)}
                      className="w-full bg-slate-700 text-white text-sm p-2 rounded border border-slate-600 focus:border-sky-500"
                    >
                      {imagePositions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Prompt/Description */}
                  <div className="mt-2 text-sm text-slate-400 truncate" title={image.prompt}>
                    {image.prompt}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setEditingImage(image)} 
                        className="flex items-center space-x-1 bg-sky-600 text-white text-xs py-1 px-2 rounded hover:bg-sky-500 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 13 4 4L19 7" />
                        </svg>
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={() => deleteImage(image.id)} 
                        className="flex items-center space-x-1 bg-red-600 text-white text-xs py-1 px-2 rounded hover:bg-red-500 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <ImageEditor 
        image={editingImage}
        onClose={() => setEditingImage(null)}
        onImageEdited={handleImageEdited}
      />
    </div>
  );
};

export default BlogApp;