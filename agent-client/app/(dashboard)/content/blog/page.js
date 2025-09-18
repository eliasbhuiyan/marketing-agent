"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Copy, Calendar } from "lucide-react";
import apiClient from "@/lib/api";
import dynamic from "next/dynamic";

// Dynamically import TiptapEditor to avoid SSR issues
const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function BlogGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [apiError, setApiError] = useState(null);
  const [blogOptions, setBlogOptions] = useState({
    blogTopic: "",
    blogLength: "medium",
    writingStyle: "informative",
    seoKeywords: "",
    numberOfHeadings: "2",
    outputLanguage: "English",
  });
  
  // Set up effect to update editor content when generated content changes
 

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    console.log(blogOptions);
  
    try {
      // Call the blog generator API
      const response = await apiClient.ai.blogGenerator({
        blogTopic: blogOptions.blogTopic,
        blogLength: blogOptions.blogLength,
        writingStyle: blogOptions.writingStyle,
        seoKeywords: blogOptions.seoKeywords,
        numberOfHeadings: blogOptions.numberOfHeadings,
        outputLanguage: blogOptions.outputLanguage,
      });
      
      setGeneratedContent(response.blog);
    } catch (error) {
      console.error("Error generating content:", error);
      setApiError(error.message || "Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(editorContent);
  };

  const handleScheduleBlog = () => {
    // Handle blog scheduling
    console.log("Scheduling blog...", editorContent);
  };
  useEffect(() => {
     if (generatedContent) {
       setEditorContent(generatedContent);
     }
   }, [generatedContent]);
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
                onChange={(e) =>
                  setBlogOptions({ ...blogOptions, blogTopic: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="blog-length">Blog Length</Label>
              <select
                id="blog-length"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={blogOptions.blogLength}
                onChange={(e) =>
                  setBlogOptions({ ...blogOptions, blogLength: e.target.value })
                }
              >
                <option value="300-500">Short (300-500 words)</option>
                <option value="500-1000">Medium (500-1000 words)</option>
                <option value="1000+">Long (1000+ words)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="blog-length">Number of headings</Label>
              <select
                id="number-of-headings"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={blogOptions.numberOfHeadings}
                onChange={(e) =>
                  setBlogOptions({
                    ...blogOptions,
                    numberOfHeadings: e.target.value,
                  })
                }
              >
                <option value="1">1 heading</option>
                <option value="2">2 headings</option>
                <option value="3">3 headings</option>
                <option value="4">4 headings</option>
                <option value="5">5 headings</option>
                <option value="6">6 headings</option>
              </select>
            </div>
            <div>
              <Label htmlFor="writing-style">Writing Style</Label>
              <select
                id="writing-style"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={blogOptions.writingStyle}
                onChange={(e) =>
                  setBlogOptions({
                    ...blogOptions,
                    writingStyle: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setBlogOptions({
                    ...blogOptions,
                    seoKeywords: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="output-language">Output Language</Label>
              <Input
                id="output-language"
                placeholder="e.g., Bangla, English, Spanish, French"
                value={blogOptions.outputLanguage}
                onChange={(e) =>
                  setBlogOptions({
                    ...blogOptions,
                    outputLanguage: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs">✅</p>
                <Label htmlFor="human-like">FAQ (Frequently Asked Questions)</Label>
              </div>
              <p className="text-sm text-gray-500">
               Add frequently asked questions (FAQs) to the blog.
              </p>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs">✅</p>
                <Label htmlFor="human-like">Human like content</Label>
              </div>
              <p className="text-sm text-gray-500">
                Generate content that is more human like.
              </p>
            </div>
            {apiError && (
              <div className="text-red-500 text-sm mt-2">
                {apiError}
              </div>
            )}
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

      {/* Right Panel - Generated Content with Rich Text Editor */}
      <div className="space-y-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Generated Blog</CardTitle>
            <CardDescription>
              Edit your AI-generated blog content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-md min-h-[400px]">
                <TiptapEditor 
                  content={editorContent}
                  onUpdate={({ editor }) => {
                    setEditorContent(editor.getHTML());
                  }}
                />
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
              <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-md">
                <p className="text-gray-500">
                  Fill in the form and click Generate to create a blog
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
