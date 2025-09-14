'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  MessageCircle, 
  Mail, 
  Hash,
  Sparkles,
  Copy,
  Download,
  Calendar,
  Globe,
  Target,
  TrendingUp,
  Save
} from 'lucide-react';
import ContentPublisher from '@/components/ContentPublisher';

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('captions');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const tabs = [
    { id: 'captions', label: 'Captions', icon: MessageCircle },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'email', label: 'Email Marketing', icon: Mail },
    { id: 'hashtags', label: 'Hashtags & Keywords', icon: Hash }
  ];

  const handleGenerateContent = async (type) => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const sampleContent = {
        captions: "🌟 Exciting news! Our latest product is here to revolutionize your daily routine. Experience the perfect blend of innovation and style. Don't miss out on this game-changer! #NewProduct #Innovation #Lifestyle #Quality #MustHave",
        blogs: "# The Future of Marketing: How AI is Transforming Content Creation\n\nIn today's digital landscape, artificial intelligence is revolutionizing how businesses approach marketing and content creation. From automated copywriting to intelligent design generation, AI tools are enabling marketers to scale their efforts while maintaining quality and consistency.\n\n## Key Benefits of AI in Marketing\n\n1. **Efficiency**: Generate content 10x faster than traditional methods\n2. **Consistency**: Maintain brand voice across all channels\n3. **Personalization**: Create targeted content for different audiences\n4. **Analytics**: Get insights on what content performs best\n\n## Getting Started with AI Marketing Tools\n\nTo leverage AI effectively, start by defining your brand voice and content goals. Use AI as a starting point, then refine the output to match your unique style and audience needs.",
        email: "Subject: 🚀 Your Exclusive Invitation to Our Product Launch\n\nHi [Name],\n\nWe're thrilled to invite you to be among the first to experience our revolutionary new product!\n\n**What's New:**\n✨ Cutting-edge technology that solves real problems\n🎯 Designed with your needs in mind\n💎 Premium quality at an accessible price\n\n**Special Launch Offer:**\n- 30% off for the first 100 customers\n- Free shipping worldwide\n- 30-day money-back guarantee\n\n**Ready to transform your experience?**\n[Shop Now] [Learn More]\n\nBest regards,\nThe Marketing Team",
        hashtags: "**Instagram/TikTok Hashtags:**\n#NewProduct #Innovation #Lifestyle #Quality #MustHave #GameChanger #Tech #Modern #Trending #Viral #FYP #Explore #Discover #Amazing #Perfect #Love #Best #Top #Featured\n\n**SEO Keywords:**\n- innovative product design\n- lifestyle technology\n- quality products online\n- modern solutions\n- trending products 2024\n- best new products\n- premium quality items\n- cutting-edge technology\n- revolutionary design\n- must-have products"
      };
      setGeneratedContent(sampleContent[type]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleSaveContent = () => {
    // Handle saving content
    console.log('Saving content...');
  };

  const handleScheduleBlog = () => {
    // Handle blog scheduling
    console.log('Scheduling blog...');
  };

  const handleExportEmail = () => {
    // Handle email export
    console.log('Exporting email...');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content & Copywriting</h1>
        <p className="text-gray-600 mt-2">Generate SEO-friendly content, blogs, emails, and hashtags with AI</p>
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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Panel - Input Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Generation Settings</CardTitle>
              <CardDescription>Configure your content requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeTab === 'captions' && (
                <>
                  <div>
                    <Label htmlFor="product-description">Product/Service Description</Label>
                    <textarea
                      id="product-description"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md h-24 resize-none"
                      placeholder="Describe your product or service..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="target-audience">Target Audience</Label>
                    <Input
                      id="target-audience"
                      placeholder="e.g., Young professionals, Tech enthusiasts"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tone">Tone</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="playful">Playful</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="twitter">Twitter</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'blogs' && (
                <>
                  <div>
                    <Label htmlFor="blog-topic">Blog Topic</Label>
                    <Input
                      id="blog-topic"
                      placeholder="e.g., The Future of AI in Marketing"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-length">Blog Length</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option value="short">Short (300-500 words)</option>
                      <option value="medium">Medium (500-1000 words)</option>
                      <option value="long">Long (1000+ words)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="blog-style">Writing Style</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option value="informative">Informative</option>
                      <option value="conversational">Conversational</option>
                      <option value="technical">Technical</option>
                      <option value="storytelling">Storytelling</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="seo-focus">SEO Focus Keywords</Label>
                    <Input
                      id="seo-focus"
                      placeholder="e.g., AI marketing, content creation"
                    />
                  </div>
                </>
              )}

              {activeTab === 'email' && (
                <>
                  <div>
                    <Label htmlFor="email-type">Email Type</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option value="newsletter">Newsletter</option>
                      <option value="promotional">Promotional</option>
                      <option value="welcome">Welcome Series</option>
                      <option value="abandoned-cart">Abandoned Cart</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="email-goal">Email Goal</Label>
                    <Input
                      id="email-goal"
                      placeholder="e.g., Promote new product launch"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cta">Call-to-Action</Label>
                    <Input
                      id="cta"
                      placeholder="e.g., Shop Now, Learn More, Sign Up"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email-length">Email Length</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option value="short">Short & Sweet</option>
                      <option value="medium">Medium</option>
                      <option value="detailed">Detailed</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'hashtags' && (
                <>
                  <div>
                    <Label htmlFor="content-type">Content Type</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option value="product">Product</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="business">Business</option>
                      <option value="tech">Technology</option>
                      <option value="fashion">Fashion</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="hashtag-count">Number of Hashtags</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option value="10">10 hashtags</option>
                      <option value="20">20 hashtags</option>
                      <option value="30">30 hashtags</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="hashtag-style">Hashtag Style</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option value="trending">Trending</option>
                      <option value="niche">Niche</option>
                      <option value="mixed">Mixed (Trending + Niche)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="platform-hashtags">Platform</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="twitter">Twitter</option>
                      <option value="linkedin">LinkedIn</option>
                    </select>
                  </div>
                </>
              )}

              <Button 
                onClick={() => handleGenerateContent(activeTab)}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Content Publisher */}
          {generatedContent && (
            <ContentPublisher content={generatedContent} />
          )}

          {activeTab === 'email' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Export Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleExportEmail} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export to Mailchimp
                </Button>
                <Button onClick={handleExportEmail} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export to Brevo
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel - Generated Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Generated Content
                </div>
                {generatedContent && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCopyContent}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleSaveContent}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Generated Yet</h3>
                  <p className="text-gray-600">Fill in the form and click "Generate Content" to create your content</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO Analysis */}
          {activeTab === 'blogs' && generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  SEO Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Word Count</span>
                    <span className="font-medium">847 words</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Reading Time</span>
                    <span className="font-medium">3.5 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">SEO Score</span>
                    <span className="font-medium text-green-600">85/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Keyword Density</span>
                    <span className="font-medium">2.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hashtag Performance */}
          {activeTab === 'hashtags' && generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Hashtag Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trending Hashtags</span>
                    <span className="font-medium text-green-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Niche Hashtags</span>
                    <span className="font-medium text-blue-600">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Estimated Reach</span>
                    <span className="font-medium">45.2K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Engagement Rate</span>
                    <span className="font-medium text-green-600">+15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
