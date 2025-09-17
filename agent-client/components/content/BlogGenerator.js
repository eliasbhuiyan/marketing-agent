'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Copy, Calendar } from 'lucide-react';

export default function BlogGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [blogOptions, setBlogOptions] = useState({
    blogTopic: "",
    blogLength: "medium",
    writingStyle: "informative",
    seoKeywords: ""
  });

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation for blogs
      setTimeout(() => {
        const sampleContent = "# The Future of Marketing: How AI is Transforming Content Creation\n\nIn today's digital landscape, artificial intelligence is revolutionizing how businesses approach marketing and content creation. From automated copywriting to intelligent design generation, AI tools are enabling marketers to scale their efforts while maintaining quality and consistency.\n\n## Key Benefits of AI in Marketing\n\n1. **Efficiency**: Generate content 10x faster than traditional methods\n2. **Consistency**: Maintain brand voice across all channels\n3. **Personalization**: Create targeted content for different audiences\n4. **Analytics**: Get insights on what content performs best\n\n## Getting Started with AI Marketing Tools\n\nTo leverage AI effectively, start by defining your brand voice and content goals. Use AI as a starting point, then refine the output to match your unique style and audience needs.";
        setGeneratedContent(sampleContent);
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate content. Please try again.");
      setIsGenerating(false);
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleScheduleBlog = () => {
    // Handle blog scheduling
    console.log('Scheduling blog...');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Panel - Input Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Blog Generation Settings</CardTitle>
            <CardDescription>Configure your blog requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="blog-topic">Blog Topic</Label>
              <Input
                id="blog-topic"
                placeholder="e.g., The Future of AI in Marketing"
                value={blogOptions.blogTopic}
                onChange={(e) => setBlogOptions({...blogOptions, blogTopic: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="blog-length">Blog Length</Label>
              <select 
                id="blog-length"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={blogOptions.blogLength}
                onChange={(e) => setBlogOptions({...blogOptions, blogLength: e.target.value})}
              >
                <option value="short">Short (300-500 words)</option>
                <option value="medium">Medium (500-1000 words)</option>
                <option value="long">Long (1000+ words)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="writing-style">Writing Style</Label>
              <select 
                id="writing-style"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={blogOptions.writingStyle}
                onChange={(e) => setBlogOptions({...blogOptions, writingStyle: e.target.value})}
              >
                <option value="informative">Informative</option>
                <option value="conversational">Conversational</option>
                <option value="technical">Technical</option>
                <option value="storytelling">Storytelling</option>
              </select>
            </div>
            <div>
              <Label htmlFor="seo-keywords">SEO Focus Keywords</Label>
              <Input
                id="seo-keywords"
                placeholder="e.g., marketing, AI, content creation"
                value={blogOptions.seoKeywords}
                onChange={(e) => setBlogOptions({...blogOptions, seoKeywords: e.target.value})}
              />
            </div>
            <Button 
              onClick={handleGenerateContent} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Blog
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Generated Content */}
      <div className="space-y-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Generated Blog</CardTitle>
            <CardDescription>Your AI-generated blog will appear here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md min-h-[200px] whitespace-pre-wrap">
                  {generatedContent}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleCopyContent}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Blog
                  </Button>
                  <Button variant="outline" onClick={handleScheduleBlog}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Post
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] bg-gray-50 rounded-md">
                <p className="text-gray-500">Fill in the form and click Generate to create a blog</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}