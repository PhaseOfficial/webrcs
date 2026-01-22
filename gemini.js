/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

/* -------------------------------------------------------------------------- */
/* ENV                                                                         */
/* -------------------------------------------------------------------------- */
const GEMINI_API_KEY = Deno.env.get("VITE_GEMINI_API_KEY");
if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

/* -------------------------------------------------------------------------- */
/* CORS                                                                        */
/* -------------------------------------------------------------------------- */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/* -------------------------------------------------------------------------- */
/* Gemini helper                                                               */
/* -------------------------------------------------------------------------- */
async function callGemini(prompt: string, tools?: unknown) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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
        ...(tools ? { tools } : {}),
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);
    throw new Error(data?.error?.message || "Gemini API failed");
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/* Image generation                                                            */
/* -------------------------------------------------------------------------- */
async function generateImage(payload: any) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${payload.model}:generateImage?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: payload.prompt,
        config: payload.config,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Imagen error:", data);
    throw new Error(data?.error?.message || "Image generation failed");
  }

  return data;
}

/* -------------------------------------------------------------------------- */
/* MAIN HANDLER                                                                */
/* -------------------------------------------------------------------------- */
serve(async (req) => {
  /* OPTIONS (CORS preflight) */
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { task, payload } = await req.json();

    let result;

    switch (task) {
      case "generate_blog":
      case "seo_analysis":
        result = await callGemini(payload.prompt, payload.tools);
        break;

      case "image_generate":
      case "image_edit":
        result = await generateImage(payload);
        break;

      default:
        return new Response(
          JSON.stringify({ error: "Unknown task" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }

    /* NORMALIZED RESPONSE */
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge Function error:", err);

    return new Response(
      JSON.stringify({ error: err.message || "Internal error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
