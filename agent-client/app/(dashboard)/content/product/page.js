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

// Dynamically import TiptapEditor to avoid SSR issues
const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function ProductDescriptionGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [apiError, setApiError] = useState(null);
  const [productOptions, setProductOptions] = useState({
    productName: "",
    productCategory: "",
    keyFeatures: "",
    targetAudience: "",
    tone: "professional",
    descriptionLength: "medium",
    includeKeywords: "",
    outputLanguage: "English",
  });
  
  // Set up effect to update editor content when generated content changes
  useEffect(() => {
    if (generatedContent) {
      setEditorContent(generatedContent);
    }
  }, [generatedContent]);

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    console.log(productOptions);
  
    try {
      // Call the product description generator API
      const response = await apiClient.ai.productDescriptionGenerator({
        productName: productOptions.productName,
        productCategory: productOptions.productCategory,
        keyFeatures: productOptions.keyFeatures,
        targetAudience: productOptions.targetAudience,
        tone: productOptions.tone,
        descriptionLength: productOptions.descriptionLength,
        includeKeywords: productOptions.includeKeywords,
        outputLanguage: productOptions.outputLanguage,
      });
      
      setGeneratedContent(response.productDescription || "No content generated. Please try again.");
    } catch (error) {
      console.error("Error generating product description:", error);
      setApiError(error.message || "Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(editorContent);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Panel - Input Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Description Generator</CardTitle>
            <CardDescription>Create compelling product descriptions for your e-commerce store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="product-name">Product Name</Label>
              <Input
                id="product-name"
                placeholder="e.g., Wireless Noise-Cancelling Headphones"
                value={productOptions.productName}
                onChange={(e) =>
                  setProductOptions({ ...productOptions, productName: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="product-category">Product Category</Label>
              <Input
                id="product-category"
                placeholder="e.g., Electronics, Clothing, Home Decor"
                value={productOptions.productCategory}
                onChange={(e) =>
                  setProductOptions({ ...productOptions, productCategory: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="key-features">Key Features (comma separated)</Label>
              <Input
                id="key-features"
                placeholder="e.g., Bluetooth 5.0, 30-hour battery life, water-resistant"
                value={productOptions.keyFeatures}
                onChange={(e) =>
                  setProductOptions({ ...productOptions, keyFeatures: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="target-audience">Target Audience</Label>
              <Input
                id="target-audience"
                placeholder="e.g., Music enthusiasts, professionals, students"
                value={productOptions.targetAudience}
                onChange={(e) =>
                  setProductOptions({ ...productOptions, targetAudience: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="tone">Tone</Label>
              <select
                id="tone"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={productOptions.tone}
                onChange={(e) =>
                  setProductOptions({ ...productOptions, tone: e.target.value })
                }
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="enthusiastic">Enthusiastic</option>
                <option value="luxury">Luxury</option>
                <option value="technical">Technical</option>
              </select>
            </div>
            <div>
              <Label htmlFor="description-length">Description Length</Label>
              <select
                id="description-length"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={productOptions.descriptionLength}
                onChange={(e) =>
                  setProductOptions({ ...productOptions, descriptionLength: e.target.value })
                }
              >
                <option value="short">Short (50-100 words)</option>
                <option value="medium">Medium (100-200 words)</option>
                <option value="long">Long (200+ words)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="include-keywords">SEO Keywords (comma separated)</Label>
              <Input
                id="include-keywords"
                placeholder="e.g., wireless headphones, noise-cancelling, premium audio"
                value={productOptions.includeKeywords}
                onChange={(e) =>
                  setProductOptions({ ...productOptions, includeKeywords: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="output-language">Output Language</Label>
              <Input
                id="output-language"
                placeholder="e.g., English, Spanish, French"
                value={productOptions.outputLanguage}
                onChange={(e) =>
                  setProductOptions({ ...productOptions, outputLanguage: e.target.value })
                }
              />
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs">✅</p>
                <Label htmlFor="include-benefits">Include Benefits</Label>
              </div>
              <p className="text-sm text-gray-500">
                Highlight how the product benefits the customer
              </p>
            </div>
            <div>
              <div className="flex gap-1 items-center">
                <p className="text-xs">✅</p>
                <Label htmlFor="include-cta">Include Call-to-Action</Label>
              </div>
              <p className="text-sm text-gray-500">
                Add a compelling call-to-action at the end
              </p>
            </div>
            {apiError && (
              <div className="text-red-500 text-sm mt-2">
                {apiError}
              </div>
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
                <div className="bg-gray-50 rounded-md min-h-[400px]">
                  <TiptapEditor 
                    content={editorContent}
                    onUpdate={({ editor }) => {
                      setEditorContent(editor.getHTML());
                    }}
                  />
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
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-md p-6 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">
                  Fill in the form and click Generate to create a product description
                </p>
                <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-400">Compelling product features</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-400">Persuasive benefits</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-400">SEO-optimized content</p>
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