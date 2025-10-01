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
import { Sparkles, Copy, ShoppingBag, Star, Tag } from "lucide-react";
import apiClient from "@/lib/api";
import dynamic from "next/dynamic";
import LoaderAnim from "@/components/LoaderAnim";

export default function ProductDescriptionGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  // const [editorContent, setEditorContent] = useState("");
  const [apiError, setApiError] = useState(null);
  const [productOptions, setProductOptions] = useState({
    productName: "",
    keyFeatures: "",
    descriptionLength: "100-200 words",
    includeKeywords: "",
    outputLanguage: "English",
  });
  const [errors, setErrors] = useState({});

  // Validate required fields
  const validateInputs = () => {
    const newErrors = {};
    if (!productOptions.productName.trim()) newErrors.productName = true;
    if (!productOptions.keyFeatures.trim()) newErrors.keyFeatures = true;
    if (!productOptions.includeKeywords.trim())
      newErrors.includeKeywords = true;
    if (!productOptions.outputLanguage.trim()) newErrors.outputLanguage = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductOptions((prev) => ({
      ...prev,
      [id === "product-name"
        ? "productName"
        : id === "key-features"
        ? "keyFeatures"
        : id === "description-length"
        ? "descriptionLength"
        : id === "include-keywords"
        ? "includeKeywords"
        : id === "output-language"
        ? "outputLanguage"
        : id]: value,
    }));
    if (
      errors[
        id === "product-name"
          ? "productName"
          : id === "key-features"
          ? "keyFeatures"
          : id === "include-keywords"
          ? "includeKeywords"
          : id === "output-language"
          ? "outputLanguage"
          : id
      ]
    ) {
      setErrors((prev) => ({
        ...prev,
        [id === "product-name"
          ? "productName"
          : id === "key-features"
          ? "keyFeatures"
          : id === "include-keywords"
          ? "includeKeywords"
          : id === "output-language"
          ? "outputLanguage"
          : id]: false,
      }));
    }
  };

  const handleGenerateContent = async () => {
    if (!validateInputs()) {
      setApiError("Please fill in all required fields");
      return;
    }
    setApiError(null);
    setIsGenerating(true);
    console.log(productOptions);
    try {
      // Call the product description generator API
      const response = await apiClient.ai.productDescription({
        productName: productOptions.productName,
        keyFeatures: productOptions.keyFeatures,
        descriptionLength: productOptions.descriptionLength,
        includeKeywords: productOptions.includeKeywords,
        outputLanguage: productOptions.outputLanguage,
      });
      console.log(response.description);

      setGeneratedContent(
        response.description || "No content generated. Please try again."
      );
      setProductOptions({
        productName: "",
        keyFeatures: "",
        descriptionLength: "100-200 words",
        includeKeywords: "",
        outputLanguage: "English",
      });
    } catch (error) {
      console.error("Error generating product description:", error);
      setApiError(
        error.message || "Failed to generate content. Please try again."
      );
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
            <CardTitle>Product Description Generator</CardTitle>
            <CardDescription>
              Create compelling product descriptions for your e-commerce store
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="product-name">Product Name *</Label>
              <Input
                id="product-name"
                placeholder="e.g., Wireless Noise-Cancelling Headphones"
                value={productOptions.productName}
                onChange={handleInputChange}
                className={errors.productName ? "border-red-500" : ""}
              />
              {errors.productName && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="key-features">
                Key Features (comma separated) *
              </Label>
              <Input
                id="key-features"
                placeholder="e.g., Bluetooth 5.0, 30-hour battery life, water-resistant"
                value={productOptions.keyFeatures}
                onChange={handleInputChange}
                className={errors.keyFeatures ? "border-red-500" : ""}
              />
              {errors.keyFeatures && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description-length">Description Length</Label>
              <select
                id="description-length"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={productOptions.descriptionLength}
                onChange={handleInputChange}
              >
                <option value="50-100 words">Short (50-100 words)</option>
                <option value="100-200 words">Medium (100-200 words)</option>
                <option value="200+ words">Long (200+ words)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="include-keywords">
                SEO Keywords (comma separated) *
              </Label>
              <Input
                id="include-keywords"
                placeholder="e.g., wireless headphones, noise-cancelling, premium audio"
                value={productOptions.includeKeywords}
                onChange={handleInputChange}
                className={errors.includeKeywords ? "border-red-500" : ""}
              />
              {errors.includeKeywords && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="output-language">Output Language *</Label>
              <Input
                id="output-language"
                placeholder="e.g., English, Spanish, French"
                value={productOptions.outputLanguage}
                onChange={handleInputChange}
                className={errors.outputLanguage ? "border-red-500" : ""}
              />
              {errors.outputLanguage && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs">✅</p>
                <Label htmlFor="include-benefits">Include Benefits</Label>
              </div>
              <p className="text-sm text-white/80">
                Highlight how the product benefits the customer
              </p>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs">✅</p>
                <Label htmlFor="include-cta">Include Call-to-Action</Label>
              </div>
              <p className="text-sm text-white/80">
                Add a compelling call-to-action at the end
              </p>
            </div>
            {apiError && (
              <div className="text-red-500 text-sm mt-2">{apiError}</div>
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
                  Generate Description
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Generated Content with Rich Text Editor */}
      <div className="space-y-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Product Description</CardTitle>
            <CardDescription>
              Edit your AI-generated product description
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-white/10 rounded-md min-h-[400px] p-4 pt-0 whitespace-pre-wrap">
                  {generatedContent}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleCopyContent}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Description
                  </Button>
                  <Button variant="outline">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Save to Products
                  </Button>
                </div>
              </div>
            ) : isGenerating ? (
              <LoaderAnim />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] rounded-md p-6 text-center">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <p className="text-white mb-2">
                  Fill in the form and click Generate to create a product
                  description
                </p>
                <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">
                      Compelling product features
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">Persuasive benefits</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-white" />
                    <p className="text-sm text-white">SEO-optimized content</p>
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
