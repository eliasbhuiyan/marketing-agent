"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIntegrations } from "@/lib/hooks/useIntegrations";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { useRef } from "react";

const platformConfig = {
  facebook: { name: "Facebook", icon: "📘", color: "bg-blue-500" },
  instagram: { name: "Instagram", icon: "📷", color: "bg-pink-500" },
  wordpress: { name: "WordPress", icon: "🌐", color: "bg-gray-600" },
  blogger: { name: "Blogger", icon: "🅱️", color: "bg-orange-500" },
};

export default function ContentPublisher({ content, onPublished = () => {} }) {
  const { integrations, publishContent, getIntegrationStatus } =
    useIntegrations();
  const inputRef = useRef(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [publishing, setPublishing] = useState(false);
  const [results, setResults] = useState({});
  const [scheduledAt, setScheduledAt] = useState("");
  
  const connectedPlatforms = integrations.filter(
    (integration) => integration.status === "active"
  );
  const handlePlatformToggle = (platform) => {    
    if (!content) return;
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handlePublish = async () => {
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform to publish to.");
      return;
    }

    setPublishing(true);
    setResults({});

    const publishPromises = selectedPlatforms.map(async (platform) => {
      try {
        const scheduledTimeIso = scheduledAt
          ? new Date(scheduledAt).toISOString()
          : new Date().toISOString();
        const result = await publishContent(
          platform,
          content,
          scheduledTimeIso
        );
        return { platform, success: true, result };
      } catch (error) {
        return { platform, success: false, error: error.message };
      }
    });

    const publishResults = await Promise.all(publishPromises);
    const resultsMap = {};

    publishResults.forEach(({ platform, success, result, error }) => {
      resultsMap[platform] = { success, result, error };
    });

    setResults(resultsMap);
    // If at least one publish succeeded, trigger the published callback
    const anySuccess = publishResults.some((r) => r.success);
    if (anySuccess) {
      onPublished();
    }
    setPublishing(false);
  };

  if (connectedPlatforms.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            No Connected Platforms
          </h3>
          <p className="text-gray-600 mb-4">
            You need to connect at least one platform before you can publish
            content.
          </p>
          <Link
            href="/settings"
            className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
          >
            Go to Settings
          </Link>
        </div>
      </Card>
    );
  }

  // Ref for the input element

  return (
    <Card className="p-6 max-w-4xl m-auto">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold text-white mb-4">
          Publish Content
        </h3>
        <div
          className="mb-6"
          onClick={() =>
            inputRef.current &&
            inputRef.current.showPicker &&
            inputRef.current.showPicker()
          }
        >
          <Label
            id="schedule"
            className="text-sm font-medium text-white mb-2 block"
          >
            Schedule Post
          </Label>
          <div className="w-full" style={{ cursor: "pointer" }}>
            <Input
              ref={inputRef}
              htmlFor="schedule"
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full"
              readOnly={false}
            />
          </div>
        </div>
      </div>
      {/* Platform Selection */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-white mb-3 block">
          Select Platforms to Publish To:
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {connectedPlatforms.map((integration) => {
            const config = platformConfig[integration.platform];
            const isSelected = selectedPlatforms.includes(integration.platform);

            return (
              <button
                key={integration.platform}
                onClick={() => handlePlatformToggle(integration.platform)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-green-500 bg-white/10"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center text-lg mx-auto mb-2`}
                >
                  {config.icon}
                </div>
                <p className="text-sm font-medium text-white">{config.name}</p>
                <div className="flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Publish Button */}
      <Button
        onClick={handlePublish}
        disabled={publishing || selectedPlatforms.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {publishing
          ? "Publishing..."
          : `Publish to ${selectedPlatforms.length} Platform${
              selectedPlatforms.length > 1 ? "s" : ""
            }`}
      </Button>

      {/* Results */}
      {Object.keys(results).length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-white">
            Publishing Results:
          </h4>
          {Object.entries(results).map(([platform, result]) => {
            const config = platformConfig[platform];
            return (
              <div
                key={platform}
                className={`p-3 rounded-lg border ${
                  result.success
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-6 h-6 rounded ${config.color} flex items-center justify-center text-sm`}
                  >
                    {config.icon}
                  </div>
                  <span className="font-medium text-blue-600">
                    {config.name}
                  </span>
                  <span
                    className={`text-sm ${
                      result.success ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {result.success ? "✓ Published" : "✗ Failed"}
                  </span>
                </div>
                {result.success && result.result?.url && (
                  <a
                    href={result.result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline mt-1 block"
                  >
                    View Post →
                  </a>
                )}
                {!result.success && (
                  <p className="text-sm text-red-600 mt-1">{result.error}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
