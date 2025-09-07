'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Youtube,
  Upload,
  Image as ImageIcon,
  FileText,
  Sparkles,
  Download,
  Play,
  Pause,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Target,
  TrendingUp,
  Clock,
  Users,
  Palette,
  Type,
  Settings
} from 'lucide-react';

export default function YouTubePage() {
  const [activeTab, setActiveTab] = useState('thumbnails');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedThumbnails, setGeneratedThumbnails] = useState([]);
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const tabs = [
    { id: 'thumbnails', label: 'Thumbnail Maker', icon: ImageIcon },
    { id: 'scripts', label: 'Script Writer', icon: FileText },
    { id: 'ideas', label: 'Content Ideas', icon: Target }
  ];

  const thumbnailStyles = [
    { id: 'professional', name: 'Professional', description: 'Clean and business-focused' },
    { id: 'bold', name: 'Bold', description: 'Eye-catching and attention-grabbing' },
    { id: 'fun', name: 'Fun', description: 'Playful and engaging' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' }
  ];

  const scriptTypes = [
    { id: 'short', name: 'Short-form (Reels/Shorts)', duration: '15-60 seconds' },
    { id: 'long', name: 'Long-form (Tutorials/Reviews)', duration: '5-30 minutes' },
    { id: 'educational', name: 'Educational Content', duration: '3-15 minutes' },
    { id: 'entertainment', name: 'Entertainment', duration: '2-10 minutes' }
  ];

  const contentIdeas = [
    {
      id: 1,
      title: 'AI Marketing Tools Tutorial',
      type: 'Educational',
      duration: '8-12 minutes',
      difficulty: 'Beginner',
      trending: true,
      description: 'Step-by-step guide on using AI tools for marketing automation',
      tags: ['#AIMarketing', '#Tutorial', '#MarketingTools', '#Automation']
    },
    {
      id: 2,
      title: 'Behind the Scenes: Product Development',
      type: 'Documentary',
      duration: '5-8 minutes',
      difficulty: 'Easy',
      trending: false,
      description: 'Show the process of creating and launching a new product',
      tags: ['#BehindTheScenes', '#ProductDevelopment', '#Startup', '#Innovation']
    },
    {
      id: 3,
      title: 'Marketing Trends 2024',
      type: 'Educational',
      duration: '10-15 minutes',
      difficulty: 'Intermediate',
      trending: true,
      description: 'Comprehensive overview of marketing trends for 2024',
      tags: ['#MarketingTrends', '#2024', '#DigitalMarketing', '#Future']
    },
    {
      id: 4,
      title: 'Day in the Life of a Marketer',
      type: 'Lifestyle',
      duration: '3-5 minutes',
      difficulty: 'Easy',
      trending: false,
      description: 'Vlog-style content showing daily marketing activities',
      tags: ['#DayInTheLife', '#Marketing', '#Vlog', '#Lifestyle']
    }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage({ file, url });
    }
  };

  const handleGenerateThumbnails = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedThumbnails([
        { id: 1, url: '/api/placeholder/400/225', style: 'Professional', score: 95 },
        { id: 2, url: '/api/placeholder/400/225', style: 'Bold', score: 88 },
        { id: 3, url: '/api/placeholder/400/225', style: 'Fun', score: 92 },
        { id: 4, url: '/api/placeholder/400/225', style: 'Minimal', score: 85 }
      ]);
      setIsGenerating(false);
    }, 3000);
  };

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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">YouTube Marketing</h1>
        <p className="text-gray-600 mt-2">Create compelling YouTube content with AI-powered tools</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Thumbnail Maker */}
      {activeTab === 'thumbnails' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload & Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Image
                </CardTitle>
                <CardDescription>Upload your product or model image</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">Drop image here or click to upload</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Choose Image
                    </Button>
                  </Label>
                </div>
                
                {uploadedImage && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Uploaded Image</h4>
                    <img
                      src={uploadedImage.url}
                      alt="Uploaded"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Thumbnail Settings
                </CardTitle>
                <CardDescription>Configure your thumbnail preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="video-title">Video Title/Topic</Label>
                  <Input
                    id="video-title"
                    placeholder="e.g., AI Marketing Tools Tutorial"
                  />
                </div>

                <div>
                  <Label htmlFor="video-description">Video Description</Label>
                  <textarea
                    id="video-description"
                    className="w-full p-3 border border-gray-300 rounded-md h-20 resize-none"
                    placeholder="Brief description of your video content..."
                  />
                </div>

                <div>
                  <Label htmlFor="thumbnail-style">Thumbnail Style</Label>
                  <select
                    id="thumbnail-style"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  >
                    {thumbnailStyles.map((style) => (
                      <option key={style.id} value={style.id}>
                        {style.name} - {style.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="brand-colors">Brand Colors</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="color"
                      id="brand-colors"
                      defaultValue="#3B82F6"
                      className="w-10 h-10 rounded border"
                    />
                    <Input defaultValue="#3B82F6" />
                  </div>
                </div>

                <Button 
                  onClick={handleGenerateThumbnails}
                  disabled={!uploadedImage || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                      Generating Thumbnails...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Thumbnails
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Generated Thumbnails */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Generated Thumbnails
                </CardTitle>
                <CardDescription>AI-generated thumbnail variations</CardDescription>
              </CardHeader>
              <CardContent>
                {generatedThumbnails.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {generatedThumbnails.map((thumbnail) => (
                      <div key={thumbnail.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{thumbnail.style} Style</h3>
                          <span className="text-sm text-green-600 font-medium">{thumbnail.score}% Score</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Thumbnails Generated Yet</h3>
                    <p className="text-gray-600">Upload an image and click "Generate Thumbnails" to create your designs</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Script Writer */}
      {activeTab === 'scripts' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Script Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Script Settings
                </CardTitle>
                <CardDescription>Configure your video script requirements</CardDescription>
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
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Script Generated Yet</h3>
                    <p className="text-gray-600">Fill in the form and click "Generate Script" to create your video script</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Content Ideas */}
      {activeTab === 'ideas' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Trending Content Ideas
              </CardTitle>
              <CardDescription>AI-suggested content ideas based on current YouTube trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentIdeas.map((idea) => (
                  <div key={idea.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{idea.title}</h3>
                      {idea.trending && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{idea.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{idea.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{idea.difficulty}</span>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {idea.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {idea.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Create Video
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Script
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
