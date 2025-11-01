import { revalidatePath, revalidateTag } from 'next/cache'
 
export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path')
 
  if (path) {
    console.log(path, path);
    
    // revalidatePath(path)
    revalidateTag('brand-data')
    return Response.json({ revalidated: true, now: Date.now() })
  }
 
  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}