'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useIntegrations } from '@/lib/hooks/useIntegrations';

const platformConfig = {
  facebook: { name: 'Facebook', icon: '📘', color: 'bg-blue-500' },
  instagram: { name: 'Instagram', icon: '📷', color: 'bg-pink-500' },
  wordpress: { name: 'WordPress', icon: '🌐', color: 'bg-gray-600' },
  medium: { name: 'Medium', icon: '📝', color: 'bg-green-600' }
};

export default function ContentPublisher({ content, mediaUrls = [] }) {
  const { integrations, publishContent, getIntegrationStatus } = useIntegrations();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [publishing, setPublishing] = useState(false);
  const [results, setResults] = useState({});
  const [mediaInput, setMediaInput] = useState('');

  const connectedPlatforms = integrations.filter(integration => integration.isActive);

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleMediaAdd = () => {
    if (mediaInput.trim()) {
      // In a real app, you'd validate the URL and possibly upload the file
      mediaUrls.push(mediaInput.trim());
      setMediaInput('');
    }
  };

  const handlePublish = async () => {
    if (selectedPlatforms.length === 0) {
      alert('Please select at least one platform to publish to.');
      return;
    }

    setPublishing(true);
    setResults({});

    const publishPromises = selectedPlatforms.map(async (platform) => {
      try {
        const result = await publishContent(platform, content, mediaUrls);
        return { platform, success: true, result };
      } catch (error) {
        return { platform, success: false, error: error.message };
      }
    });

    const publishResults = await Promise.all(publishPromises);
    const resultsMap = {};
    
    publishResults.forEach(({ platform, success, result, error }) => {
      resultsMap[platform] = { success, result, error };
    });

    setResults(resultsMap);
    setPublishing(false);
  };

  if (connectedPlatforms.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Connected Platforms</h3>
          <p className="text-gray-600 mb-4">
            You need to connect at least one platform before you can publish content.
          </p>
          <Button 
            onClick={() => window.location.href = '/integrations'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go to Integrations
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Publish Content</h3>
      
      {/* Content Preview */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Content Preview:</h4>
        <p className="text-gray-900 whitespace-pre-wrap">{content}</p>
        {mediaUrls.length > 0 && (
          <div className="mt-3">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Media:</h5>
            <div className="space-y-1">
              {mediaUrls.map((url, index) => (
                <p key={index} className="text-sm text-blue-600 break-all">{url}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Media URLs Input */}
      <div className="mb-6">
        <Label htmlFor="media-urls">Media URLs (optional)</Label>
        <div className="flex space-x-2 mt-2">
          <Input
            id="media-urls"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={mediaInput}
            onChange={(e) => setMediaInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleMediaAdd()}
          />
          <Button onClick={handleMediaAdd} variant="outline">
            Add
          </Button>
        </div>
      </div>

      {/* Platform Selection */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Select Platforms to Publish To:
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {connectedPlatforms.map((integration) => {
            const config = platformConfig[integration.platform];
            const isSelected = selectedPlatforms.includes(integration.platform);
            
            return (
              <button
                key={integration.platform}
                onClick={() => handlePlatformToggle(integration.platform)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center text-lg mx-auto mb-2`}>
                  {config.icon}
                </div>
                <p className="text-sm font-medium text-gray-900">{config.name}</p>
                <div className="flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Publish Button */}
      <Button
        onClick={handlePublish}
        disabled={publishing || selectedPlatforms.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {publishing ? 'Publishing...' : `Publish to ${selectedPlatforms.length} Platform${selectedPlatforms.length > 1 ? 's' : ''}`}
      </Button>

      {/* Results */}
      {Object.keys(results).length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Publishing Results:</h4>
          {Object.entries(results).map(([platform, result]) => {
            const config = platformConfig[platform];
            return (
              <div
                key={platform}
                className={`p-3 rounded-lg border ${
                  result.success 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded ${config.color} flex items-center justify-center text-sm`}>
                    {config.icon}
                  </div>
                  <span className="font-medium text-gray-900">{config.name}</span>
                  <span className={`text-sm ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                    {result.success ? '✓ Published' : '✗ Failed'}
                  </span>
                </div>
                {result.success && result.result?.url && (
                  <a
                    href={result.result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline mt-1 block"
                  >
                    View Post →
                  </a>
                )}
                {!result.success && (
                  <p className="text-sm text-red-600 mt-1">{result.error}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
