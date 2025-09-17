'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Copy } from 'lucide-react';

export default function HashtagGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [hashtagOptions, setHashtagOptions] = useState({
    industry: "",
    platform: "instagram",
    count: "15"
  });

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation for hashtags
      setTimeout(() => {
        const sampleContent = "**Instagram/TikTok Hashtags:**\n#NewProduct #Innovation #Lifestyle #Quality #MustHave #GameChanger #Tech #Modern #Trending #Viral #FYP #Explore #Discover #Amazing #Perfect #Love #Best #Top #Featured\n\n**SEO Keywords:**\n- innovative product design\n- lifestyle technology\n- quality products online\n- modern solutions\n- trending products 2024\n- best new products\n- premium quality items\n- cutting-edge technology\n- revolutionary design\n- must-have products";
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

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Panel - Input Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hashtag & Keyword Settings</CardTitle>
            <CardDescription>Configure your hashtag requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="industry">Industry/Niche</Label>
              <Input
                id="industry"
                placeholder="e.g., Fashion, Technology, Food"
                value={hashtagOptions.industry}
                onChange={(e) => setHashtagOptions({...hashtagOptions, industry: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="hashtag-platform">Platform</Label>
              <select 
                id="hashtag-platform"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={hashtagOptions.platform}
                onChange={(e) => setHashtagOptions({...hashtagOptions, platform: e.target.value})}
              >
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="twitter">Twitter</option>
                <option value="seo">SEO Keywords</option>
              </select>
            </div>
            <div>
              <Label htmlFor="hashtag-count">Number of Hashtags</Label>
              <select 
                id="hashtag-count"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={hashtagOptions.count}
                onChange={(e) => setHashtagOptions({...hashtagOptions, count: e.target.value})}
              >
                <option value="10">10 Hashtags</option>
                <option value="15">15 Hashtags</option>
                <option value="20">20 Hashtags</option>
                <option value="30">30 Hashtags</option>
              </select>
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
                  Generate Hashtags
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
            <CardTitle>Generated Hashtags & Keywords</CardTitle>
            <CardDescription>Your AI-generated hashtags will appear here</CardDescription>
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
                    Copy Hashtags
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] bg-gray-50 rounded-md">
                <p className="text-gray-500">Fill in the form and click Generate to create hashtags</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}