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
  Download,
  Eye,
  ImageIcon,
  Settings,
  Sparkles,
  Upload,
} from "lucide-react";
import React, { useRef, useState } from "react";
import apiClient from "@/lib/api";

const PosterStudio = () => {
  const logoInputRef = useRef(null);
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [generatedPoster, setGeneratedPoster] = useState("");
  const [posterDescription, setPosterDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    infoBlocks: "",
    dateInfo: "",
    ctaText: "",
    contactInfo: "",
    theme: "modern",
    colorSchemes: ["#3B82F6"],
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const posterThemes = [
    { id: "modern", name: "Modern", description: "Clean and contemporary" },
    { id: "minimal", name: "Minimal", description: "Simple and elegant" },
    {
      id: "corporate",
      name: "Corporate",
      description: "Professional and business-focused",
    },
    {
      id: "festival",
      name: "Festival",
      description: "Vibrant and celebratory",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Artistic and expressive",
    },
    { id: "tech", name: "Tech", description: "Digital and innovative" },
    {
      id: "educational",
      name: "Educational",
      description: "Informative and structured",
    },
    {
      id: "elegant",
      name: "Elegant",
      description: "Sophisticated and refined",
    },
    { id: "luxury", name: "Luxury", description: "Premium and high-end" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;    
    const fieldName =
      id === "poster-title"
        ? "title"
        : id === "poster-subtitle"
        ? "subtitle"
        : id === "poster-info"
        ? "infoBlocks"
        : id === "poster-date"
        ? "dateInfo"
        : id === "poster-cta"
        ? "ctaText"
        : id === "poster-contact"
        ? "contactInfo"
        : id === "poster-theme"
        ? "theme"
        : id === "poster-color"
        ? "colorScheme"
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

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          logo: "Please upload a valid image file",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          logo: "Image size should be less than 5MB",
        }));
        return;
      }

      const url = URL.createObjectURL(file);
      setUploadedLogo({ file, url });

      // Clear logo error if exists
      if (errors.logo) {
        setErrors((prev) => ({
          ...prev,
          logo: false,
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.theme) {
      newErrors.theme = "Please select a theme";
    }
    if (!formData.colorSchemes || formData.colorSchemes.length === 0) {
      newErrors.colorSchemes = "At least one color is required in the color scheme";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGeneratePoster = async () => {
    if (!validateForm()) {
      setApiError("Please fill in all required fields");
      return;
    }

    if (!uploadedLogo) {
      setErrors((prev) => ({
        ...prev,
        logo: "Brand logo is required",
      }));
      setApiError("Please upload a brand logo");
      return;
    }

    setApiError(null);
    setIsGenerating(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("infoBlocks", formData.infoBlocks);
      formDataToSend.append("dateInfo", formData.dateInfo);
      formDataToSend.append("ctaText", formData.ctaText);
      formDataToSend.append("contactInfo", formData.contactInfo);
      formDataToSend.append("theme", formData.theme);
      
      // Append each color individually
      formData.colorSchemes.forEach((color, index) => {
        formDataToSend.append(`colors[${index}]`, color);
      });
      
      // Append the logo file
      formDataToSend.append("brandLogo", uploadedLogo.file);
            
      const response = await apiClient.ai.intelligentPosterDesign(formDataToSend);
      console.log(response);
      
      setGeneratedPoster(response.image);
      setPosterDescription(response.description);
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating poster:", error);
      setApiError(error.message || "Failed to generate poster");
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
              <Settings className="h-5 w-5 mr-2" />
              Poster Content
            </CardTitle>
            <CardDescription>Enter the content for your poster</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
                {apiError}
              </div>
            )}
            <Label htmlFor="poster-title">Brand Logo</Label>
            <div
              onClick={() => logoInputRef.current?.click()}
              className={`border-2 border-dashed cursor-pointer hover:bg-white/10 ${
                errors.logo ? "border-red-500" : "border-gray-300"
              } rounded-lg py-1 text-center mt-2`}
            >
              <input
                ref={logoInputRef}
                type="file"
                accept="image/jpeg, image/png, image/webp, image/jpg, image/svg+xml"
                onChange={handleLogoUpload}
                className="hidden"
              />
              {uploadedLogo ? (
                <div className="space-y-2 flex flex-col items-center">
                  <img
                    src={uploadedLogo.url}
                    alt="Uploaded Logo"
                    className="max-w-xs max-h-16 object-contain rounded-lg"
                  />
                  <Button size="sm" variant="glass" className="cursor-pointer">
                    Replace Logo
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                  <Button variant="outline" className="cursor-pointer">
                    Click to upload
                  </Button>
                </>
              )}
              {errors.logo && (
                <p className="text-red-500 text-sm mt-2">{errors.logo}</p>
              )}
            </div>
            <div>
              <Label htmlFor="poster-title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="poster-title"
                placeholder="e.g., Annual Tech Conference"
                value={formData.title}
                onChange={handleInputChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="poster-subtitle">Subtitle / Tagline</Label>
              <Input
                id="poster-subtitle"
                placeholder="e.g., Innovating for Tomorrow"
                value={formData.subtitle}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="poster-info">Information / Description</Label>
              <textarea
                id="poster-info"
                className="w-full p-3 border border-gray-300 rounded-md h-20 resize-none"
                placeholder="Enter key information or description..."
                value={formData.infoBlocks}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="poster-date">Date / Schedule</Label>
              <Input
                id="poster-date"
                placeholder="e.g., June 15-17, 2023"
                value={formData.dateInfo}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="poster-cta">Call to Action</Label>
              <Input
                id="poster-cta"
                placeholder="e.g., Register Now"
                value={formData.ctaText}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="poster-contact">Contact / Website</Label>
              <Input
                id="poster-contact"
                placeholder="e.g., www.example.com | info@example.com"
                value={formData.contactInfo}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="poster-theme">
                Theme / Style <span className="text-red-500">*</span>
              </Label>
              <select
                id="poster-theme"
                className={`w-full mt-1 p-2 border ${
                  errors.theme ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                value={formData.theme}
                onChange={handleInputChange}
              >
                {posterThemes.map((theme) => (
                  <option key={theme.id} value={theme.description}>
                    {theme.name} - {theme.description}
                  </option>
                ))}
              </select>
              {errors.theme && (
                <p className="text-red-500 text-sm mt-1">{errors.theme}</p>
              )}
            </div>

            <div>
              <Label htmlFor="color-schemes">
                Color Scheme <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-3 mt-2">
                {formData.colorSchemes.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...formData.colorSchemes];
                        newColors[index] = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          colorSchemes: newColors
                        }));
                      }}
                      className="w-8 h-8 rounded border"
                    />
                    <Input
                      value={color}
                      onChange={(e) => {
                        const newColors = [...formData.colorSchemes];
                        newColors[index] = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          colorSchemes: newColors
                        }));
                      }}
                      className="flex-1"
                    />
                    {formData.colorSchemes.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const newColors = [...formData.colorSchemes];
                          newColors.splice(index, 1);
                          setFormData(prev => ({
                            ...prev,
                            colorSchemes: newColors
                          }));
                        }}
                        className="h-8 w-8"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Add a new color input
                    const newColors = [...formData.colorSchemes, "#000000"];
                    setFormData(prev => ({
                      ...prev,
                      colorSchemes: newColors
                    }));
                  }}
                  className="mt-2"
                >
                  + Add Color
                </Button>
              </div>
            </div>

            <Button
              onClick={handleGeneratePoster}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                  Generating Poster...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Poster
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Generated Poster */}
      <div className="space-y-6">
        {generatedPoster ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Generated Poster
                </div>
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
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg text-center w-fit max-w-sm m-auto">
                <img
                  src={generatedPoster}
                  alt="Generated Poster"
                  className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                />
              </div>
              {posterDescription && (
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Poster Description</h4>
                  <p className="text-gray-300 text-sm">{posterDescription}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-12 text-center flex flex-col items-center justify-center">
              <div className="border-4 border-dashed border-gray-200 rounded-xl p-8 w-full max-w-sm">
                <ImageIcon className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  Ready to Create Your Poster?
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Fill in the poster details and click &quot;Generate
                  Poster&quot; to create your custom design with AI
                </p>
                <div className="mt-6 text-xs text-white/90">
                  Required fields: Title, Theme, and Color Scheme
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PosterStudio;
