"use client";

import { useState } from "react";
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
import { Sparkles, Copy, Hash, Target, BarChart } from "lucide-react";
import apiClient from "@/lib/api";
import LoaderAnim from "@/components/LoaderAnim";
import ApiError from "@/components/ui/ApiError";

export default function HashtagGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [apiError, setApiError] = useState("");
  const [hashtagOptions, setHashtagOptions] = useState({
    industry: "",
    platform: "instagram",
    numKeywords: "15",
  });
  const [errors, setErrors] = useState({});
  const [isHashtagsCopied, setIsHashtagsCopied] = useState(false);
  const [isKeywordsCopied, setIsKeywordsCopied] = useState(false);

  // Validate required fields
  const validateInputs = () => {
    const newErrors = {};
    if (!hashtagOptions.industry.trim()) newErrors.industry = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setHashtagOptions((prev) => ({
      ...prev,
      [id === 'industry' ? 'industry' : 
        id === 'hashtag-platform' ? 'platform' : 
        id === 'hashtag-count' ? 'numKeywords' : id]: value
    }));
    if (errors[id === 'industry' ? 'industry' : id]) {
      setErrors((prev) => ({ ...prev, [id === 'industry' ? 'industry' : id]: false }));
    }
  };

  const handleGenerateContent = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsGenerating(true);
    setApiError(""); // Clear any previous errors
    console.log(hashtagOptions);

    try {
      // Simulate AI generation for hashtags
      const response = await apiClient.ai.keywordHashtagGenerator({
        industry: hashtagOptions.industry,
        numKeywords: hashtagOptions.numKeywords,
        platform: hashtagOptions.platform,
      });
      setGeneratedContent(response);
      setHashtagOptions({
        industry: "",
        platform: "instagram",
        numKeywords: "15",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      setApiError(error.message || "Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyContent = () => {
    if (!generatedContent) return;

    // Combine all hashtags and keywords for copying
    const allHashtags = [
      ...(generatedContent.frequent?.hashtags || []),
      ...(generatedContent.average?.hashtags || []),
      ...(generatedContent.rare?.hashtags || []),
    ].join(" ");

    navigator.clipboard.writeText(allHashtags);
    setIsHashtagsCopied(true);
    setTimeout(() => {
      setIsHashtagsCopied(false);
    }, 2000); // Reset after 2 seconds
  };

  const handleCopyKeywords = () => {
    if (!generatedContent) return;

    // Combine all keywords for copying
    const allKeywords = [
      ...(generatedContent.frequent?.keywords || []),
      ...(generatedContent.average?.keywords || []),
      ...(generatedContent.rare?.keywords || []),
    ].join(", ");

    navigator.clipboard.writeText(allKeywords);
    setIsKeywordsCopied(true);
    setTimeout(() => {
      setIsKeywordsCopied(false);
    }, 2000); // Reset after 2 seconds
  };

  return (
    <div className="space-y-4">
      {/* Left Panel - Input Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hashtag & Keyword Settings</CardTitle>
            <CardDescription>
              Configure your hashtag requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <Label htmlFor="industry">Industry/Niche *</Label>
                <Input
                  id="industry"
                  placeholder="e.g., Fashion, Technology, Food"
                  value={hashtagOptions.industry}
                  onChange={handleInputChange}
                  className={errors.industry ? "border-red-500" : ""}
                />
                {errors.industry && <p className="text-red-500 text-sm mt-1">This field is required</p>}
              </div>
              <div>
                <Label htmlFor="hashtag-platform">Platform</Label>
                <select
                  id="hashtag-platform"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-transparent"
                  value={hashtagOptions.platform}
                  onChange={handleInputChange}
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="twitter">Twitter</option>
                  <option value="seo">SEO</option>
                </select>
              </div>
              <div>
                <Label htmlFor="hashtag-count">Number of Hashtags/Keywords</Label>
                <select
                  id="hashtag-count"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={hashtagOptions.numKeywords}
                  onChange={handleInputChange}
                >
                  <option value="10">10 Hashtags/Keywords</option>
                  <option value="15">15 Hashtags/Keywords</option>
                  <option value="20">20 Hashtags/Keywords</option>
                  <option value="30">30 Hashtags/Keywords</option>
                </select>
              </div>
            </div>
            {apiError && (
              <ApiError>{apiError}</ApiError>
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
            <CardDescription>
              Your AI-generated hashtags will appear here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedContent ? (
              <div className="grid grid-cols-3 gap-x-8 space-y-6">
                {/* Frequent Hashtags & Keywords */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-white border-b pb-1 flex justify-between">
                    <span>
                      Frequently Used (
                      {generatedContent.frequent?.keywords.length})
                    </span>
                    <span className="text-sm bg-red-400 rounded-2xl px-2 text-white font-normal">
                      high competition
                    </span>
                  </h3>
                  <div className="p-4 rounded-md">
                    <p className="font-medium mb-2">Keywords:</p>
                    <p className="text-lg mb-3">
                      {generatedContent.frequent?.keywords.join(", ")}
                    </p>
                    <p className="font-medium mb-2">Hashtags:</p>
                    <p className="text-lg">
                      {generatedContent.frequent?.hashtags.join(" ")}
                    </p>
                  </div>
                </div>

                {/* Average Hashtags & Keywords */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-white border-b pb-1 flex justify-between">
                    <span>
                      Average Popularity (
                      {generatedContent.average?.keywords.length})
                    </span>
                    <span className="text-sm bg-yellow-500 px-2 text-white font-normal rounded-2xl">
                      medium competition
                    </span>
                  </h3>
                  <div className="p-4 rounded-md">
                    <p className="font-medium mb-2">Keywords:</p>
                    <p className="text-lg mb-3">
                      {generatedContent.average?.keywords.join(", ")}
                    </p>
                    <p className="font-medium mb-2">Hashtags:</p>
                    <p className="text-lg">
                      {generatedContent.average?.hashtags.join(" ")}
                    </p>
                  </div>
                </div>

                {/* Rare Hashtags & Keywords */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-white border-b pb-1 flex justify-between">
                    <span>
                      Niche/Rare ({generatedContent.rare?.keywords.length})
                    </span>
                    <span className="text-sm bg-green-400 text-white px-2 rounded-2xl font-normal">
                      low competition
                    </span>
                  </h3>
                  <div className="p-4 rounded-md">
                    <p className="font-medium mb-2">Keywords:</p>
                    <p className="text-lg mb-3">
                      {generatedContent.rare?.keywords.join(", ")}
                    </p>
                    <p className="font-medium mb-2">Hashtags:</p>
                    <p className="text-lg">
                      {generatedContent.rare?.hashtags.join(" ")}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleCopyContent}>
                    <Copy className="mr-2 h-4 w-4" />
                    {isHashtagsCopied ? "Copied ✔" : "Copy All Hashtags"}
                  </Button>
                  <Button variant="outline" onClick={handleCopyKeywords}>
                    <Copy className="mr-2 h-4 w-4" />
                    {isKeywordsCopied ? "Copied ✔" : "Copy All Keywords"}
                  </Button>
                </div>
              </div>
            ) :
            isGenerating
            ?
            <LoaderAnim/>
            :
            (
              <div className="flex items-center justify-center rounded-md">
                <div className="flex flex-col items-center justify-center rounded-md p-6 text-center">
                  <Hash className="h-12 w-12 text-white mb-4" />
                  <p className="text-white mb-2">
                    Fill in the form and click Generate to create hashtags and
                    keywords
                  </p>
                  <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-white" />
                      <p className="text-sm text-white">Trending hashtags</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-white" />
                      <p className="text-sm text-white">
                        Niche-specific keywords
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-white" />
                      <p className="text-sm text-white">
                        Competition-based categorization
                      </p>
                    </div>
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
