"use client";
import ApiError from "@/components/ui/ApiError";
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
import apiClient from "@/lib/api";
import BrandAssetDisplay from "@/lib/BrandAssetDisplay";
import {
  Download,
  DownloadIcon,
  Eye,
  ImageIcon,
  Settings,
  Sparkles,
  Upload,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const ThumbnailDesign = () => {
  const imageInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedThumbnails, setGeneratedThumbnails] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    headlineText: "",
    subheadingText: "",
    videoDescription: "",
    thumbnailStyle: "professional",
    brandColor: "#3B82F6",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const thumbnailStyles = [
    {
      id: "professional - Clean and business-focused",
      name: "Professional",
      description: "Clean and business-focused",
    },
    {
      id: "bold - Eye-catching and attention-grabbing",
      name: "Bold",
      description: "Eye-catching and attention-grabbing",
    },
    { id: "fun - Playful and engaging", name: "Fun", description: "Playful and engaging" },
    { id: "minimal - Simple and elegant", name: "Minimal", description: "Simple and elegant" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldName =
      id === "video-title"
        ? "headlineText"
        : id === "video-subheading"
          ? "subheadingText"
          : id === "video-description"
            ? "videoDescription"
            : id === "thumbnail-style"
              ? "thumbnailStyle"
              : id === "brand-colors"
                ? "brandColor"
                : id;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error when user types
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: false,
      }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please upload a valid image file",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }));
        return;
      }

      const url = URL.createObjectURL(file);
      setUploadedImage({ file, url });

      // Clear image error if exists
      if (errors.image) {
        setErrors((prev) => ({
          ...prev,
          image: false,
        }));
      }
    }
  };

  const handleSelectAsset = (asset) => {
    setUploadedImage({
      file: asset,
      url: asset,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!uploadedImage) {
      newErrors.image = "Please upload an image";
    }
    if (!formData.headlineText.trim()) {
      newErrors.headlineText = "Thumbnail Headline is required";
    }

    if (!formData.thumbnailStyle) {
      newErrors.thumbnailStyle = "Please select a thumbnail style";
    }
    if (!formData.brandColor) {
      newErrors.brandColor = "Brand color is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerateThumbnails = async () => {
    if (!validateForm()) {
      setApiError("Please fill in all required fields");
      return;
    }

    setApiError(null);
    setIsGenerating(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("headlineText", formData.headlineText);
      formDataToSend.append("subheadingText", formData.subheadingText);
      formDataToSend.append("videoDescription", formData.videoDescription);
      formDataToSend.append("style", formData.thumbnailStyle);
      formDataToSend.append("colorScheme", formData.brandColor);

      // Append the image file
      if (uploadedImage && uploadedImage.file) {
        formDataToSend.append("image", uploadedImage.file);
      }

      // Call the API
      const response = await apiClient.ai.thumbnailGenerator(formDataToSend);
      console.log("API Response:", response);

      setGeneratedThumbnails(response.thumbnail);
    } catch (error) {
      console.error("Error generating thumbnails:", error);
      setApiError(error.message || "Failed to generate thumbnails");
    } finally {
      setIsGenerating(false);
    }
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
          <CardContent className="flex gap-2">
            <BrandAssetDisplay onSelectAsset={handleSelectAsset} />
            <div
              onClick={() => imageInputRef.current?.click()}
              className={`w-full border-2 border-dashed cursor-pointer hover:bg-white/10 ${errors.image ? "border-red-500" : "border-gray-300"
                } rounded-lg p-6 text-center`}
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
                  <Image
                    width={200}
                    height={200}
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
              {errors.image && (
                <p className="text-red-500 text-sm mt-2">{errors.image}</p>
              )}
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
            <div>
              <Label htmlFor="video-title">
                Thumbnail Headline <span className="text-xl">*</span>
              </Label>
              <Input
                id="video-title"
                placeholder="e.g., AI Marketing Tools Tutorial"
                value={formData.headlineText}
                onChange={handleInputChange}
                className={errors.headlineText ? "border-red-500" : ""}
              />
              {errors.headlineText && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.headlineText}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="video-subheading">Thumbnail Subheading</Label>
              <Input
                id="video-subheading"
                placeholder="e.g., Boost Your Marketing Strategy"
                value={formData.subheadingText}
                onChange={handleInputChange}
                className={errors.subheadingText ? "border-red-500" : ""}
              />
              {errors.subheadingText && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subheadingText}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="thumbnail-style">
                Thumbnail Style <span className="text-xl">*</span>
              </Label>
              <select
                id="thumbnail-style"
                className={`w-full mt-1 p-2 border ${errors.thumbnailStyle ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                value={formData.thumbnailStyle}
                onChange={handleInputChange}
              >
                {thumbnailStyles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name} - {style.description}
                  </option>
                ))}
              </select>
              {errors.thumbnailStyle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.thumbnailStyle}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="brand-colors">
                Brand Colors <span className="text-xl">*</span>
              </Label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="color"
                  id="brand-colors"
                  value={formData.brandColor}
                  onChange={handleInputChange}
                  className={`w-10 h-10 rounded border ${errors.brandColor ? "border-red-500" : ""
                    }`}
                />
                <Input
                  value={formData.brandColor}
                  onChange={handleInputChange}
                  className={errors.brandColor ? "border-red-500" : ""}
                />
              </div>
              {errors.brandColor && (
                <p className="text-red-500 text-sm mt-1">{errors.brandColor}</p>
              )}
            </div>
            <div>
              <Label htmlFor="video-description">Custom instructions</Label>
              <textarea
                id="video-description"
                className={`w-full p-3 border ${errors.videoDescription ? "border-red-500" : "border-gray-300"
                  } rounded-md h-20 resize-none`}
                placeholder="Brief instructions of your video content..."
                value={formData.videoDescription}
                onChange={handleInputChange}
              />
              {errors.videoDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.videoDescription}
                </p>
              )}
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
        {generatedThumbnails ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Generated Thumbnail
                </div>
                <div className="flex space-x-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = generatedThumbnails;
                        link.download = `thubmnail-${Date.now()}.jpg`;
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
                        link.href = generatedThumbnails;
                        link.download = `thubmnail-${Date.now()}.png`;
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
              <div className="bg-gray-100 rounded-lg text-center w-fit max-w-sm m-auto">
                <Image
                  width={400}
                  height={300}
                  src={generatedThumbnails}
                  alt="Generated Thumbnail"
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
                  Ready to Create Your Thumbnail?
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Upload your product or model images, then click &quot;Generate
                  Thumbnail&quot; to create your custom design with AI
                </p>
                <div className="mt-6 text-xs text-white/90">
                  Supported formats: JPG, PNG, WEBP
                </div>
              </div>
            </CardContent>
            {apiError && (
              <ApiError>{apiError}</ApiError>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default ThumbnailDesign;
