"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DemoShowcase = () => {
  const [currentDemo, setCurrentDemo] = useState(0);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            See Our AI Tools In Action
          </h2>
          <p className="text-xl text-white/80">
            Experience the power of AI-driven content creation and marketing
            automation
          </p>
        </div>

        <Card className="p-8">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              <Button
                variant={currentDemo === 0 ? "default" : "glass"}
                onClick={() => setCurrentDemo(0)}
                className="px-4 py-2"
              >
                Blog Writer Demo
              </Button>
              <Button
                variant={currentDemo === 1 ? "default" : "glass"}
                onClick={() => setCurrentDemo(1)}
                className="px-4 py-2"
              >
                Product Generator
              </Button>
              <Button
                variant={currentDemo === 2 ? "default" : "glass"}
                onClick={() => setCurrentDemo(2)}
                className="px-4 py-2"
              >
                Trend Analysis
              </Button>
            </div>
          </div>

          {currentDemo === 0 && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  AI Blog Writer Demonstration
                </h3>
                <p className="text-glass-muted mb-6 leading-relaxed">
                  Enter any topic and watch our AI create a comprehensive,
                  SEO-optimized blog post complete with engaging headlines,
                  structured content, keyword integration, and meta
                  descriptions. Perfect for driving organic traffic and
                  establishing thought leadership.
                </p>
                <Card className="p-4">
                  <div className="text-sm text-glass-muted mb-3">
                    Sample Input: "Benefits of remote work for businesses"
                  </div>
                  <div className="space-y-2 text-sm text-white">
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Generated
                      1,500-word comprehensive article
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Included
                      15+ relevant SEO keywords
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Created 6
                      structured H2/H3 headings
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Generated
                      compelling meta description
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Suggested
                      relevant images and CTAs
                    </div>
                  </div>
                </Card>
              </div>
              <Card className="p-6">
                <div className="text-lg font-semibold text-white mb-4">
                  📝 AI Blog Generator Output
                </div>
                <div className="space-y-3 text-sm">
                  <Card className="p-3">
                    <div className="text-white font-medium">
                      Title Generated:
                    </div>
                    <div className="text-glass-muted">
                      "10 Proven Benefits of Remote Work That Transform Business
                      Success in 2024"
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-white font-medium">SEO Keywords:</div>
                    <div className="text-glass-muted">
                      remote work benefits, business productivity, work-life
                      balance, cost savings
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-white font-medium">Status:</div>
                    <div className="text-green-400">
                      Ready to publish across all platforms ✨
                    </div>
                  </Card>
                </div>
              </Card>
            </div>
          )}

          {currentDemo === 1 && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Product Description Generator
                </h3>
                <p className="text-glass-muted mb-6 leading-relaxed">
                  Transform basic product information into compelling,
                  conversion-focused descriptions that highlight key features,
                  benefits, and unique selling points. Increase your e-commerce
                  sales with persuasive copy that converts browsers into buyers.
                </p>
                <Card className="p-4">
                  <div className="text-sm text-glass-muted mb-3">
                    Sample Input: "Wireless noise-canceling headphones, 30-hour
                    battery"
                  </div>
                  <div className="space-y-2 text-sm text-white">
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Created
                      compelling product narrative
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span>{" "}
                      Highlighted key features and benefits
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Included
                      emotional triggers and urgency
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Added
                      strong call-to-action
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Optimized
                      for search engines
                    </div>
                  </div>
                </Card>
              </div>
              <Card className="p-6">
                <div className="text-lg font-semibold text-white mb-4">
                  🛍️ Product Description Output
                </div>
                <div className="space-y-3 text-sm">
                  <Card className="p-3">
                    <div className="text-white font-medium">
                      Generated Description:
                    </div>
                    <div className="text-glass-muted">
                      "Experience unparalleled audio clarity with our premium
                      wireless headphones featuring advanced noise-canceling
                      technology..."
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-white font-medium">
                      Key Features Highlighted:
                    </div>
                    <div className="text-glass-muted">
                      30-hour battery life, premium comfort design,
                      studio-quality sound, quick charge
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-white font-medium">
                      Call-to-Action:
                    </div>
                    <div className="text-yellow-300">
                      "Order now and transform your listening experience today!"
                    </div>
                  </Card>
                </div>
              </Card>
            </div>
          )}

          {currentDemo === 2 && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Advanced Trend Analyzer
                </h3>
                <p className="text-glass-muted mb-6 leading-relaxed">
                  Stay ahead of your competition with real-time market insights
                  and trending topics specific to your industry. Our AI analyzes
                  millions of data points to identify emerging opportunities and
                  provide actionable content suggestions.
                </p>
                <Card className="p-4">
                  <div className="text-sm text-glass-muted mb-3">
                    Sample Industry: "E-commerce & Online Retail"
                  </div>
                  <div className="space-y-2 text-sm text-white">
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Identified
                      20+ trending topics
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Calculated
                      market opportunity scores
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Generated
                      content suggestions
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Provided
                      competitor analysis
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✅</span> Weekly
                      trend updates included
                    </div>
                  </div>
                </Card>
              </div>
              <Card className="p-6">
                <div className="text-lg font-semibold text-white mb-4">
                  📊 Trend Analysis Results
                </div>
                <div className="space-y-3 text-sm">
                  <Card className="p-3">
                    <div className="text-white font-medium">🔥 Hot Trend:</div>
                    <div className="text-glass-muted">
                      "Sustainable packaging solutions" - 85% growth this month
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-white font-medium">
                      📈 Emerging Opportunity:
                    </div>
                    <div className="text-glass-muted">
                      "Voice commerce integration" - Early adoption phase
                    </div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-white font-medium">
                      💡 Content Suggestion:
                    </div>
                    <div className="text-yellow-300">
                      "How to implement eco-friendly shipping in 2024"
                    </div>
                  </Card>
                </div>
              </Card>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default DemoShowcase;
