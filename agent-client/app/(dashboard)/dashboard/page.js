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
  Users,
  Eye,
  Heart,
  SquareUser
} from 'lucide-react';

export default function DashboardPage() {

  const quickCreateOptions = [
    { type: 'posters', label: 'Create Poster', icon: Image, color: 'bg-blue-500' },
    { type: 'content/blog', label: 'Write Blog', icon: FileText, color: 'bg-green-500' },
    { type: 'virtual-try-on', label: 'Virtual Try-on', icon: SquareUser, color: 'bg-purple-500' }
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
              <Link key={option.type} href={`/${option.type}`}>
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
    </div>
  );
}
