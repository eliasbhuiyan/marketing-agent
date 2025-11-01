"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Info,
  Calendar,
  Filter
} from "lucide-react";

export default function LogsPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const logs = [
    {
      id: 1,
      type: "Payment",
      title: "Invoice INV-001 paid successfully",
      description: "TechCorp paid $299.99 via Credit Card",
      status: "resolved",
      timestamp: "2024-01-15 10:30 AM",
      icon: CheckCircle2,
      color: "text-green-400"
    },
    {
      id: 2,
      type: "API Error",
      title: "OpenAI API rate limit exceeded",
      description: "Rate limit hit for brand DesignStudio. Please upgrade plan.",
      status: "pending",
      timestamp: "2024-01-15 09:15 AM",
      icon: AlertCircle,
      color: "text-red-400"
    },
    {
      id: 3,
      type: "Invite",
      title: "Brand invite sent",
      description: "Invitation sent to alice@example.com for FashionBrand",
      status: "resolved",
      timestamp: "2024-01-14 03:45 PM",
      icon: Info,
      color: "text-blue-400"
    },
    {
      id: 4,
      type: "Suspension",
      title: "User account suspended",
      description: "User bob@example.com suspended for violation of terms",
      status: "resolved",
      timestamp: "2024-01-14 02:20 PM",
      icon: XCircle,
      color: "text-yellow-400"
    },
    {
      id: 5,
      type: "Payment",
      title: "Payment failed",
      description: "Payment attempt failed for StartupXYZ. Reason: Insufficient funds",
      status: "pending",
      timestamp: "2024-01-13 11:00 AM",
      icon: AlertCircle,
      color: "text-red-400"
    },
    {
      id: 6,
      type: "Invite",
      title: "Brand invite accepted",
      description: "User jane@example.com accepted invite for DesignStudio",
      status: "resolved",
      timestamp: "2024-01-13 09:30 AM",
      icon: CheckCircle2,
      color: "text-green-400"
    },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesType = typeFilter === "all" || log.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || log.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const getTypeIcon = (Icon) => Icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">System Logs & Notifications</h1>
        <p className="text-white/70 mt-1">Monitor system events, errors, and notifications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{logs.length}</div>
            <p className="text-xs text-white/60 mt-1">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {logs.filter(l => l.status === "resolved").length}
            </div>
            <p className="text-xs text-white/60 mt-1">
              {Math.round((logs.filter(l => l.status === "resolved").length / logs.length) * 100)}% resolved
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              {logs.filter(l => l.status === "pending").length}
            </div>
            <p className="text-xs text-white/60 mt-1">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">
              {logs.filter(l => l.type === "API Error").length}
            </div>
            <p className="text-xs text-white/60 mt-1">API errors</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                type="search"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="invite">Invite</SelectItem>
                <SelectItem value="api error">API Error</SelectItem>
                <SelectItem value="suspension">Suspension</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">System Logs ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => {
              const Icon = getTypeIcon(log.icon);
              return (
                <div
                  key={log.id}
                  className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border-l-4 border-white/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-2 rounded-lg bg-white/10 ${log.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-white/10 text-white/80 rounded text-xs">
                            {log.type}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            log.status === 'resolved' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {log.status}
                          </span>
                        </div>
                        <div className="font-medium text-white mb-1">{log.title}</div>
                        <div className="text-sm text-white/60 mb-2">{log.description}</div>
                        <div className="flex items-center gap-1 text-xs text-white/50">
                          <Calendar className="h-3 w-3" />
                          {log.timestamp}
                        </div>
                      </div>
                    </div>
                    {log.status === "pending" && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          // Handle mark as resolved
                        }}
                      >
                        Mark as Resolved
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {filteredLogs.length === 0 && (
            <div className="text-center py-12 text-white/60">
              No logs found matching your filters
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

