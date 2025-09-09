'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Shield,
  CreditCard,
  Users
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [apiBusy, setApiBusy] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  // Brand state
  const [brandId, setBrandId] = useState(null);
  const [brandCompanyName, setBrandCompanyName] = useState('');
  const [brandDetails, setBrandDetails] = useState('');
  const [brandColors, setBrandColors] = useState({ primary: '#3B82F6', secondary: '#1E40AF', accent: '#F59E0B' });
  const [brandFonts, setBrandFonts] = useState({ headingFont: 'Inter', bodyFont: 'Inter' });
  const [connectedAccounts, setConnectedAccounts] = useState([
    { id: 1, platform: 'instagram', name: 'Instagram', connected: true, username: '@yourbrand' },
    { id: 2, platform: 'facebook', name: 'Facebook', connected: true, username: 'Your Brand Page' },
    { id: 3, platform: 'twitter', name: 'Twitter/X', connected: false, username: null },
    { id: 4, platform: 'linkedin', name: 'LinkedIn', connected: true, username: 'Your Company' },
    { id: 5, platform: 'youtube', name: 'YouTube', connected: false, username: null }
  ]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'brand', label: 'Brand Kit', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'team', label: 'Team', icon: Users }
  ];

  const handleConnectAccount = (platform) => {
    // Handle account connection
    console.log('Connecting account:', platform);
  };

  const handleDisconnectAccount = (platform) => {
    // Handle account disconnection
    console.log('Disconnecting account:', platform);
  };

  const handleSaveSettings = () => {
    // Handle saving settings
    console.log('Saving settings...');
  };

  // Load existing brand (if any)
  useEffect(() => {
    // Initialize brandId from localStorage so UI reflects Update when applicable
    try {
      const stored = typeof window !== 'undefined' ? (localStorage.getItem('brandId') || localStorage.getItem('selectedBrandId')) : null;
      if (stored) setBrandId(stored);
    } catch {}

    const fetchBrand = async () => {
      try {
        setApiBusy(true);
        const res = await fetch(`http://localhost:8000/brand`, { credentials: 'include' });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.brand) {
          setBrandId(data.brand._id);
          if (typeof window !== 'undefined' && data.brand._id) {
            window.localStorage.setItem('brandId', data.brand._id);
          }
          setBrandCompanyName(data.brand.companyName || '');
          setBrandDetails(data.brand.details || '');
          setBrandColors({
            primary: data.brand.colors?.primary || '#3B82F6',
            secondary: data.brand.colors?.secondary || '#1E40AF',
            accent: data.brand.colors?.accent || '#F59E0B',
          });
          setBrandFonts({
            headingFont: data.brand.fonts?.headingFont || 'Inter',
            bodyFont: data.brand.fonts?.bodyFont || 'Inter',
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setApiBusy(false);
      }
    };
    fetchBrand();
  }, []);

  const saveBrand = async () => {
    try {
      setApiBusy(true);
      const res = await fetch(`http://localhost:8000/brand`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandId: brandId || undefined,
          companyName: brandCompanyName,
          details: brandDetails,
          colors: brandColors,
          fonts: brandFonts,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.brand?._id) {
          setBrandId(data.brand._id);
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('brandId', data.brand._id);
          }
        }
      } else {
        console.error(data?.message || 'Failed to save brand');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setApiBusy(false);
    }
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: Instagram,
      facebook: Facebook,
      twitter: Twitter,
      linkedin: Linkedin,
      youtube: Youtube
    };
    return icons[platform] || LinkIcon;
  };

  const getPlatformColor = (platform) => {
    const colors = {
      instagram: 'text-pink-600',
      facebook: 'text-blue-600',
      twitter: 'text-blue-400',
      linkedin: 'text-blue-700',
      youtube: 'text-red-600'
    };
    return colors[platform] || 'text-gray-600';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
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
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-none ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
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
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Brand Kit */}
          {activeTab === 'brand' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Brand Info
                  </CardTitle>
                  <CardDescription>Define your brand's Information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" value={brandCompanyName} onChange={(e) => setBrandCompanyName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="company">Company Details</Label>
                  <textarea id="company" value={brandDetails} onChange={(e) => setBrandDetails(e.target.value)} className='"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'/>
                </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Brand Colors
                  </CardTitle>
                  <CardDescription>Define your brand's color palette</CardDescription>
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
                          onChange={(e) => setBrandColors({ ...brandColors, primary: e.target.value })}
                          className="w-12 h-12 rounded border"
                        />
                        <Input value={brandColors.primary} onChange={(e) => setBrandColors({ ...brandColors, primary: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="color"
                          id="secondary-color"
                          value={brandColors.secondary}
                          onChange={(e) => setBrandColors({ ...brandColors, secondary: e.target.value })}
                          className="w-12 h-12 rounded border"
                        />
                        <Input value={brandColors.secondary} onChange={(e) => setBrandColors({ ...brandColors, secondary: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="color"
                          id="accent-color"
                          value={brandColors.accent}
                          onChange={(e) => setBrandColors({ ...brandColors, accent: e.target.value })}
                          className="w-12 h-12 rounded border"
                        />
                        <Input value={brandColors.accent} onChange={(e) => setBrandColors({ ...brandColors, accent: e.target.value })} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Brand Fonts</CardTitle>
                  <CardDescription>Choose fonts that represent your brand</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="heading-font">Heading Font</Label>
                      <select
                        id="heading-font"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        value={brandFonts.headingFont}
                        onChange={(e) => setBrandFonts({ ...brandFonts, headingFont: e.target.value })}
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
                        onChange={(e) => setBrandFonts({ ...brandFonts, bodyFont: e.target.value })}
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
                  <CardDescription>Upload your logo and other brand assets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-4">Upload your logo and brand assets</p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="pt-2">
                <Button onClick={saveBrand} disabled={apiBusy} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {brandId ? 'Update Brand' : 'Create Brand'}
                </Button>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LinkIcon className="h-5 w-5 mr-2" />
                  Social Media Integrations
                </CardTitle>
                <CardDescription>Connect your social media accounts for seamless posting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {connectedAccounts.map((account) => {
                    const Icon = getPlatformIcon(account.platform);
                    return (
                      <div key={account.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className={`h-6 w-6 ${getPlatformColor(account.platform)}`} />
                          <div>
                            <h3 className="font-medium text-gray-900">{account.name}</h3>
                            {account.connected && account.username && (
                              <p className="text-sm text-gray-600">{account.username}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {account.connected ? (
                            <>
                              <div className="flex items-center text-green-600">
                                <Check className="h-4 w-4 mr-1" />
                                <span className="text-sm">Connected</span>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDisconnectAccount(account.platform)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Disconnect
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleConnectAccount(account.platform)}
                            >
                              <LinkIcon className="h-4 w-4 mr-2" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified about updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Post Scheduling Alerts</h3>
                      <p className="text-sm text-gray-600">Get notified when posts are scheduled</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Trend Updates</h3>
                      <p className="text-sm text-gray-600">Receive updates about trending topics</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Weekly Reports</h3>
                      <p className="text-sm text-gray-600">Get weekly performance reports</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" className="mt-1" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Billing */}
          {activeTab === 'billing' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Billing & Subscription
                </CardTitle>
                <CardDescription>Manage your subscription and billing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Current Plan: Pro</h3>
                  <p className="text-sm text-blue-700">$29/month • Next billing date: February 15, 2024</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Basic</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-2">$9<span className="text-sm font-normal">/month</span></p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 10 posts/month</li>
                      <li>• Basic templates</li>
                      <li>• Email support</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">Downgrade</Button>
                  </div>
                  
                  <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                    <h3 className="font-medium text-blue-900 mb-2">Pro</h3>
                    <p className="text-2xl font-bold text-blue-900 mb-2">$29<span className="text-sm font-normal">/month</span></p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Unlimited posts</li>
                      <li>• Premium templates</li>
                      <li>• Priority support</li>
                      <li>• Analytics</li>
                    </ul>
                    <Button className="w-full mt-4">Current Plan</Button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Enterprise</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-2">$99<span className="text-sm font-normal">/month</span></p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Everything in Pro</li>
                      <li>• Team collaboration</li>
                      <li>• Custom integrations</li>
                      <li>• Dedicated support</li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">Upgrade</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Team */}
          {activeTab === 'team' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Team Members
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </CardTitle>
                <CardDescription>Manage your team members and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">JD</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">John Doe</h3>
                        <p className="text-sm text-gray-600">john.doe@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Admin</span>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">JS</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Jane Smith</h3>
                        <p className="text-sm text-gray-600">jane.smith@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Editor</span>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
