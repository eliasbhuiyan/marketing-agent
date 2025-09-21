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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Image as ImageIcon,
  FileText,
  Sparkles,
  Download,
  Target,
} from "lucide-react";

const ScriptWriter = () => {
  const [generatedScript, setGeneratedScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const scriptTypes = [
    {
      id: "short",
      name: "Short-form (Reels/Shorts)",
      duration: "15-60 seconds",
    },
    {
      id: "long",
      name: "Long-form (Tutorials/Reviews)",
      duration: "5-30 minutes",
    },
    {
      id: "educational",
      name: "Educational Content",
      duration: "3-15 minutes",
    },
    { id: "entertainment", name: "Entertainment", duration: "2-10 minutes" },
  ];

  const handleGenerateScript = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedScript(`# AI Marketing Tools Tutorial Script

## Hook (0-5 seconds)
"Want to 10x your marketing productivity? In this video, I'll show you 5 AI tools that are game-changers for marketers in 2024."

## Introduction (5-15 seconds)
"Hey everyone, welcome back to the channel! I'm [Your Name], and today we're diving deep into AI marketing tools that can save you hours of work every week."

## Main Content (15-8 minutes)
### Tool 1: Content Creation AI
"First up, we have [Tool Name]. This AI can generate blog posts, social media captions, and even video scripts in minutes."

### Tool 2: Design Automation
"Next, [Tool Name] uses AI to create stunning graphics and thumbnails. Perfect for content creators who need visual assets quickly."

### Tool 3: Email Marketing
"[Tool Name] helps you write compelling email campaigns that actually convert. It analyzes your audience and creates personalized content."

### Tool 4: Social Media Management
"This tool schedules and optimizes your posts across all platforms. It even suggests the best times to post for maximum engagement."

### Tool 5: Analytics and Insights
"Finally, [Tool Name] provides AI-powered insights into your marketing performance, helping you make data-driven decisions."

## Conclusion (8-9 minutes)
"These 5 AI tools can transform your marketing workflow. Start with one or two that fit your needs, and gradually integrate more as you get comfortable."

## Call to Action (9-10 minutes)
"If this video helped you, don't forget to like, subscribe, and hit the notification bell. What AI marketing tools are you using? Let me know in the comments below!"`);
      setIsGenerating(false);
    }, 2000);
  };
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Panel - Script Settings */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Script Settings
            </CardTitle>
            <CardDescription>
              Configure your video script requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="script-topic">Video Topic/Product</Label>
              <Input
                id="script-topic"
                placeholder="e.g., AI Marketing Tools Tutorial"
              />
            </div>

            <div>
              <Label htmlFor="script-type">Script Type</Label>
              <select
                id="script-type"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                {scriptTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name} ({type.duration})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="target-audience">Target Audience</Label>
              <Input
                id="target-audience"
                placeholder="e.g., Marketing professionals, Small business owners"
              />
            </div>

            <div>
              <Label htmlFor="video-goal">Video Goal</Label>
              <select
                id="video-goal"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="educational">Educational</option>
                <option value="entertainment">Entertainment</option>
                <option value="promotional">Promotional</option>
                <option value="tutorial">Tutorial</option>
              </select>
            </div>

            <div>
              <Label htmlFor="tone">Tone</Label>
              <select
                id="tone"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="energetic">Energetic</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>

            <Button
              onClick={handleGenerateScript}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                  Generating Script...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Script
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Generated Script */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Generated Script
              </div>
              {generatedScript && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    Copy Script
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {generatedScript ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                  {generatedScript}
                </pre>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Script Generated Yet
                </h3>
                <p className="text-gray-600">
                  Fill in the form and click &quot;Generate Script&quot; to
                  create your video script
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScriptWriter;
