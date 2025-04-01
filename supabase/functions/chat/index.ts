
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, model, messages } = await req.json();
    
    // Prepare conversation history in the format the APIs expect
    const messageHistory = messages || [];
    
    // Format varies by provider
    switch(model.provider.toLowerCase()) {
      case 'openai':
        return await handleOpenAI(messageHistory, content, model.id);
      case 'anthropic':
        return await handleAnthropic(messageHistory, content, model.id);
      case 'google':
        return await handleGoogle(messageHistory, content, model.id);
      case 'xai':
        return await handleXAI(messageHistory, content, model.id);
      default:
        throw new Error(`Provider ${model.provider} not supported`);
    }
  } catch (error) {
    console.error(`Error in chat function:`, error);
    return new Response(
      JSON.stringify({ error: error.message || 'An error occurred' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// OpenAI (GPT) handler
async function handleOpenAI(messageHistory, content, modelId) {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }
  
  // Format messages for OpenAI
  const formattedMessages = [
    ...messageHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
    { role: 'user', content }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: modelId,
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1000,
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `OpenAI API error: ${response.status}`);
  }
  
  const data = await response.json();
  return new Response(
    JSON.stringify({ 
      content: data.choices[0].message.content,
      model: modelId,
      provider: 'OpenAI'
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Anthropic (Claude) handler
async function handleAnthropic(messageHistory, content, modelId) {
  const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
  if (!ANTHROPIC_API_KEY) {
    throw new Error("Anthropic API key not configured");
  }
  
  // Format messages for Anthropic
  const formattedMessages = [
    ...messageHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    })),
    { role: 'user', content }
  ];

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: modelId,
      messages: formattedMessages,
      max_tokens: 1000,
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `Anthropic API error: ${response.status}`);
  }
  
  const data = await response.json();
  return new Response(
    JSON.stringify({ 
      content: data.content[0].text,
      model: modelId,
      provider: 'Anthropic'
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Google (Gemini) handler
async function handleGoogle(messageHistory, content, modelId) {
  const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
  if (!GOOGLE_API_KEY) {
    throw new Error("Google API key not configured");
  }
  
  // Format messages for Gemini
  const formattedContents = messageHistory.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.content }]
  }));
  
  // Add the current message
  formattedContents.push({
    role: 'user',
    parts: [{ text: content }]
  });

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: formattedContents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `Google API error: ${response.status}`);
  }
  
  const data = await response.json();
  return new Response(
    JSON.stringify({ 
      content: data.candidates[0].content.parts[0].text,
      model: modelId,
      provider: 'Google'
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// xAI (Grok) handler
async function handleXAI(messageHistory, content, modelId) {
  const XAI_API_KEY = Deno.env.get('XAI_API_KEY');
  if (!XAI_API_KEY) {
    throw new Error("xAI API key not configured");
  }
  
  // Format messages for xAI
  const formattedMessages = [
    ...messageHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
    { role: 'user', content }
  ];

  const response = await fetch('https://api.xai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${XAI_API_KEY}`
    },
    body: JSON.stringify({
      model: modelId,
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1000,
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || `xAI API error: ${response.status}`);
  }
  
  const data = await response.json();
  return new Response(
    JSON.stringify({ 
      content: data.choices[0].message.content,
      model: modelId,
      provider: 'xAI'
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
