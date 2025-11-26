import { handleApiRoute } from '@/lib/api-utils';

export async function POST(request) { 
  const body = await request.json();
  const { brandId, memberId } = body;
  
  if (!brandId || !memberId) {
    return new Response(JSON.stringify({ message: 'Brand ID and Member ID are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return handleApiRoute('/removemember', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ brandId, memberId }),
  });
}
