"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does the credit system work?",
    answer: "Credits are used for premium AI generations. 1 credit = 1 image or 1 short text generation. Complex tasks like video scripts or virtual try-on may use 2-3 credits. Starter plans renew credits monthly, while Business plans have unlimited usage."
  },
  {
    question: "Can I upload my own brand assets?",
    answer: "Absolutely. You can upload your logo, brand colors, and custom fonts. Our 'Intelligent Studio' will automatically apply your brand identity to every design it generates, ensuring consistency across all your marketing materials."
  },
  {
    question: "Is the generated content copyright-free?",
    answer: "Yes! You own full commercial rights to all content created with MarkgenAI. Whether it's a poster, a blog post, or an ad creative, you can use it for your business or client projects without any royalties."
  },
  {
    question: "Do you integrate with social media platforms?",
    answer: "We support direct scheduling and publishing to Instagram, Facebook, Twitter/X, LinkedIn, and Pinterest. You can connect your accounts in the dashboard and manage your entire content calendar from one place."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel or downgrade your plan at any time from your account settings. If you cancel, you'll keep access to your plan features until the end of your current billing cycle."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-32 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg mb-8">
            Everything you need to know about MarkgenAI. Can't find the answer you're looking for? 
            <a href="#" className="text-purple-400 hover:text-purple-300 ml-1 underline decoration-purple-400/30 underline-offset-4">
              Chat with our support team.
            </a>
          </p>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className={`border rounded-2xl transition-all duration-300 ${openIndex === i ? 'bg-white/5 border-purple-500/30' : 'bg-transparent border-white/10 hover:border-white/20'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`text-lg font-medium ${openIndex === i ? 'text-white' : 'text-gray-300'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-purple-500 text-white' : 'bg-white/5 text-gray-500'}`}>
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
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
      </div>
    </section>
  );
}
