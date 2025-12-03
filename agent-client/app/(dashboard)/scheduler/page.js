'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Clock,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Filter,
  Search
} from 'lucide-react';
import Image from 'next/image';

export default function SchedulerPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // week, month, day
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'text-blue-400' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600' }
  ];

  // Mock scheduled posts data
  const scheduledPosts = [
    {
      id: 1,
      title: 'New Product Launch',
      content: 'Exciting news! Our latest product is here to revolutionize your daily routine. Experience the perfect blend of innovation and style.',
      platforms: ['instagram', 'facebook'],
      scheduledTime: '2024-01-15T14:00:00',
      status: 'scheduled',
      image: '/api/placeholder/300/200',
      engagement: { reach: '45.2K', likes: '2.1K', comments: '156', shares: '89' }
    },
    {
      id: 2,
      title: 'Weekly Newsletter',
      content: 'This week\'s insights: AI trends, marketing tips, and industry updates. Don\'t miss out on the latest developments!',
      platforms: ['linkedin', 'twitter'],
      scheduledTime: '2024-01-15T16:30:00',
      status: 'scheduled',
      engagement: { reach: '23.8K', likes: '890', comments: '67', shares: '34' }
    },
    {
      id: 3,
      title: 'Behind the Scenes',
      content: 'Take a look at our creative process and the team behind our amazing products. Meet the people who make it all possible!',
      platforms: ['instagram', 'youtube'],
      scheduledTime: '2024-01-16T10:00:00',
      status: 'scheduled',
      image: '/api/placeholder/300/200',
      engagement: { reach: '67.1K', likes: '3.4K', comments: '234', shares: '156' }
    },
    {
      id: 4,
      title: 'Industry Insights',
      content: 'The future of marketing is here. Discover how AI is transforming content creation and what it means for your business.',
      platforms: ['linkedin'],
      scheduledTime: '2024-01-16T15:00:00',
      status: 'scheduled',
      engagement: { reach: '12.3K', likes: '456', comments: '89', shares: '23' }
    }
  ];

  const getPlatformIcon = (platformId) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? platform.icon : null;
  };

  const getPlatformColor = (platformId) => {
    const platform = platforms.find(p => p.id === platformId);
    return platform ? platform.color : 'text-gray-600';
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleCreatePost = () => {
    setShowCreateModal(true);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowCreateModal(true);
  };

  const handleDeletePost = (postId) => {
    // Handle delete logic
    console.log('Deleting post:', postId);
  };

  const handlePausePost = (postId) => {
    // Handle pause logic
    console.log('Pausing post:', postId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Social Media Scheduler</h1>
          <p className="text-gray-600 mt-2">Schedule and manage your social media posts across all platforms</p>
        </div>
        <Button onClick={handleCreatePost} className="flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="view-mode">View:</Label>
                <select
                  id="view-mode"
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="date-picker">Date:</Label>
                <Input
                  id="date-picker"
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Calendar View
          </CardTitle>
          <CardDescription>Drag and drop posts to reschedule them</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-6 min-h-[600px]">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(selectedDate);
                date.setDate(date.getDate() - date.getDay() + i);
                const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <div
                    key={i}
                    className={`min-h-[100px] p-2 border border-gray-200 rounded-lg ${
                      isCurrentMonth ? 'bg-white' : 'bg-gray-100'
                    } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className={`text-sm font-medium mb-2 ${
                      isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    {/* Posts for this day */}
                    <div className="space-y-1">
                      {scheduledPosts
                        .filter(post => {
                          const postDate = new Date(post.scheduledTime);
                          return postDate.toDateString() === date.toDateString();
                        })
                        .map((post) => (
                          <div
                            key={post.id}
                            className="bg-blue-100 text-blue-800 text-xs p-1 rounded cursor-pointer hover:bg-blue-200"
                            onClick={() => handleEditPost(post)}
                          >
                            <div className="flex items-center space-x-1">
                              {post.platforms.map((platformId) => {
                                const Icon = getPlatformIcon(platformId);
                                return Icon ? (
                                  <Icon key={platformId} className={`h-3 w-3 ${getPlatformColor(platformId)}`} />
                                ) : null;
                              })}
                              <span className="truncate">{post.title}</span>
                            </div>
                            <div className="text-xs text-blue-600">
                              {formatTime(post.scheduledTime)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Posts</CardTitle>
          <CardDescription>Manage your upcoming social media posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{post.title}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {post.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(post.scheduledTime)} at {formatTime(post.scheduledTime)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {post.platforms.map((platformId) => {
                          const Icon = getPlatformIcon(platformId);
                          return Icon ? (
                            <Icon key={platformId} className={`h-4 w-4 ${getPlatformColor(platformId)}`} />
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {post.image && (
                    <div className="ml-4">
                      <Image
                        width={80}
                        height={80}
                        src={post.image}
                        alt="Post preview"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
                
                {/* Engagement Metrics */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.engagement.reach}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="h-4 w-4" />
                      <span>{post.engagement.shares}</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditPost(post)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handlePausePost(post.id)}>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeletePost(post.id)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>
                {selectedPost ? 'Edit Post' : 'Create New Post'}
              </CardTitle>
              <CardDescription>
                {selectedPost ? 'Update your scheduled post' : 'Schedule a new social media post'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="post-title">Post Title</Label>
                <Input
                  id="post-title"
                  placeholder="Enter post title..."
                  defaultValue={selectedPost?.title || ''}
                />
              </div>
              
              <div>
                <Label htmlFor="post-content">Content</Label>
                <textarea
                  id="post-content"
                  className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none"
                  placeholder="Write your post content..."
                  defaultValue={selectedPost?.content || ''}
                />
              </div>
              
              <div>
                <Label>Select Platforms</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {platforms.map((platform) => (
                    <label key={platform.id} className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="checkbox" 
                        className="rounded"
                        defaultChecked={selectedPost?.platforms?.includes(platform.id)}
                      />
                      <platform.icon className={`h-5 w-5 ${platform.color}`} />
                      <span className="text-sm">{platform.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="schedule-date">Schedule Date</Label>
                  <Input
                    id="schedule-date"
                    type="date"
                    defaultValue={selectedPost?.scheduledTime ? selectedPost.scheduledTime.split('T')[0] : ''}
                  />
                </div>
                <div>
                  <Label htmlFor="schedule-time">Schedule Time</Label>
                  <Input
                    id="schedule-time"
                    type="time"
                    defaultValue={selectedPost?.scheduledTime ? selectedPost.scheduledTime.split('T')[1].substring(0, 5) : ''}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button>
                  {selectedPost ? 'Update Post' : 'Schedule Post'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
