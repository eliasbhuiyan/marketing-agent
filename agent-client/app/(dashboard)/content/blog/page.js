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
import {
  Sparkles,
  Copy,
  Calendar,
  FileText,
  PenTool,
  BarChart,
} from "lucide-react";
import apiClient from "@/lib/api";
import dynamic from "next/dynamic";
import BlogHeadingPopup from "@/components/BlogHeadingPopup";

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
  const [showHeadingPopup, setShowHeadingPopup] = useState(false);
  const [blogHeadings, setBlogHeadings] = useState([]);
  const [finalHeadings, setFinalHeadings] = useState([]);
  const [blogOptions, setBlogOptions] = useState({
    blogTopic: "",
    blogLength: "",
    writingStyle: "informative",
    seoKeywords: "",
    numberOfHeadings: "2",
    outputLanguage: "English",
  });

  // Set up effect to update editor content when generated content changes

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    try {
      // Call the blog generator API
      const response = await apiClient.ai.blogheadings({
        blogTopic: blogOptions.blogTopic,
        writingStyle: blogOptions.writingStyle,
        seoKeywords: blogOptions.seoKeywords,
        numberOfHeadings: blogOptions.numberOfHeadings,
        outputLanguage: blogOptions.outputLanguage,
      });
      
      setBlogHeadings(response.headings);
      setShowHeadingPopup(true);
    } catch (error) {
      console.error("Error generating content:", error);
      setApiError(
        error.message || "Failed to generate content. Please try again."
      );
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

  const handleSaveHeadings = (customizedHeadings) => {
    setFinalHeadings(customizedHeadings);
    setShowHeadingPopup(false);
    
    // Generate the blog content with the customized headings
    generateBlogWithHeadings(customizedHeadings);
  };

  const handleCancelHeadings = () => {
    setShowHeadingPopup(false);
    setBlogHeadings([]);
  };

  const generateBlogWithHeadings = async (headings) => {
    setIsGenerating(true);    
    try {
      // Call the blog generator API with the customized headings
      const response = await apiClient.ai.blogGenerator({
        blogTopic: blogOptions.blogTopic,
        blogLength: blogOptions.blogLength,
        writingStyle: blogOptions.writingStyle,
        seoKeywords: blogOptions.seoKeywords,
        outputLanguage: blogOptions.outputLanguage,
        headings: headings, // Pass the customized headings
      });      
      setGeneratedContent(response.blog);
    } catch (error) {
      console.log("Error generating blog content:", error);
      setApiError(
        error.message || "Failed to generate blog content. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (generatedContent) {
      setEditorContent(generatedContent);
    }
  }, [generatedContent]);
  return (
    <div className="space-y-6 text-white">
      {/* Blog Heading Popup */}
      <BlogHeadingPopup
        isOpen={showHeadingPopup}
        onClose={handleCancelHeadings}
        headings={blogHeadings}
        onSave={handleSaveHeadings}
        onCancel={handleCancelHeadings}
      />

      {/* Left Panel - Input Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Blog Generation Settings</CardTitle>
            <CardDescription className="text-white">Configure your blog requirements</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="blog-topic" className="text-white">Blog Topic</Label>
              <Input
                id="blog-topic"
                placeholder="e.g., The Future of AI in Marketing"
                value={blogOptions.blogTopic}
                onChange={(e) =>
                  setBlogOptions({ ...blogOptions, blogTopic: e.target.value })
                }
                className="text-white"
              />
            </div>
            <div>
              <Label htmlFor="blog-length" className="text-white">Blog Length</Label>
              <select
                id="blog-length"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white bg-transparent"
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
              <Label htmlFor="blog-length" className="text-white">Number of headings</Label>
              <select
                id="number-of-headings"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white bg-transparent"
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
              <Label htmlFor="writing-style" className="text-white">Writing Style</Label>
              <select
                id="writing-style"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white bg-transparent"
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
              <Label htmlFor="seo-keywords" className="text-white">SEO Focus Keywords</Label>
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
                className="text-white"
              />
            </div>
            <div>
              <Label htmlFor="output-language" className="text-white">Output Language</Label>
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
                className="text-white"
              />
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs text-white">✅</p>
                <Label htmlFor="human-like" className="text-white">
                  FAQ (Frequently Asked Questions)
                </Label>
              </div>
              <p className="text-sm text-white">
                Add frequently asked questions (FAQs) to the blog.
              </p>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs text-white">✅</p>
                <Label htmlFor="human-like" className="text-white">Human like content</Label>
              </div>
              <p className="text-sm text-white">
                Generate content that is more human like.
              </p>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs text-white">✅</p>
                <Label htmlFor="human-like" className="text-white">Image in the blog post</Label>
              </div>
              <p className="text-sm text-white">
                Add pixabay images to the blog post.
              </p>
            </div>
            <div className="col-span-3 flex flex-col items-center">
              {apiError && (
                <div className="text-red-500 text-sm mt-2">{apiError}</div>
              )}
              <Button
                onClick={handleGenerateContent}
                className="w-fit text-white"
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Generated Content with Rich Text Editor */}
      <div className="space-y-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-white">Generated Blog</CardTitle>
            <CardDescription className="text-white">
              Edit your AI-generated blog content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(finalHeadings.length > 0 && !generatedContent) && (
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  Selected Blog Structure
                </h3>
                <div className="space-y-3">
                  {finalHeadings.map((heading, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{heading.title}</p>
                      </div>
                      {heading.imageLink && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-600">
                          <img
                            src={heading.imageLink}
                            alt={`Heading ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-white/10 rounded-md min-h-[400px] whitespace-pre-wrap">
                  <TiptapEditor
                    content={editorContent}
                    onUpdate={({ editor }) => {
                      setEditorContent(editor.getHTML());
                    }}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleCopyContent} className="text-white">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Blog
                  </Button>
                  <Button variant="outline" onClick={handleScheduleBlog} className="text-white">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Post
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] rounded-md p-6 text-center">
                <FileText className="h-12 w-12 text-white mb-4" />
                <p className="text-white mb-2">
                  Fill in the form and click Generate to create your blog post
                </p>
                <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                  <div className="flex items-center gap-2">
                    <PenTool className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">
                      SEO-optimized content
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">
                      Engaging and informative articles
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">
                      Tailored to your target audience
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
