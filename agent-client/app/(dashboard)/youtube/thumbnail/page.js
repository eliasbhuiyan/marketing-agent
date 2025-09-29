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
import React, { useRef, useState } from "react";

const ThumbnailDesign = () => {
  const imageInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedThumbnails, setGeneratedThumbnails] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    videoTitle: "",
    videoDescription: "",
    thumbnailStyle: "professional",
    brandColor: "#3B82F6"
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id === 'video-title' ? 'videoTitle' :
      id === 'video-description' ? 'videoDescription' :
        id === 'thumbnail-style' ? 'thumbnailStyle' :
          id === 'brand-colors' ? 'brandColor' : id;

    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear error when user types
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: false
      }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'Please upload a valid image file'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size should be less than 5MB'
        }));
        return;
      }

      const url = URL.createObjectURL(file);
      setUploadedImage({ file, url });

      // Clear image error if exists
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: false
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!uploadedImage) {
      newErrors.image = 'Please upload an image';
    }
    if (!formData.videoTitle.trim()) {
      newErrors.videoTitle = 'Video title is required';
    }
    if (!formData.videoDescription.trim()) {
      newErrors.videoDescription = 'Video description is required';
    }
    if (!formData.thumbnailStyle) {
      newErrors.thumbnailStyle = 'Please select a thumbnail style';
    }
    if (!formData.brandColor) {
      newErrors.brandColor = 'Brand color is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateThumbnails = async () => {
    if (!validateForm()) {
      setApiError('Please fill in all required fields');
      return;
    }
    console.log(formData, uploadedImage);
    
    setApiError(null);
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
            <div
              onClick={() => imageInputRef.current?.click()}
              className={`border-2 border-dashed cursor-pointer hover:bg-white/10 ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg p-6 text-center`}
            >
              <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg, image/png, image/webp, image/jpg"
                onChange={handleImageUpload}
                className="hidden"
              />
              {uploadedImage ? (
                <div className="space-y-2 flex flex-col items-center">
                  <img
                    src={uploadedImage.url}
                    alt="Uploaded"
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
                    Drop image here or click to upload
                  </p>
                  <Button variant="outline" className="cursor-pointer">
                    Choose Image
                  </Button>
                </>
              )}
              {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image}</p>}
            </div>
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
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
                {apiError}
              </div>
            )}

            <div>
              <Label htmlFor="video-title">Video Title/Topic</Label>
              <Input
                id="video-title"
                placeholder="e.g., AI Marketing Tools Tutorial"
                value={formData.videoTitle}
                onChange={handleInputChange}
                className={errors.videoTitle ? "border-red-500" : ""}
              />
              {errors.videoTitle && <p className="text-red-500 text-sm mt-1">{errors.videoTitle}</p>}
            </div>

            <div>
              <Label htmlFor="video-description">Video Description</Label>
              <textarea
                id="video-description"
                className={`w-full p-3 border ${errors.videoDescription ? "border-red-500" : "border-gray-300"} rounded-md h-20 resize-none`}
                placeholder="Brief description of your video content..."
                value={formData.videoDescription}
                onChange={handleInputChange}
              />
              {errors.videoDescription && <p className="text-red-500 text-sm mt-1">{errors.videoDescription}</p>}
            </div>

            <div>
              <Label htmlFor="thumbnail-style">Thumbnail Style</Label>
              <select
                id="thumbnail-style"
                className={`w-full mt-1 p-2 border ${errors.thumbnailStyle ? "border-red-500" : "border-gray-300"} rounded-md`}
                value={formData.thumbnailStyle}
                onChange={handleInputChange}
              >
                {thumbnailStyles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name} - {style.description}
                  </option>
                ))}
              </select>
              {errors.thumbnailStyle && <p className="text-red-500 text-sm mt-1">{errors.thumbnailStyle}</p>}
            </div>

            <div>
              <Label htmlFor="brand-colors">Brand Colors</Label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="color"
                  id="brand-colors"
                  value={formData.brandColor}
                  onChange={handleInputChange}
                  className={`w-10 h-10 rounded border ${errors.brandColor ? "border-red-500" : ""}`}
                />
                <Input
                  value={formData.brandColor}
                  onChange={handleInputChange}
                  className={errors.brandColor ? "border-red-500" : ""}
                />
              </div>
              {errors.brandColor && <p className="text-red-500 text-sm mt-1">{errors.brandColor}</p>}
            </div>

            <Button
              onClick={handleGenerateThumbnails}
              disabled={isGenerating}
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
