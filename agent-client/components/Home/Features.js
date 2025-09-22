"use client"
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, ShoppingBag, Video, LineChart, Search, Link, Globe, Clock, Mail, Users, CheckSquare, BarChart } from "lucide-react";
const Features = () => {
  const [activeTab, setActiveTab] = useState("content");

  const tabs = [
    { id: "content", label: "Content Creation" },
    { id: "analytics", label: "Analytics & SEO" },
    { id: "automation", label: "Automation Tools" },
    { id: "collaboration", label: "Team Collaboration" },
  ];

  const features = {
    content: [
      {
        icon: <Pencil className="w-8 h-8" />,
        title: "AI Blog Writer",
        description: "Generate comprehensive, SEO-optimized blog posts with proper structure, headings, and keyword integration. Our AI creates engaging content that ranks well and drives organic traffic to your website.",
      },
      {
        icon: <ShoppingBag className="w-8 h-8" />,
        title: "Product Description Generator",
        description: "Create compelling, conversion-focused product descriptions that highlight key features and benefits. Perfect for e-commerce stores looking to increase sales and improve product page performance.",
      },
      {
        icon: <Video className="w-8 h-8" />,
        title: "AI Script Writer",
        description: "Develop professional video scripts, ad copy, and social media content that engages your audience. From YouTube videos to TikTok content, create scripts that convert viewers into customers.",
      },
    ],
    analytics: [
      {
        icon: <LineChart className="w-8 h-8" />,
        title: "Advanced Trend Analyzer",
        description: "Stay ahead of the competition with daily and weekly market trend updates. Get industry-specific insights, emerging opportunities, and content suggestions based on real-time data analysis.",
      },
      {
        icon: <Search className="w-8 h-8" />,
        title: "SEO Optimization Assistant",
        description: "Improve your search engine rankings with AI-powered keyword suggestions, meta descriptions, and content structure recommendations. Optimize every piece of content for maximum visibility.",
      },
      {
        icon: <Link className="w-8 h-8" />,
        title: "Smart URL Analytics",
        description: "Generate branded short URLs and track detailed analytics including click-through rates, geographic data, and referral sources. Measure the effectiveness of your marketing campaigns.",
      },
    ],
    automation: [
      {
        icon: <Globe className="w-8 h-8" />,
        title: "Multi-Platform Publishing",
        description: "Publish content simultaneously across Facebook, Instagram, LinkedIn, Twitter, Medium, Blogger, and more. Save hours of manual posting with our intelligent distribution system.",
      },
      {
        icon: <Clock className="w-8 h-8" />,
        title: "Smart Content Scheduling",
        description: "Schedule your content for optimal engagement times across different platforms. Our AI analyzes your audience behavior to suggest the best posting times for maximum reach.",
      },
      {
        icon: <Mail className="w-8 h-8" />,
        title: "Email Campaign Templates",
        description: "Access professionally designed email templates for marketing campaigns, team invitations, and customer communications. Customize and send engaging emails that drive results.",
      },
    ],
    collaboration: [
      {
        icon: <Users className="w-8 h-8" />,
        title: "Team Management System",
        description: "Invite team members with specific roles including Admin, Executive, Editor, and Accounts. Control access levels and permissions to maintain security while enabling collaboration.",
      },
      {
        icon: <CheckSquare className="w-8 h-8" />,
        title: "Content Approval Workflow",
        description: "Implement a structured review process with approval workflows. Ensure content quality and brand consistency before publication with our built-in review system.",
      },
      {
        icon: <BarChart className="w-8 h-8" />,
        title: "Performance Analytics Dashboard",
        description: "Monitor content performance, engagement metrics, and ROI across all platforms. Make data-driven decisions with comprehensive analytics and reporting tools.",
      },
    ],
  };
  return (
    <section id="features" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            ✨ Comprehensive AI Marketing Features
          </h2>
          <p className="text-xl text-white/80">
            Everything you need to dominate your market and outperform
            competitors
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "glass"}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
          {features[activeTab].map((feature, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader>
                <div className="card-surface mt-4 w-14 h-14 flex items-center justify-center rounded-2xl">
                  {feature.icon}
                </div>
                <CardTitle className="text-white py-3">{feature.title}</CardTitle>
                <CardDescription className="text-white/80">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
