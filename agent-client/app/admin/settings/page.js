"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Mail, 
  CreditCard, 
  Settings as SettingsIcon,
  Shield,
  Key,
  DollarSign,
  Bot
} from "lucide-react";

export default function SettingsPage() {
  const [platformSettings, setPlatformSettings] = useState({
    platformName: "Marketing Agent",
    contactEmail: "support@marketingagent.com",
    contactPhone: "+1 (555) 123-4567",
    websiteUrl: "https://marketingagent.com"
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeApiKey: "sk_live_••••••••••••••••",
    stripeSecretKey: "••••••••••••••••",
    currency: "USD",
    creditConversion: 1
  });

  const [emailTemplates, setEmailTemplates] = useState({
    invite: "Welcome to {{platformName}}! You've been invited to join {{brandName}}.",
    resetPassword: "Click the link below to reset your password: {{resetLink}}"
  });

  const [aiSettings, setAiSettings] = useState({
    model: "gpt-4",
    costPerTask: 0.05
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Platform Settings</h1>
        <p className="text-white/70 mt-1">Configure platform-wide settings and preferences</p>
      </div>

      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white/10 mb-6">
          <TabsTrigger value="platform" className="text-white data-[state=active]:bg-white/20">
            <Globe className="mr-2 h-4 w-4" />
            Platform
          </TabsTrigger>
          <TabsTrigger value="payment" className="text-white data-[state=active]:bg-white/20">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="email" className="text-white data-[state=active]:bg-white/20">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="ai" className="text-white data-[state=active]:bg-white/20">
            <Bot className="mr-2 h-4 w-4" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="roles" className="text-white data-[state=active]:bg-white/20">
            <Shield className="mr-2 h-4 w-4" />
            Roles
          </TabsTrigger>
        </TabsList>

        {/* Platform Settings */}
        <TabsContent value="platform" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Platform Information</CardTitle>
              <CardDescription className="text-white/60">
                Configure your platform's basic information and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platformName" className="text-white">Platform Name</Label>
                <Input
                  id="platformName"
                  value={platformSettings.platformName}
                  onChange={(e) => setPlatformSettings({...platformSettings, platformName: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-white">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={platformSettings.contactEmail}
                  onChange={(e) => setPlatformSettings({...platformSettings, contactEmail: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-white">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={platformSettings.contactPhone}
                  onChange={(e) => setPlatformSettings({...platformSettings, contactPhone: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="websiteUrl" className="text-white">Website URL</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  value={platformSettings.websiteUrl}
                  onChange={(e) => setPlatformSettings({...platformSettings, websiteUrl: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo" className="text-white">Platform Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center">
                    <SettingsIcon className="h-10 w-10 text-white/50" />
                  </div>
                  <Button variant="secondary">Upload Logo</Button>
                </div>
              </div>
              <div className="pt-4">
                <Button>Save Platform Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Configuration */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Payment Configuration</CardTitle>
              <CardDescription className="text-white/60">
                Configure payment gateways and credit conversion rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stripeApiKey" className="text-white flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Stripe API Key
                </Label>
                <Input
                  id="stripeApiKey"
                  type="password"
                  value={paymentSettings.stripeApiKey}
                  onChange={(e) => setPaymentSettings({...paymentSettings, stripeApiKey: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripeSecretKey" className="text-white">Stripe Secret Key</Label>
                <Input
                  id="stripeSecretKey"
                  type="password"
                  value={paymentSettings.stripeSecretKey}
                  onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-white flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Currency
                </Label>
                <Input
                  id="currency"
                  value={paymentSettings.currency}
                  onChange={(e) => setPaymentSettings({...paymentSettings, currency: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creditConversion" className="text-white">Credit Conversion Rate</Label>
                <Input
                  id="creditConversion"
                  type="number"
                  value={paymentSettings.creditConversion}
                  onChange={(e) => setPaymentSettings({...paymentSettings, creditConversion: parseFloat(e.target.value)})}
                  className="bg-white/10 border-white/20 text-white"
                />
                <p className="text-xs text-white/60">Credits per dollar spent</p>
              </div>
              <div className="pt-4">
                <Button>Save Payment Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Email Templates</CardTitle>
              <CardDescription className="text-white/60">
                Customize email templates for invitations and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteTemplate" className="text-white">Invite Email Template</Label>
                <textarea
                  id="inviteTemplate"
                  rows={4}
                  value={emailTemplates.invite}
                  onChange={(e) => setEmailTemplates({...emailTemplates, invite: e.target.value})}
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-white/60">Available variables: {"{{platformName}}"}, {"{{brandName}}"}, {"{{inviteLink}}"}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resetTemplate" className="text-white">Reset Password Template</Label>
                <textarea
                  id="resetTemplate"
                  rows={4}
                  value={emailTemplates.resetPassword}
                  onChange={(e) => setEmailTemplates({...emailTemplates, resetPassword: e.target.value})}
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-white/60">Available variables: {"{{resetLink}}"}, {"{{userName}}"}</p>
              </div>
              <div className="pt-4">
                <Button>Save Email Templates</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Model Settings */}
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">AI Model Configuration</CardTitle>
              <CardDescription className="text-white/60">
                Configure AI models and cost settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aiModel" className="text-white">AI Model</Label>
                <select
                  id="aiModel"
                  value={aiSettings.model}
                  onChange={(e) => setAiSettings({...aiSettings, model: e.target.value})}
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3">Claude 3</option>
                  <option value="claude-3.5">Claude 3.5</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="costPerTask" className="text-white">Cost Per Task (USD)</Label>
                <Input
                  id="costPerTask"
                  type="number"
                  step="0.01"
                  value={aiSettings.costPerTask}
                  onChange={(e) => setAiSettings({...aiSettings, costPerTask: parseFloat(e.target.value)})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="pt-4">
                <Button>Save AI Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Roles & Permissions */}
        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Admin Roles & Permissions</CardTitle>
              <CardDescription className="text-white/60">
                Manage admin roles and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-medium text-white">Super Admin</div>
                      <div className="text-sm text-white/60">Full access to all features</div>
                    </div>
                    <Button variant="secondary" size="sm">Edit</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Users", "Brands", "Billing", "Analytics", "Settings", "Logs"].map((perm) => (
                      <span key={perm} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-medium text-white">Admin</div>
                      <div className="text-sm text-white/60">Limited administrative access</div>
                    </div>
                    <Button variant="secondary" size="sm">Edit</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Users", "Brands", "Analytics"].map((perm) => (
                      <span key={perm} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-medium text-white">Moderator</div>
                      <div className="text-sm text-white/60">User and brand moderation only</div>
                    </div>
                    <Button variant="secondary" size="sm">Edit</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Users", "Brands"].map((perm) => (
                      <span key={perm} className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button>Create New Role</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

