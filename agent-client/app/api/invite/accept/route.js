import { handleApiRoute } from '@/lib/api-utils';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  
  if (!token) {
    return new Response(JSON.stringify({ message: 'Token is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return handleApiRoute(`/acceptinvite/${token}`, {
    method: 'GET',
  });
}