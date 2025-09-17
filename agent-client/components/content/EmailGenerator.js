'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Copy, Download } from 'lucide-react';

export default function EmailGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [emailOptions, setEmailOptions] = useState({
    subject: "",
    purpose: "promotional",
    targetAudience: "",
    callToAction: ""
  });

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation for email
      setTimeout(() => {
        const sampleContent = "Subject: 🚀 Your Exclusive Invitation to Our Product Launch\n\nHi [Name],\n\nWe're thrilled to invite you to be among the first to experience our revolutionary new product!\n\n**What's New:**\n✨ Cutting-edge technology that solves real problems\n🎯 Designed with your needs in mind\n💎 Premium quality at an accessible price\n\n**Special Launch Offer:**\n- 30% off for the first 100 customers\n- Free shipping worldwide\n- 30-day money-back guarantee\n\n**Ready to transform your experience?**\n[Shop Now] [Learn More]\n\nBest regards,\nThe Marketing Team";
        setGeneratedContent(sampleContent);
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("Failed to generate content. Please try again.");
      setIsGenerating(false);
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleExportEmail = () => {
    // Handle email export
    console.log('Exporting email...');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Panel - Input Form */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Marketing Settings</CardTitle>
            <CardDescription>Configure your email campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email-subject">Email Subject</Label>
              <Input
                id="email-subject"
                placeholder="e.g., Special Offer Inside!"
                value={emailOptions.subject}
                onChange={(e) => setEmailOptions({...emailOptions, subject: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email-purpose">Email Purpose</Label>
              <select 
                id="email-purpose"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={emailOptions.purpose}
                onChange={(e) => setEmailOptions({...emailOptions, purpose: e.target.value})}
              >
                <option value="promotional">Promotional</option>
                <option value="newsletter">Newsletter</option>
                <option value="welcome">Welcome Email</option>
                <option value="follow-up">Follow-up</option>
              </select>
            </div>
            <div>
              <Label htmlFor="email-audience">Target Audience</Label>
              <Input
                id="email-audience"
                placeholder="e.g., New customers, Existing subscribers"
                value={emailOptions.targetAudience}
                onChange={(e) => setEmailOptions({...emailOptions, targetAudience: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email-cta">Call to Action</Label>
              <Input
                id="email-cta"
                placeholder="e.g., Shop Now, Learn More, Sign Up"
                value={emailOptions.callToAction}
                onChange={(e) => setEmailOptions({...emailOptions, callToAction: e.target.value})}
              />
            </div>
            <Button 
              onClick={handleGenerateContent} 
              className="w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Email
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Generated Content */}
      <div className="space-y-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Generated Email</CardTitle>
            <CardDescription>Your AI-generated email will appear here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md min-h-[200px] whitespace-pre-wrap">
                  {generatedContent}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleCopyContent}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Email
                  </Button>
                  <Button variant="outline" onClick={handleExportEmail}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] bg-gray-50 rounded-md">
                <p className="text-gray-500">Fill in the form and click Generate to create an email</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}