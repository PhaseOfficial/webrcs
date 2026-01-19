import { supabase } from "../lib/supabaseClient";

/* -------------------------------------------------------------------------- */
/* Internal helper – Edge Function call                                       */
/* -------------------------------------------------------------------------- */
const callGemini = async (task, payload) => {
  const { data, error } = await supabase.functions.invoke("gemini", {
    body: { task, payload },
  });

  if (error) {
    console.error("Gemini Edge Function error:", error);
    throw new Error(error.message);
  }

  return data;
};

/* -------------------------------------------------------------------------- */
/* Generate Blog Content                                                      */
/* -------------------------------------------------------------------------- */
export const generateBlogContent = async (prompt) => {
  const data = await callGemini("generate_blog", {
    prompt: `Write a blog post about: ${prompt}. Make it engaging and well-structured.`,
  });

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

/* -------------------------------------------------------------------------- */
/* Generate Trending Blog Titles                                              */
/* -------------------------------------------------------------------------- */
export const generateTrendingTitles = async (topic) => {
  const data = await callGemini("generate_blog", {
    prompt: `Generate 5 engaging and distinct blog post titles about "${topic}". 
Return only the titles, one per line, without numbering or bullets.`,
  });

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  const titles = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 5);

  return { titles, sources: [] };
};

/* -------------------------------------------------------------------------- */
/* Generate Image                                                             */
/* -------------------------------------------------------------------------- */
export const generateImage = async (prompt) => {
  const data = await callGemini("image_generate", {
    model: "imagen-3.0-generate-002",
    prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: "image/jpeg",
      aspectRatio: "1:1",
    },
  });

  const image = data?.generatedImages?.[0]?.image;
  if (!image?.imageBytes) return null;

  return {
    base64: image.imageBytes,
    mimeType: image.mimeType || "image/jpeg",
  };
};

/* -------------------------------------------------------------------------- */
/* Edit Image                                                                 */
/* -------------------------------------------------------------------------- */
export const editImage = async (base64Image, mimeType, prompt) => {
  const data = await callGemini("image_edit", {
    model: "imagen-3.0-edit-002",
    image: { imageBytes: base64Image, mimeType },
    prompt,
    config: { numberOfImages: 1 },
  });

  const image = data?.generatedImages?.[0]?.image;
  if (!image?.imageBytes) return null;

  return {
    base64: image.imageBytes,
    mimeType: image.mimeType || "image/jpeg",
  };
};

/* -------------------------------------------------------------------------- */
/* SEO Analyzer                                                              */
/* -------------------------------------------------------------------------- */
export const analyzeSeo = async (blogTitle, blogContent) => {
  if (!blogContent.trim()) {
    return { keywords: [], metaTitle: "", metaDescription: "" };
  }

  const prompt = `
Return ONLY valid JSON:
{
  "keywords": ["5-7 keywords"],
  "metaTitle": "under 60 characters",
  "metaDescription": "under 160 characters"
}

Title: ${blogTitle}
Content:
${blogContent.substring(0, 8000)}
`;

  const data = await callGemini("seo_analysis", { prompt });

  const raw =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  try {
    return JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch {
    return {
      keywords: blogContent.split(/\s+/).slice(0, 5),
      metaTitle: blogTitle.substring(0, 60),
      metaDescription: blogContent.substring(0, 160),
    };
  }
};

/* -------------------------------------------------------------------------- */
/* Grammar Fixer                                                             */
/* -------------------------------------------------------------------------- */
export const fixGrammar = async (text) => {
  if (!text.trim()) return text;

  const data = await callGemini("generate_blog", {
    prompt: `Correct grammar and spelling. Maintain tone. Return only corrected text:\n\n${text}`,
  });

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || text;
};

/* -------------------------------------------------------------------------- */
/* Suggest Image Prompts                                                     */
/* -------------------------------------------------------------------------- */
export const suggestImagePrompts = async (blogContent) => {
  if (!blogContent.trim()) return [];

  const data = await callGemini("generate_blog", {
    prompt: `Return ONLY a JSON array of 3 image prompts based on this content:\n${blogContent.substring(
      0,
      8000
    )}`,
  });

  const raw =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

  try {
    return JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch {
    return [
      "Relevant blog header illustration",
      "Conceptual supporting image",
      "Background visual related to topic",
    ];
  }
};

/* -------------------------------------------------------------------------- */
/* Generate Content with Web Search                                          */
/* -------------------------------------------------------------------------- */
export const generateContentWithSearch = async (prompt) => {
  const data = await callGemini("generate_blog", {
    prompt,
    tools: [{ googleSearchRetrieval: {} }],
  });

  return {
    text: data?.candidates?.[0]?.content?.parts?.[0]?.text || "",
    sources:
      data?.candidates?.[0]?.groundingMetadata?.groundingChunks || [],
  };
};

/* -------------------------------------------------------------------------- */
/* Save Blog Post (Supabase)                                                 */
/* -------------------------------------------------------------------------- */
export const saveBlogPost = async (blogData) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert([blogData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/* -------------------------------------------------------------------------- */
/* Get Blog Posts (Supabase)                                                 */
/* -------------------------------------------------------------------------- */
export const getBlogPosts = async () => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
