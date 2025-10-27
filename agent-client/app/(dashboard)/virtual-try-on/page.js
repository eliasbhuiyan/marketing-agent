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
  Sparkles,
  Download,
  RotateCcw,
  Shirt,
  ShoppingBag,
  Watch,
  Plus,
  X,
} from "lucide-react";
import apiClient from "@/lib/api";
import ApiError from "@/components/ui/ApiError";

export default function SelfModelingPage() {
  const [personImage, setPersonImage] = useState(null);
  const [assets, setAssets] = useState([]);
  const [customPrompt, setCustomPrompt] = useState("");
  const personInputRef = useRef(null);
  const assetInputRef = useRef(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [errors, setErrors] = useState({
    personImage: false,
    assets: false,
  });
  const [apiError, setApiError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const validateInputs = () => {
    const newErrors = {};
    if (!personImage) newErrors.personImage = true;
    if (assets.length === 0) newErrors.assets = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePersonUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPersonImage({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      type: "person",
    });
    if (errors.personImage) {
      setErrors(prev => ({...prev, personImage: false}));
    }
  };

  const handleAssetUpload = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    // Check if adding new files would exceed the limit of 5
    if (assets.length + files.length > 5) {
      alert("You can only upload a maximum of 5 assets");
      return;
    }
    
    const newAssets = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      type: "asset",
    }));
    
    setAssets([...assets, ...newAssets]);
    
    if (errors.assets) {
      setErrors(prev => ({...prev, assets: false}));
    }
  };

  const handleRemoveAsset = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  const handleGenerateModel = async () => {
    if (!validateInputs()) return;
    
    setIsGenerating(true);
    setApiError(""); // Clear any previous errors
    try {
      const formData = new FormData();
      formData.append("model", personImage.file);
      assets.forEach((asset) => formData.append("assets", asset.file));
      formData.append("customPrompt", customPrompt);
      
      const response = await apiClient.ai.virtualTryOn(formData);
      console.log("response", response);
      
      setGeneratedImage(response.image);
    } catch (error) {
      console.error("Error in virtual try-on:", error);
      setApiError(error.message || "Failed to generate model. Please try again.");
    }
    finally{
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "selfmodel_" + new Date().getTime() + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-6xl m-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Vertual Try-On</h1>
        <p className="text-white/80 mt-2 m-auto max-w-3xl">
          Virtual Try-On lets brands and retailers showcase their products on realistic models using AI. Upload a photo and your product images to instantly generate.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Person Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Person Image (Required)
            </CardTitle>
            <CardDescription>
              Upload a clear full-body photo of yourself
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              onClick={() => personInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:bg-white/10 cursor-pointer rounded-lg p-6 text-center"
            >
              <input
                ref={personInputRef}
                type="file"
                accept="image/jpeg, image/png, image/webp, image/jpg"
                onChange={handlePersonUpload}
                className="hidden"
              />
              {personImage ? (
                <div className="space-y-2 flex flex-col items-center">
                  <img
                    src={personImage.url}
                    alt="Person"
                    className="max-w-28 object-cover rounded-lg"
                  />
                  <Button variant="glass" className="cursor-pointer">
                    Replace Image
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-white mb-4">
                    Upload a clear photo of yourself
                  </p>
                  <Button variant="outline" className="cursor-pointer">
                    Choose File
                  </Button>
                </>
              )}
            </div>
            {errors.personImage && (
              <p className="text-red-500 text-sm mt-1">
                Person image is required
              </p>
            )}
          </CardContent>
        </Card>

        {/* Asset Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Assets (Max 5)
            </CardTitle>
            <CardDescription>
              Upload clothing, shoes, accessories you want to try on
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div
              onClick={() => assetInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:bg-white/10 cursor-pointer rounded-lg p-6 text-center"
            >
              <input
                ref={assetInputRef}
                type="file"
                accept="image/jpeg, image/png, image/webp, image/jpg"
                onChange={handleAssetUpload}
                className="hidden"
                multiple
              />
              <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-white mb-4">
                Add asset image (clothing, shoes, accessories, etc.)
              </p>
              <Button variant="outline" className="cursor-pointer">
                Choose File
              </Button>
            </div>
            {assets.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Uploaded Assets:</h3>
                <div className="flex gap-2">
                  {assets.map((asset) => (
                    <div key={asset.id} className="relative group max-w-20">
                      <img
                        src={asset.url}
                        alt={asset.type}
                        className="w-full object-cover rounded-md"
                      />
                      <div className="absolute top-1 right-1">
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveAsset(asset.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {errors.assets && (
              <p className="text-red-500 text-sm mt-1">
                At least one asset is required
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Additional Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Customize Self Model
            </CardTitle>
            <CardDescription>
              Fine-tune your self-modeling with custom instructions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customPrompt">
                Custom Instructions (Optional)
              </Label>
              <textarea
                className={`w-full mt-1 p-3 border border-gray-300 rounded-md h-24 resize-none text-white`}
                id="customPrompt"
                placeholder="E.g., Maintain natural pose, realistic lighting, etc."
                value={customPrompt}
                onChange={(e) => {
                  setCustomPrompt(e.target.value);
                }}
              />
            </div>
            {apiError && (
             <ApiError>{apiError}</ApiError>
            )}
            <Button
              onClick={handleGenerateModel}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? "Generating..." : "Generate Self Model"}
            </Button>
          </CardContent>
        </Card>
        {/* Generated Output */}
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Generated Self Model</CardTitle>
                <CardDescription>
                  Your AI-generated self model is ready
                </CardDescription>
              </div>
              {generatedImage && (
                <Button
                  onClick={handleDownload}
                  className="flex items-center"
                  variant="glass"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              {generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated Self Model"
                  className="max-w-full h-auto rounded-lg"
                />
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="rounded-full bg-white/10 p-4 mb-4">
                      <ImageIcon className="h-8 w-8 text-gray-300" />
                    </div>
                    <CardTitle className="text-lg text-white mb-2">No Model Generated Yet</CardTitle>
                    <CardDescription className="max-w-xs text-white/70">
                      Upload a person image and optionally add assets, then click “Generate Self Model” to see the result here.
                    </CardDescription>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
