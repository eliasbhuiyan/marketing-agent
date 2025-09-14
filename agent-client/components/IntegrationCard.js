'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIntegrations } from '@/lib/hooks/useIntegrations';

const platformConfig = {
  facebook: {
    name: 'Facebook',
    description: 'Connect your Facebook page to publish posts and manage content',
    icon: '📘',
    color: 'bg-blue-500',
    requirements: 'Requires a Facebook page'
  },
  instagram: {
    name: 'Instagram',
    description: 'Connect your Instagram Business account to publish posts and stories',
    icon: '📷',
    color: 'bg-pink-500',
    requirements: 'Requires Instagram Business account linked to Facebook page'
  },
  wordpress: {
    name: 'WordPress',
    description: 'Connect your WordPress.com site to publish blog posts',
    icon: '🌐',
    color: 'bg-gray-600',
    requirements: 'Requires WordPress.com account'
  },
  medium: {
    name: 'Medium',
    description: 'Connect your Medium account to publish articles',
    icon: '📝',
    color: 'bg-green-600',
    requirements: 'Requires Medium account'
  }
};

export default function IntegrationCard({ platform }) {
  const { connectPlatform, disconnectPlatform, getIntegrationStatus } = useIntegrations();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const config = platformConfig[platform];
  const status = getIntegrationStatus(platform);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectPlatform(platform);
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      await disconnectPlatform(platform);
    } catch (error) {
      console.error('Disconnection failed:', error);
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-lg ${config.color} flex items-center justify-center text-2xl`}>
            {config.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{config.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{config.description}</p>
            <p className="text-xs text-gray-500 mt-2">{config.requirements}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          {status.isConnected ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">
                  {status.isActive ? 'Connected' : 'Inactive'}
                </span>
              </div>
              {status.connectedAt && (
                <p className="text-xs text-gray-500">
                  Connected {new Date(status.connectedAt).toLocaleDateString()}
                </p>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                disabled={isDisconnecting}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
              </Button>
            </>
          ) : (
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isConnecting ? 'Connecting...' : 'Connect'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
