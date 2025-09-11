import { handleApiRoute } from '@/lib/api-utils';

export const revalidate = 60;

export async function GET() {
  return handleApiRoute('/auth/profile', {
    method: 'GET',
  });
}
