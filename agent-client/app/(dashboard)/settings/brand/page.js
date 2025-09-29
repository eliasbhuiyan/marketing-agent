"use client";

import { useEffect, useState } from "react";
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
  const [brandFonts, setBrandFonts] = useState({
    headingFont: "Inter",
    bodyFont: "Inter",
  });

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
      setBrandFonts({
        headingFont: brandData.fonts?.headingFont || "Inter",
        bodyFont: brandData.fonts?.bodyFont || "Inter",
      });
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
      const data = await apiClient.brand.save({
        brandId: brandId || undefined,
        companyName: brandCompanyName,
        details: brandDetails,
        colors: brandColors,
        fonts: brandFonts,
      });

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
          <CardTitle>Brand Fonts</CardTitle>
          <CardDescription>
            Choose fonts that represent your brand
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="heading-font">Heading Font</Label>
              <select
                id="heading-font"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={brandFonts.headingFont}
                onChange={(e) =>
                  setBrandFonts({
                    ...brandFonts,
                    headingFont: e.target.value,
                  })
                }
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
            <div>
              <Label htmlFor="body-font">Body Font</Label>
              <select
                id="body-font"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={brandFonts.bodyFont}
                onChange={(e) =>
                  setBrandFonts({
                    ...brandFonts,
                    bodyFont: e.target.value,
                  })
                }
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Assets</CardTitle>
          <CardDescription>
            Upload your logo and other brand assets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-white/80 mb-4">
              Upload your logo and brand assets
            </p>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
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