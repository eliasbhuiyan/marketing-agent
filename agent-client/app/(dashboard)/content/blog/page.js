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
import ContentPublisher from "@/components/ContentPublisher";
import ApiError from "@/components/ui/ApiError";
import Image from "next/image";

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
const [isCopied, setIsCopied] = useState(false);
const [blogOptions, setBlogOptions] = useState({
  blogTopic: "",
  blogLength: "",
  writingStyle: "informative",
  seoKeywords: "",
  numberOfHeadings: "2",
  outputLanguage: "English",
});
const [errors, setErrors] = useState({});

// Set up effect to update editor content when generated content changes

const validateInputs = () => {
  const newErrors = {};
  if (!blogOptions.blogTopic.trim()) newErrors.blogTopic = true;
  if (!blogOptions.blogLength.trim()) newErrors.blogLength = true;
  if (!blogOptions.seoKeywords.trim()) newErrors.seoKeywords = true;
  if (!blogOptions.outputLanguage.trim()) newErrors.outputLanguage = true;

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    setApiError("Please fill in all required fields.");
    return false;
  }

  setApiError(null);
  return true;
};

const handleInputChange = (e) => {
  const { id, value } = e.target;
  setBlogOptions((prev) => ({
    ...prev,
    [id === 'blog-topic' ? 'blogTopic' :
      id === 'blog-length' ? 'blogLength' :
        id === 'writing-style' ? 'writingStyle' :
          id === 'seo-keywords' ? 'seoKeywords' :
            id === 'number-of-headings' ? 'numberOfHeadings' :
              id === 'output-language' ? 'outputLanguage' : id]: value
  }));

  if (errors[id === 'blog-topic' ? 'blogTopic' :
    id === 'blog-length' ? 'blogLength' :
      id === 'seo-keywords' ? 'seoKeywords' :
        id === 'output-language' ? 'outputLanguage' : id]) {
    setErrors((prev) => ({
      ...prev, [id === 'blog-topic' ? 'blogTopic' :
        id === 'blog-length' ? 'blogLength' :
          id === 'seo-keywords' ? 'seoKeywords' :
            id === 'output-language' ? 'outputLanguage' : id]: false
    }));
  }
};

const handleGenerateContent = async (e) => {
  e.preventDefault();

  if (!validateInputs()) return;

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
    console.log("Generated Headings:", response.headings);

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
  setIsCopied(true);
  setTimeout(() => {
    setIsCopied(false);
  }, 2000); // Reset after 2 seconds
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
        <CardContent >
          <form className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="blog-topic" className="text-white">Blog Topic</Label>
              <Input
                id="blog-topic"
                placeholder="e.g., The Future of AI in Marketing"
                value={blogOptions.blogTopic}
                onChange={handleInputChange}
                className={`text-white ${errors.blogTopic ? "border-red-500" : ""}`}
              />
              {errors.blogTopic && <p className="text-red-500 text-sm mt-1">This field is required</p>}
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
                required
              >
                <option hidden>Select length</option>
                <option value="300-500">300-500 words</option>
                <option value="500-1000">500-1000 words</option>
                <option value="1000-1500">1000-1500 words</option>
                <option value="1500-2500">1500-2500 words</option>
                <option value="3000+">3000+ words</option>
                <option value="4000+">4000+ words</option>
                <option value="5000+">5000+ words</option>
                <option value="7000+">7000+ words</option>
                <option value="9000+">9000+ words</option>
                <option value="12000+">12000+ words</option>
              </select>
            </div>
            <div>
              <Label htmlFor="number-of-headings" className="text-white">Number of headings</Label>
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
                required
              >
                <option value="4">4 headings</option>
                <option value="5">5 headings</option>
                <option value="6">6 headings</option>
                <option value="7">7 headings</option>
                <option value="8">8 headings</option>
                <option value="9">9 headings</option>
                <option value="10">10 headings</option>
              </select>
            </div>
            <div>
              <Label htmlFor="writing-style" className="text-white">Writing Style</Label>
              <select
                id="writing-style"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white bg-transparent"
                value={blogOptions.writingStyle}
                required
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
                onChange={handleInputChange}
                className={`text-white ${errors.seoKeywords ? "border-red-500" : ""}`}
              />
              {errors.seoKeywords && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>
            <div>
              <Label htmlFor="output-language" className="text-white">Output Language</Label>
              <Input
                id="output-language"
                placeholder="e.g., Bangla, English, Spanish, French"
                value={blogOptions.outputLanguage}
                onChange={handleInputChange}
                className={`text-white ${errors.outputLanguage ? "border-red-500" : ""}`}
              />
              {errors.outputLanguage && <p className="text-red-500 text-sm mt-1">This field is required</p>}
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
                <ApiError>{apiError}</ApiError>
              )}
              <Button
                onClick={handleGenerateContent}
                className="w-fit text-white"
                disabled={isGenerating}
                type="submit"
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
          </form>
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
                        <Image
                          src={heading.imageLink}
                          alt={`Heading ${index + 1}`}
                          className="w-full h-full object-cover"
                          fill={true}
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
                <Button variant="glass" onClick={handleCopyContent} className="text-white">
                  <Copy className="mr-2 h-4 w-4" />
                  {isCopied ? "Copied ✔" : "Copy Blog"}
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
    <ContentPublisher
      content={editorContent}
      onPublished={() => {
        setGeneratedContent("");
        setEditorContent("");
        setBlogHeadings([]);
        setFinalHeadings([]);
        setBlogOptions({
          blogTopic: "",
          blogLength: "",
          writingStyle: "informative",
          seoKeywords: "",
          numberOfHeadings: "2",
          outputLanguage: "English",
        });
      }}
    />
  </div>
);
}
