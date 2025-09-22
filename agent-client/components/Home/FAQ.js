"use client";
import React, { useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  const faqList = [
    {
      question: "Is AI-generated content truly SEO-friendly and effective?",
      answer:
        "Absolutely! Our AI is specifically trained on current SEO best practices and search engine algorithms. It automatically incorporates relevant keywords, creates proper heading structures, generates compelling meta descriptions, and optimizes content length and readability. Many of our users see significant improvements in their search rankings within 30-60 days of consistent use.",
    },
    {
      question:
        "Can I really post directly to Facebook, Instagram, and other platforms?",
      answer:
        "Yes! We have official integrations with Facebook, Instagram, LinkedIn, Twitter, Medium, Blogger, WordPress, and many other platforms. Simply connect your accounts once through our secure OAuth system, and you can publish content across all platforms with a single click. We handle all the formatting and optimization for each platform automatically.",
    },
    {
      question: "How frequently are market trends and insights updated?",
      answer:
        "Our trend analyzer updates continuously throughout the day, with major trend reports generated daily and comprehensive industry analysis delivered weekly. We monitor millions of data points across social media, news sources, search trends, and industry publications to ensure you always have access to the most current market insights and opportunities.",
    },
    {
      question: "Can I customize and edit the AI-generated content?",
      answer:
        "Definitely! All generated content comes with our advanced rich text editor that allows you to modify, add, remove, or completely rewrite any section. You can adjust the tone, add your brand voice, include specific details, and make any changes needed. The AI provides an excellent foundation that you can customize to perfectly match your brand and messaging requirements.",
    },
    {
      question: "What kind of support do you provide for new users?",
      answer:
        "We provide comprehensive onboarding support including video tutorials, step-by-step guides, and live chat assistance. Professional and Business plan users get priority support with faster response times. Business plan users also receive a dedicated account manager and can schedule one-on-one training sessions to maximize their results with our platform.",
    },
  ];
  return (
    <section id="faq" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-white/80">
            Get answers to common questions about AI Marketing Agent
          </p>
        </div>
        <div className="space-y-6">
          {faqList.map((faq, index) => (
            <Card key={index} className="p-6">
              <Button
                variant="ghost"
                onClick={() => toggleFaq(index)}
                className="w-full text-left flex justify-between items-center p-0 h-auto"
              >
                <CardTitle className="text-lg font-semibold text-white">
                  {faq.question}
                </CardTitle>
                <span className="text-2xl text-white">
                  {openFaq === index ? "−" : "+"}
                </span>
              </Button>
              {openFaq === index && (
                <CardDescription className="mt-4 text-white/80">
                  {faq.answer}
                </CardDescription>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
