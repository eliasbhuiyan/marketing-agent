import { handleApiRoute } from '@/lib/api-utils';

export async function POST() {
  return handleApiRoute('/auth/refresh', {
    method: 'POST',
  });
}
