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

export default function SelfModelingPage() {
  const [personImage, setPersonImage] = useState(null);
  const [assets, setAssets] = useState([]);
  const [customPrompt, setCustomPrompt] = useState("");
  const personInputRef = useRef(null);
  const assetInputRef = useRef(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  // No asset type categorization as per user request

  const handlePersonUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPersonImage({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      type: "person",
    });
  };

  const handleAssetUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const newAsset = {
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      type: "asset",
    };
    setAssets([...assets, newAsset]);
  };

  const handleRemoveAsset = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
  };

  const handleGenerateModel = async () => {
    if (!personImage) return;
    console.log("personImage", personImage);
    console.log("assets", assets);
    setIsGenerating(true);

    // Simulating generation for UI demo
    setTimeout(() => {
      setIsGenerating(false);
      // For demo purposes only - would be replaced with actual API call
      if (personImage && assets.length > 0) {
        setGeneratedImage(personImage.url);
      }
    }, 2000);
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
        <h1 className="text-3xl font-bold text-white">Self Modeling Creator</h1>
        <p className="text-white/80 mt-2">
          Create virtual try-on images with your photo and selected items
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
          </CardContent>
        </Card>

        {/* Asset Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Assets (Optional)
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
            {/* Display uploaded assets */}
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
          </CardContent>
        </Card>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Additional Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Additional Options
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
                className="w-full mt-1 p-3 border border-gray-300 rounded-md h-24 resize-none text-white"
                id="customPrompt"
                placeholder="E.g., Maintain natural pose, realistic lighting, etc."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />
            </div>
            <Button
              onClick={handleGenerateModel}
              disabled={!personImage || isGenerating}
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
                <p>Generate</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
