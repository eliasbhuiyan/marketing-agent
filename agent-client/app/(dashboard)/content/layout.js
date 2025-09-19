'use client';
import ContentPublisher from "@/components/ContentPublisher";
import { usePathname } from 'next/navigation';
export default function ContentPage({children}) {
  const pathname = usePathname();
  const currentRoute = pathname.split('/').pop();

  const descriptions = {
    'caption': 'Generate engaging captions for your social media posts, optimized for maximum engagement and reach. Perfect for Instagram, Facebook, LinkedIn and other platforms.',
    'blog': 'Create high-quality blog posts that drive traffic and conversions. Our AI-powered writing assistant ensures your content is optimized for search engines and shares.',
    'email': 'Compose professional emails that convert. Our AI assistant helps you draft compelling messages for clients, prospects, and customers.',
    'hashtag': 'Generate the most relevant hashtags for your posts to increase visibility and engagement. Our AI algorithm suggests hashtags based on your content and target audience.',
    'product': 'Create compelling product descriptions that drive sales. Our AI assistant helps you write engaging copy that resonates with your target audience.',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Content & Copywriting</h1>
        <p className="text-white/80 mt-2 max-w-2xl m-auto">{descriptions[currentRoute]}</p>
      </div>
      {children}
      {/* Content Publisher */}
      <ContentPublisher />
    </div>
  );
}
