"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Building2,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Brands", href: "/admin/brands", icon: Building2 },
  { name: "Billing & Payments", href: "/admin/billing", icon: CreditCard },
  { name: "Usage & Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "System Logs", href: "/admin/logs", icon: Bell },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen site-bg">
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
      >
        <div
          className="fixed inset-0 card-surface"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col card-surface">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-[#ffffff3b] text-white"
                      : "text-white hover:bg-[#ffffff3b] hover:text-white"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-[rgba(255, 255, 255, 0.233)] p-4">
            <Button variant="ghost" className="w-full justify-start text-white">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow card-surface border-r border-[#ffffff3b]">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-[#ffffff3b] text-white"
                      : "text-white hover:bg-[#ffffff3b] hover:text-white"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-[#ffffff3b] p-4">
            <Button variant="ghost" className="w-full justify-start text-white">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 justify-between items-center gap-x-4 border-b border-[#ffffff3b] card-surface px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Global Search */}
          <div className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                type="search"
                placeholder="Search users, brands, invoices..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 w-full"
              />
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="text-white flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 text-white">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

