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
  FileText,
  Sparkles,
  Download,
} from "lucide-react";
import apiClient from "@/lib/api";

const ScriptWriter = () => {
  const [generatedScript, setGeneratedScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [userInputs, setUserInputs] = useState({
    videoTopic: "",
    videoLength: "3",
    targetAudience: "",
    videoGoal: "educational",
    tone: "professional",
    outputLanguage: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInputs((prev) => ({
      ...prev,
      [id === 'script-topic' ? 'videoTopic' : 
        id === 'target-audience' ? 'targetAudience' : 
        id === 'video-goal' ? 'videoGoal' : 
        id === 'tone' ? 'tone' : 
        id === 'output-language' ? 'outputLanguage' : id]: value
    }));
  };

  const handleSliderChange = (e) => {
    setUserInputs((prev) => ({
      ...prev,
      videoLength: e.target.value
    }));
  };

  const handleGenerateScript = async () => {
    console.log("Generating script with inputs:", userInputs);
    setIsGenerating(true);
    try {
      const response = await apiClient.ai.generateScript(userInputs);
      console.log("Generated script:", response.script);
      
      setGeneratedScript(response.script);
    } catch (error) {
      console.error("Error generating script:", error);
      setGeneratedScript("Error generating script. Please try again.");
    } finally {
      setIsGenerating(false);
    }
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
                value={userInputs.videoTopic}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Video Length
              </label>
              <input
                type="range"
                name="length"
                id="videoLength"
                min="1"
                max="10"
                value={userInputs.videoLength}
                onChange={handleSliderChange}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-white/70 text-sm mt-1">
                <span>1 min</span>
                <span className="font-medium text-white">{userInputs.videoLength} min</span>
                <span>10 min</span>
              </div>
            </div>

            <div>
              <Label htmlFor="target-audience">Target Audience</Label>
              <Input
                id="target-audience"
                placeholder="e.g., Marketing professionals, Small business owners"
                value={userInputs.targetAudience}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="video-goal">Video Goal</Label>
              <select
                id="video-goal"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={userInputs.videoGoal}
                onChange={handleInputChange}
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
                value={userInputs.tone}
                onChange={handleInputChange}
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="energetic">Energetic</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>
            <div>
              <Label htmlFor="output-language">Output Language</Label>
              <Input 
                id="output-language" 
                placeholder="e.g., Bangla" 
                value={userInputs.outputLanguage}
                onChange={handleInputChange}
              />
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
