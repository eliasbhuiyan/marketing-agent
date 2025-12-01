"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Wand2,
  Layout,
  Palette,
  Download,
  Check,
  Loader2,
  ImageUp,
  ImageDown,
  Wand2Icon,
} from "lucide-react";
const brandAssets = [
  "/graphic/model-female.png",
  "/graphic/model-casual.png",
  "/graphic/model-formal.png",
  "/graphic/model-male.png",
  "/graphic/t-shirt.png",
  "/graphic/asset.png",
];
export default function PosterStudio() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Editor Mockup */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Window Chrome */}
          <div className="glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
              <div className="ml-auto text-xs text-gray-500 font-mono">
                Poster & Design Creator
              </div>
            </div>

            <div className="flex h-[500px]">
              {/* Sidebar */}
              <div className="w-16 border-r border-white/10 flex flex-col items-center py-6 gap-6">
                {[Layout, Palette, Type, ImageIcon].map((Icon, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg ${
                      i === 0
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>

              {/* Canvas Area */}
              <div className="flex-1 bg-[#0A0A0A] p-4 flex items-center justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full "
                  >
                    <Image
                      src={
                        step === 0
                          ? "/poster/perfume.png"
                          : step === 1
                          ? "/poster/bag-2.png"
                          : "/poster/bag.png"
                      }
                      blurDataURL="/poster/perfume.png"
                      alt="Poster Canvas"
                      className="w-full h-full rounded-lg"
                      width={500}
                      height={500}
                    />
                    {step === 1 && (
                      <motion.div
                        className="absolute inset-0 border-4 border-purple-500 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Floating Tools */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-2 flex gap-4 shadow-xl">
                  <button className="text-xs text-white hover:text-purple-400 transition-colors">
                    <ImageUp />
                  </button>
                  <div className="w-px h-4 bg-white/10" />
                  <button className="text-xs text-white hover:text-purple-400 transition-colors">
                    <ImageDown />
                  </button>
                </div>
              </div>

              {/* Right Panel */}
              <div className="w-64 border-l border-white/10 bg-[#111] p-6">
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
                      Brand Assets
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {brandAssets.map((src) => (
                        <div
                          key={src}
                          className="aspect-square rounded overflow-hidden cursor-pointer transition-colors border border-white/5"
                        >
                          <Image
                            src={src}
                            alt="assets"
                            width={50}
                            height={50}
                            className="w-full h-full object-fit hover:scale-105 transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
                      Customize Poster
                    </div>
                    <div className="space-y-2">
                      <div className="h-8 rounded bg-white/5 w-full" />
                      <div className="h-8 rounded bg-white/5 w-3/4" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <Button className="w-full" variant="glass">
                      <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Text Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Poster & Design Creator
            </h2>
            <p className="text-xl text-gray-400">
              Upload your model and product images, and let AI create stunning
              marketing posters instantly. Perfect compositions, optimized
              layouts, and professional designs all generated automatically.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: ImageUp,
                title: "Upload Product",
                desc: "Add your product image to get started.",
              },
              {
                icon: ImageUp,
                title: "Upload Model",
                desc: "Choose a model or upload your own.",
              },
              {
                icon: Wand2Icon,
                title: "Optional Prompt",
                desc: "Describe your vision for AI to enhance the design.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-purple-400 border border-white/10">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Link href="/posters">
              <Button size="lg">Create Poster</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Import helper for icons that I used inside the component but didn't import at top */}
      {/* Done */}
    </section>
  );
}
import { Type, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
