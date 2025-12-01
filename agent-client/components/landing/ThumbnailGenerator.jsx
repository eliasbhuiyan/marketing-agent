"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shirt, Upload, Sparkles, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function ThumbnailGenerator() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(e.touches[0].clientX - rect.left, rect.width)
    );
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <section className="py-32 bg-[#0E0E0E] relative overflow-hidden">
      {/* Background Blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400">
              <Video className="w-4 h-4" />
              <span>Video Thumbnail Generator</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Create Stunning Video Thumbnails That{" "}
              <span className="text-blue-400">Drive More Clicks</span>
            </h2>
            <p className="text-xl text-gray-400">
              Design eye-catching thumbnails in seconds. Stand out on YouTube,
              TikTok, and social media with AI-powered customization.
            </p>
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Upload Image</h4>
                  <p className="text-sm text-gray-400">Upload your image</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold">AI Creates Thumbnail</h4>
                  <p className="text-sm text-gray-400">
                    Customize text, colors, and effects instantly
                  </p>
                </div>
              </div>
            </div>
            <Link href="/youtube/thumbnail">
              <Button
                size="lg"
                
              >
                Generate Thumbnail
              </Button>
            </Link>
          </div>

          {/* Interactive Slider */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div
              ref={containerRef}
              className="relative aspect-[1/1] rounded-2xl overflow-hidden cursor-ew-resize border border-white/10 shadow-2xl"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Base) */}
              <Image
                src="/thumbnail/thumbnail.png"
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
                fill
              />
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white">
                GENERATED
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src="/thumbnail/original.jpeg"
                  alt="Before"
                  className="absolute top-0 left-0 w-full h-full object-cover max-w-none"
                  style={{
                    width: containerRef.current
                      ? containerRef.current.offsetWidth
                      : "100%",
                  }}
                  fill
                />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white">
                  ORIGINAL
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
              Drag slider to compare
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
