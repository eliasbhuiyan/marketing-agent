import { NextResponse } from 'next/server';
import { handleApiRoute } from '@/lib/api-utils';

/**
 * POST /api/integrations/:platform/test
 * Test connection for a platform
 */
export async function POST(request, { params }) {
  const { platform } = params;
  return handleApiRoute(`/integrations/${platform}/test`, { method: 'POST' });
}