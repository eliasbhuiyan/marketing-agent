"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api";
import { setBrandId } from "@/lib/utils";
import LoadingPage from "@/components/LoadingPage";

export default function AuthSuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const data = await apiClient.auth.getProfile();
        setBrands(data.user?.brandList || []);
      } catch (e) {
        setError("Could not load your profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const proceed = async (selectedBrandId) => {
    try {
      if (selectedBrandId) {
        // Tell server to set active brand in tokens
        await apiClient.auth.setActiveBrand(selectedBrandId);
        setBrandId(selectedBrandId);
      } else {
        setBrandId(null);
      }
    } catch (e) {
      // non-blocking
    } finally {
      router.replace("/dashboard");
    }
  };

  if (loading) {
    return (
      <LoadingPage title="Getting your brands"/>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!brands || brands.length === 0) {
    // No brands; continue with blank directly
    return proceed(undefined)
  }
  
  const generateRandomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Select a workspace</CardTitle>
          <CardDescription>
            Choose one of your brands or continue without one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            {brands.map((b) => (
              <Button
                key={String(b.brandId)}
                variant="secondary"
                className="w-full h-14 justify-start items-start gap-4"
                onClick={() => proceed(b.brandId)}
              >
                <span
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white`}
                  style={{ backgroundColor: generateRandomHexColor() }}
                >
                  {b.companyName[0]}
                </span>
                <span className="flex flex-col items-start">
                  {b.companyName}
                  <span className="text-xs capitalize text-gray-400">
                    {b.role}
                  </span>
                </span>
              </Button>
            ))}
          </div>
          <div className="h-px w-full bg-gray-200 my-4" />
          <Button className="w-full" onClick={() => proceed(undefined)}>
            Continue with blank
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
