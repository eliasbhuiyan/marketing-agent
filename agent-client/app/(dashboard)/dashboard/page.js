'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Image, 
  FileText, 
  TrendingUp, 
  Calendar,
  Plus,
  BarChart3,
  Clock,
  Users,
  Eye,
  Heart,
  MessageCircle
} from 'lucide-react';

export default function DashboardPage() {
  const [quickCreateType, setQuickCreateType] = useState('');

  const quickCreateOptions = [
    { type: 'poster', label: 'Create Poster', icon: Image, color: 'bg-blue-500' },
    { type: 'blog', label: 'Write Blog', icon: FileText, color: 'bg-green-500' },
    { type: 'caption', label: 'Generate Caption', icon: MessageCircle, color: 'bg-purple-500' }
  ];

  const scheduledPosts = [
    { id: 1, platform: 'Instagram', content: 'New product launch poster', time: '2:00 PM', status: 'scheduled' },
    { id: 2, platform: 'Facebook', content: 'Weekly newsletter', time: '3:30 PM', status: 'scheduled' },
    { id: 3, platform: 'LinkedIn', content: 'Industry insights blog', time: '5:00 PM', status: 'scheduled' }
  ];

  const recentTrends = [
    { trend: '#SustainableFashion', platform: 'Instagram', growth: '+25%' },
    { trend: 'AI Marketing Tools', platform: 'Google', growth: '+40%' },
    { trend: 'Video Content', platform: 'TikTok', growth: '+60%' }
  ];

  const analytics = [
    { label: 'Total Posts', value: '1,234', change: '+12%', icon: FileText },
    { label: 'Engagement Rate', value: '8.5%', change: '+2.1%', icon: Heart },
    { label: 'Reach', value: '45.2K', change: '+18%', icon: Eye },
    { label: 'Followers', value: '12.8K', change: '+5.2%', icon: Users }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-white mt-2">Welcome back! Here&apos;s what&apos;s happening with your marketing.</p>
      </div>

      {/* Quick Create Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Plus className="h-5 w-5 mr-2" />
            Quick Create
          </CardTitle>
          <CardDescription className="text-white">Start creating content in seconds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickCreateOptions.map((option) => (
              <Link key={option.type} href={`/${option.type === 'poster' ? 'posters' : option.type === 'blog' ? 'content' : 'content'}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <option.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-white">{option.label}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analytics.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white">{stat.change}</p>
                </div>
                <div className="p-3 bg-white/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Scheduled Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Scheduled Posts
              </div>
              <Link href="/scheduler">
                <Button variant="outline" size="sm" className="text-white">View All</Button>
              </Link>
            </CardTitle>
            <CardDescription className="text-white">Your upcoming social media posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-white">{post.content}</p>
                      <p className="text-sm text-white">{post.platform}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{post.time}</p>
                    <p className="text-xs text-white">Today</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Trending Now
              </div>
              <Link href="/trends">
                <Button variant="outline" size="sm" className="text-white">View All</Button>
              </Link>
            </CardTitle>
            <CardDescription className="text-white">Current trending topics and hashtags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <div>
                    <p className="font-medium text-white">{trend.trend}</p>
                    <p className="text-sm text-white">{trend.platform}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{trend.growth}</p>
                    <p className="text-xs text-white">Growth</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Clock className="h-5 w-5 mr-2" />
            Recent Activity
          </CardTitle>
          <CardDescription className="text-white">Your latest marketing activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Image className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">Created new product poster</p>
                <p className="text-sm text-white">2 hours ago</p>
              </div>
              <Button variant="outline" size="sm" className="text-white">View</Button>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">Published blog post</p>
                <p className="text-sm text-white">5 hours ago</p>
              </div>
              <Button variant="outline" size="sm" className="text-white">View</Button>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">Scheduled 3 posts</p>
                <p className="text-sm text-white">1 day ago</p>
              </div>
              <Button variant="outline" size="sm" className="text-white">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
