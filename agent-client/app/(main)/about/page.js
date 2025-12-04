import React from "react";
import { ScanFace, UserLock, MessageSquareLock } from "lucide-react";
import AllFeatures from "@/components/landing/AllFeatures";

const Page = () => {
  const coomitments = [
    {
      title: "Data Privacy",
      description: "Your data stays secure and under your control.",
      icon: ScanFace,
    },
    {
      title: "Secure OAuth Login",
      description: "Connect platforms safely with industry standards.",
      icon: UserLock,
    },
    {
      title: "No Misuse of Content",
      description: "You own your content, we help you ship it.",
      icon: MessageSquareLock,
    },
  ];
  return (
    <main className="min-h-screen bg-foreground text-white">
      <section className="w-full px-6 py-20 relative overflow-hidden">
        <div className="gradient-blob absolute top-0 right-0 w-96 h-96 rounded-full"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                id="hero-headline"
                className="text-6xl font-bold text-white leading-tight mb-6"
              >
                Empowering Brands With Intelligent Marketing Automation
              </h1>
              <p
                id="hero-subtext"
                className="text-xl text-white/80 leading-relaxed"
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
      <section className="w-full px-6 py-16 border-y border-white/5 bg-[#0A0A0A]">
        <div className="container mx-auto">
          <div className="space-y-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Our Mission
              </h2>
              <p className="mt-6 text-white/80 leading-relaxed">
                Our mission is to make marketing simpler, smarter, and faster
                for every business — from small startups to global brands.
                MarkgenAI empowers non-designers and non-writers to create
                professional content with confidence.
              </p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Why Choose MarkgenAI
              </h2>
              <p className="mt-6 text-white/80 leading-relaxed">
                We blend beautiful design, smart automation, and human-centered
                UX to help brands achieve more with less effort. Marketing teams
                trust our platform to deliver consistent quality fast.
              </p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Philosophy & Approach
              </h2>
              <p className="mt-6 text-white/80 leading-relaxed">
                We believe AI should empower creativity, not replace it. At
                MarkgenAI, we blend beautiful design, smart automation, and
                human-centered UX to help brands achieve more with less effort.
              </p>
            </div>
          </div>
        </div>
      </section>
      <AllFeatures />
      <section className="w-full px-6 py-16 border-y border-white/5 bg-[#0A0A0A]">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold">Our Commitment</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coomitments.map((commitment) => (
              <div
                key={commitment.title}
                className="rounded-2xl border border-slate-200 p-6 shadow-sm"
              >
                <commitment.icon className="h-8 w-8 text-white mb-4" />
                <h3 className="text-base font-medium">{commitment.title}</h3>
                <p className="mt-2 text-white/80 text-sm">
                  {commitment.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full px-6 py-20">
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
    </main>
  );
};

export default Page;
