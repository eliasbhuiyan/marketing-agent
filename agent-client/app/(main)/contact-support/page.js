import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Clock,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  FacebookIcon,
} from "lucide-react";
import FAQ from "@/components/landing/FAQ";
import SupportTicket from "@/components/landing/SupportTicket";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <header className="bg-foreground gradient-header text-white py-48">
        <div className="container mx-auto text-center">
          <h1 id="page-title" className="text-5xl font-bold mb-4 serif-font">
            Contact &amp; Support
          </h1>
          <p id="page-subtitle" className="text-lg opacity-90">
            We&apos;re here to help you succeed with MarkGenAI
          </p>
        </div>
      </header>
      <section className="py-40 border-y border-white/5 bg-[#0A0A0A]">
        <div className="container mx-auto grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-gray-400 text-lg mb-8">
              Have questions or need assistance? Our support team is ready to
              help you with anything you need. Whether it&apos;s technical
              support, billing inquiries, or general questions about our
              services, we&apos;ve got you covered.
              <span className="block">
                Contact our support team at -{" "}
                <Link
                  href="mailto:support@markgenai.com"
                  className="text-purple-400 hover:text-purple-300"
                >
                  contact.markgenai@gmail.com
                </Link>
              </span>
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="https://www.facebook.com/markgenai"
                className="text-white hover:text-purple-400"
                target="_blank"
              >
                <FacebookIcon className="w-6 h-6" />
              </Link>
              <Link
                href="https://www.facebook.com/markgenai"
                className="text-white hover:text-purple-400"
                target="_blank"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
          <div className="rounded-2xl p-8 shadow-lg border border-slate-100">
            <h2
              id="form-title"
              className="text-3xl font-bold text-white mb-6 serif-font"
            >
              Submit a Support Ticket
            </h2>
            <SupportTicket />
          </div>
        </div>
      </section>
      <FAQ />
    </>
  );
};

export default Page;
