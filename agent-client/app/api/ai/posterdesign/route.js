import { handleApiRoute } from '@/lib/api-utils';

export async function POST(request) {
  // Expect the client-side to send a multipart/form-data request to this route
  // We will pass the same FormData through to the backend
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    return handleApiRoute('/posterdesign', {
      method: 'POST',
      body: formData,
    });
  }

  // Fallback: if JSON was sent, try to reconstruct FormData (e.g., from base64 or not supported)
  try {
    const body = await request.json();
    const formData = new FormData();
    if (body.productImg instanceof Blob) {
      formData.append('productImg', body.productImg, body.productImg.name || 'product.jpg');
    }
    if (body.modelImg instanceof Blob) {
      formData.append('modelImg', body.modelImg, body.modelImg.name || 'model.jpg');
    }
    return handleApiRoute('/posterdesign', {
      method: 'POST',
      body: formData,
    });
  } catch {
    return handleApiRoute('/posterdesign', { method: 'POST' });
  }
}