"use client";
import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Image as imageIcon,
  FileText,
  TrendingUp,
  Settings,
  Menu,
  X,
  LogOut,
  Youtube,
  SquareUser,
  Images,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBrandData } from "@/lib/hooks/useBrandData";
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Posters & Designs", href: "/posters", icon: imageIcon },
  {
    name: "Intelligent Poster Studio",
    href: "/poster-studio",
    icon: imageIcon,
  },
  { name: "Virtual Try-On", href: "/virtual-try-on", icon: SquareUser },
  {
    name: "Content & Copywriting",
    href: "/content",
    icon: FileText,
    children: [
      { name: "Caption Generator", href: "/content/caption" },
      { name: "Blog Generator", href: "/content/blog" },
      { name: "Hashtags & Keywords", href: "/content/hashtag" },
      { name: "Product Description", href: "/content/product" },
    ],
  },
  {
    name: "YouTube Marketing",
    icon: Youtube,
    children: [
      { name: "Thumbnail Generator", href: "/youtube/thumbnail" },
      { name: "Script writer", href: "/youtube/script" },
    ],
  },
  { name: "Trend Analyzer", href: "/trends", icon: TrendingUp },
  // { name: "Modify Image", href: "/modify-image", icon: TrendingUp },
  // { name: "Social Media Scheduler", href: "/scheduler", icon: Calendar },
  { name: "Library", href: "/library", icon: Images },
  // { name: "Templates", href: "/templates", icon: Palette },
  { name: "Settings", href: "/settings/profile", icon: Settings },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { brandData } = useBrandData();

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
            <Link href="/dashboard">
              <Image src="/logo-light.png" alt="Logo" width={150} height={50} />
            </Link>
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
                      const childIsActive = pathname === child.href;
                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "block px-2 py-2 text-sm font-medium rounded-md",
                            childIsActive
                              ? "text-white"
                              : "text-white/60 hover:text-white"
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
        <div className="flex flex-col flex-grow card-surface border-r border-[#ffffff3b]">
          <div className="flex h-16 items-center px-4">
            <Link href="/dashboard">
              <Image src="/logo-light.png" alt="Logo" width={150} height={50} />
            </Link>
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
                      const childIsActive = pathname === child.href;
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
        <div className="sticky top-0 z-40 flex h-16 shrink-0 justify-between lg:justify-end items-center gap-x-4 border-b border-[#ffffff3b] card-surface px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          {/* Coin wallet history */}
          <Link
            href="/settings/billing"
            className="flex items-center space-x-4 bg-yellow-400 px-4 py-1 rounded-md"
          >
            <div className="flex items-center space-x-2">
              <span className="text-base font-medium text-white">Credits:</span>
              <span className="text-base font-bold text-white">
                {brandData?.credits}.0
              </span>
            </div>
          </Link>
        </div>
        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <Suspense fallback={<p>Loading..</p>}>{children}</Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
