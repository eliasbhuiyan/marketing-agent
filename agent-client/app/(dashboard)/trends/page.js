"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Globe,
  Instagram,
  Youtube,
  Facebook,
  RefreshCw,
  Filter,
  Target,
  Clock,
} from "lucide-react";
import { useTrends } from "@/lib/hooks/useTrends";
import LoadingPage from "@/components/LoadingPage";

export default function TrendsPage() {
  const [activePlatform, setActivePlatform] = useState("all");
  const { trendsData, loading, error } = useTrends();

  const platforms = [
    { id: "all", name: "All Platforms", icon: Globe, color: "text-white" },
    { id: "insta", name: "Instagram", icon: Instagram, color: "text-white" },
    { id: "tiktok", name: "TikTok", icon: Target, color: "text-white" },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "text-white" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-white" },
  ];

  if (loading && !trendsData) return <LoadingPage title="Loading trends" />;
 console.log(trendsData);
 
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">
          Discover Weekly Business Trends
        </h1>
        <p className="text-white mt-2 max-w-2xl m-auto">
          Get fresh insights and trending ideas across various industries.
          Explore short, actionable trends that update every week to help you
          <span className="font-bold"> make smarter business decisions.</span>
        </p>
      </div>

      {/* Platform Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter by Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Button
                key={platform.id}
                variant={activePlatform === platform.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActivePlatform(platform.id)}
                className="flex items-center space-x-2"
              >
                <platform.icon className={`h-4 w-4 ${platform.color}`} />
                <span>{platform.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Live Trends Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Trends Feed For This Week
            </CardTitle>
            <CardDescription>
              Smart business trending topics across platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 grid grid-cols-2 gap-6">
              {trendsData.map((industryData, industryIndex) => {
                const industryTrends =
                  activePlatform === "all"
                    ? industryData.trends
                    : industryData.trends.filter(
                      (trend) => trend.platform === activePlatform
                    );

                if (industryTrends.length === 0) return null;

                return (
                  <div key={industryIndex} className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-1 w-8 bg-green-500 rounded"></div>
                      <h2 className="text-4xl font-semibold text-white">
                        {industryData.industry}
                      </h2>
                      <div className="h-1 flex-1 bg-gray-200 rounded"></div>
                    </div>

                    <div className="space-y-4">
                      {industryTrends.map((trend, trendIndex) => (
                        <div
                          key={`${industryIndex}-${trendIndex}`}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {(() => {
                                const platform = platforms.find(
                                  (p) => p.id === trend.platform
                                );
                                if (platform?.icon) {
                                  const PlatformIcon = platform.icon;
                                  return (
                                    <PlatformIcon
                                      className={`h-5 w-5 ${platform.color}`}
                                    />
                                  );
                                }
                                return null;
                              })()}
                              <h3 className="font-semibold text-white text-2xl">
                                {trend.title}
                              </h3>
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {trend.platform}
                            </span>
                          </div>

                          <p className="text-lg text-white mb-3">
                            {trend.description}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {trend.hashtags.map((hashtag, index) => (
                              <span
                                key={index}
                                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                              >
                                {hashtag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
