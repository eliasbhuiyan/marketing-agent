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
import { Sparkles, MessageSquare, Heart, Zap } from "lucide-react";
import apiClient from "@/lib/api";
import LoaderAnim from "../../../../components/LoaderAnim";
import ApiError from "@/components/ui/ApiError";
import useSingleHistory from "@/lib/hooks/useSingleHistory";

export default function CaptionGenerator() {
  const { historyData, loading, error } = useSingleHistory();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [apiError, setApiError] = useState("");

  // Set generatedContent from historyData when available
  useEffect(() => {
    if (historyData && historyData?.text) {
      setGeneratedContent(historyData.text);
    }
  }, [historyData]);
  const [captionOptions, setCaptionOptions] = useState({
    productDescription: "",
    targetAudience: "",
    tone: "promotional",
    platform: "facebook",
    language: "Bangla",
  });
  const [errors, setErrors] = useState({});

  // Validate required fields
  const validateInputs = () => {
    const newErrors = {};
    if (!captionOptions.productDescription.trim()) newErrors.productDescription = true;
    if (!captionOptions.targetAudience.trim()) newErrors.targetAudience = true;
    if (!captionOptions.language.trim()) newErrors.language = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCaptionOptions((prev) => ({
      ...prev,
      [id === 'product-description' ? 'productDescription' :
        id === 'target-audience' ? 'targetAudience' :
          id === 'tone' ? 'tone' :
            id === 'platform' ? 'platform' :
              id === 'language' ? 'language' : id]: value
    }));
    if (errors[id === 'product-description' ? 'productDescription' :
      id === 'target-audience' ? 'targetAudience' :
        id === 'language' ? 'language' : id]) {
      setErrors((prev) => ({
        ...prev, [id === 'product-description' ? 'productDescription' :
          id === 'target-audience' ? 'targetAudience' :
            id === 'language' ? 'language' : id]: false
      }));
    }
  };

  const handleGenerateContent = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!validateInputs()) return; // Guard against incomplete form

    setIsGenerating(true);
    setApiError(""); // Clear any previous errors

    try {
      const { productDescription, targetAudience, tone, platform, language } =
        captionOptions;

      // Call the caption generator API
      const response = await apiClient.ai.captionGenerator({
        productDescription,
        targetAudience,
        tone,
        platform,
        language,
      });
      console.log(response);
      // Set the generated content from the API response
      setGeneratedContent(response.caption);
    } catch (error) {
      console.log(error);
      setApiError(error.message || "Failed to generate content. Please try again.");
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
            <CardTitle className="text-white">
              Caption Generation Settings
            </CardTitle>
            <CardDescription className="text-white">
              Configure your caption requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleGenerateContent}>
              <div>
                <Label htmlFor="product-description" className="text-white">
                  Product/Service Description *
                </Label>
                <textarea
                  id="product-description"
                  className={`w-full mt-1 p-3 border ${errors.productDescription ? "border-red-500" : "border-gray-300"} rounded-md h-24 resize-none text-white`}
                  placeholder="Describe your product or service..."
                  value={captionOptions.productDescription}
                  onChange={handleInputChange}
                />
                {errors.productDescription && <p className="text-red-500 text-sm mt-1">This field is required</p>}
              </div>
              <div>
                <Label htmlFor="target-audience" className="text-white">
                  Target Audience *
                </Label>
                <Input
                  id="target-audience"
                  className={`text-white ${errors.targetAudience ? "border-red-500" : ""}`}
                  placeholder="e.g., Young professionals, Tech enthusiasts"
                  value={captionOptions.targetAudience}
                  onChange={handleInputChange}
                />
                {errors.targetAudience && <p className="text-red-500 text-sm mt-1">This field is required</p>}
              </div>
              <div>
                <Label htmlFor="tone" className="text-white">
                  Tone
                </Label>
                <select
                  required
                  id="tone"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white"
                  value={captionOptions.tone}
                  onChange={(e) =>
                    setCaptionOptions({ ...captionOptions, tone: e.target.value })
                  }
                >
                  <option value="promotional" className="text-white">
                    Promotional
                  </option>
                  <option value="professional" className="text-white">
                    Professional
                  </option>
                  <option value="casual" className="text-white">
                    Casual
                  </option>
                  <option value="playful" className="text-white">
                    Playful
                  </option>
                  <option value="luxury" className="text-white">
                    Luxury
                  </option>
                </select>
              </div>
              <div>
                <Label htmlFor="platform" className="text-white">
                  Platform
                </Label>
                <select
                  required
                  id="platform"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md text-white"
                  value={captionOptions.platform}
                  onChange={(e) =>
                    setCaptionOptions({
                      ...captionOptions,
                      platform: e.target.value,
                    })
                  }
                >
                  <option value="facebook" className="text-white">
                    Facebook
                  </option>
                  <option value="instagram" className="text-white">
                    Instagram
                  </option>
                  <option value="linkedin" className="text-white">
                    LinkedIn
                  </option>
                  <option value="twitter" className="text-white">
                    Twitter
                  </option>
                  <option value="tiktok" className="text-white">
                    TikTok
                  </option>
                </select>
              </div>
              <div>
                <Label htmlFor="language" className="text-white">
                  Output Language *
                </Label>
                <Input
                  id="language"
                  className={`text-white ${errors.language ? "border-red-500" : ""}`}
                  placeholder="e.g., Bangla"
                  value={captionOptions.language}
                  onChange={handleInputChange}
                />
                {errors.language && <p className="text-red-500 text-sm mt-1">This field is required</p>}
              </div>
              {apiError && (
                <ApiError>{apiError}</ApiError>
              )}
              <Button
                className="w-full text-white"
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
                    Generate Caption
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Generated Content */}
      <div className="space-y-6">
        <Card className="h-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white">Generated Caption</CardTitle>
                <CardDescription className="text-white">
                  Your AI-generated caption will appear here
                </CardDescription>
              </div>
              {generatedContent && (
                <Button
                  variant="outline"
                  onClick={handleCopyContent}
                  className="text-white"
                >
                  Copy Caption
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            {generatedContent ? (
              <div className="space-y-4">
                <div className="p-4 pt-0 bg-white/10 rounded-md min-h-[200px] whitespace-pre-wrap text-white">
                  {generatedContent}
                </div>
              </div>
            ) : isGenerating ? (
              <LoaderAnim>
              </LoaderAnim>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] rounded-md p-6 text-center">
                <MessageSquare className="h-12 w-12 text-white mb-4" />
                <p className="text-white mb-2">
                  Fill in the form and click Generate to create your caption
                </p>
                <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">
                      Engaging and authentic captions
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">
                      Optimized for audience engagement
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">
                      Tailored to your brand voice
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
