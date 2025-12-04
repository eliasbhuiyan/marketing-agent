"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is MarkgenAI and how does it help my business?",
    answer:
      "MarkgenAI is an all-in-one AI marketing assistant that creates posters, captions, scripts, product descriptions, keywords, blogs, and schedules your content. It saves time, boosts creativity, and helps you produce professional marketing materials instantly.",
  },
  {
    question: "Can I generate multiple types of content from one place?",
    answer:
      "Yes! MarkgenAI supports posters, blog posts, product descriptions, social captions, hashtags, thumbnails, virtual try-on visuals, and more. Everything is available in a single unified workspace.",
  },
  {
    question: "Is the generated content copyright-free?",
    answer:
      "Yes! You own full commercial rights to all content created with MarkgenAI. Whether it's a poster, a blog post, or an ad creative, you can use it for your business or client projects without any royalties.",
  },
  {
    question: "Is my content and uploaded data secure?",
    answer:
      "Absolutely. We prioritize your privacy and data security. All your content and uploaded files are stored securely and are not shared with third parties. We use industry-standard encryption to protect your data.",
  },
  {
    question: "Can my team collaborate inside MarkgenAI?",
    answer:
      "Yes! MarkgenAI offers team collaboration features, allowing multiple users to work together on projects. You can share content and manage tasks within the platform.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, MarkgenAI comes with a free plan for testing essential features. You can upgrade anytime.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="py-32 bg-foreground">
      <div className="space-y-4 container mx-auto px-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`border rounded-2xl transition-all duration-300 ${
              openIndex === i
                ? "bg-white/5 border-purple-500/30"
                : "bg-transparent border-white/10 hover:border-white/20"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span
                className={`text-lg font-medium ${
                  openIndex === i ? "text-white" : "text-gray-300"
                }`}
              >
                {faq.question}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  openIndex === i
                    ? "bg-purple-500 text-white"
                    : "bg-white/5 text-gray-500"
                }`}
              >
                {openIndex === i ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
