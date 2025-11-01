"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Eye, 
  Edit, 
  Users,
  Activity,
  CreditCard,
  Settings,
  Building2
} from "lucide-react";

export default function BrandsPage() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const brands = [
    {
      id: 1,
      name: "TechCorp",
      owner: "john@example.com",
      logo: "TC",
      totalCredits: 5000,
      members: 12,
      status: "Active",
      createdAt: "2024-01-01"
    },
    {
      id: 2,
      name: "DesignStudio",
      owner: "jane@example.com",
      logo: "DS",
      totalCredits: 3200,
      members: 8,
      status: "Active",
      createdAt: "2023-12-15"
    },
    {
      id: 3,
      name: "FashionBrand",
      owner: "alice@example.com",
      logo: "FB",
      totalCredits: 2800,
      members: 15,
      status: "Pending",
      createdAt: "2024-01-10"
    },
    {
      id: 4,
      name: "MarketingPro",
      owner: "bob@example.com",
      logo: "MP",
      totalCredits: 4500,
      members: 6,
      status: "Active",
      createdAt: "2023-11-20"
    },
  ];

  const filteredBrands = brands.filter(brand => {
    const matchesStatus = statusFilter === "all" || brand.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.owner.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (selectedBrand) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => setSelectedBrand(null)} className="text-white mb-4">
              ← Back to Brands
            </Button>
            <h1 className="text-3xl font-bold text-white">Brand Details</h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {selectedBrand.logo}
              </div>
              <div>
                <CardTitle className="text-white">{selectedBrand.name}</CardTitle>
                <CardDescription className="text-white/60">Owner: {selectedBrand.owner}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-white/10">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">Overview</TabsTrigger>
                <TabsTrigger value="members" className="text-white data-[state=active]:bg-white/20">Members</TabsTrigger>
                <TabsTrigger value="usage" className="text-white data-[state=active]:bg-white/20">Usage History</TabsTrigger>
                <TabsTrigger value="payments" className="text-white data-[state=active]:bg-white/20">Payments</TabsTrigger>
                <TabsTrigger value="settings" className="text-white data-[state=active]:bg-white/20">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-white/60">Total Credits</div>
                    <div className="text-lg font-semibold text-white mt-1">{selectedBrand.totalCredits.toLocaleString()}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-white/60">Members</div>
                    <div className="text-lg font-semibold text-white mt-1">{selectedBrand.members}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-white/60">Status</div>
                    <div className="text-lg font-semibold text-white mt-1">{selectedBrand.status}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm text-white/60">Created At</div>
                    <div className="text-lg font-semibold text-white mt-1">{selectedBrand.createdAt}</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="members" className="mt-6">
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-lg bg-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                          U{i}
                        </div>
                        <div>
                          <div className="font-medium text-white">User {i}</div>
                          <div className="text-sm text-white/60">user{i}@example.com</div>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                        {i === 1 ? 'Owner' : 'Member'}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="usage" className="mt-6">
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">AI Image Generator</div>
                          <div className="text-sm text-white/60">2024-01-{10 + i} 10:30 AM</div>
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
                  {[1, 2, 3].map((i) => (
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

              <TabsContent value="settings" className="mt-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5">
                    <div className="text-sm font-medium text-white mb-2">Brand Settings</div>
                    <div className="space-y-2">
                      <Button variant="secondary" className="w-full justify-start">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Brand Information
                      </Button>
                      <Button variant="secondary" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure Features
                      </Button>
                    </div>
                  </div>
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
        <h1 className="text-3xl font-bold text-white">Brands Management</h1>
        <p className="text-white/70 mt-1">Manage all brands and their configurations</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                type="search"
                placeholder="Search by brand name or owner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => (
          <Card key={brand.id} className="hover:scale-105 transition-transform cursor-pointer" onClick={() => setSelectedBrand(brand)}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold">
                  {brand.logo}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-white">{brand.name}</CardTitle>
                  <CardDescription className="text-white/60">{brand.owner}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Total Credits</span>
                  <span className="text-sm font-semibold text-white">{brand.totalCredits.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Members
                  </span>
                  <span className="text-sm font-semibold text-white">{brand.members}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Status</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    brand.status === 'Active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {brand.status}
                  </span>
                </div>
                <div className="pt-3 border-t border-white/10 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-white hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBrand(brand);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-white hover:bg-white/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

