import React from "react";
import { ScanFace, UserLock, MessageSquareLock } from "lucide-react";
import AllFeatures from "@/components/landing/AllFeatures";
import Image from "next/image";
import Link from "next/link";

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
      <section className="py-40 lg:py-20 overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                id="hero-headline"
                className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl font-bold text-white leading-tight mb-6"
              >
                Empowering Brands With Intelligent Marketing Automation
              </h1>
              <p
                id="hero-subtext"
                className="text-base md:text-xl text-white/80 leading-relaxed"
              >
                MarkgenAI helps creators, brands, and marketers design, write,
                schedule, and publish content faster — powered by AI that
                understands your goals.
              </p>
            </div>
            <div className="hidden lg:block">
              <Image
                src="/gradient-shape.svg"
                alt="Animated Gradient"
                width={400}
                height={400}
                className="w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 border-y border-white/5 bg-[#0A0A0A]">
        <div className="container">
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
      <section className="py-16 border-y border-white/5 bg-[#0A0A0A]">
        <div className="container">
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
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Start creating smarter content today
          </h2>
          <div className="mt-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
