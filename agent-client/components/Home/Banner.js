import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const Banner = () => {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white fade-in">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              All-in-One AI Marketing Agent for Your
              <span className="text-yellow-300"> Business Growth</span>
            </h1>
            <p className="text-xl mb-8 text-glass-muted leading-relaxed">
              Transform your marketing strategy with our comprehensive AI
              platform. Create compelling blogs, generate product descriptions,
              write engaging video scripts, analyze market trends, and publish
              across all platforms — everything you need in one powerful
              solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="glass" className="px-8 py-4 text-lg pulse-glow">
                🚀 Get Started Free
              </Button>
            </div>
          </div>
          <div className="floating">
            <Card>
              <CardHeader>
                <CardTitle>🎯 AI Marketing Dashboard</CardTitle>
                <CardDescription>
                  Real-time content generation and multi-platform publishing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <Card className="glass-button p-3 rounded-lg text-sm text-white">
                    ✨ Blog post generated and optimized for SEO
                  </Card>
                  <Card className="glass-button p-3 rounded-lg text-sm text-white">
                    📱 Successfully posted to 5 social platforms
                  </Card>
                  <Card className="glass-button p-3 rounded-lg text-sm text-white">
                    📈 Market trend analysis completed
                  </Card>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="text-center p-3">
                    <div className="text-2xl mb-1">📝</div>
                    <div className="text-sm font-medium text-white">
                      Blog Writer
                    </div>
                  </Card>
                  <Card className="text-center p-3">
                    <div className="text-2xl mb-1">📊</div>
                    <div className="text-sm font-medium text-white">
                      Trend Analyzer
                    </div>
                  </Card>
                  <Card className="text-center p-3">
                    <div className="text-2xl mb-1">🎬</div>
                    <div className="text-sm font-medium text-white">
                      Script Writer
                    </div>
                  </Card>
                  <Card className="text-center p-3">
                    <div className="text-2xl mb-1">🌐</div>
                    <div className="text-sm font-medium text-white">
                      Auto Publisher
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
