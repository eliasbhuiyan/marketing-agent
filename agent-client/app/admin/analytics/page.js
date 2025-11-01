"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  TrendingUp, 
  Image, 
  FileText, 
  Video, 
  Sparkles,
  BarChart3
} from "lucide-react";

export default function AnalyticsPage() {
  // Mock data
  const featureUsage = [
    { name: "AI Image Generator", usage: 12450, color: "bg-blue-500", icon: Image },
    { name: "Blog Generator", usage: 8900, color: "bg-purple-500", icon: FileText },
    { name: "Script Writer", usage: 7200, color: "bg-pink-500", icon: Video },
    { name: "Caption Generator", usage: 6500, color: "bg-green-500", icon: FileText },
    { name: "Thumbnail Generator", usage: 4800, color: "bg-yellow-500", icon: Image },
    { name: "Hashtag Generator", usage: 3200, color: "bg-indigo-500", icon: Sparkles },
  ];

  const topBrands = [
    { name: "TechCorp", activity: 12500, change: +12.5 },
    { name: "DesignStudio", activity: 9800, change: +8.3 },
    { name: "FashionBrand", activity: 8700, change: -2.1 },
    { name: "MarketingPro", activity: 6500, change: +15.2 },
    { name: "StartupXYZ", activity: 5200, change: +5.7 },
  ];

  const maxUsage = Math.max(...featureUsage.map(f => f.usage));
  const maxActivity = Math.max(...topBrands.map(b => b.activity));

  // Credit usage trend data (last 30 days)
  const creditTrend = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    credits: Math.floor(Math.random() * 1000) + 500
  }));

  const maxCredits = Math.max(...creditTrend.map(t => t.credits));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Usage & Analytics</h1>
        <p className="text-white/70 mt-1">Comprehensive insights into platform usage and performance</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Credits Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">145,230</div>
            <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,247</div>
            <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.3% this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Avg. Tasks/Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2,450</div>
            <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +15.2% this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Feature Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{featureUsage.length}</div>
            <p className="text-xs text-white/60 mt-1">Active features</p>
          </CardContent>
        </Card>
      </div>

      {/* Credit Usage Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Credit Usage Trends (Last 30 Days)</CardTitle>
          <CardDescription className="text-white/60">Daily credit consumption over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 relative">
            <div className="absolute inset-0 flex items-end justify-between gap-1">
              {creditTrend.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 bg-blue-500 rounded-t hover:bg-blue-400 transition-colors group relative"
                  style={{ height: `${(item.credits / maxCredits) * 100}%` }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Day {item.day}: {item.credits} credits
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between text-xs text-white/60">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>

      {/* Most Used Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Most Used Features</CardTitle>
          <CardDescription className="text-white/60">Top features by usage count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featureUsage.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${feature.color.replace('bg-', 'bg-')} bg-opacity-20`}>
                        <Icon className={`h-5 w-5 ${feature.color.replace('bg-', 'text-')}`} />
                      </div>
                      <span className="text-white font-medium">{feature.name}</span>
                    </div>
                    <span className="text-white font-semibold">{feature.usage.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${feature.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${(feature.usage / maxUsage) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Brands by Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Top Brands by Activity</CardTitle>
          <CardDescription className="text-white/60">Most active brands this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topBrands.map((brand, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{brand.name}</div>
                    <div className="text-sm text-white/60">{brand.activity.toLocaleString()} activities</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`text-sm font-medium ${
                    brand.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {brand.change > 0 ? '+' : ''}{brand.change}%
                  </div>
                  <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(brand.activity / maxActivity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

