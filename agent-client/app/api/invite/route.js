import { handleApiRoute } from '@/lib/api-utils';

export async function POST(request) {
  const body = await request.json();
  const { addTeamMemberEmail } = body;

  return handleApiRoute('/inviteamember', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ addTeamMemberEmail }),
  });
}


