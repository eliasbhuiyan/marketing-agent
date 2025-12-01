"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Wand2,
  Loader2,
  CheckCircle2,
  Shirt,
  User,
  ScanLine,
  RefreshCw,
  Download,
  Share2,
} from "lucide-react";
import Image from "next/image";

const assets = [
  {
    id: 1,
    label: "Garment",
    src: "/shirt.jpg",
  },
  {
    id: 2,
    label: "Model",
    src: "/pant.jpg",
  },
  {
    id: 3,
    label: "Pose / Mask",
    src: "/shose.jpg",
  },
];

export default function VirtualTryOn() {
  const [status, setStatus] = useState("idle");
  const [scanProgress, setScanProgress] = useState(0);

  // Animation loop for the demo
  useEffect(() => {
    let timeout;

    const runSequence = () => {
      setStatus("idle");

      // Start Upload
      timeout = setTimeout(() => {
        setStatus("uploading");

        // Start Processing
        timeout = setTimeout(() => {
          setStatus("processing");

          // Start Completed
          timeout = setTimeout(() => {
            setStatus("completed");

            // Reset
            timeout = setTimeout(() => {
              runSequence();
            }, 5000); // Show result for 5s
          }, 3500); // Processing time
        }, 1500); // Upload time
      }, 1000); // Idle time
    };

    runSequence();

    return () => clearTimeout(timeout);
  }, []);

  // Progress bar simulation during processing
  useEffect(() => {
    if (status === "processing") {
      const interval = setInterval(() => {
        setScanProgress((prev) => (prev >= 100 ? 100 : prev + 2));
      }, 50);
      return () => {
        clearInterval(interval);
        setScanProgress(0);
      };
    }
  }, [status]);

  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-400">
              <Wand2 className="w-4 h-4" />
              <span>Virtual Try-On</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              See Your Products <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                On Real Models Instantly
              </span>
            </h2>

            <p className="text-xl text-gray-400">
              Upload your garments, select a model, and watch our AI generate
              photorealistic try-on images in seconds. Perfect fitting,
              professional quality—no studio needed.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                {
                  icon: Upload,
                  title: "Upload Garment",
                  desc: "Add clothing items",
                },
                {
                  icon: User,
                  title: "Pick Model",
                  desc: "Choose pose & style",
                },
                {
                  icon: ScanLine,
                  title: "AI Fitting",
                  desc: "Perfect draping",
                },
                { icon: Download, title: "Download", desc: "High-res images" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="p-2 rounded-lg bg-white/5 text-white">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Animation */}
          <div className="lg:w-1/2 w-full">
            <div className="relative bg-[#111] rounded-3xl border border-white/10 shadow-2xl overflow-hidden aspect-[4/3]">
              {/* Dashboard Header */}
              <div className="h-14 border-b border-white/10 bg-white/5 flex items-center px-6 justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="text-xs font-mono text-gray-500">
                  Virtual_Try_On
                </div>
              </div>

              <div className="p-8 h-[calc(100%-3.5rem)] flex gap-6">
                {/* Sidebar / Tools */}
                <div className="w-16 flex flex-col items-center gap-4 py-4 border-r border-white/10 pr-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <Shirt className="w-5 h-5" />
                  </div>
                  {[User, ScanLine, Share2].map((Icon, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500"
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  ))}
                </div>

                {/* Main Area */}
                <div className="flex-1 relative flex items-center justify-center bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {/* State: IDLE / UPLOADING */}
                    {(status === "idle" || status === "uploading") && (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center text-center"
                      >
                        {status === "uploading" ? (
                          <motion.div
                            key="multi-upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            {assets.map((asset, index) => (
                              <motion.div
                                key={asset.id}
                                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className="relative w-28 h-28 bg-white p-2 rounded-xl shadow-xl"
                              >
                                <Image
                                  src={asset.src}
                                  alt={asset.label}
                                  className="w-full h-full object-contain"
                                  fill
                                />

                                {/* Label */}
                                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                  <CheckCircle2 className="w-3 h-3" /> Uploaded
                                </div>

                                {/* Uploaded Badge */}
                                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        ) : (
                          <div className="border-2 border-dashed border-white/20 rounded-xl p-12 flex flex-col items-center">
                            <Upload className="w-12 h-12 text-gray-500 mb-4" />
                            <p className="text-gray-400 font-medium">
                              Drop garment here
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* State: PROCESSING */}
                    {status === "processing" && (
                      <motion.div
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {/* Scanning Effect */}
                        <div className="relative w-64 h-80 bg-[#0E0E0E] rounded-xl border border-white/10 overflow-hidden">
                          {/* Garment ghost */}
                          <Image
                            src="/shose.jpg"
                            className="absolute inset-10 w-full h-full object-cover opacity-30 scale-75"
                            alt="scannig assets"
                            width={200}
                            height={200}
                          />
                          <Image
                            alt="scannig assets"
                            src="/pant.jpg"
                            width={200}
                            height={200}
                            className="absolute inset-20 w-full h-full object-cover opacity-30 scale-75"
                          />
                          <Image
                            alt="scannig assets"
                            src="/shirt.jpg"
                            width={200}
                            height={200}
                            className="absolute inset-0 w-full h-full object-cover opacity-30 scale-75"
                          />

                          {/* Scanning Grid */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

                          {/* Scan Line */}
                          <motion.div
                            className="absolute top-0 left-0 right-0 h-1 bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,1)] z-10"
                            animate={{ top: ["0%", "100%"] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </div>

                        <div className="absolute bottom-8 bg-black/80 backdrop-blur border border-white/10 px-6 py-3 rounded-full flex items-center gap-4 shadow-xl z-20">
                          <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                          <div className="flex flex-col">
                            <span className="text-xs text-white font-bold">
                              Generating fit...
                            </span>
                            <div className="w-24 h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
                              <motion.div
                                className="h-full bg-purple-500"
                                style={{ width: `${scanProgress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* State: COMPLETED */}
                    {status === "completed" && (
                      <motion.div
                        key="completed"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          alt="completed img"
                          fill={true}
                          src="/virtual-try-on.png"
                          className="w-full h-full object-contain"
                        />

                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="absolute bottom-4 right-4 flex gap-2"
                        >
                          <Button size="sm">
                            <Download className="w-3 h-3 mr-2" /> Save
                          </Button>
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Decor Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/5 blur-3xl -z-10 rounded-full pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
