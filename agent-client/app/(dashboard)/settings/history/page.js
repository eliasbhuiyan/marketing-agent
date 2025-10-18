"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Search, Download, Filter } from "lucide-react";
import LoaderAnim from "@/components/LoaderAnim";

const UsageHistory = () => {
  const [usageData, setUsageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [totalCoins, setTotalCoins] = useState(0);
  const [usageStats, setUsageStats] = useState({
    selfModel: 0,
    poster: 0,
    youtube: 0,
    copywriting: 0,
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call to fetch usage history
    setTimeout(() => {
      const mockUsageData = [
        {
          id: "1",
          taskType: "Self Model",
          description: "Generated casual outfit model",
          coins: 15,
          date: "2023-06-15T10:30:00Z",
          user: "John Doe",
          status: "completed",
        },
        {
          id: "2",
          taskType: "Poster Design",
          description: "Summer sale promotional poster",
          coins: 25,
          date: "2023-06-18T14:20:00Z",
          user: "Jane Smith",
          status: "completed",
        },
        {
          id: "3",
          taskType: "YouTube Script",
          description: "Product review script",
          coins: 30,
          date: "2023-06-20T09:15:00Z",
          user: "John Doe",
          status: "completed",
        },
        {
          id: "4",
          taskType: "Copywriting",
          description: "Product description for website",
          coins: 20,
          date: "2023-06-22T16:45:00Z",
          user: "Alex Johnson",
          status: "completed",
        },
        {
          id: "5",
          taskType: "Self Model",
          description: "Business attire model generation",
          coins: 15,
          date: "2023-06-25T11:30:00Z",
          user: "Jane Smith",
          status: "completed",
        },
        {
          id: "6",
          taskType: "Poster Design",
          description: "New product launch poster",
          coins: 25,
          date: "2023-06-28T13:10:00Z",
          user: "Alex Johnson",
          status: "completed",
        },
        {
          id: "7",
          taskType: "YouTube Script",
          description: "How-to tutorial script",
          coins: 30,
          date: "2023-07-02T15:20:00Z",
          user: "John Doe",
          status: "completed",
        },
        {
          id: "8",
          taskType: "Copywriting",
          description: "Email marketing campaign",
          coins: 20,
          date: "2023-07-05T09:45:00Z",
          user: "Jane Smith",
          status: "completed",
        },
      ];

      setUsageData(mockUsageData);

      // Calculate total coins and usage statistics
      const total = mockUsageData.reduce((sum, item) => sum + item.coins, 0);
      setTotalCoins(total);

      const stats = {
        selfModel: mockUsageData.filter(item => item.taskType === "Self Model").reduce((sum, item) => sum + item.coins, 0),
        poster: mockUsageData.filter(item => item.taskType === "Poster Design").reduce((sum, item) => sum + item.coins, 0),
        youtube: mockUsageData.filter(item => item.taskType === "YouTube Script").reduce((sum, item) => sum + item.coins, 0),
        copywriting: mockUsageData.filter(item => item.taskType === "Copywriting").reduce((sum, item) => sum + item.coins, 0),
      };
      setUsageStats(stats);

      setLoading(false);
    }, 1500);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  const handleDateSelect = (range) => {
    setDateRange(range);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  const exportCSV = () => {
    const headers = ["Task Type", "Description", "Coins", "Date", "User", "Status"];
    const csvData = filteredData.map(item => [
      item.taskType,
      item.description,
      item.coins,
      formatDate(item.date),
      item.user,
      item.status
    ]);
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "usage_history.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter data based on search term, task type, and date range
  const filteredData = usageData.filter(item => {
    const matchesSearch = 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.taskType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || item.taskType.toLowerCase().includes(filterType.toLowerCase());
    
    const itemDate = new Date(item.date);
    const matchesDateRange = 
      (!dateRange.from || itemDate >= dateRange.from) && 
      (!dateRange.to || itemDate <= dateRange.to);
    
    return matchesSearch && matchesType && matchesDateRange;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      {/* Usage Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Coins Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCoins}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Self Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usageStats.selfModel}</div>
            <p className="text-xs text-muted-foreground">{Math.round(usageStats.selfModel / totalCoins * 100)}% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Poster Design</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usageStats.poster}</div>
            <p className="text-xs text-muted-foreground">{Math.round(usageStats.poster / totalCoins * 100)}% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">YouTube</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usageStats.youtube}</div>
            <p className="text-xs text-muted-foreground">{Math.round(usageStats.youtube / totalCoins * 100)}% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Copywriting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usageStats.copywriting}</div>
            <p className="text-xs text-muted-foreground">{Math.round(usageStats.copywriting / totalCoins * 100)}% of total</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by description, user or task type..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="self model">Self Model</SelectItem>
              <SelectItem value="poster">Poster Design</SelectItem>
              <SelectItem value="youtube">YouTube Script</SelectItem>
              <SelectItem value="copywriting">Copywriting</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Button 
              variant="outline" 
              className="w-[240px] justify-start text-left font-normal"
              onClick={() => alert("Date picker functionality removed - component not available")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Pick a date range</span>
            </Button>
          </div>
          
          <Button variant="outline" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Usage History Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoaderAnim />
        </div>
      ) : filteredData.length > 0 ? (
        <Card>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Task Type</th>
                    <th className="text-left py-3 px-4 hidden md:table-cell">Description</th>
                    <th className="text-left py-3 px-4">Coins</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-right py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${getTaskTypeClass(item.taskType)}`}>
                          {item.taskType}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell max-w-[300px] truncate">
                        {item.description}
                      </td>
                      <td className="py-3 px-4 font-medium">{item.coins}</td>
                      <td className="py-3 px-4">{formatDate(item.date)}</td>
                      <td className="py-3 px-4">{item.user}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${item.status === "completed" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-12">
          <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No usage history found
          </h3>
          <p className="text-white/70">
            {searchTerm || filterType !== "all" || dateRange.from || dateRange.to
              ? "Try adjusting your search or filters"
              : "No usage history available yet."}
          </p>
        </div>
      )}
    </div>
  );
};

// Helper function for task type styling
const getTaskTypeClass = (taskType) => {
  switch (taskType) {
    case "Self Model":
      return "bg-blue-100 text-blue-800";
    case "Poster Design":
      return "bg-purple-100 text-purple-800";
    case "YouTube Script":
      return "bg-red-100 text-red-800";
    case "Copywriting":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default UsageHistory;