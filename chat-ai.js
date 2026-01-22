import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ✅ No imports needed for Deno.serve in Supabase
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "POST, OPTIONS",
// };

Deno.serve(async (req) => {
  // 1. Handle CORS Preflight (OPTIONS request) - Must return 200 OK
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  try {
    // 2. Validate API Key
    const GEMINI_API_KEY = Deno.env.get("VITE_GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY secret");
    }

    // 3. Parse Request
    const { messages, systemPrompt } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      throw new Error("Invalid body: 'messages' array is required");
    }

    // 4. Build Prompt
    let prompt = systemPrompt ? `${systemPrompt}\n\n` : "";
    prompt += messages
      .map((m: any) =>
        m.sender === "user" ? `User: ${m.text}` : `Assistant: ${m.text}`
      )
      .join("\n");
    prompt += "\nAssistant:";

    // 5. Call Gemini API
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    // 6. Handle Gemini Errors
    if (!geminiRes.ok) {
      const errorData = await geminiRes.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(errorData.error?.message || "Gemini API error");
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here to help!";

    // 7. Success Response
    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error: any) {
    // 8. Catch-all Error Handling (Prevents CORS errors on crash)
    console.error("Edge Function Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500, // Return 500 but WITH CORS headers so frontend sees the error
    });
  }
});
const GEMINI_API_KEY = Deno.env.get("VITE_GEMINI_API_KEY");

serve(async (req) => {
  // 1. Handle CORS Preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages, systemPrompt } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages must be an array" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 2. Build the full prompt including your system instructions
    let prompt = "";
    
    // Add system instruction if provided
    if (systemPrompt) {
        prompt += `${systemPrompt}\n\n`;
    }

    // Append conversation history
    prompt += messages
      .map((m) =>
        m.sender === "user"
          ? `User: ${m.text}`
          : `Assistant: ${m.text}`
      )
      .join("\n");
    
    // Append the final cue
    prompt += "\nAssistant:";

    // 3. Call Google Gemini API
    // Note: Using gemini-1.5-flash as it is the current standard. 
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error("Gemini API error:", data);
      return new Response(
        JSON.stringify({ error: data.error?.message || "Gemini error" }),
        { status: 500, headers: corsHeaders }
      );
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here to help!";

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Chat AI Edge crash:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
});