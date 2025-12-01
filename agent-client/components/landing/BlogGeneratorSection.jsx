"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Type,
  Loader2,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogGeneratorSection() {
  const [step, setStep] = useState("step1");
  const [titleInput, setTitleInput] = useState("");
  const [headingProgress, setHeadingProgress] = useState(0);
  const [bodyProgress, setBodyProgress] = useState(0);

  const sampleTopic = "10 AI Tools That Will Transform Your Marketing";

  // Simulate the workflow
  useEffect(() => {
    let timeout;

    const runSequence = () => {
      setStep("step1");
      setTitleInput("");

      // Auto fill and trigger step 2
      timeout = setTimeout(() => {
        setTitleInput(sampleTopic);

        timeout = setTimeout(() => {
          setStep("step2-generating");

          timeout = setTimeout(() => {
            setStep("step2-complete");

            timeout = setTimeout(() => {
              setStep("step3-generating");

              timeout = setTimeout(() => {
                setStep("step3-complete");

                timeout = setTimeout(() => {
                  runSequence();
                }, 6000);
              }, 3000);
            }, 2000);
          }, 2500);
        }, 1200);
      }, 800);
    };

    runSequence();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (step === "step2-generating") {
      const interval = setInterval(() => {
        setHeadingProgress((prev) => (prev >= 100 ? 100 : prev + 3));
      }, 40);
      return () => clearInterval(interval);
    } else {
      setHeadingProgress(0);
    }
  }, [step]);

  useEffect(() => {
    if (step === "step3-generating") {
      const interval = setInterval(() => {
        setBodyProgress((prev) => (prev >= 100 ? 100 : prev + 2));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setBodyProgress(0);
    }
  }, [step]);

  const headings = [
    {
      title: "What are AI Marketing Tools?",
      img: "/blog/ai_technology_neural_network_illustration.png",
    },
    {
      title: "The Top 10 AI Tools Explained",
      img: "/blog/marketing_analytics_dashboard_illustration.png",
    },
    {
      title: "How to Choose the Right Tool",
      img: "/blog/blog_writing_creative_concept.png",
    },
  ];

  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Steps Info */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400">
              <BookOpen className="w-4 h-4" />
              <span>AI Blog Generator</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Create Beautiful <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Blog Posts with Images
              </span>
            </h2>

            <p className="text-xl text-gray-400">
              Give our AI a topic and watch it generate structured headings with
              matching illustrations, then write the complete blog post.
            </p>

            {/* Step Indicators */}
            <div className="space-y-3 pt-4">
              {[
                {
                  num: 1,
                  title: "Enter Topic",
                  icon: Type,
                  active: [
                    "step1",
                    "step2-generating",
                    "step2-complete",
                    "step3-generating",
                    "step3-complete",
                  ].includes(step),
                },
                {
                  num: 2,
                  title: "Generate Headings & Images",
                  icon: ImageIcon,
                  active: [
                    "step2-generating",
                    "step2-complete",
                    "step3-generating",
                    "step3-complete",
                  ].includes(step),
                },
                {
                  num: 3,
                  title: "Write Full Blog",
                  icon: FileText,
                  active: ["step3-generating", "step3-complete"].includes(step),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    item.active
                      ? "bg-blue-500/20 border border-blue-500/30"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      item.active
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {item.num}
                  </div>
                  <div>
                    <div
                      className={`font-medium text-sm ${
                        item.active ? "text-blue-400" : "text-gray-400"
                      }`}
                    >
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/content/blog">
             <Button
              size="lg"
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 font-bold"
            >
              Generate Your Blog
            </Button>
            </Link>
          </div>

          {/* Right: Dashboard */}
          <div className="relative">
            <div className="bg-[#111] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="h-14 border-b border-white/10 bg-white/5 px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="text-xs font-mono text-gray-500">
                  BlogGen_AI_Studio
                </div>
              </div>

              <div className="p-8 min-h-[700px] flex flex-col">
                <AnimatePresence mode="wait">
                  {/* STEP 1: Enter Topic */}
                  {step === "step1" && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col justify-center"
                    >
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                        Blog Topic
                      </label>
                      <div className="relative mb-6">
                        <input
                          type="text"
                          value={titleInput}
                          onChange={(e) => setTitleInput(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                          placeholder="Enter your blog topic..."
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center py-16 text-center opacity-50">
                        <Type className="w-12 h-12 text-gray-500 mb-4" />
                        <p className="text-gray-400">
                          Enter a topic and we'll generate everything
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Generate Headings with Images */}
                  {(step === "step2-generating" ||
                    step === "step2-complete") && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="mb-4">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                          Blog Topic
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {titleInput}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                          Generating Headings & Images
                        </div>
                        {step === "step2-generating" && (
                          <div className="flex items-center gap-1">
                            <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />
                            <span className="text-xs text-blue-400">
                              {headingProgress}%
                            </span>
                          </div>
                        )}
                        {step === "step2-complete" && (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        )}
                      </div>

                      <motion.div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-6">
                        <motion.div
                          className="h-full bg-blue-500"
                          animate={{
                            width: `${
                              step === "step2-generating"
                                ? headingProgress
                                : 100
                            }%`,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>

                      <div className="space-y-4 overflow-y-auto flex-1 grid grid-rows-3 pr-2">
                        {headings.map((heading, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="space-y-2 h-full"
                          >
                            <h4 className="font-bold text-white text-lg">
                              {heading.title}
                            </h4>
                            <div className="relative w-full max-w-96 h-3/4 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                              <Image
                                src={heading.img}
                                alt={heading.title}
                                className="w-full h-full object-cover"
                                fill={true}
                              />
                              <div className="absolute inset-0 bg-black/30" />
                            </div>
                            
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Generate Full Blog */}
                  {(step === "step3-generating" ||
                    step === "step3-complete") && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex-1 flex flex-col"
                    >
                      <div className="mb-4">
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {titleInput}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Published by MarkgenAI • SEO Score: 96/100
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                          Generating Full Blog
                        </div>
                        {step === "step3-generating" && (
                          <div className="flex items-center gap-1">
                            <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />
                            <span className="text-xs text-blue-400">
                              {bodyProgress}%
                            </span>
                          </div>
                        )}
                        {step === "step3-complete" && (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        )}
                      </div>

                      <motion.div className="h-1.5 bg-gray-700 rounded-full overflow-hidden mb-6">
                        <motion.div
                          className="h-full bg-blue-500"
                          animate={{
                            width: `${
                              step === "step3-generating" ? bodyProgress : 100
                            }%`,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>

                      <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-gray-300 text-sm leading-relaxed">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p>
                            In today's fast-paced digital landscape, artificial
                            intelligence has emerged as a revolutionary force in
                            marketing. From automating customer interactions to
                            generating personalized content at scale, AI tools
                            are fundamentally transforming how brands engage
                            with their audiences.
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <h3 className="text-blue-400 font-bold mb-2">
                            What are AI Marketing Tools?
                          </h3>
                          <p>
                            AI marketing tools leverage machine learning
                            algorithms to analyze consumer behavior, predict
                            trends, and automate marketing tasks. These tools
                            help marketers work smarter, not harder, by handling
                            repetitive tasks and providing data-driven insights.
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          <h3 className="text-blue-400 font-bold mb-2">
                            The Top 10 AI Tools Explained
                          </h3>
                          <p>
                            From content generation to customer segmentation,
                            the best AI marketing tools include platforms for
                            email optimization, social media scheduling,
                            predictive analytics, and personalization engines.
                            Each tool brings unique capabilities to enhance your
                            marketing strategy.
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                          className="text-xs text-gray-500 italic pt-2"
                        >
                          Generated instantly by MarkgenAI • Ready to publish
                        </motion.div>
                      </div>

                      {step === "step3-complete" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3 mt-6 pt-6 border-t border-white/10"
                        >
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                          >
                            <Sparkles className="w-3 h-3 mr-2" /> Regenerate
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-white border-white/10 rounded-lg"
                          >
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-white border-white/10 rounded-lg"
                          >
                            Publish
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
