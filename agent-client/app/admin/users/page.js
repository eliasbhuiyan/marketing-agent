"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Ban, 
  Mail, 
  Calendar, 
  Building2,
  CreditCard,
  Activity
} from "lucide-react";

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Owner",
      joinedDate: "2024-01-15",
      status: "Active",
      avatar: "JD",
      brand: "TechCorp"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Member",
      joinedDate: "2024-01-10",
      status: "Active",
      avatar: "JS",
      brand: "DesignStudio"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Owner",
      joinedDate: "2023-12-20",
      status: "Suspended",
      avatar: "BJ",
      brand: "MarketingPro"
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      role: "Member",
      joinedDate: "2024-01-05",
      status: "Active",
      avatar: "AW",
      brand: "FashionBrand"
    },
  ];

  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  if (selectedUser) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => setSelectedUser(null)} className="text-white mb-4">
              ← Back to Users
            </Button>
            <h1 className="text-3xl font-bold text-white">User Details</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {selectedUser.avatar}
              </div>
              <div>
                <CardTitle className="text-white">{selectedUser.name}</CardTitle>
                <CardDescription className="text-white/60">{selectedUser.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-white/10">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">Overview</TabsTrigger>
                <TabsTrigger value="brands" className="text-white data-[state=active]:bg-white/20">Joined Brands</TabsTrigger>
                <TabsTrigger value="usage" className="text-white data-[state=active]:bg-white/20">Usage History</TabsTrigger>
                <TabsTrigger value="payments" className="text-white data-[state=active]:bg-white/20">Payments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-white/60">Role</div>
                    <div className="text-lg font-semibold text-white mt-1">{selectedUser.role}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-white/60">Status</div>
                    <div className="text-lg font-semibold text-white mt-1">{selectedUser.status}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-white/60">Joined Date</div>
                    <div className="text-lg font-semibold text-white mt-1">{selectedUser.joinedDate}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-white/60">Primary Brand</div>
                    <div className="text-lg font-semibold text-white mt-1">{selectedUser.brand}</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="brands" className="mt-6">
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-blue-400" />
                      <div>
                        <div className="font-medium text-white">{selectedUser.brand}</div>
                        <div className="text-sm text-white/60">{selectedUser.role}</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Active</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="usage" className="mt-6">
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">AI Image Generator</div>
                          <div className="text-sm text-white/60">2024-01-15 10:30 AM</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">-50 credits</div>
                          <div className="text-xs text-white/60">Completed</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="payments" className="mt-6">
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 rounded-lg bg-white/5 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">INV-00{i}</div>
                        <div className="text-sm text-white/60">2024-01-{10 + i}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">$299.99</div>
                        <span className="text-xs text-green-400">Paid</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Users Management</h1>
        <p className="text-white/70 mt-1">Manage all platform users and their access</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                type="search"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">Brand</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">Joined Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-white/80">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                          {user.avatar}
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white/80">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white/80">{user.brand}</td>
                    <td className="py-3 px-4 text-white/80">{user.joinedDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedUser(user)}
                          className="text-white hover:bg-white/10"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/10"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/10"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

