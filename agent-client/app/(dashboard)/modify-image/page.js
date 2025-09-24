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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Image as ImageIcon,
  Download,
  Maximize,
  Stamp,
} from "lucide-react";

export default function ModifyImagePage() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [modifiedImage, setModifiedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("resize");
  const [isProcessing, setIsProcessing] = useState(false);
  const imageInputRef = useRef(null);
  
  // Resize settings
  const [resizeWidth, setResizeWidth] = useState(0);
  const [resizeHeight, setResizeHeight] = useState(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [scaleOption, setScaleOption] = useState("resize"); // resize, upscale
  
  // Watermark settings
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkImage, setWatermarkImage] = useState(null);
  const [watermarkOpacity, setWatermarkOpacity] = useState(50);
  const [watermarkPosition, setWatermarkPosition] = useState({ x: 50, y: 50 });
  
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage({
          file,
          url: e.target.result,
          width: img.width,
          height: img.height,
        });
        setResizeWidth(img.width);
        setResizeHeight(img.height);
        setModifiedImage(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleWatermarkImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setWatermarkImage({
        file,
        url: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const applyResize = () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    
    const canvas = document.createElement('canvas');
    canvas.width = resizeWidth;
    canvas.height = resizeHeight;
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, resizeWidth, resizeHeight);
      setModifiedImage(canvas.toDataURL('image/jpeg'));
      setIsProcessing(false);
    };
    img.src = uploadedImage.url;
  };

  const applyWatermark = () => {
    if (!modifiedImage) return;
    
    setIsProcessing(true);
    
    const canvas = document.createElement('canvas');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // Draw the main image
      ctx.drawImage(img, 0, 0);
      
      // Apply watermark
      ctx.globalAlpha = watermarkOpacity / 100;
      
      if (watermarkImage) {
        const wmImg = new Image();
        wmImg.onload = () => {
          const wmX = (watermarkPosition.x / 100) * canvas.width - (wmImg.width / 2);
          const wmY = (watermarkPosition.y / 100) * canvas.height - (wmImg.height / 2);
          ctx.drawImage(wmImg, wmX, wmY);
          setModifiedImage(canvas.toDataURL('image/jpeg'));
          setIsProcessing(false);
        };
        wmImg.src = watermarkImage.url;
      } else if (watermarkText) {
        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';
        const wmX = (watermarkPosition.x / 100) * canvas.width;
        const wmY = (watermarkPosition.y / 100) * canvas.height;
        ctx.fillText(watermarkText, wmX, wmY);
        setModifiedImage(canvas.toDataURL('image/jpeg'));
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
      }
    };
    img.src = modifiedImage;
  };

  const handleDownload = () => {
    if (!modifiedImage) return;
    
    const link = document.createElement('a');
    link.href = modifiedImage;
    link.download = 'modified_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResizeWidthChange = (value) => {
    setResizeWidth(value);
    if (maintainAspectRatio && uploadedImage) {
      const ratio = uploadedImage.height / uploadedImage.width;
      setResizeHeight(Math.round(value * ratio));
    }
  };

  const handleResizeHeightChange = (value) => {
    setResizeHeight(value);
    if (maintainAspectRatio && uploadedImage) {
      const ratio = uploadedImage.width / uploadedImage.height;
      setResizeWidth(Math.round(value * ratio));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Image Modification Tool</h1>
        <p className="text-white/80 mt-2">
          Resize, upscale, and add watermarks to your images
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload Image
            </CardTitle>
            <CardDescription>
              Upload an image to start editing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              onClick={() => imageInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:bg-white/10 cursor-pointer rounded-lg p-6 text-center"
            >
              <input
                ref={imageInputRef}
                type="file"
                accept="image/jpeg, image/png, image/webp, image/gif"
                onChange={handleImageUpload}
                className="hidden"
              />
              {!uploadedImage ? (
                <>
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-white mb-4">
                    Click to upload an image
                  </p>
                  <Button variant="outline" className="cursor-pointer">
                    Choose File
                  </Button>
                </>
              ) : (
                <div className="space-y-2 flex flex-col items-center">
                  <img
                    src={uploadedImage.url}
                    alt="Uploaded"
                    className="max-h-48 object-contain rounded-lg"
                  />
                  <div className="text-sm text-white">
                    {uploadedImage.width} × {uploadedImage.height}px
                  </div>
                  <Button variant="glass" className="cursor-pointer">
                    Replace Image
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modified Image Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Preview
            </CardTitle>
            <CardDescription>
              Preview of your modified image
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-gray-300 rounded-lg p-2 flex items-center justify-center min-h-[200px]">
              {modifiedImage ? (
                <img
                  src={modifiedImage}
                  alt="Modified"
                  className="object-contain rounded-lg"
                />
              ) : (
                <p className="text-sm text-gray-400">
                  Modified image will appear here
                </p>
              )}
            </div>
            {modifiedImage && (
              <Button
                onClick={handleDownload}
                className="w-full flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Modified Image
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Editing Tools */}
      {uploadedImage && (
        <Card>
          <CardHeader>
            <CardTitle>Editing Tools</CardTitle>
            <CardDescription>
              Choose a tool to modify your image
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div defaultValue="resize" onValueChange={setActiveTab}>
              <div className="grid grid-cols-2 mb-4">
                <div value="resize" className="flex items-center">
                  <Maximize className="h-4 w-4 mr-2" />
                  <span>Resize & Upscale</span>
                </div>
                <div value="watermark" className="flex items-center">
                  <Stamp className="h-4 w-4 mr-2" />
                  <span>Watermark</span>
                </div>
              </div>

              {/* Resize Tab */}
              <div value="resize" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="scaleOption">Scaling Option</Label>
                    <Select value={scaleOption} onValueChange={setScaleOption}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select scaling option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="resize">Resize</SelectItem>
                        <SelectItem value="upscale">Upscale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="resizeWidth">Width (px)</Label>
                    <Input
                      id="resizeWidth"
                      type="number"
                      value={resizeWidth}
                      onChange={(e) => handleResizeWidthChange(parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="resizeHeight">Height (px)</Label>
                    <Input
                      id="resizeHeight"
                      type="number"
                      value={resizeHeight}
                      onChange={(e) => handleResizeHeightChange(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="maintainAspectRatio"
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  />
                  <Label htmlFor="maintainAspectRatio">Maintain aspect ratio</Label>
                </div>
                <Button onClick={applyResize} disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Apply Resize"}
                </Button>
              </div>

              {/* Watermark Tab */}
              <div value="watermark" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="watermarkText">Watermark Text</Label>
                    <Input
                      id="watermarkText"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      placeholder="Enter watermark text"
                    />
                  </div>
                  <div>
                    <Label htmlFor="watermarkOpacity">Opacity</Label>
                    <div className="flex items-center space-x-2">
                      <input
                      type="range"
                        id="watermarkOpacity"
                        min={0}
                        max={100}
                        step={1}
                        value={[watermarkOpacity]}
                        onValueChange={(value) => setWatermarkOpacity(value[0])}
                      />
                      <span>{watermarkOpacity}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Watermark Image (Optional)</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('watermarkImageInput').click()}
                    >
                      Upload Logo
                    </Button>
                    <input
                      id="watermarkImageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleWatermarkImageUpload}
                      className="hidden"
                    />
                    {watermarkImage && (
                      <div className="flex items-center space-x-2">
                        <img
                          src={watermarkImage.url}
                          alt="Watermark"
                          className="h-8 w-8 object-contain"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setWatermarkImage(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label>Position</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="watermarkX">X Position (%)</Label>
                      <Input
                        id="watermarkX"
                        type="number"
                        min={0}
                        max={100}
                        value={watermarkPosition.x}
                        onChange={(e) => setWatermarkPosition({
                          ...watermarkPosition,
                          x: parseInt(e.target.value)
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="watermarkY">Y Position (%)</Label>
                      <Input
                        id="watermarkY"
                        type="number"
                        min={0}
                        max={100}
                        value={watermarkPosition.y}
                        onChange={(e) => setWatermarkPosition({
                          ...watermarkPosition,
                          y: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                </div>
                <Button onClick={applyWatermark} disabled={isProcessing || (!watermarkText && !watermarkImage)}>
                  {isProcessing ? "Processing..." : "Apply Watermark"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
