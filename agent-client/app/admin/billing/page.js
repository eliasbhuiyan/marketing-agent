"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Download,
  Eye,
  Calendar,
  CreditCard as CreditCardIcon,
  Building2
} from "lucide-react";

export default function BillingPage() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const invoices = [
    {
      id: "INV-001",
      brandName: "TechCorp",
      amount: 299.99,
      method: "Credit Card",
      status: "Paid",
      date: "2024-01-15",
      description: "Monthly Subscription - Pro Plan"
    },
    {
      id: "INV-002",
      brandName: "DesignStudio",
      amount: 149.99,
      method: "PayPal",
      status: "Paid",
      date: "2024-01-14",
      description: "Monthly Subscription - Basic Plan"
    },
    {
      id: "INV-003",
      brandName: "FashionBrand",
      amount: 499.99,
      method: "Credit Card",
      status: "Pending",
      date: "2024-01-13",
      description: "Monthly Subscription - Enterprise Plan"
    },
    {
      id: "INV-004",
      brandName: "MarketingPro",
      amount: 199.99,
      method: "Bank Transfer",
      status: "Paid",
      date: "2024-01-12",
      description: "Monthly Subscription - Standard Plan"
    },
    {
      id: "INV-005",
      brandName: "StartupXYZ",
      amount: 99.99,
      method: "Credit Card",
      status: "Paid",
      date: "2024-01-11",
      description: "Monthly Subscription - Starter Plan"
    },
    {
      id: "INV-006",
      brandName: "TechCorp",
      amount: 299.99,
      method: "Credit Card",
      status: "Failed",
      date: "2024-01-10",
      description: "Monthly Subscription - Pro Plan"
    },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesMethod = methodFilter === "all" || invoice.method.toLowerCase().includes(methodFilter.toLowerCase());
    const matchesDate = dateFilter === "all" || true; // Add actual date filtering logic
    const matchesSearch = searchQuery === "" || 
      invoice.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesMethod && matchesDate && matchesSearch;
  });

  const totalRevenue = filteredInvoices
    .filter(inv => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  if (selectedInvoice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => setSelectedInvoice(null)} className="text-white mb-4">
              ← Back to Billing
            </Button>
            <h1 className="text-3xl font-bold text-white">Invoice Details</h1>
          </div>
          <Button variant="default">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">{selectedInvoice.id}</CardTitle>
                <CardDescription className="text-white/60">{selectedInvoice.description}</CardDescription>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedInvoice.status === 'Paid' 
                  ? 'bg-green-500/20 text-green-400' 
                  : selectedInvoice.status === 'Pending'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {selectedInvoice.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-white/60 mb-2">Brand</div>
                <div className="text-lg font-semibold text-white">{selectedInvoice.brandName}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Date</div>
                <div className="text-lg font-semibold text-white">{selectedInvoice.date}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Payment Method</div>
                <div className="text-lg font-semibold text-white">{selectedInvoice.method}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Amount</div>
                <div className="text-lg font-semibold text-white">${selectedInvoice.amount.toFixed(2)}</div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/20">
              <div className="text-sm font-medium text-white mb-4">Invoice Items</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <div className="font-medium text-white">{selectedInvoice.description}</div>
                    <div className="text-sm text-white/60">Subscription period: {selectedInvoice.date}</div>
                  </div>
                  <div className="font-semibold text-white">${selectedInvoice.amount.toFixed(2)}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/20">
                <div className="text-lg font-semibold text-white">Total</div>
                <div className="text-2xl font-bold text-white">${selectedInvoice.amount.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Billing & Payments</h1>
        <p className="text-white/70 mt-1">Manage invoices and payment transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-white/60 mt-1">From {filteredInvoices.filter(inv => inv.status === "Paid").length} paid invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${filteredInvoices.filter(inv => inv.status === "Pending").reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}
            </div>
            <p className="text-xs text-white/60 mt-1">{filteredInvoices.filter(inv => inv.status === "Pending").length} pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{filteredInvoices.length}</div>
            <p className="text-xs text-white/60 mt-1">All time</p>
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
                placeholder="Search by invoice ID or brand name..."
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
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter by Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="credit card">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">All Invoices ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">Invoice ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">Brand Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">Method</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-white/80">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-white/80">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{invoice.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-white/60" />
                        <span className="text-white">{invoice.brandName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white font-semibold">${invoice.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <CreditCardIcon className="h-4 w-4 text-white/60" />
                        <span className="text-white/80">{invoice.method}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        invoice.status === 'Paid' 
                          ? 'bg-green-500/20 text-green-400' 
                          : invoice.status === 'Pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white/80">{invoice.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedInvoice(invoice)}
                          className="text-white hover:bg-white/10"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/10"
                        >
                          <Download className="h-4 w-4" />
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

