"use client";

import { useEffect, useState } from "react";
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
import apiClient from "@/lib/api";
import { getBrandId, setBrandId, formatErrorMessage } from "@/lib/utils";
import { useBrandData } from "@/lib/hooks/useBrandData";
import {
  Settings,
  User,
  Palette,
  Link as LinkIcon,
  Upload,
  Save,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Check,
  X,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Bell,
  CreditCard,
  Users,
  RefreshCw,
  Globe,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";
import { useIntegrations } from "@/lib/hooks/useIntegrations";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [apiBusy, setApiBusy] = useState(false);
  const [error, setError] = useState("");
  const { userData } = useAuth();
  const { integrations, connectPlatform, disconnectPlatform, getIntegrationStatus } = useIntegrations();
  // Invite member state
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteBusy, setInviteBusy] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  // Use cached brand data hook
  const {
    brandData,
    loading: brandLoading,
    error: brandError,
    fetchBrandData,
    updateBrandData,
    invalidateCache,
  } = useBrandData();

  // Brand state - initialize from cached data
  const [brandId, setBrandId] = useState(null);
  const [brandCompanyName, setBrandCompanyName] = useState("");
  const [brandDetails, setBrandDetails] = useState("");
  const [brandColors, setBrandColors] = useState({
    primary: "#3B82F6",
    secondary: "#1E40AF",
    accent: "#F59E0B",
  });
  const [brandFonts, setBrandFonts] = useState({
    headingFont: "Inter",
    bodyFont: "Inter",
  });
  // Define available platforms
  const availablePlatforms = [
    {
      id: 1,
      platform: "facebook",
      name: "Facebook",
      description: "Connect your Facebook page to publish posts",
      icon: Facebook,
      color: "text-blue-600",
    },
    {
      id: 2,
      platform: "instagram",
      name: "Instagram",
      description: "Connect your Instagram Business account",
      icon: Instagram,
      color: "text-pink-600",
    },
    {
      id: 3,
      platform: "wordpress",
      name: "WordPress",
      description: "Connect your WordPress.com site",
      icon: Globe,
      color: "text-gray-600",
    },
    {
      id: 4,
      platform: "medium",
      name: "Medium",
      description: "Connect your Medium account",
      icon: FileText,
      color: "text-green-600",
    },
  ];

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "brand", label: "Brand Kit", icon: Palette },
    { id: "integrations", label: "Integrations", icon: LinkIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "team", label: "Team", icon: Users },
  ];

  const handleConnectAccount = async (platform) => {
    try {
      await connectPlatform(platform);
    } catch (error) {
      console.error('Failed to connect platform:', error);
      setError(`Failed to connect ${platform}: ${error.message}`);
    }
  };

  const handleDisconnectAccount = async (platform) => {
    try {
      await disconnectPlatform(platform);
    } catch (error) {
      console.error('Failed to disconnect platform:', error);
      setError(`Failed to disconnect ${platform}: ${error.message}`);
    }
  };

  const handleSaveSettings = () => {
    // Handle saving settings
    console.log("Saving settings...");
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setError(""); // Clear any errors when switching tabs
  };

  // Initialize brand data from cached data
  useEffect(() => {
    if (brandData) {
      setBrandId(brandData._id);
      setBrandCompanyName(brandData.companyName || "");
      setBrandDetails(brandData.details || "");
      setBrandColors({
        primary: brandData.colors?.primary || "#3B82F6",
        secondary: brandData.colors?.secondary || "#1E40AF",
        accent: brandData.colors?.accent || "#F59E0B",
      });
      setBrandFonts({
        headingFont: brandData.fonts?.headingFont || "Inter",
        bodyFont: brandData.fonts?.bodyFont || "Inter",
      });
    } else {
      // Initialize brandId from localStorage for UI state
      const storedBrandId = getBrandId();
      if (storedBrandId) setBrandId(storedBrandId);
    }
  }, [brandData]);

  // Handle brand error
  useEffect(() => {
    if (brandError) {
      setError(formatErrorMessage(brandError));
    }
  }, [brandError]);

  const saveBrand = async () => {
    try {
      setApiBusy(true);
      setError("");
      const data = await apiClient.brand.save({
        brandId: brandId || undefined,
        companyName: brandCompanyName,
        details: brandDetails,
        colors: brandColors,
        fonts: brandFonts,
      });

      if (data.brand?._id) {
        setBrandId(data.brand._id);
        // Update cache with new brand data
        updateBrandData(data.brand);
      }
    } catch (e) {
      setError(formatErrorMessage(e));
    } finally {
      setApiBusy(false);
    }
  };

  const getPlatformIcon = (platform) => {
    const platformData = availablePlatforms.find(p => p.platform === platform);
    return platformData?.icon || LinkIcon;
  };

  const getPlatformColor = (platform) => {
    const platformData = availablePlatforms.find(p => p.platform === platform);
    return platformData?.color || "text-gray-600";
  };

  const handelInviteMember = async () => {
    try {
      setInviteBusy(true);
      setInviteError("");
      setInviteSuccess("");
      if (!inviteEmail) {
        setInviteError("Please enter an email address");
        return;
      }
      await apiClient.brand.inviteMember(inviteEmail);
      setInviteSuccess("Invite sent successfully");
      // optionally close after short delay
      setTimeout(() => setInviteOpen(false), 1200);
    } catch (e) {
      setInviteError(e?.message || "Failed to send invite");
    } finally {
      setInviteBusy(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-none ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-full overflow-hidden flex items-center justify-center">
                   {
                    userData?.avatar && (
                      <Image
                        src={userData?.avatar}
                        width={200}
                        height={200}
                        alt="profile"
                      />
                    )
                   }
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      defaultValue={userData?.fullName.split(" ")[0]}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      defaultValue={userData?.fullName.split(" ")[1]}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={userData?.email}
                    readOnly
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Brand Kit */}
          {activeTab === "brand" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">Brand Info</span>
                  </CardTitle>
                  <CardDescription>
                    Define your brand&apos;s Information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={brandCompanyName}
                      onChange={(e) => setBrandCompanyName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Details</Label>
                    <textarea
                      id="company"
                      value={brandDetails}
                      onChange={(e) => setBrandDetails(e.target.value)}
                      className='"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Brand Colors
                  </CardTitle>
                  <CardDescription>
                    Define your brand&apos;s color palette
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="color"
                          id="primary-color"
                          value={brandColors.primary}
                          onChange={(e) =>
                            setBrandColors({
                              ...brandColors,
                              primary: e.target.value,
                            })
                          }
                          className="w-12 h-12 rounded border"
                        />
                        <Input
                          value={brandColors.primary}
                          onChange={(e) =>
                            setBrandColors({
                              ...brandColors,
                              primary: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="color"
                          id="secondary-color"
                          value={brandColors.secondary}
                          onChange={(e) =>
                            setBrandColors({
                              ...brandColors,
                              secondary: e.target.value,
                            })
                          }
                          className="w-12 h-12 rounded border"
                        />
                        <Input
                          value={brandColors.secondary}
                          onChange={(e) =>
                            setBrandColors({
                              ...brandColors,
                              secondary: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="color"
                          id="accent-color"
                          value={brandColors.accent}
                          onChange={(e) =>
                            setBrandColors({
                              ...brandColors,
                              accent: e.target.value,
                            })
                          }
                          className="w-12 h-12 rounded border"
                        />
                        <Input
                          value={brandColors.accent}
                          onChange={(e) =>
                            setBrandColors({
                              ...brandColors,
                              accent: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Brand Fonts</CardTitle>
                  <CardDescription>
                    Choose fonts that represent your brand
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="heading-font">Heading Font</Label>
                      <select
                        id="heading-font"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        value={brandFonts.headingFont}
                        onChange={(e) =>
                          setBrandFonts({
                            ...brandFonts,
                            headingFont: e.target.value,
                          })
                        }
                      >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Poppins">Poppins</option>
                        <option value="Montserrat">Montserrat</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="body-font">Body Font</Label>
                      <select
                        id="body-font"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        value={brandFonts.bodyFont}
                        onChange={(e) =>
                          setBrandFonts({
                            ...brandFonts,
                            bodyFont: e.target.value,
                          })
                        }
                      >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Poppins">Poppins</option>
                        <option value="Montserrat">Montserrat</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Brand Assets</CardTitle>
                  <CardDescription>
                    Upload your logo and other brand assets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-4">
                      Upload your logo and brand assets
                    </p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              <div className="pt-2">
                <Button
                  onClick={saveBrand}
                  disabled={apiBusy || brandLoading}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {apiBusy
                    ? "Saving..."
                    : brandLoading
                    ? "Loading..."
                    : brandId
                    ? "Update Brand"
                    : "Create Brand"}
                </Button>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LinkIcon className="h-5 w-5 mr-2" />
                  Platform Integrations
                </CardTitle>
                <CardDescription>
                  Connect your social media and content platforms for seamless publishing
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                {!brandId ? (
                  <div className="text-center py-8">
                    <CardDescription>
                      Please create your brand first to manage integrations
                    </CardDescription>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {availablePlatforms.map((platform) => {
                      const Icon = platform.icon;
                      const status = getIntegrationStatus(platform.platform);
                      const isConnected = status.isConnected;
                      const isActive = status.isActive;
                      
                      return (
                        <div
                          key={platform.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`h-6 w-6 ${platform.color}`} />
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {platform.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {platform.description}
                              </p>
                              {isConnected && status.accountId && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Account ID: {status.accountId}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {isConnected ? (
                              <>
                                <div className="flex items-center text-green-600">
                                  <Check className="h-4 w-4 mr-1" />
                                  <span className="text-sm">
                                    {isActive ? 'Connected' : 'Inactive'}
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleDisconnectAccount(platform.platform)
                                  }
                                  className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Disconnect
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleConnectAccount(platform.platform)
                                }
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <LinkIcon className="h-4 w-4 mr-2" />
                                Connect
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Integration Status Summary */}
                    {integrations.length > 0 && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Connected Platforms</h4>
                        <div className="flex flex-wrap gap-2">
                          {integrations.map((integration) => (
                            <span
                              key={integration.platform}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              {integration.platform.charAt(0).toUpperCase() + integration.platform.slice(1)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-600">
                        Receive notifications via email
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Post Scheduling Alerts
                      </h3>
                      <p className="text-sm text-gray-600">
                        Get notified when posts are scheduled
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Trend Updates
                      </h3>
                      <p className="text-sm text-gray-600">
                        Receive updates about trending topics
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Weekly Reports
                      </h3>
                      <p className="text-sm text-gray-600">
                        Get weekly performance reports
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Billing */}
          {activeTab === "billing" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Billing & Subscription
                </CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Current Plan: Pro
                  </h3>
                  <p className="text-sm text-blue-700">
                    $29/month • Next billing date: February 15, 2024
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Basic</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      $9<span className="text-sm font-normal">/month</span>
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 10 posts/month</li>
                      <li>• Basic templates</li>
                      <li>• Email support</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">
                      Downgrade
                    </Button>
                  </div>

                  <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                    <h3 className="font-medium text-blue-900 mb-2">Pro</h3>
                    <p className="text-2xl font-bold text-blue-900 mb-2">
                      $29<span className="text-sm font-normal">/month</span>
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Unlimited posts</li>
                      <li>• Premium templates</li>
                      <li>• Priority support</li>
                      <li>• Analytics</li>
                    </ul>
                    <Button className="w-full mt-4">Current Plan</Button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Enterprise
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      $99<span className="text-sm font-normal">/month</span>
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Everything in Pro</li>
                      <li>• Team collaboration</li>
                      <li>• Custom integrations</li>
                      <li>• Dedicated support</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">
                      Upgrade
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Team */}
          {activeTab === "team" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Team Members
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setInviteOpen(true);
                        setInviteEmail("");
                        setInviteError("");
                        setInviteSuccess("");
                      }}
                      disabled={!brandId}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Invite Member
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Manage your team members and their permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full overflow-hidden flex items-center justify-center">
                          <Image
                            src={brandData.owner.avatar}
                            width={200}
                            height={200}
                            alt="profile"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {brandData.owner.fullName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {brandData.owner.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Admin
                        </span>
                      </div>
                    </div>
                    {brandData &&
                      brandData?.teamMembers.map((member) => (
                        <div
                          key={member._id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full overflow-hidden flex items-center justify-center">
                              <Image
                                src={member.user.avatar}
                                width={200}
                                height={200}
                                alt="profile"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {member.user.fullName}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {member.user.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 capitalize bg-blue-100 text-blue-700 text-xs rounded-full">
                              {member.role}
                            </span>
                            <span
                              className={`px-2 py-1 capitalize ${
                                member.status === "invited"
                                  ? "bg-yellow-200"
                                  : "bg-blue-100"
                              } bg-blue-100 text-blue-700 text-xs rounded-full`}
                            >
                              {member.status}
                            </span>
                            <Button size="sm" variant="">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
              {inviteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                  <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
                    <div className="px-6 py-4 border-b">
                      <h3 className="text-lg font-semibold">
                        Invite a team member
                      </h3>
                    </div>
                    <div className="px-6 py-4 space-y-4">
                      {inviteError && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                          {inviteError}
                        </div>
                      )}
                      {inviteSuccess && (
                        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded p-2">
                          {inviteSuccess}
                        </div>
                      )}
                      <div>
                        <Label htmlFor="invite-email">Member Email</Label>
                        <Input
                          id="invite-email"
                          type="email"
                          placeholder="name@example.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t flex items-center justify-end gap-2">
                      <Button
                        variant="destructive"
                        onClick={() => setInviteOpen(false)}
                        disabled={inviteBusy}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handelInviteMember}
                        disabled={inviteBusy || !inviteEmail}
                      >
                        {inviteBusy ? "Inviting..." : "Send Invite"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
