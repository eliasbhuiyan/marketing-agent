import { handleApiRoute } from '@/lib/api-utils';

export async function GET(request, { params }) {
  const { token } = params; 
  if (!token) {
    return new Response(JSON.stringify({ message: 'Token is required..' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return handleApiRoute(`/acceptinvite/${token}`, {
    method: 'GET',
  });
}