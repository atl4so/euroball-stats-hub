import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const ALLOWED_PATHS = [
  "/results",
  "/schedules",
  "/games",
  "/players",
  "/teams",
  "/standings"
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.replace('/euroleague-proxy', '');
    
    if (!ALLOWED_PATHS.some(allowedPath => path.startsWith(allowedPath))) {
      return new Response('Path not allowed', { status: 400 });
    }

    const apiUrl = `https://api-live.euroleague.net/v1${path}${url.search}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'https://www.euroleague.net',
        'Referer': 'https://www.euroleague.net/'
      },
    });

    const data = await response.text();
    
    return new Response(data, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    })
  }
})