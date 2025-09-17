'use client';

import { useState } from 'react';
import { 
  FileText, 
  MessageCircle, 
  Mail, 
  Hash
} from 'lucide-react';
import ContentPublisher from '@/components/ContentPublisher';
import CaptionGenerator from '@/components/content/CaptionGenerator';
import BlogGenerator from '@/components/content/BlogGenerator';
import EmailGenerator from '@/components/content/EmailGenerator';
import HashtagGenerator from '@/components/content/HashtagGenerator';

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('captions');

  const tabs = [
    { id: 'captions', label: 'Captions', icon: MessageCircle },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'email', label: 'Email Marketing', icon: Mail },
    { id: 'hashtags', label: 'Hashtags & Keywords', icon: Hash }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content & Copywriting</h1>
        <p className="text-gray-600 mt-2">Generate SEO-friendly content, blogs, emails, and hashtags with AI</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Components */}
      {activeTab === 'captions' && <CaptionGenerator />}
      {activeTab === 'blogs' && <BlogGenerator />}
      {activeTab === 'email' && <EmailGenerator />}
      {activeTab === 'hashtags' && <HashtagGenerator />}

      {/* Content Publisher */}
      <ContentPublisher />
    </div>
  );
}
