import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import {
  Mail,
  Phone,
  Clock,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const Page = () => {
  return (
    <>
      <div
        id="success-toast"
        className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded-xl shadow-xl z-50 hidden success-toast"
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewbox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Support ticket submitted successfully!</span>
        </div>
      </div>
      <header className="w-full gradient-header text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 id="page-title" className="text-5xl font-bold mb-4 serif-font">
            Contact &amp; Support
          </h1>
          <p id="page-subtitle" className="text-lg opacity-90">
            We're here to help you succeed with MarkGenAI
          </p>
        </div>
      </header>
      <div className="w-full px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3
                id="email-label"
                className="text-xl font-semibold text-slate-900 text-center mb-2"
              >
                Email Support
              </h3>
              <p className="text-slate-600 text-center mb-4">
                <a
                  id="email-address"
                  href="mailto:support@markgenai.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  support@markgenai.com
                </a>
              </p>
              <p
                id="response-time"
                className="text-sm text-slate-500 text-center"
              >
                Response within 24 hours
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">
                Live Chat
              </h3>
              <p className="text-slate-600 text-center mb-4">
                Available 9 AM - 6 PM EST
              </p>
              <p className="text-sm text-slate-500 text-center">Mon - Fri</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">
                Help Center
              </h3>
              <p className="text-slate-600 text-center mb-4">
                Browse documentation
              </p>
              <p className="text-sm text-slate-500 text-center">
                24/7 Self-service
              </p>
            </div>
          </div>
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2 serif-font">
                Connect With Us
              </h2>
              <p className="text-slate-600">
                Follow us on social media for updates and tips
              </p>
            </div>
            <div className="flex justify-center gap-6 flex-wrap">
              {" "}
              <a
                href="https://twitter.com/markgenai"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>{" "}
              <a
                href="https://linkedin.com/company/markgenai"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center text-white shadow-lg"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </a>{" "}
              <a
                href="https://instagram.com/markgenai"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>{" "}
              <a
                href="https://facebook.com/markgenai"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>{" "}
              <a
                href="https://youtube.com/@markgenai"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                </svg>
              </a>{" "}
              <a
                href="https://discord.gg/markgenai"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg"
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewbox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"></path>
                </svg>
              </a>
            </div>
          </section>
          <div className="grid lg:grid-cols-2 gap-12">
            <section>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <h2
                  id="form-title"
                  className="text-3xl font-bold text-slate-900 mb-6 serif-font"
                >
                  Submit a Support Ticket
                </h2>
                <form id="support-form">
                  <div className="space-y-6">
                    <div>
                      <label
                        for="name"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Your Name
                      </label>{" "}
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label
                        for="email"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Email Address
                      </label>{" "}
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label
                        for="subject"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Subject
                      </label>{" "}
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label
                        for="priority"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Priority Level
                      </label>{" "}
                      <select
                        id="priority"
                        name="priority"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                      >
                        {" "}
                        <option value="low">Low - General inquiry</option>{" "}
                        <option value="medium" selected>
                          Medium - Issue affecting work
                        </option>{" "}
                        <option value="high">High - Critical issue</option>{" "}
                        <option value="urgent">Urgent - Service down</option>{" "}
                      </select>
                    </div>
                    <div>
                      <label
                        for="priority"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Priority Level
                      </label>{" "}
                      <select
                        id="priority"
                        name="priority"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                      >
                        {" "}
                        <option value="low">Low - General inquiry</option>{" "}
                        <option value="medium" selected>
                          Medium - Issue affecting work
                        </option>{" "}
                        <option value="high">High - Critical issue</option>{" "}
                        <option value="urgent">Urgent - Service down</option>{" "}
                      </select>
                    </div>
                    <div>
                      <label
                        for="message"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Message
                      </label>{" "}
                      <textarea
                        id="message"
                        name="message"
                        rows="6"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                      ></textarea>
                    </div>{" "}
                    <button
                      type="submit"
                      id="submit-btn"
                      className="gradient-button w-full text-white font-semibold px-8 py-4 rounded-xl shadow-lg"
                    >
                      {" "}
                      <span id="submit-text">Submit Ticket</span>{" "}
                      <span id="submit-loading" className="hidden">
                        Submitting...
                      </span>{" "}
                    </button>
                  </div>
                </form>
              </div>
            </section>
            <section>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 serif-font">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="faq-item border border-slate-200 rounded-xl overflow-hidden">
                    <button className="faq-trigger w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition text-left">
                      {" "}
                      <span className="font-semibold text-slate-900">
                        How do I reset my password?
                      </span>
                      <svg
                        className="rotate-icon w-5 h-5 text-slate-600"
                        fill="none"
                        stroke="currentColor"
                        viewbox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div className="faq-answer px-6 py-0">
                      <p className="text-slate-600 pb-4">
                        Click on "Forgot Password" on the login page. Enter your
                        email address and we'll send you a reset link. Follow
                        the instructions in the email to create a new password.
                      </p>
                    </div>
                  </div>
                  <div className="faq-item border border-slate-200 rounded-xl overflow-hidden">
                    <button className="faq-trigger w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition text-left">
                      {" "}
                      <span className="font-semibold text-slate-900">
                        What payment methods do you accept?
                      </span>
                      <svg
                        className="rotate-icon w-5 h-5 text-slate-600"
                        fill="none"
                        stroke="currentColor"
                        viewbox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div className="faq-answer px-6 py-0">
                      <p className="text-slate-600 pb-4">
                        We accept all major credit cards (Visa, MasterCard,
                        American Express), PayPal, and bank transfers for
                        enterprise plans. All payments are processed securely
                        through our payment partners.
                      </p>
                    </div>
                  </div>
                  <div className="faq-item border border-slate-200 rounded-xl overflow-hidden">
                    <button className="faq-trigger w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition text-left">
                      {" "}
                      <span className="font-semibold text-slate-900">
                        Can I cancel my subscription anytime?
                      </span>
                      <svg
                        className="rotate-icon w-5 h-5 text-slate-600"
                        fill="none"
                        stroke="currentColor"
                        viewbox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div className="faq-answer px-6 py-0">
                      <p className="text-slate-600 pb-4">
                        Yes! You can cancel your subscription at any time from
                        your account settings. You'll continue to have access
                        until the end of your billing period. No cancellation
                        fees apply.
                      </p>
                    </div>
                  </div>
                  <div className="faq-item border border-slate-200 rounded-xl overflow-hidden">
                    <button className="faq-trigger w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition text-left">
                      {" "}
                      <span className="font-semibold text-slate-900">
                        How does the AI poster generator work?
                      </span>
                      <svg
                        className="rotate-icon w-5 h-5 text-slate-600"
                        fill="none"
                        stroke="currentColor"
                        viewbox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div className="faq-answer px-6 py-0">
                      <p className="text-slate-600 pb-4">
                        Our AI analyzes your input (text, brand colors, style
                        preferences) and generates professional poster designs
                        in seconds. You can customize layouts, fonts, and
                        images, then export in high resolution.
                      </p>
                    </div>
                  </div>
                  <div className="faq-item border border-slate-200 rounded-xl overflow-hidden">
                    <button className="faq-trigger w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition text-left">
                      {" "}
                      <span className="font-semibold text-slate-900">
                        Is my content and data secure?
                      </span>
                      <svg
                        className="rotate-icon w-5 h-5 text-slate-600"
                        fill="none"
                        stroke="currentColor"
                        viewbox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div className="faq-answer px-6 py-0">
                      <p className="text-slate-600 pb-4">
                        Absolutely. We use bank-level encryption, secure OAuth
                        authentication, and industry-standard security
                        practices. Your content is private and never shared or
                        used to train AI models without permission.
                      </p>
                    </div>
                  </div>
                  <div className="faq-item border border-slate-200 rounded-xl overflow-hidden">
                    <button className="faq-trigger w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition text-left">
                      {" "}
                      <span className="font-semibold text-slate-900">
                        Do you offer team or enterprise plans?
                      </span>
                      <svg
                        className="rotate-icon w-5 h-5 text-slate-600"
                        fill="none"
                        stroke="currentColor"
                        viewbox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <div className="faq-answer px-6 py-0">
                      <p className="text-slate-600 pb-4">
                        Yes! We offer team plans with collaborative features and
                        enterprise plans with custom integrations, dedicated
                        support, and volume pricing. Contact our sales team for
                        a custom quote.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <footer className="w-full px-6 py-12 bg-slate-900 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-3xl font-bold text-white mb-4">MarkGenAI</div>
          <p className="text-slate-400">
            © 2025 MarkGenAI. We're here to help.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Page;
