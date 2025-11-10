"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Link as LinkIcon,
  Facebook,
  Instagram,
  Globe,
  Bold,
  RefreshCw,
} from "lucide-react";
import { useIntegrations } from "@/lib/hooks/useIntegrations";
import { getBrandId } from "@/lib/utils";
import CreateBrandFirstMessage from "@/components/CreateBrandFirstMessage";

export default function IntegrationsPage() {
  const [error, setError] = useState("");
  const { integrations, connectPlatform, disconnectPlatform, refreshIntegrations } = useIntegrations();

  // WordPress connect modal state
  const [wpOpen, setWpOpen] = useState(false);
  const [wpSiteUrl, setWpSiteUrl] = useState("");
  const [wpUsername, setWpUsername] = useState("");
  const [wpPassword, setWpPassword] = useState("");
  const [wpBusy, setWpBusy] = useState(false);
  const [wpError, setWpError] = useState("");

  // Blogger connect modal state
  const [bloggerOpen, setBloggerOpen] = useState(false);
  const [bloggerSiteName, setBloggerSiteName] = useState("");
  const [bloggerBlogId, setBloggerBlogId] = useState("");
  const [bloggerBusy, setBloggerBusy] = useState(false);
  const [bloggerError, setBloggerError] = useState("");

  // Facebook connect modal state
  const [facebookOpen, setFacebookOpen] = useState(false);
  const [facebookAppId, setFacebookAppId] = useState("");
  const [facebookAppSecret, setFacebookAppSecret] = useState("");
  const [facebookBusy, setFacebookBusy] = useState(false);
  const [facebookError, setFacebookError] = useState("");

  // Define available platforms
  const availablePlatforms = [
    {
      id: 1,
      platform: "facebook",
      name: "Facebook",
      description: "Connect your Facebook page to publish posts",
      icon: Facebook,
      bg: "bg-blue-600",
    },
    {
      id: 2,
      platform: "instagram",
      name: "Instagram",
      description: "Connect your Instagram Business account",
      icon: Instagram,
      bg: "bg-[linear-gradient(to_right,_#833ab4,_#fd1d1d,_#fcb045)]",
    },
    {
      id: 3,
      platform: "wordpress",
      name: "WordPress",
      description: "Connect your WordPress.com site",
      icon: Globe,
      bg: "bg-[#0073aa]",
    },
    {
      id: 5,
      platform: "blogger",
      name: "Blogger",
      description: "Connect your Google Blogger account",
      icon: Bold,
      bg: "bg-yellow-400",
    },
  ];

  const handleConnectAccount = async (platform) => {
    try {
      console.log("platform", platform);

      if (platform === 'wordpress') {
        setWpError("");
        setWpOpen(true);
        return;
      }

      if (platform === 'blogger') {
        setBloggerError("");
        setBloggerOpen(true);
        return;
      }

      if (platform === 'facebook') {
        setFacebookError("");
        setFacebookOpen(true);
        return;
      }

      await connectPlatform(platform);
    } catch (error) {
      console.error('Failed to connect platform:', error);
      setError(`Failed to connect ${platform}: ${error.message}`);
    }
  };

  const handleConnectWordPress = async () => {
    try {
      setWpBusy(true);
      setWpError("");
      if (!wpSiteUrl || !wpUsername || !wpPassword) {
        setWpError('All fields are required');
        return;
      }
      const payload = { credentials: { siteUrl: wpSiteUrl.trim(), username: wpUsername.trim(), appPassword: wpPassword } };
      const data = await connectPlatform('wordpress', payload);
      if (data?.integration || data?.message) {
        setWpOpen(false);
        setWpSiteUrl("");
        setWpUsername("");
        setWpPassword("");
        await refreshIntegrations();
      }
    } catch (e) {
      setWpError(e?.message || 'Failed to connect WordPress');
    } finally {
      setWpBusy(false);
    }
  };

  const handleConnectBlogger = async () => {
    try {
      setBloggerBusy(true);
      setBloggerError("");
      if (!bloggerSiteName || !bloggerBlogId) {
        setBloggerError('Site name and Blog ID are required');
        return;
      }
      const payload = { credentials: { siteName: bloggerSiteName.trim(), blogId: bloggerBlogId.trim() } };
      const data = await connectPlatform('blogger', payload);
      if (data?.integration || data?.message) {
        setBloggerOpen(false);
        setBloggerSiteName("");
        setBloggerBlogId("");
        await refreshIntegrations();
      }
    } catch (e) {
      setBloggerError(e?.message || 'Failed to connect Blogger');
    } finally {
      setBloggerBusy(false);
    }
  };

  const handleConnectFacebook = async () => {
    try {
      setFacebookBusy(true);
      setFacebookError("");
      if (!facebookAppId || !facebookAppSecret) {
        setFacebookError('App ID and App Secret are required');
        return;
      }
      const payload = { credentials: { appId: facebookAppId.trim(), appSecret: facebookAppSecret.trim() } };
      const data = await connectPlatform('facebook', payload);
      if (data?.integration || data?.message) {
        setFacebookOpen(false);
        setFacebookAppId("");
        setFacebookAppSecret("");
        await refreshIntegrations();
      }
    } catch (e) {
      setFacebookError(e?.message || 'Failed to connect Facebook');
    } finally {
      setFacebookBusy(false);
    }
  };

  const handleDisconnectAccount = async (platform) => {
    try {
      await disconnectPlatform(platform);
      await refreshIntegrations();
    } catch (error) {
      console.error('Failed to disconnect platform:', error);
      setError(`Failed to disconnect ${platform}: ${error.message}`);
    }
  };

  const getPlatformIcon = (platform) => {
    const platformData = availablePlatforms.find(p => p.platform === platform);
    return platformData?.icon || LinkIcon;
  };

  const getPlatformColor = (platform) => {
    const platformData = availablePlatforms.find(p => p.platform === platform);
    return platformData?.color || "text-white/80";
  };
  return (
    <Card className="pt-4 relative overflow-hidden">
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Your Integrations</h3>
        </div>

        <div className="space-y-6">
          {availablePlatforms.map((platform) => {
            const isConnected = integrations?.some(
              (i) => i.platform === platform.platform
            );
            const Icon = platform.icon;
            return (
              <div
                key={platform.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full ${platform.bg} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 text-white/80`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{platform.name}</h4>
                    <p className="text-sm text-white/60">
                      {platform.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant={isConnected ? "destructive" : "default"}
                  size="sm"
                  onClick={() =>
                    isConnected
                      ? handleDisconnectAccount(platform.platform)
                      : handleConnectAccount(platform.platform)
                  }
                >
                  {isConnected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            );
          })}
        </div>

        {/* WordPress Connect Modal */}
        {wpOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-4 text-black">Connect WordPress</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="wp-site-url" className="text-black">Site URL</Label>
                  <Input
                    id="wp-site-url"
                    value={wpSiteUrl}
                    onChange={(e) => setWpSiteUrl(e.target.value)}
                    placeholder="https://yoursite.com"
                    className="text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="wp-username" className="text-black">Username</Label>
                  <Input
                    id="wp-username"
                    value={wpUsername}
                    onChange={(e) => setWpUsername(e.target.value)}
                    className="text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="wp-password" className="text-black">App Password</Label>
                  <Input
                    id="wp-password"
                    type="password"
                    value={wpPassword}
                    onChange={(e) => setWpPassword(e.target.value)}
                    className="text-black"
                  />
                </div>
                {wpError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{wpError}</p>
                  </div>
                )}
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setWpOpen(false)}
                    className="text-black"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConnectWordPress}
                    disabled={wpBusy}
                  >
                    {wpBusy ? "Connecting..." : "Connect"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blogger Connect Modal */}
        {bloggerOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-4 text-black">Connect Blogger</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="blogger-site-name" className="text-black">Site Name</Label>
                  <Input
                    id="blogger-site-name"
                    value={bloggerSiteName}
                    onChange={(e) => setBloggerSiteName(e.target.value)}
                    placeholder="Your Blogger Site Name"
                    className="text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="blogger-blog-id" className="text-black">Blog ID</Label>
                  <Input
                    id="blogger-blog-id"
                    value={bloggerBlogId}
                    onChange={(e) => setBloggerBlogId(e.target.value)}
                    placeholder="Your Blogger Blog ID"
                    className="text-black"
                  />
                </div>
                {bloggerError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{bloggerError}</p>
                  </div>
                )}
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setBloggerOpen(false)}
                    className="text-black"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConnectBlogger}
                    disabled={bloggerBusy}
                  >
                    {bloggerBusy ? "Connecting..." : "Connect"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Facebook Connect Modal */}
        {facebookOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium mb-4 text-black">Connect Facebook</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="facebook-app-id" className="text-black">App ID</Label>
                  <Input
                    id="facebook-app-id"
                    value={facebookAppId}
                    onChange={(e) => setFacebookAppId(e.target.value)}
                    placeholder="Your Facebook App ID"
                    className="text-black"
                  />
                </div>
                <div>
                  <Label htmlFor="facebook-app-secret" className="text-black">App Secret</Label>
                  <Input
                    id="facebook-app-secret"
                    type="password"
                    value={facebookAppSecret}
                    onChange={(e) => setFacebookAppSecret(e.target.value)}
                    placeholder="Your Facebook App Secret"
                    className="text-black"
                  />
                </div>
                {facebookError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{facebookError}</p>
                  </div>
                )}
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setFacebookOpen(false)}
                    className="text-black"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConnectFacebook}
                    disabled={facebookBusy}
                  >
                    {facebookBusy ? "Connecting..." : "Connect"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {
        !getBrandId() && (
          <div className="w-full h-full bg-black/60 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CreateBrandFirstMessage>
              You need to create a brand before you can manage integrations.
            </CreateBrandFirstMessage>
          </div>
        )
      }
    </Card>
  );
}