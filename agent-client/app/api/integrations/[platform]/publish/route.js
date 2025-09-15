import { NextResponse } from 'next/server';
import { handleApiRoute } from '@/lib/api-utils';

/**
 * POST /api/integrations/:platform/publish
 * Publish content to a platform
 */
export async function POST(request, { params }) {
  const { platform } = params;
  const body = await request.json();
  
  return handleApiRoute(`/integrations/${platform}/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}