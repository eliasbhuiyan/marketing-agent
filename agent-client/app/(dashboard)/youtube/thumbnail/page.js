"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DownloadIcon,
  Eye,
  ImageIcon,
  Settings,
  Sparkles,
  Upload,
} from "lucide-react";
import React, { useState } from "react";

const ThumbnailDesign = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedThumbnails, setGeneratedThumbnails] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const thumbnailStyles = [
    {
      id: "professional",
      name: "Professional",
      description: "Clean and business-focused",
    },
    {
      id: "bold",
      name: "Bold",
      description: "Eye-catching and attention-grabbing",
    },
    { id: "fun", name: "Fun", description: "Playful and engaging" },
    { id: "minimal", name: "Minimal", description: "Simple and elegant" },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage({ file, url });
    }
  };

  const handleGenerateThumbnails = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedThumbnails([
        {
          id: 1,
          url: "/api/placeholder/400/225",
          style: "Professional",
          score: 95,
        },
        { id: 2, url: "/api/placeholder/400/225", style: "Bold", score: 88 },
        { id: 3, url: "/api/placeholder/400/225", style: "Fun", score: 92 },
        { id: 4, url: "/api/placeholder/400/225", style: "Minimal", score: 85 },
      ]);
      setIsGenerating(false);
    }, 3000);
  };
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Panel - Upload & Settings */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload Image
            </CardTitle>
            <CardDescription>
              Upload your product or model image
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                Drop image here or click to upload
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Label htmlFor="image-upload">
                <Button variant="outline" className="cursor-pointer">
                  Choose Image
                </Button>
              </Label>
            </div>

            {uploadedImage && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Uploaded Image</h4>
                <img
                  src={uploadedImage.url}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Thumbnail Settings
            </CardTitle>
            <CardDescription>
              Configure your thumbnail preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="video-title">Video Title/Topic</Label>
              <Input
                id="video-title"
                placeholder="e.g., AI Marketing Tools Tutorial"
              />
            </div>

            <div>
              <Label htmlFor="video-description">Video Description</Label>
              <textarea
                id="video-description"
                className="w-full p-3 border border-gray-300 rounded-md h-20 resize-none"
                placeholder="Brief description of your video content..."
              />
            </div>

            <div>
              <Label htmlFor="thumbnail-style">Thumbnail Style</Label>
              <select
                id="thumbnail-style"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                {thumbnailStyles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name} - {style.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="brand-colors">Brand Colors</Label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="color"
                  id="brand-colors"
                  defaultValue="#3B82F6"
                  className="w-10 h-10 rounded border"
                />
                <Input defaultValue="#3B82F6" />
              </div>
            </div>

            <Button
              onClick={handleGenerateThumbnails}
              disabled={!uploadedImage || isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                  Generating Thumbnails...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Thumbnails
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Generated Thumbnails */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Generated Thumbnails
            </CardTitle>
            <CardDescription>AI-generated thumbnail variations</CardDescription>
          </CardHeader>
          <CardContent>
            {generatedThumbnails.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {generatedThumbnails.map((thumbnail) => (
                  <div
                    key={thumbnail.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {thumbnail.style} Style
                      </h3>
                      <span className="text-sm text-green-600 font-medium">
                        {thumbnail.score}% Score
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Thumbnails Generated Yet
                </h3>
                <p className="text-gray-600">
                  Upload an image and click &quot;Generate Thumbnails&quot; to create your
                  designs
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThumbnailDesign;
