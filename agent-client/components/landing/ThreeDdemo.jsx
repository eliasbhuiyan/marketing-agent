"use client";
import {
  Play,
  Sparkles,
  Image as ImageIcon,
  Type,
  Layout,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const ThreeDdemo = () => {
  return (
    <motion.div
      className="relative h-full w-full hidden lg:block"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      {/* Rotating Icon Cube Center */}
      <motion.div
        className="absolute top-1/3 left-3/5 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-20"
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
        { img: "/poster-battle.png", x: -180, y: -100, delay: 0, rot: -15 },
        { img: "/poster/perfume.png", x: 180, y: -50, delay: 1, rot: 10 },
        { img: "/poster.png", x: -50, y: 150, delay: 2, rot: 5 },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute top-1/3 left-1/2 w-48 aspect-[3/4] rounded-xl overflow-hidden border border-white/10 shadow-2xl"
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
          <Image
            src={item.img}
            alt="Poster"
            fill={true}
            className="w-full h-full object-fit"
          />
        </motion.div>
      ))}
      {/* Floating Feature Icons */}
      {[
        { icon: ImageIcon, label: "Poster", x: 120, y: -180 },
        { icon: Type, label: "Caption", x: -150, y: 80 },
        { icon: Layout, label: "Blog", x: 100, y: 160 },
        { icon: TrendingUp, label: "Trend", x: -100, y: -160 },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute top-1/3 left-1/2 bg-[#1A1A1A] border border-white/10 p-3 rounded-2xl shadow-lg flex items-center gap-2 z-10"
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
  );
};

export default ThreeDdemo;
