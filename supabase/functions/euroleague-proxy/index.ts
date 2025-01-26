import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const ALLOWED_PATHS = [
  '/results',
  '/schedules',
  '/games',
  '/players',
  '/teams',
  '/standings'
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const BASE_URL = 'https://api-live.euroleague.net/v1';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.replace('/euroleague-proxy', '');
    
    // Validate the requested path
    if (!ALLOWED_PATHS.some(allowedPath => path.startsWith(allowedPath))) {
      return new Response('Path not allowed', { 
        status: 403,
        headers: corsHeaders 
      });
    }

    // Forward the request to Euroleague API
    const apiUrl = `${BASE_URL}${path}${url.search}`;
    console.log(`Proxying request to: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: req.method,
      headers: {
        'Accept': 'application/json, application/xml',
        'Content-Type': 'application/json',
        'Origin': 'https://www.euroleague.net',
        'Referer': 'https://www.euroleague.net/',
      }
    });

    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        ...corsHeaders,
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in euroleague-proxy:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
})