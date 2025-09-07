'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Image, 
  FileText, 
  TrendingUp, 
  Calendar,
  Palette,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Marketing Poster & Product Image Module",
      icon: Image,
      description: "Create stunning posters and banners with AI-powered design tools",
      details: [
        "Poster & Banner Maker with AI generation",
        "Background Remover with transparent backgrounds",
        "Poster Templates Marketplace",
        "AI Caption Writer for social media",
        "Social Media Scheduler for all platforms"
      ]
    },
    {
      title: "Content & Copywriting Module",
      icon: FileText,
      description: "Generate SEO-friendly content and copy for all your marketing needs",
      details: [
        "SEO-friendly Caption/Content Writer",
        "SEO Blog Writer with WordPress integration",
        "Email Marketing Writer for newsletters",
        "Hashtag & Keyword Generator",
        "Export to Mailchimp/Brevo"
      ]
    },
    {
      title: "Trend Analyzer Agent Module",
      icon: TrendingUp,
      description: "Stay ahead with real-time trend monitoring and content suggestions",
      details: [
        "Track Google, TikTok, Instagram, Twitter trends",
        "AI-powered content suggestions",
        "Trending hashtag recommendations",
        "Niche hashtag suggestions for higher reach"
      ]
    },
    {
      title: "YouTube Marketing Module",
      icon: Youtube,
      description: "Create compelling YouTube content with AI-powered tools",
      details: [
        "YouTube Thumbnail Maker with AI generation",
        "YouTube Script Writer for videos",
        "Content Ideas Generator based on trends",
        "Support for Short-form and Long-form content"
      ]
    }
  ];

  const platforms = [
    { name: "Facebook", icon: Facebook, color: "text-blue-600" },
    { name: "Instagram", icon: Instagram, color: "text-pink-600" },
    { name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
    { name: "TikTok", icon: Target, color: "text-black" },
    { name: "Twitter/X", icon: Twitter, color: "text-blue-400" }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/90 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Sparkles className="h-7 w-7 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold">Marketing Agent</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mx-auto text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 text-xs mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              New: YouTube module, Trend agent, Scheduler
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-5">
              AI Marketing, reimagined with
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> beautiful design</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Create stunning visuals, generate SEO content, analyze trends, and schedule posts — all in one minimal, fast dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register">
                <Button size="lg" className="px-7">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-7">
                Watch Demo
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
              <div className="card-surface rounded-lg p-4">
                <p className="text-2xl font-bold">50k+</p>
                <p className="text-sm text-gray-500">Assets generated</p>
              </div>
              <div className="card-surface rounded-lg p-4">
                <p className="text-2xl font-bold">8.9/10</p>
                <p className="text-sm text-gray-500">Avg. satisfaction</p>
              </div>
              <div className="card-surface rounded-lg p-4">
                <p className="text-2xl font-bold">12+</p>
                <p className="text-sm text-gray-500">Integrations</p>
              </div>
              <div className="card-surface rounded-lg p-4">
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-gray-500">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need for Marketing Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From design to content creation, trend analysis to scheduling - all in one powerful platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Navigation */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl cursor-pointer transition-all card-surface ${
                    activeFeature === index ? 'ring-1 ring-blue-600/30' : ''
                  } hover-lift`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <feature.icon className={`h-8 w-8 mt-1 ${activeFeature === index ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {feature.description}
                      </p>
                      <ul className="space-y-1">
                        {feature.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Preview */}
            <div className="rounded-xl p-8 card-surface hover-lift">
              <div className="text-center">
                {(() => {
                  const FeatureIcon = features[activeFeature].icon;
                  return <FeatureIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />;
                })()}
                <h3 className="text-2xl font-bold mb-4">
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {features[activeFeature].description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {features[activeFeature].details.slice(0, 4).map((detail, index) => (
                    <div key={index} className="card-surface p-3 rounded-lg text-sm">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Platforms */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Schedule to All Major Platforms
            </h2>
            <p className="text-xl text-gray-600">
              Connect and manage all your social media accounts from one dashboard
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <platform.icon className={`h-12 w-12 mx-auto mb-4 ${platform.color}`} />
                  <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Marketing Agent?
            </h2>
            <p className="text-xl text-gray-600">
              Built for creators, marketers, and businesses of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent className="p-0">
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  AI-Powered Efficiency
                </h3>
                <p className="text-gray-600">
                  Generate professional designs and content in minutes, not hours. Our AI understands your brand and creates consistent, high-quality materials.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Stay Ahead of Trends
                </h3>
                <p className="text-gray-600">
                  Monitor real-time trends across all platforms and get AI-powered suggestions for content that resonates with your audience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent className="p-0">
                <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Complete Automation
                </h3>
                <p className="text-gray-600">
                  From design to scheduling, automate your entire marketing workflow. Focus on strategy while we handle the execution.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl card-surface p-10 md:p-14 text-center hover-lift">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of creators and businesses already scaling their marketing with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="px-8 py-3">
                  Start Your Free Trial
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-3">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold">Marketing Agent</h3>
              </div>
              <p className="text-gray-500">
                AI-powered marketing tools for the modern creator and business.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 Marketing Agent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
