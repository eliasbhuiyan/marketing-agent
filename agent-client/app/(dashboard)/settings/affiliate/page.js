"use client";

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
import { HandCoins, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function AffiliatePage() {
  const [copied, setCopied] = useState(false);
  const affiliateLink = "https://marketingagent.com/ref/user123";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-700">
              Earn 20% commission on all referrals for their first year of subscription!
            </p>
          </div>

          <div>
            <Label htmlFor="affiliate-link">Your Affiliate Link</Label>
            <div className="flex mt-1">
              <Input
                id="affiliate-link"
                value={affiliateLink}
                readOnly
                className="rounded-r-none"
              />
              <Button
                onClick={copyToClipboard}
                className="rounded-l-none"
                variant="secondary"
              >
                {copied ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Referral Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-sm text-white/60">Total Referrals</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-white/60">Active Subscriptions</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-sm text-white/60">Total Earnings</p>
                <p className="text-2xl font-bold">$240.00</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Promotional Materials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Banner Ads</h4>
                <p className="text-sm text-white/60 mb-4">
                  Download banner ads for your website
                </p>
                <Button variant="outline" size="sm">
                  Download Banners
                </Button>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Email Templates</h4>
                <p className="text-sm text-white/60 mb-4">
                  Copy email templates to share with your network
                </p>
                <Button variant="outline" size="sm">
                  View Templates
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}