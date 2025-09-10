import { handleApiRoute } from '@/lib/api-utils';
import { NextResponse } from 'next/server';

export async function GET() {
  const response = await handleApiRoute('/brand', {
    method: 'GET',
  });
  
  // Add cache headers for better performance
  if (response instanceof NextResponse) {
    response.headers.set('Cache-Control', 'private, max-age=300, stale-while-revalidate=60');
    response.headers.set('ETag', `"brand-${Date.now()}"`);
  }
  
  return response;
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
