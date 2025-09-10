import { handleApiRoute } from '@/lib/api-utils';

export async function POST(request) {
  const body = await request.json();
  const { brandId } = body;
  
  return handleApiRoute('/auth/brand', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ brandId }),
  });
}
