'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Palette,
  Search,
  Filter,
  Star,
  Download,
  Eye,
  Heart,
  ShoppingCart,
  Grid,
  List,
  Tag,
  Calendar,
  User
} from 'lucide-react';

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Templates', count: 156 },
    { id: 'sale', name: 'Sale & Discount', count: 23 },
    { id: 'festival', name: 'Festival & Holiday', count: 18 },
    { id: 'product', name: 'Product Launch', count: 31 },
    { id: 'minimal', name: 'Minimal', count: 25 },
    { id: 'fashion', name: 'Fashion', count: 19 },
    { id: 'tech', name: 'Technology', count: 15 },
    { id: 'food', name: 'Food & Restaurant', count: 12 },
    { id: 'fitness', name: 'Fitness & Health', count: 13 }
  ];

  const templates = [
    {
      id: 1,
      title: 'Summer Sale Banner',
      category: 'sale',
      description: 'Eye-catching banner perfect for summer sales and promotions',
      image: '/api/placeholder/300/200',
      price: 0,
      isPremium: false,
      downloads: 1247,
      rating: 4.8,
      tags: ['sale', 'summer', 'banner', 'promotion'],
      author: 'Design Studio',
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      title: 'New Year Celebration',
      category: 'festival',
      description: 'Festive design for New Year celebrations and announcements',
      image: '/api/placeholder/300/200',
      price: 9.99,
      isPremium: true,
      downloads: 892,
      rating: 4.9,
      tags: ['new year', 'celebration', 'festive', 'gold'],
      author: 'Creative Agency',
      createdAt: '2024-01-08'
    },
    {
      id: 3,
      title: 'Tech Product Launch',
      category: 'tech',
      description: 'Modern and sleek design for technology product launches',
      image: '/api/placeholder/300/200',
      price: 0,
      isPremium: false,
      downloads: 2156,
      rating: 4.7,
      tags: ['tech', 'product', 'launch', 'modern'],
      author: 'Tech Design Co.',
      createdAt: '2024-01-12'
    },
    {
      id: 4,
      title: 'Fashion Lookbook',
      category: 'fashion',
      description: 'Elegant template for fashion brands and clothing collections',
      image: '/api/placeholder/300/200',
      price: 14.99,
      isPremium: true,
      downloads: 634,
      rating: 4.6,
      tags: ['fashion', 'lookbook', 'elegant', 'style'],
      author: 'Fashion Studio',
      createdAt: '2024-01-05'
    },
    {
      id: 5,
      title: 'Minimal Business Card',
      category: 'minimal',
      description: 'Clean and professional business card design',
      image: '/api/placeholder/300/200',
      price: 0,
      isPremium: false,
      downloads: 3421,
      rating: 4.9,
      tags: ['minimal', 'business', 'card', 'professional'],
      author: 'Minimal Design',
      createdAt: '2024-01-15'
    },
    {
      id: 6,
      title: 'Restaurant Menu',
      category: 'food',
      description: 'Appetizing menu design for restaurants and cafes',
      image: '/api/placeholder/300/200',
      price: 7.99,
      isPremium: true,
      downloads: 456,
      rating: 4.5,
      tags: ['restaurant', 'menu', 'food', 'appetizing'],
      author: 'Food Design',
      createdAt: '2024-01-03'
    },
    {
      id: 7,
      title: 'Fitness Challenge',
      category: 'fitness',
      description: 'Motivational design for fitness challenges and programs',
      image: '/api/placeholder/300/200',
      price: 0,
      isPremium: false,
      downloads: 1789,
      rating: 4.8,
      tags: ['fitness', 'challenge', 'motivation', 'health'],
      author: 'Fit Design',
      createdAt: '2024-01-11'
    },
    {
      id: 8,
      title: 'Black Friday Sale',
      category: 'sale',
      description: 'High-converting design for Black Friday sales events',
      image: '/api/placeholder/300/200',
      price: 12.99,
      isPremium: true,
      downloads: 987,
      rating: 4.7,
      tags: ['black friday', 'sale', 'discount', 'conversion'],
      author: 'Sale Experts',
      createdAt: '2024-01-07'
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template) => {
    // Redirect to poster editor with template
    console.log('Using template:', template);
  };

  const handlePreviewTemplate = (template) => {
    // Show template preview
    console.log('Previewing template:', template);
  };

  const handleDownloadTemplate = (template) => {
    // Handle template download
    console.log('Downloading template:', template);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Templates Marketplace</h1>
        <p className="text-gray-600 mt-2">Choose from hundreds of professionally designed templates</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="category-filter">Category:</Label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="sort-by">Sort by:</Label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="downloads">Most Downloaded</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Browse by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} templates</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="aspect-[3/2] bg-gray-100 rounded-t-lg flex items-center justify-center">
                <Palette className="h-12 w-12 text-gray-400" />
              </div>
              {template.isPremium && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Premium
                </div>
              )}
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                {template.price === 0 ? 'Free' : `$${template.price}`}
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{template.title}</h3>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm text-gray-600">{template.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {template.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Download className="h-4 w-4" />
                  <span>{template.downloads.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{template.author}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleUseTemplate(template)}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePreviewTemplate(template)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownloadTemplate(template)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Featured Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Featured Templates
          </CardTitle>
          <CardDescription>Hand-picked templates from our design team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.slice(0, 3).map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="aspect-[3/2] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <Palette className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{template.downloads} downloads</span>
                  <Button size="sm" onClick={() => handleUseTemplate(template)}>
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
