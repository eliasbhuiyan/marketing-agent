"use client";

import { useState, useRef } from "react";
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
  Upload,
  Image as ImageIcon,
  Palette,
  Type,
  Sparkles,
  Download,
  Share2,
  Calendar,
  Eye,
  RotateCcw,
  Settings,
} from "lucide-react";
import apiClient from "@/lib/api";

export default function PostersPage() {
  const [productImage, setProductImage] = useState(null);
  const [modelImage, setModelImage] = useState(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const productInputRef = useRef(null);
  const modelInputRef = useRef(null);
  const [generatedPoster, setGeneratedPoster] = useState(null);
  const [captionPrompt, setCaptionPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [captionOptions, setCaptionOptions] = useState({
    tone: "professional",
    platform: "instagram",
    keywords: "",
    language: "Bangla",
  });
  const handleProductUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProductImage({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      type: "product",
    });
  };

  const handleModelUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setModelImage({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      type: "model",
    });
  };

  const handleGeneratePoster = async () => {
    if (!productImage || !modelImage) return;
    setIsGenerating(true);
    try {
      const res = await apiClient.ai.posterDesign(
        productImage.file,
        modelImage.file,
        customPrompt
      );
      console.log("res", res);

      setGeneratedPoster(res.image);
      setCaptionPrompt(res.description);
    } catch (error) {
      console.log("error:", error.message);
    }
    finally{
      setIsGenerating(false);
    }
  };

  const handleSchedulePost = () => {
    // Handle scheduling logic
    console.log("Scheduling post...");
  };

  const handleGenerateCaption = () => {
    setIsGeneratingCaption(true);
    try {
      const { tone, platform, keywords, language } = captionOptions;
      if (!captionPrompt) return;
      apiClient.ai.posterCaption({
        productDescription: captionPrompt,
        tone,
        platform,
        keywords,
        language,
      }).then((res) => {
        console.log("res", res);
        setGeneratedCaption(res.caption);
      }).catch((error) => {
        console.log("error:", error.message);
      }).finally(() => {
        setIsGeneratingCaption(false);
      })
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">
          Poster & Design Creator
        </h1>
        <p className="text-white/80 mt-2">
          Create stunning posters and banners with AI-powered design tools
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Product Image Upload (Required) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Product Image (Required)
            </CardTitle>
            <CardDescription>
              The main product to feature in your poster
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              onClick={() => productInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:bg-white/10 cursor-pointer rounded-lg p-6 text-center"
            >
              <input
                ref={productInputRef}
                type="file"
                accept="image/jpeg, image/png, image/webp, image/jpg"
                onChange={handleProductUpload}
                className="hidden"
              />
              {productImage ? (
                <div className="space-y-2 flex flex-col items-center">
                  <img
                    src={productImage.url}
                    alt="Product"
                    className="max-w-3xs object-cover rounded-lg"
                  />
                  <Button variant="glass" className="cursor-pointer">
                    Replace Image
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-white mb-4">
                    Upload a clear product image
                  </p>
                  <Button variant="outline" className="cursor-pointer">
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        {/* Model Image Upload (Required) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Model Image *
            </CardTitle>
            <CardDescription>
              Use a model to enhance lifestyle context
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              onClick={() => modelInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:bg-white/10 cursor-pointer rounded-lg p-6 text-center"
            >
              <input
                ref={modelInputRef}
                type="file"
                accept="image/jpeg, image/png, image/webp, image/jpg"
                onChange={handleModelUpload}
                className="hidden"
              />
              {modelImage ? (
                <div className="space-y-2 flex flex-col items-center">
                  <img
                    src={modelImage.url}
                    alt="Model"
                    className="max-w-3xs object-cover rounded-lg"
                  />
                  <Button variant="glass" className="cursor-pointer">
                    Replace Image
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-white mb-4">
                    Upload a model image
                  </p>
                  <Button variant="outline" className="cursor-pointer">
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
        {/* Design Options */}
        <Card>
          <CardHeader>
            <CardTitle>Design Options</CardTitle>
            <CardDescription>
              Customize your poster design with AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="custom-prompt">Describe your design</Label>
                <textarea
                  id="custom-prompt"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md h-28 resize-y"
                  placeholder="Describe the design you want, e.g., 'A minimalist product banner with blue gradient background'"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                />
              </div>
              <div className="text-sm text-white">
                <p>Tips:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Be specific about style, and layout</li>
                  <li>Describe the mood or feeling you want to convey</li>
                  <li>Add any special instructions or preferences</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Generated Poster Preview */}
        {generatedPoster ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Generated Poster
                </div>
                <div className="flex space-x-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = generatedPoster;
                        link.download = `poster-${Date.now()}.jpg`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download JPG
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = generatedPoster;
                        link.download = `poster-${Date.now()}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PNG
                    </Button>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-base text-white max-w-xl m-auto card-surface py-1 px-3 rounded-2xl">
                {captionPrompt}
              </div>
              <div className="bg-gray-100 rounded-lg text-center w-fit max-w-sm m-auto">
                <img
                  src={generatedPoster}
                  alt="Generated Poster"
                  className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-12 text-center flex flex-col items-center justify-center">
              <div className="border-4 border-dashed border-gray-200 rounded-xl p-8 w-full max-w-sm">
                <ImageIcon className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  Ready to Create Your Poster
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Upload your product and model images, then click
                  &quot;Generate Poster&quot; to create your custom design with
                  AI
                </p>
                <div className="mt-6 text-xs text-white/90">
                  Supported formats: JPG, PNG, WEBP
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {/* Generate Button */}
      <Button
        onClick={handleGeneratePoster}
        disabled={!productImage || !modelImage || isGenerating}
        className="w-full"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Sparkles className="h-5 w-5 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5 mr-2" />
            Generate Poster
          </>
        )}
      </Button>
      {/* Caption Generator */}
      {generatedPoster && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Type className="h-5 w-5 mr-2" />
                Caption Generator
              </div>
              <Button
                size="sm"
                onClick={handleGenerateCaption}
                disabled={isGeneratingCaption}
              >
                {isGeneratingCaption ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Caption
                  </>
                )}
              </Button>
            </CardTitle>
            <CardDescription>
              Generate a caption for this poster with custom options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="cap-tone">Tone</Label>
                <select
                  id="cap-tone"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={captionOptions.tone}
                  onChange={(e) =>
                    setCaptionOptions({
                      ...captionOptions,
                      tone: e.target.value,
                    })
                  }
                >
                  <option value="promotional">Promotional</option>
                  <option value="friendly">Friendly</option>
                  <option value="playful">Playful</option>
                  <option value="professional">Professional</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div>
                <Label htmlFor="cap-platform">Platform</Label>
                <select
                  id="cap-platform"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={captionOptions.platform}
                  onChange={(e) =>
                    setCaptionOptions({
                      ...captionOptions,
                      platform: e.target.value,
                    })
                  }
                >
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter/X</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>
              <div>
                <Label htmlFor="cap-keywords">Keywords (comma separated)</Label>
                <Input
                  id="cap-keywords"
                  placeholder="e.g., newarrival, summer, limited"
                  value={captionOptions.keywords}
                  onChange={(e) =>
                    setCaptionOptions({
                      ...captionOptions,
                      keywords: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="cap-lang">Language</Label>
                <select
                  id="cap-lang"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={captionOptions.language}
                  onChange={(e) =>
                    setCaptionOptions({
                      ...captionOptions,
                      language: e.target.value,
                    })
                  }
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="hi">Hindi</option>
                  <option value="bn">Bengali</option>
                  <option value="ar">Arabic</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>
              <div>
                <Label htmlFor="cap-keywords">Describe about the product</Label>
                <textarea
                  id="cap-prompt"
                  className="w-full min-h-10 mt-1 p-3 border border-gray-300 rounded-md resize-none field-sizing-content"
                  placeholder="e.g., newarrival, summer, limited, unique"
                  value={captionPrompt}
                  onChange={(e) =>
                    setCaptionPrompt(e.target.value)
                  }
                />
              </div>
            </div>
            {generatedCaption && (
              <div className="mb-4">
                <Label htmlFor="cap-edit">Edit Caption</Label>
                <textarea
                  id="cap-edit"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md resize-none field-sizing-content"
                  value={generatedCaption}
                  onChange={(e) => setGeneratedCaption(e.target.value)}
                />
                <div className="mt-1 text-xs text-white">
                  {generatedCaption.length} characters
                </div>
              </div>
            )}
            <div className="flex space-x-2">
              <Button
                variant=""
                size="sm"
                onClick={() =>
                  generatedCaption &&
                  navigator.clipboard.writeText(generatedCaption)
                }
                disabled={
                  !generatedCaption || generatedCaption.trim().length === 0
                }
              >
                Copy Caption
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Schedule & Publish */}
      {generatedPoster && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule & Publish
            </CardTitle>
            <CardDescription>
              Schedule your poster to social media platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Platforms</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Instagram", "Facebook", "LinkedIn", "Twitter", "TikTok"].map(
                  (platform) => (
                    <label
                      key={platform}
                      className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{platform}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schedule-date">Schedule Date</Label>
                <Input id="schedule-date" type="date" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="schedule-time">Schedule Time</Label>
                <Input id="schedule-time" type="time" className="mt-1" />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSchedulePost}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Post
              </Button>
              <Button>
                <Share2 className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
