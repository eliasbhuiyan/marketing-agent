import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Image as ImageIcon,
  ScanFace,
  MessageSquare,
  FileText,
  Hash,
  Package,
  Youtube,
  FileSignature,
  CalendarDays,
} from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="w-full px-6 py-20 relative overflow-hidden">
        <div className="gradient-blob absolute top-0 right-0 w-96 h-96 rounded-full"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                id="hero-headline"
                className="text-6xl font-bold text-slate-900 leading-tight mb-6"
              >
                Empowering Brands With Intelligent Marketing Automation
              </h1>
              <p
                id="hero-subtext"
                className="text-xl text-slate-600 leading-relaxed"
              >
                MarkgenAI helps creators, brands, and marketers design, write,
                schedule, and publish content faster — powered by AI that
                understands your goals.
              </p>
            </div>
            <div className="relative">
              <svg
                className="w-full h-auto"
                viewbox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="200"
                  cy="200"
                  r="120"
                  fill="url(#gradient1)"
                  opacity="0.2"
                />{" "}
                <circle
                  cx="200"
                  cy="200"
                  r="80"
                  fill="url(#gradient1)"
                  opacity="0.3"
                />{" "}
                <circle
                  cx="200"
                  cy="200"
                  r="40"
                  fill="url(#gradient1)"
                  opacity="0.5"
                />{" "}
                <path
                  d="M200 160 L240 200 L200 240 L160 200 Z"
                  fill="url(#gradient1)"
                />{" "}
                <defs>
                  <lineargradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" style={{ stopColor: "#2563EB" }} />
                    <stop offset="100%" style={{ stopColor: "#7C3AED" }} />
                  </lineargradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-16 border-t border-slate-200">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Our Mission
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Our mission is to make marketing simpler, smarter, and faster
                for every business — from small startups to global brands.
                MarkgenAI empowers non-designers and non-writers to create
                professional content with confidence.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 shadow-lg">
              <svg
                className="w-full h-64"
                viewbox="0 0 300 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="20"
                  y="40"
                  width="80"
                  height="60"
                  rx="8"
                  fill="#2563EB"
                  opacity="0.1"
                />{" "}
                <rect
                  x="120"
                  y="60"
                  width="80"
                  height="60"
                  rx="8"
                  fill="#7C3AED"
                  opacity="0.15"
                />{" "}
                <rect
                  x="220"
                  y="30"
                  width="60"
                  height="80"
                  rx="8"
                  fill="#2563EB"
                  opacity="0.2"
                />{" "}
                <circle cx="60" cy="150" r="20" fill="#7C3AED" opacity="0.2" />{" "}
                <circle
                  cx="160"
                  cy="160"
                  r="25"
                  fill="#2563EB"
                  opacity="0.15"
                />{" "}
                <circle
                  cx="250"
                  cy="150"
                  r="18"
                  fill="#7C3AED"
                  opacity="0.25"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-20 border-t border-slate-200">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 serif-font">
              What We Do
            </h2>
            <p className="text-xl text-slate-600">
              Comprehensive AI tools for modern marketing
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="feature-card bg-white rounded-2xl p-8 shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Intelligent Poster Studio
              </h3>
              <p className="text-slate-600 text-sm">
                Create stunning posters with AI-powered design
              </p>
            </div>
            <div className="feature-card bg-white rounded-2xl p-8 shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />{" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Virtual Try-On
              </h3>
              <p className="text-slate-600 text-sm">
                Visualize products before creation
              </p>
            </div>
            <div className="feature-card bg-white rounded-2xl p-8 shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Caption Generator
              </h3>
              <p className="text-slate-600 text-sm">
                Engaging captions for every post
              </p>
            </div>
            <div className="feature-card bg-white rounded-2xl p-8 shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Blog Generator
              </h3>
              <p className="text-slate-600 text-sm">
                Long-form content in seconds
              </p>
            </div>
            <div className="feature-card bg-white rounded-2xl p-8 shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Hashtags &amp; Keywords
              </h3>
              <p className="text-slate-600 text-sm">
                Optimize reach with smart tags
              </p>
            </div>
            <div className="feature-card bg-white rounded-2xl p-8 shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Product Description
              </h3>
              <p className="text-slate-600 text-sm">
                Compelling product copy instantly
              </p>
            </div>
            <div className="feature-card bg-white rounded-2xl p-8 shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Thumbnail Generator
              </h3>
              <p className="text-slate-600 text-sm">
                Eye-catching video thumbnails
              </p>
            </div>
            <div className="feature-card bg-white rounded-2xl p-8 shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Script Writer
              </h3>
              <p className="text-slate-600 text-sm">
                Video scripts that convert
              </p>
            </div>
            <div className="feature-card bg-white rounded-2xl p-8 shadow-md border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Content Scheduler
              </h3>
              <p className="text-slate-600 text-sm">
                Plan and automate publishing
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-16 border-t border-slate-200">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm text-center">
                <div className="text-3xl font-semibold">15k+</div>
                <div className="mt-2 text-slate-600 text-sm">
                  Generated Posters
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm text-center">
                <div className="text-3xl font-semibold">10k+</div>
                <div className="mt-2 text-slate-600 text-sm">
                  Captions Created
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm text-center">
                <div className="text-3xl font-semibold">2k+</div>
                <div className="mt-2 text-slate-600 text-sm">Active Brands</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm text-center">
                <div className="text-3xl font-semibold">1M+</div>
                <div className="mt-2 text-slate-600 text-sm">
                  Social Impressions Supported
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Why Choose MarkgenAI
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed">
                We blend beautiful design, smart automation, and human-centered
                UX to help brands achieve more with less effort. Marketing teams
                trust our platform to deliver consistent quality fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-16 border-t border-slate-200">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Philosophy & Approach
            </h2>
            <p className="mt-6 text-slate-600 leading-relaxed">
              We believe AI should empower creativity, not replace it. At
              MarkgenAI, we blend beautiful design, smart automation, and
              human-centered UX to help brands achieve more with less effort.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-16 border-t border-slate-200">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold">Our Commitment</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
              <div className="text-base font-medium">Data Privacy</div>
              <div className="mt-2 text-slate-600 text-sm">
                Your data stays secure and under your control.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
              <div className="text-base font-medium">Secure OAuth Login</div>
              <div className="mt-2 text-slate-600 text-sm">
                Connect platforms safely with industry standards.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
              <div className="text-base font-medium">No Misuse of Content</div>
              <div className="mt-2 text-slate-600 text-sm">
                You own your content, we help you ship it.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-20 border-t border-slate-200">
        <div className="container mx-auto">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Start creating smarter content today
            </h2>
            <div className="mt-6">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
