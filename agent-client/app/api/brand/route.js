import { handleApiRoute } from '@/lib/api-utils';
import { NextResponse } from 'next/server';

// 
export async function GET(req) {
  const url = new URL(req.url);
  const refresh = url.searchParams.get('refresh');
  
  console.log("============================",refresh);

  const options = { method: 'GET' };
  if (refresh) {
    // Force revalidation (cache destruction) and fetch fresh data
    // This is the key to getting the updated data after a refresh call.
    options.next = { revalidate: 0 };
  }
  
  const response = await handleApiRoute('/brand', options);

  // This block ensures that the response is cached for 5 minutes (300 seconds)
  // for subsequent page reloads, fulfilling the requirement to display the
  // updated data on reload.
  if (response instanceof NextResponse) {
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300');
  }

  return response
}

export async function POST(request) {
  const body = await request.json();
  const { brandId, companyName, details, colors, fonts, assets } = body;

  return handleApiRoute('/brand', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      brandId,
      companyName,
      details,
      colors,
      fonts,
      assets,
    }),
  });
}
