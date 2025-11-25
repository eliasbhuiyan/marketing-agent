"use client";

import { useEffect, useRef, useState } from "react";
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
import { Palette, Upload, Save } from "lucide-react";
import apiClient from "@/lib/api";
import { getBrandId, formatErrorMessage } from "@/lib/utils";
import { useBrandData } from "@/lib/hooks/useBrandData";

export default function BrandPage() {
  const [apiBusy, setApiBusy] = useState(false);
  const [error, setError] = useState("");

  // Use cached brand data hook
  const {
    brandData,
    loading: brandLoading,
    error: brandError,
    fetchBrandData,
    updateBrandData,
  } = useBrandData();

  // Brand state - initialize from cached data
  const [brandId, setBrandId] = useState(null);
  const [brandCompanyName, setBrandCompanyName] = useState("");
  const [brandDetails, setBrandDetails] = useState("");
  const [brandColors, setBrandColors] = useState({
    primary: "#3B82F6",
    secondary: "#1E40AF",
    accent: "#F59E0B",
  });
  const [outputLanguage, setOutputLanguage] = useState("English");
  const [assets, setAssets] = useState([]);
  const fileInputRef = useRef(null);

  // Initialize brand data from cached data
  useEffect(() => {
    if (brandData) {
      setBrandId(brandData._id);
      setBrandCompanyName(brandData.companyName || "");
      setBrandDetails(brandData.details || "");
      setBrandColors({
        primary: brandData.colors?.primary || "#3B82F6",
        secondary: brandData.colors?.secondary || "#1E40AF",
        accent: brandData.colors?.accent || "#F59E0B",
      });
      setOutputLanguage(brandData.outputLanguage || "English");
      setAssets(
        Array.isArray(brandData.assets)
          ? brandData.assets.map((src) => ({
              id: Date.now() + Math.random(),
              file: null,
              url: src,
              type: "asset",
            }))
          : []
      );
    } else {
      // Initialize brandId from localStorage for UI state
      const storedBrandId = getBrandId();
      if (storedBrandId) setBrandId(storedBrandId);
    }
  }, [brandData]);

  // Handle brand error
  useEffect(() => {
    if (brandError) {
      setError(formatErrorMessage(brandError));
    }
  }, [brandError]);

  const saveBrand = async () => {
    try {
      setApiBusy(true);
      setError("");
      const formData = new FormData();
      if (brandId) formData.append("brandId", brandId);
      formData.append("companyName", brandCompanyName);
      formData.append("details", brandDetails);
      formData.append("outputLanguage", outputLanguage);
      formData.append("colors", JSON.stringify(brandColors));
      const existingAssets = assets.filter((a) => !a.file).map((a) => a.url);
      if (existingAssets.length) {
        formData.append("existingAssets", JSON.stringify(existingAssets));
      }
      assets.forEach((a) => {
        if (a.file) {
          formData.append("assets", a.file, a.file.name || "asset.jpg");
        }
      });

      const data = await apiClient.brand.save(formData);

      if (data.brand?._id) {
        setBrandId(data.brand._id);
        // Update cache with new brand data
        updateBrandData(data.brand);
      }
    } catch (e) {
      setError(formatErrorMessage(e));
    } finally {
      setApiBusy(false);
    }
  };


  const handleAssetsSelect = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (assets.length + files.length > 5) {
      alert("You can only upload a maximum of 5 assets");
      return;
    }
    const newAssets = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      type: "asset",
    }));
    setAssets((prev) => [...prev, ...newAssets]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAssetAt = (id) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="pt-4">
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={brandCompanyName}
              onChange={(e) => setBrandCompanyName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="company">Company Details</Label>
            <textarea
              id="company"
              value={brandDetails}
              onChange={(e) => setBrandDetails(e.target.value)}
              className='"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            />
          </div>
          <div>
            <Label htmlFor="output-language">Default Output Language</Label>
            <select
              id="output-language"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              value={outputLanguage}
              onChange={(e) => setOutputLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Brand Colors
          </CardTitle>
          <CardDescription>
            Define your brand&apos;s color palette
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="color"
                  id="primary-color"
                  value={brandColors.primary}
                  onChange={(e) =>
                    setBrandColors({
                      ...brandColors,
                      primary: e.target.value,
                    })
                  }
                  className="w-12 h-12 rounded border"
                />
                <Input
                  value={brandColors.primary}
                  onChange={(e) =>
                    setBrandColors({
                      ...brandColors,
                      primary: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="color"
                  id="secondary-color"
                  value={brandColors.secondary}
                  onChange={(e) =>
                    setBrandColors({
                      ...brandColors,
                      secondary: e.target.value,
                    })
                  }
                  className="w-12 h-12 rounded border"
                />
                <Input
                  value={brandColors.secondary}
                  onChange={(e) =>
                    setBrandColors({
                      ...brandColors,
                      secondary: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="color"
                  id="accent-color"
                  value={brandColors.accent}
                  onChange={(e) =>
                    setBrandColors({
                      ...brandColors,
                      accent: e.target.value,
                    })
                  }
                  className="w-12 h-12 rounded border"
                />
                <Input
                  value={brandColors.accent}
                  onChange={(e) =>
                    setBrandColors({
                      ...brandColors,
                      accent: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      

      <Card>
        <CardHeader>
          <CardTitle>Brand Assets</CardTitle>
          <CardDescription>
            Upload your brand assets images
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-white/80 mb-4">
                Upload multiple brand asset images
              </p>
              <div className="flex items-center justify-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg, image/png, image/webp, image/jpg"
                  onChange={handleAssetsSelect}
                  className="hidden"
                />
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Images
                </Button>
              </div>
            </div>
            <div>
              <Label>Assets Preview</Label>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                {assets.map((asset) => (
                  <div key={asset.id} className="relative group border rounded overflow-hidden">
                    <img src={asset.url} alt={"asset"} className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() => removeAssetAt(asset.id)}
                      className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-80"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      <div className="pt-2">
        <Button
          onClick={saveBrand}
          disabled={apiBusy || brandLoading}
          className="w-full"
        >
          <Save className="h-4 w-4 mr-2" />
          {apiBusy
            ? "Saving..."
            : brandLoading
              ? "Loading..."
              : brandId
                ? "Update Brand"
                : "Create Brand"}
        </Button>
      </div>
    </div>
  );
}