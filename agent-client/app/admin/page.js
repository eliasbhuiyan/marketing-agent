"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Building2, 
  DollarSign, 
  CheckCircle2, 
  Sparkles, 
  CreditCard,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export default function AdminDashboard() {
  // Mock data - replace with actual API calls
  const stats = {
    totalUsers: 1247,
    totalBrands: 342,
    totalRevenue: 89450,
    totalTasks: 45231,
    aiGenerations: 12345,
    activeSubscriptions: 298
  };

  const recentPayments = [
    { id: "INV-001", brand: "TechCorp", amount: 299.99, date: "2024-01-15", status: "Paid" },
    { id: "INV-002", brand: "DesignStudio", amount: 149.99, date: "2024-01-14", status: "Paid" },
    { id: "INV-003", brand: "FashionBrand", amount: 499.99, date: "2024-01-13", status: "Pending" },
    { id: "INV-004", brand: "MarketingPro", amount: 199.99, date: "2024-01-12", status: "Paid" },
    { id: "INV-005", brand: "StartupXYZ", amount: 99.99, date: "2024-01-11", status: "Paid" },
  ];

  const pendingApprovals = [
    { id: 1, brand: "NewBrand Inc", owner: "john@example.com", requested: "2024-01-14" },
    { id: 2, brand: "Creative Agency", owner: "jane@example.com", requested: "2024-01-13" },
  ];

  const topBrands = [
    { name: "TechCorp", usage: 4500, color: "bg-blue-500" },
    { name: "DesignStudio", usage: 3200, color: "bg-purple-500" },
    { name: "FashionBrand", usage: 2800, color: "bg-pink-500" },
    { name: "MarketingPro", usage: 2100, color: "bg-green-500" },
    { name: "StartupXYZ", usage: 1800, color: "bg-yellow-500" },
  ];

  const maxUsage = Math.max(...topBrands.map(b => b.usage));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-white/70 mt-1">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-white/60 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Brands</CardTitle>
            <Building2 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalBrands}</div>
            <p className="text-xs text-white/60 mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-white/60 mt-1">+23% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Tasks Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalTasks.toLocaleString()}</div>
            <p className="text-xs text-white/60 mt-1">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/80">AI Generations (This Month)</CardTitle>
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.aiGenerations.toLocaleString()}</div>
            <p className="text-xs text-white/60 mt-1">+28% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeSubscriptions}</div>
            <p className="text-xs text-white/60 mt-1">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Usage by Brand (Bar Chart) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-white">AI Usage by Brand (This Month)</CardTitle>
            <CardDescription className="text-white/60">Top 5 brands by usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBrands.map((brand, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/80">{brand.name}</span>
                    <span className="text-white font-medium">{brand.usage.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${brand.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${(brand.usage / maxUsage) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Top 5 Brands */}
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Top 5 Brands by Usage</CardTitle>
            <CardDescription className="text-white/60">Distribution of AI usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-64 flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* Simple pie chart using conic-gradient */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: `conic-gradient(
                    #3b82f6 0deg 72deg,
                    #a855f7 72deg 144deg,
                    #ec4899 144deg 208deg,
                    #10b981 208deg 260deg,
                    #eab308 260deg 360deg
                  )`
                }} />
                <div className="absolute inset-4 bg-[#BDCDCF] rounded-full" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-sm text-white/60">Top Brands</div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              {topBrands.map((brand, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${brand.color.replace('bg-', 'bg-')}`} />
                    <span className="text-white/80">{brand.name}</span>
                  </div>
                  <span className="text-white font-medium">{brand.usage.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credits Used Over Time (Line Chart) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Credits Used Over Time</CardTitle>
          <CardDescription className="text-white/60">Last 7 days trend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 relative">
            {/* Simple line chart using SVG */}
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,180 L 100,160 L 200,140 L 300,120 L 400,100 L 500,90 L 600,80"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
              />
              <path
                d="M 0,180 L 100,160 L 200,140 L 300,120 L 400,100 L 500,90 L 600,80 L 600,200 L 0,200 Z"
                fill="url(#lineGradient)"
              />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-white/60 px-2">
              <span>7d ago</span>
              <span>6d ago</span>
              <span>5d ago</span>
              <span>4d ago</span>
              <span>3d ago</span>
              <span>2d ago</span>
              <span>Today</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Recent Payments</CardTitle>
            <CardDescription className="text-white/60">Latest payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div>
                    <div className="font-medium text-white">{payment.brand}</div>
                    <div className="text-sm text-white/60">{payment.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-white">${payment.amount}</div>
                    <div className="text-xs text-white/60">{payment.date}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    payment.status === 'Paid' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Brand Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              Pending Brand Approvals
            </CardTitle>
            <CardDescription className="text-white/60">Brands waiting for approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="font-medium text-white">{approval.brand}</div>
                  <div className="text-sm text-white/60 mt-1">Owner: {approval.owner}</div>
                  <div className="text-xs text-white/50 mt-1">Requested: {approval.requested}</div>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded text-sm hover:bg-green-500/30 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {pendingApprovals.length === 0 && (
              <div className="text-center py-8 text-white/60">
                No pending approvals
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

