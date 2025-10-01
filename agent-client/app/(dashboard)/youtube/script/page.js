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
import { FileText, Sparkles, Download } from "lucide-react";
import apiClient from "@/lib/api";
import LoaderAnim from "@/components/LoaderAnim";

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
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    if (!userInputs.videoTopic.trim()) newErrors.videoTopic = true;
    if (!userInputs.targetAudience.trim()) newErrors.targetAudience = true;
    if (!userInputs.outputLanguage.trim()) newErrors.outputLanguage = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInputs((prev) => ({
      ...prev,
      [id === "script-topic"
        ? "videoTopic"
        : id === "target-audience"
        ? "targetAudience"
        : id === "video-goal"
        ? "videoGoal"
        : id === "tone"
        ? "tone"
        : id === "output-language"
        ? "outputLanguage"
        : id]: value,
    }));
    if (
      errors[
        id === "script-topic"
          ? "videoTopic"
          : id === "target-audience"
          ? "targetAudience"
          : id === "output-language"
          ? "outputLanguage"
          : id
      ]
    ) {
      setErrors((prev) => ({
        ...prev,
        [id === "script-topic"
          ? "videoTopic"
          : id === "target-audience"
          ? "targetAudience"
          : id === "output-language"
          ? "outputLanguage"
          : id]: false,
      }));
    }
  };

  const handleSliderChange = (e) => {
    setUserInputs((prev) => ({
      ...prev,
      videoLength: e.target.value,
    }));
  };

  const handleGenerateScript = async () => {
    if (!validateInputs()) return;
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
                className={errors.videoTopic ? "border-red-500" : ""}
              />
              {errors.videoTopic && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
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
                <span className="font-medium text-white">
                  {userInputs.videoLength} min
                </span>
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
                className={errors.targetAudience ? "border-red-500" : ""}
              />
              {errors.targetAudience && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
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
                className={errors.outputLanguage ? "border-red-500" : ""}
              />
              {errors.outputLanguage && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required
                </p>
              )}
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
              <div className="bg-white/10 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-sm text-white font-sans">
                  <code>{generatedScript}</code>
                </pre>
              </div>
            ) : isGenerating ? (
              <LoaderAnim />
            ) : (
              <div className="text-center py-12 px-6">
                <div className="relative inline-block mb-4">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto" />
                  <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-yellow-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Ready to Craft Your Script?
                </h3>
                <p className="text-white/80 max-w-sm mx-auto mb-6">
                  Tell us your topic, audience, and style—then watch AI turn
                  your ideas into a polished, ready-to-shoot video script in
                  seconds.
                </p>
                <ul className="text-left text-white/80 space-y-2 max-w-xs mx-auto mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>SEO-optimized hooks & CTAs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Exact word-count for your chosen length</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Multilingual output support</span>
                  </li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScriptWriter;
