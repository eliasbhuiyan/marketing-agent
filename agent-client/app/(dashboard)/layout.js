"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Image,
  FileText,
  TrendingUp,
  Calendar,
  Palette,
  Settings,
  Menu,
  X,
  LogOut,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Posters & Designs", href: "/posters", icon: Image },
  {
    name: "Content & Copywriting",
    href: "/content",
    icon: FileText,
    children: [
      { name: "Captions", href: "/content/caption" },
      { name: "Blogs", href: "/content/blog" },
      { name: "Email Marketing", href: "/content/email" },
      { name: "Hashtags & Keywords", href: "/content/hashtag" },
      { name: "Product Description", href: "/content/product" },
    ],
  },
  { name: "Trend Analyzer", href: "/trends", icon: TrendingUp },
  { name: "YouTube Marketing", href: "/youtube", icon: Youtube },
  { name: "Social Media Scheduler", href: "/scheduler", icon: Calendar },
  { name: "Templates Marketplace", href: "/templates", icon: Palette },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-[rgba(255,255,255,0.1)]">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-white">Marketing Agent</h1>
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
              const isActive =
                pathname === item.href ||
                (item.children &&
                  item.children.some((child) =>
                    pathname.startsWith(child.href.split("?")[0])
                  ));

              return item.children ? (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => {
                      const dropdown = document.getElementById(
                        `dropdown-${item.name}`
                      );
                      dropdown.classList.toggle("hidden");
                    }}
                    className={cn(
                      "w-full group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md",
                      isActive
                        ? "bg-[#ffffff3b] text-white"
                        : "text-white hover:bg-[#ffffff3b] hover:text-white"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </div>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    id={`dropdown-${item.name}`}
                    className={`pl-8 space-y-1 ${isActive ? "" : "hidden"}`}
                  >
                    {item.children.map((child) => {
                      const childIsActive =
                        pathname + window.location.search === child.href;
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "block px-2 py-2 text-sm font-medium rounded-md",
                            childIsActive
                              ? "text-white"
                              : "text-white/80 hover:text-white"
                          )}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
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
        <div className="flex flex-col flex-grow bg-[rgba(255,255,255,0.1)] border-r border-[#ffffff3b]">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-white">Marketing Agent</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.children &&
                  item.children.some((child) =>
                    pathname.startsWith(child.href.split("?")[0])
                  ));

              return item.children ? (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => {
                      const dropdown = document.getElementById(
                        `mobile-dropdown-${item.name}`
                      );
                      dropdown.classList.toggle("hidden");
                    }}
                    className={cn(
                      "w-full group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md",
                      isActive
                        ? "bg-[#ffffff3b] text-white"
                        : "text-white hover:bg-[#ffffff3b] hover:text-white"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </div>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    id={`mobile-dropdown-${item.name}`}
                    className={`pl-8 space-y-1 ${isActive ? "" : "hidden"}`}
                  >
                    {item.children.map((child) => {
                      const childIsActive =
                        pathname + window.location.search === child.href;
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "block px-2 py-2 text-sm font-medium rounded-md",
                            childIsActive
                              ? "text-white"
                              : "text-white/80 hover:text-white"
                          )}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
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
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-[#ffffff3b] bg-[rgba(255,255,255,0.1)] px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">U</span>
                </div>
              </div>
            </div>
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
