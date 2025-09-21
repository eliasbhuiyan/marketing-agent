'use client';
import { usePathname } from 'next/navigation';
export default function YoutubePage({children}) {
  const pathname = usePathname();
  const currentRoute = pathname.split('/').pop();

  const descriptions = {
    'thumbnail': {
      name: 'Thumbnail Generator',
      description: 'Create eye-catching thumbnails for your YouTube videos. Our AI-powered thumbnail generator ensures your videos stand out with high-quality thumbnails.',
    },
    'script': {
      name: 'Script writer',
      description: 'Create compelling video scripts that drive engagement and conversions. Our AI-powered writing assistant ensures your scripts are optimized for YouTube and shareable.',
    },
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">{descriptions[currentRoute].name}</h1>
        <p className="text-white/80 mt-2 max-w-2xl m-auto">{descriptions[currentRoute].description}</p>
      </div>
      {children}
    </div>
  );
}
