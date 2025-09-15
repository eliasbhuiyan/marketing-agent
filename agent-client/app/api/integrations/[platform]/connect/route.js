import { NextResponse } from 'next/server';
import { handleApiRoute } from '@/lib/api-utils';

/**
 * POST /api/integrations/:platform/connect
 * Initiate OAuth flow for a platform
 */
export async function POST(request, { params }) {
  const { platform } = params;
  return handleApiRoute(`/integrations/${platform}/connect`, { method: 'POST' });
}