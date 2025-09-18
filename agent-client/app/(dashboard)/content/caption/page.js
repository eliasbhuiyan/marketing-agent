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
import { Sparkles, MessageSquare, Heart, Zap } from "lucide-react";
import apiClient from "@/lib/api";

export default function CaptionGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [captionOptions, setCaptionOptions] = useState({
    productDescription: "",
    targetAudience: "",
    tone: "promotional",
    platform: "facebook",
  });

  const handleGenerateContent = async () => {
    setIsGenerating(true);

    try {
      const { productDescription, targetAudience, tone, platform } =
        captionOptions;

      // Call the caption generator API
      const response = await apiClient.ai.captionGenerator({
        productDescription,
        targetAudience,
        tone,
        platform,
      });

      // Set the generated content from the API response
      setGeneratedContent(response.caption || response.content);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
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
            <CardTitle>Caption Generation Settings</CardTitle>
            <CardDescription>
              Configure your caption requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="product-description">
                Product/Service Description
              </Label>
              <textarea
                id="product-description"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md h-24 resize-none"
                placeholder="Describe your product or service..."
                value={captionOptions.productDescription}
                onChange={(e) =>
                  setCaptionOptions({
                    ...captionOptions,
                    productDescription: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="target-audience">Target Audience</Label>
              <Input
                id="target-audience"
                placeholder="e.g., Young professionals, Tech enthusiasts"
                value={captionOptions.targetAudience}
                onChange={(e) =>
                  setCaptionOptions({
                    ...captionOptions,
                    targetAudience: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="tone">Tone</Label>
              <select
                id="tone"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={captionOptions.tone}
                onChange={(e) =>
                  setCaptionOptions({ ...captionOptions, tone: e.target.value })
                }
              >
                <option value="promotional">Promotional</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="playful">Playful</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
            <div>
              <Label htmlFor="platform">Platform</Label>
              <select
                id="platform"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={captionOptions.platform}
                onChange={(e) =>
                  setCaptionOptions({
                    ...captionOptions,
                    platform: e.target.value,
                  })
                }
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="tiktok">TikTok</option>
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
                  Generate Caption
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
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Generated Caption</CardTitle>
                <CardDescription>
                  Your AI-generated caption will appear here
                </CardDescription>
              </div>
              {
                generatedContent && (
                  <Button variant="outline" onClick={handleCopyContent}>
                    Copy Caption
                  </Button>
                )
              }
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md min-h-[200px] whitespace-pre-wrap">
                  {generatedContent}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-md p-6 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">
                  Fill in the form and click Generate to create your caption
                </p>
                <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-400">Engaging and authentic captions</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-400">Optimized for audience engagement</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-400">Tailored to your brand voice</p>
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
