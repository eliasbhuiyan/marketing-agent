import { NextResponse } from 'next/server';
import { handleApiRoute } from '@/lib/api-utils';

/**
 * GET /api/integrations/:platform
 * Get details for a specific platform integration
 */
export async function GET(request, { params }) {
  const { platform } = params;
  return handleApiRoute(`/integrations/${platform}`);
}

/**
 * DELETE /api/integrations/:platform
 * Disconnect an integration
 */
export async function DELETE(request, { params }) {
  const { platform } = params;
  return handleApiRoute(`/integrations/${platform}`, { method: 'DELETE' });
}