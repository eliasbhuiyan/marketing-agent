"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Play,
  Sparkles,
  Image as ImageIcon,
  Type,
  Layout,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0E0E0E]/80 z-10" />
        <img
          src="/generated_images/dark_abstract_3d_shapes_background.png"
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Particle effects */}
        <div className="absolute inset-0 z-10 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500 blur-xl"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#0E0E0E]/0 via-[#0E0E0E]/0 to-[#0E0E0E]" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,#0E0E0E_120%)]" />
      </div>
      <div className="container mx-auto px-6 relative z-30 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Marketing Agent AI is here</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            AI Marketing Agent That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
              Designs, Writes & Publish
            </span>{" "}
            for You
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-lg">
            Create posters, blogs, captions & schedule posts — all in one place.
            The complete toolkit for modern growth teams.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/login">
              <Button size="lg" variant="glass" className="flex gap-2">
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                Get Started Free
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-800 border border-[#0E0E0E] overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                  />
                </div>
              ))}
            </div>
            <p>Trusted by 10,000+ marketers</p>
          </div>
        </motion.div>

        {/* Right Content - 3D Demo */}
        <motion.div
          className="relative h-[600px] w-full hidden lg:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Rotating Icon Cube Center */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-20"
            animate={{ rotateY: 360, rotateX: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 to-blue-600/80 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center transform translate-z-16 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Floating Posters */}
          {[
            { img: "/thumbnail.png", x: -180, y: -100, delay: 0, rot: -15 },
            { img: "/poster-battle.png", x: 180, y: -50, delay: 1, rot: 10 },
            { img: "/poster.png", x: -50, y: 150, delay: 2, rot: 5 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-48 aspect-[3/4] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: item.x,
                opacity: 1,
                rotate: [item.rot - 5, item.rot + 5, item.rot - 5],
                y: [item.y - 10, item.y + 10, item.y - 10],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.5 + i * 0.2 },
                x: { duration: 1, delay: 0.5 + i * 0.2 },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                },
                default: { ease: "easeOut" },
              }}
            >
              <img
                src={item.img}
                alt="Poster"
                className="w-full h-full object-fit"
              />
            </motion.div>
          ))}

          {/* Floating Feature Icons */}
          {[
            { icon: ImageIcon, label: "Poster", x: 120, y: -180 },
            { icon: Type, label: "Caption", x: -150, y: 80 },
            { icon: Layout, label: "Blog", x: 100, y: 160 },
            { icon: ShoppingBag, label: "Shop", x: -100, y: -160 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 bg-[#1A1A1A] border border-white/10 p-3 rounded-2xl shadow-lg flex items-center gap-2 z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                x: item.x,
                scale: 1,
                opacity: 1,
                y: [item.y, item.y - 15, item.y],
              }}
              transition={{
                scale: { duration: 0.4, delay: 1 + i * 0.1 },
                opacity: { duration: 0.4, delay: 1 + i * 0.1 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1,
                },
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-purple-400">
                <item.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-white pr-2">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
