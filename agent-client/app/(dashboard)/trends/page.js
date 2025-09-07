'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  TrendingUp, 
  Search, 
  Hash,
  Globe,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  RefreshCw,
  Filter,
  Target,
  Zap,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Copy,
  Edit,
  Calendar
} from 'lucide-react';

export default function TrendsPage() {
  const [activePlatform, setActivePlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [trends, setTrends] = useState([]);
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: Globe, color: 'text-gray-600' },
    { id: 'google', name: 'Google', icon: Search, color: 'text-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { id: 'tiktok', name: 'TikTok', icon: Target, color: 'text-black' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'text-blue-400' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-700' }
  ];

  // Mock data for trends
  const mockTrends = [
    {
      id: 1,
      title: 'AI Marketing Tools',
      platform: 'google',
      category: 'Technology',
      growth: '+45%',
      volume: '2.3M',
      engagement: 'High',
      hashtags: ['#AIMarketing', '#MarketingTech', '#Automation'],
      description: 'Growing interest in AI-powered marketing solutions'
    },
    {
      id: 2,
      title: 'Sustainable Fashion',
      platform: 'instagram',
      category: 'Lifestyle',
      growth: '+32%',
      volume: '1.8M',
      engagement: 'High',
      hashtags: ['#SustainableFashion', '#EcoFriendly', '#GreenFashion'],
      description: 'Eco-conscious fashion choices trending globally'
    },
    {
      id: 3,
      title: 'Remote Work Tips',
      platform: 'linkedin',
      category: 'Business',
      growth: '+28%',
      volume: '950K',
      engagement: 'Medium',
      hashtags: ['#RemoteWork', '#WorkFromHome', '#Productivity'],
      description: 'Tips and tools for effective remote work'
    },
    {
      id: 4,
      title: 'Healthy Recipes',
      platform: 'tiktok',
      category: 'Food',
      growth: '+67%',
      volume: '3.1M',
      engagement: 'Very High',
      hashtags: ['#HealthyRecipes', '#FoodTok', '#Cooking'],
      description: 'Quick and healthy recipe videos going viral'
    },
    {
      id: 5,
      title: 'Cryptocurrency News',
      platform: 'twitter',
      category: 'Finance',
      growth: '+23%',
      volume: '1.2M',
      engagement: 'Medium',
      hashtags: ['#Crypto', '#Bitcoin', '#Blockchain'],
      description: 'Latest developments in cryptocurrency markets'
    }
  ];

  // Mock data for suggested posts
  const mockSuggestedPosts = [
    {
      id: 1,
      title: 'AI Marketing Revolution',
      content: 'Discover how AI is transforming marketing strategies. From automated content creation to predictive analytics, the future is here!',
      platform: 'LinkedIn',
      engagement: 'High',
      hashtags: ['#AIMarketing', '#MarketingTech', '#Innovation'],
      estimatedReach: '45K'
    },
    {
      id: 2,
      title: 'Sustainable Fashion Guide',
      content: '5 simple ways to make your wardrobe more sustainable. Small changes, big impact! 🌱',
      platform: 'Instagram',
      engagement: 'Very High',
      hashtags: ['#SustainableFashion', '#EcoFriendly', '#GreenLiving'],
      estimatedReach: '78K'
    },
    {
      id: 3,
      title: 'Remote Work Productivity',
      content: 'Top 10 tools that transformed my remote work productivity. Game changers! 💼',
      platform: 'Twitter',
      engagement: 'Medium',
      hashtags: ['#RemoteWork', '#Productivity', '#WorkFromHome'],
      estimatedReach: '23K'
    }
  ];

  useEffect(() => {
    setTrends(mockTrends);
    setSuggestedPosts(mockSuggestedPosts);
  }, []);

  const handleRefreshTrends = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleSearchTrends = () => {
    // Handle trend search
    console.log('Searching trends for:', searchQuery);
  };

  const filteredTrends = activePlatform === 'all' 
    ? trends 
    : trends.filter(trend => trend.platform === activePlatform);

  const getEngagementColor = (engagement) => {
    switch (engagement) {
      case 'Very High': return 'text-green-600 bg-green-100';
      case 'High': return 'text-blue-600 bg-blue-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Trend Analyzer</h1>
        <p className="text-gray-600 mt-2">Monitor real-time trends and get AI-powered content suggestions</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="trend-search">Search Trends</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="trend-search"
                  placeholder="Search for specific trends or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearchTrends}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleRefreshTrends}
                disabled={isLoading}
                variant="outline"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter by Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Button
                key={platform.id}
                variant={activePlatform === platform.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActivePlatform(platform.id)}
                className="flex items-center space-x-2"
              >
                <platform.icon className={`h-4 w-4 ${platform.color}`} />
                <span>{platform.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Live Trends Feed */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Live Trends Feed
              </CardTitle>
              <CardDescription>Real-time trending topics across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTrends.map((trend) => (
                  <div key={trend.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {(() => {
                          const platform = platforms.find(p => p.id === trend.platform);
                          if (platform?.icon) {
                            const PlatformIcon = platform.icon;
                            return <PlatformIcon className={`h-5 w-5 ${platform.color}`} />;
                          }
                          return null;
                        })()}
                        <h3 className="font-semibold text-gray-900">{trend.title}</h3>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(trend.engagement)}`}>
                        {trend.engagement}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                          {trend.growth}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {trend.volume}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {trend.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {trend.hashtags.map((hashtag, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggested Post Ideas */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                AI Suggested Post Ideas
              </CardTitle>
              <CardDescription>Content suggestions based on current trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestedPosts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{post.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(post.engagement)}`}>
                        {post.engagement}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{post.content}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Platform:</span>
                        <span className="text-sm font-medium">{post.platform}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Est. Reach:</span>
                        <span className="text-sm font-medium text-green-600">{post.estimatedReach}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.hashtags.map((hashtag, index) => (
                        <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {hashtag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hashtag Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="h-5 w-5 mr-2" />
                Trending Hashtags
              </CardTitle>
              <CardDescription>Popular and niche hashtags for higher reach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Trending Hashtags</h4>
                  <div className="flex flex-wrap gap-2">
                    {['#AIMarketing', '#SustainableFashion', '#RemoteWork', '#HealthyRecipes', '#Crypto', '#TechTrends'].map((hashtag, index) => (
                      <span key={index} className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Niche Hashtags</h4>
                  <div className="flex flex-wrap gap-2">
                    {['#MarketingAutomation', '#EcoFashion', '#ProductivityHacks', '#CleanEating', '#BlockchainTech', '#DigitalMarketing'].map((hashtag, index) => (
                      <span key={index} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Branded Hashtags</h4>
                  <div className="flex flex-wrap gap-2">
                    {['#YourBrand', '#BrandStory', '#BrandCommunity', '#BrandValues'].map((hashtag, index) => (
                      <span key={index} className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
