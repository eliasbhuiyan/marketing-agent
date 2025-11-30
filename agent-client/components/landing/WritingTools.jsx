"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Type, Hash, FileText, Video } from "lucide-react";

const tools = [
  {
    id: "caption",
    icon: Type,
    color: "text-purple-400",
    bg: "bg-purple-500/20",
    title: "Caption Generator",
    output:
      "Just launched our new summer collection! 🌞 Get ready to soak up the sun in style. Limited pieces available. #SummerVibes #Fashion",
  },
  {
    id: "hashtags",
    icon: Hash,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    title: "Hashtag Finder",
    output:
      "#OOTD #SummerFashion #BeachLife #StyleInspo #NewArrivals #LimitedEdition #FashionTrends2025",
  },
  {
    id: "blog",
    icon: FileText,
    color: "text-pink-400",
    bg: "bg-pink-500/20",
    title: "Blog Intro Writer",
    output:
      "Summer is finally here, and with it comes a whole new wave of fashion trends. In this post, we'll explore the top 5 essential pieces you need in your wardrobe this season...",
  },
  {
    id: "script",
    icon: Video,
    color: "text-green-400",
    bg: "bg-green-500/20",
    title: "Video Script",
    output:
      '[Opening Shot: Bright sunny beach]\nNarrator: "Are you ready for the summer of a lifetime?"\n[Cut to: Model wearing new collection]\nNarrator: "Introducing our new Summer ' +
      "'" +
      '25 Collection."',
  },
];

export default function WritingTools() {
  const [activeTool, setActiveTool] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTool((prev) => (prev + 1) % tools.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          One AI, Endless Content
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          From catchy captions to full blog posts, our writing assistant matches
          your brand voice perfectly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative h-[400px]">
        <AnimatePresence mode="popLayout">
          {tools.map((tool, index) => {
            // Only show 3 cards effectively to create stack effect
            const offset = (index - activeTool + tools.length) % tools.length;
            if (offset > 2) return null;

            return (
              <motion.div
                key={tool.id}
                className="absolute top-0 left-0 right-0 mx-auto w-full max-w-2xl glass-card p-8 rounded-3xl border border-white/10 shadow-2xl"
                initial={{ scale: 0.9, y: 50, opacity: 0, zIndex: 0 }}
                animate={{
                  scale: 1 - offset * 0.05,
                  y: offset * 30,
                  opacity: 1 - offset * 0.3,
                  zIndex: tools.length - offset,
                }}
                exit={{ scale: 1.1, y: -50, opacity: 0, zIndex: 10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center ${tool.color}`}
                  >
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{tool.title}</h3>
                </div>

                <div className="bg-black/30 rounded-xl p-6 font-mono text-sm text-gray-300 leading-relaxed min-h-[120px]">
                  {offset === 0 ? (
                    <Typewriter text={tool.output} />
                  ) : (
                    <span className="opacity-50">{tool.output}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Typewriter({ text }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-purple-400">|</span>
    </span>
  );
}
