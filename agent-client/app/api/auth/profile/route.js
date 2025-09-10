import { handleApiRoute } from '@/lib/api-utils';

export async function GET() {
  return handleApiRoute('/auth/profile', {
    method: 'GET',
  });
}
