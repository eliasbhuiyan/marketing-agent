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
import { Sparkles, Copy } from "lucide-react";
import apiClient from "@/lib/api";

export default function HashtagGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({
    frequent: {
      keywords: [
        "cat food",
        "healthy cat food",
        "best cat treats",
        "kitten food",
        "cat nutrition",
      ],
      hashtags: [
        "#catfood",
        "#healthycat",
        "#cattreats",
        "#kittenfood",
        "#catnutrition",
      ],
    },
    average: {
      keywords: [
        "grain free cat food",
        "natural cat food",
        "wet cat food",
        "organic cat treats",
        "cat food reviews",
      ],
      hashtags: [
        "#healthycats",
        "#grainfreecatfood",
        "#naturalcatfood",
        "#organicpets",
        "#catfoodreview",
      ],
    },
    rare: {
      keywords: [
        "limited ingredient cat food",
        "raw diet for cats",
        "senior cat food",
        "hairball control cat food",
        "hypoallergenic cat treats",
      ],
      hashtags: [
        "#limitedingredientcatfood",
        "#rawfedcat",
        "#seniorcatdiet",
        "#hairballcare",
        "#hypoallergeniccat",
      ],
    },
  });
  const [hashtagOptions, setHashtagOptions] = useState({
    industry: "",
    platform: "instagram",
    numKeywords: "15",
  });

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    console.log(hashtagOptions);

    try {
      // Simulate AI generation for hashtags
      const response = await apiClient.ai.keywordHashtagGenerator({
        industry: hashtagOptions.industry,
        numKeywords: hashtagOptions.numKeywords,
        platform: hashtagOptions.platform,
      });
      console.log(response);
      setGeneratedContent(response);
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate content. Please try again.");
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
                <Label htmlFor="industry">Industry/Niche</Label>
                <Input
                  id="industry"
                  placeholder="e.g., Fashion, Technology, Food"
                  value={hashtagOptions.industry}
                  onChange={(e) =>
                    setHashtagOptions({
                      ...hashtagOptions,
                      industry: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="hashtag-platform">Platform</Label>
                <select
                  id="hashtag-platform"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={hashtagOptions.platform}
                  onChange={(e) =>
                    setHashtagOptions({
                      ...hashtagOptions,
                      platform: e.target.value,
                    })
                  }
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
                  value={hashtagOptions.numKeywords}
                  onChange={(e) =>
                    setHashtagOptions({
                      ...hashtagOptions,
                      numKeywords: e.target.value,
                    })
                  }
                >
                  <option value="10">10 Hashtags</option>
                  <option value="15">15 Hashtags</option>
                  <option value="20">20 Hashtags</option>
                  <option value="30">30 Hashtags</option>
                </select>
              </div>
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
            <CardDescription>
              Your AI-generated hashtags will appear here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedContent ? (
              <div className="grid grid-cols-3 gap-x-8 space-y-6">
                {/* Frequent Hashtags & Keywords */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-600 flex justify-between">
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
                  <h3 className="font-semibold text-blue-600 flex justify-between">
                    <span>Average Popularity ({generatedContent.average?.keywords.length})</span>
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
                  <h3 className="font-semibold text-purple-600 flex justify-between">
                    <span>Niche/Rare ({generatedContent.rare?.keywords.length})</span>
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
                    Copy All Hashtags
                  </Button>
                  <Button variant="outline" onClick={handleCopyKeywords}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy All Keywords
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] bg-gray-50 rounded-md">
                <p className="text-gray-500">
                  Fill in the form and click Generate to create hashtags
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
