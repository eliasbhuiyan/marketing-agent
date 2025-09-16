import { handleApiRoute } from '@/lib/api-utils';

export async function POST(request) {
  const body = await request.json();
  const { productImg, modelImg } = body;

  // Create FormData object
  const formData = new FormData();
  formData.append('productImg', productImg);
  formData.append('modelImg', modelImg);  
  // Let the browser set the Content-Type header with boundary automatically
  return handleApiRoute('/posterdesign', {
    method: 'POST',
    // Remove explicit Content-Type header to let fetch set it automatically with boundary
    body: formData
  });
}