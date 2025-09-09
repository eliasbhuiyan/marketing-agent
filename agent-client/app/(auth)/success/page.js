"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AuthSuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await fetch(`http://localhost:8000/auth/profile`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
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
        try { 
          // Tell server to set active brand in tokens
          await fetch(`http://localhost:8000/auth/brand`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brandId: selectedBrandId || undefined })
          });
          localStorage.setItem("selectedBrandId", String(selectedBrandId)); 
        } catch {}
      } else {
        try { localStorage.removeItem("selectedBrandId"); } catch {}
      }
    } catch (e) {
      // non-blocking
    } finally {
      router.replace("/dashboard");
    }
  };

  if (loading) {
    return <div className="w-full text-center p-8 text-sm text-gray-600">Loading your brands...</div>;
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
    // No brands; show continue with blank directly
    return (
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Select a workspace</CardTitle>
            <CardDescription>No brands found. You can create one later.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => proceed(undefined)}>Continue with blank</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Select a workspace</CardTitle>
          <CardDescription>Choose one of your brands or continue without one.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            {brands.map((b) => (
              <Button key={String(b.brandId)} className="w-full justify-start" onClick={() => proceed(b.brandId)}>
                {b.companyName}
              </Button>
            ))}
          </div>
          <div className="h-px w-full bg-gray-200 my-4" />
          <Button className="w-full" onClick={() => proceed(undefined)}>Continue with blank</Button>
        </CardContent>
      </Card>
    </div>
  );
}
