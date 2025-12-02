"use client";
import { motion } from "framer-motion";
import {
  BarChart,
  Calendar,
  Check,
  Pointer,
  Image as ImageIcon,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share,
  Type,
  User,
  Video,
  Wand2,
} from "lucide-react";

// 1. Poster & Design / Intelligent Poster Studio / Thumbnail
export const DesignDemo = ({ demo }) => {
  return (
    <div className="w-full h-full bg-gray-900/50 backdrop-blur-sm p-4 flex flex-col gap-2 relative overflow-hidden rounded-xl border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <div className="text-[10px] text-gray-400 font-mono">
          {demo === "thumbnail"
            ? "thumbnail_generator.ai"
            : demo === "intelligent"
            ? "intelligent_poster.ai"
            : "poster_design.ai"}
        </div>
      </div>
      <div className="flex-1 flex gap-2">
        <div className="w-8 flex flex-col gap-2 border-r border-white/10 pr-2">
          {[Type, ImageIcon, Wand2].map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-6 h-6 rounded bg-white flex items-center justify-center text-gray-400 hover:text-blue-500"
            >
              <Icon size={12} />
            </motion.div>
          ))}
        </div>
        <div className="flex-1 bg-white/5 rounded-lg relative overflow-hidden group">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={
                  demo === "thumbnail"
                    ? "/features/thumbnail-group.png"
                    : demo === "poster"
                    ? "/poster/perfume.png"
                    : demo === "intelligent" ? "/features/intelligent-poster-group.png" : "/features/thumbnail-group.png"
                }
                alt={demo}
                className="object-fit w-full h-full"
              />
            </motion.div>
          </motion.div>
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-4 right-4 w-6 h-6 bg-pink-500/20 rounded-full blur-md"
          />
        </div>
      </div>
    </div>
  );
};

// 2. Virtual Try-On
export const TryOnDemo = () => {
  return (
    <div className="w-full h-full bg-gray-900/50 backdrop-blur-sm flex items-center justify-center relative overflow-hidden rounded-xl border border-white/10">
      <div className="relative w-32 h-40 bg-white/5 rounded-xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <User className="text-gray-600 w-16 h-16" />
        </div>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent"
        />
        <motion.div
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
        />
        <div className="absolute bottom-2 left-0 right-0 text-center text-[8px] text-purple-300">
          Scanning...
        </div>
      </div>
    </div>
  );
};

// 3. Text Generator (Caption, Blog, Product Des, Script)
export const TextDemo = ({ type = "Caption" }) => {
  return (
    <div className="w-full h-full bg-gray-900/50 backdrop-blur-sm p-4 flex flex-col gap-3 relative overflow-hidden rounded-xl border border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
          <Wand2 size={12} />
        </div>
        <div className="text-xs text-gray-300 font-medium">AI {type}</div>
      </div>
      <div className="flex-1 bg-white/5 rounded p-2 space-y-2">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="h-2 bg-gray-700 rounded w-3/4"
        />
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "80%" }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="h-2 bg-gray-700 rounded w-full"
        />
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "60%" }}
          transition={{
            duration: 1.5,
            delay: 0.4,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="h-2 bg-gray-700 rounded w-1/2"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="w-full py-1 bg-blue-600/20 text-blue-400 text-[10px] rounded border border-blue-500/30"
      >
        Generate
      </motion.button>
    </div>
  );
};

// 4. Analytics / Trend
export const AnalyticsDemo = () => {
  return (
    <div className="w-full h-full bg-gray-900/50 backdrop-blur-sm p-4 flex flex-col justify-end gap-2 relative overflow-hidden rounded-xl border border-white/10">
      <div className="absolute top-4 left-4 text-xs text-gray-400">Current Trends</div>
      <div className="flex items-end justify-between gap-1 h-32 pb-2">
        {[40, 70, 50, 90, 60, 85].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="w-full bg-gradient-to-t from-purple-600/50 to-blue-500/50 rounded-t-sm relative group"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] text-gray-400"
            >
              {h}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 5. Scheduler / Calendar
export const CalendarDemo = () => {
  return (
    <div className="w-full h-full bg-gray-900/50 backdrop-blur-sm p-3 relative overflow-hidden rounded-xl border border-white/10">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-[8px] text-center text-gray-500">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="aspect-square bg-white/5 rounded-sm relative">
            {[2, 5, 8, 11].includes(i) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="absolute inset-1 bg-green-500/30 rounded-full flex items-center justify-center"
              >
                <Check size={8} className="text-green-400" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-2 flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/5"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <div className="text-[10px] text-gray-300">Auto-posting...</div>
      </motion.div>
    </div>
  );
};

// 6. Hashtags
export const HashtagDemo = () => {
  const tags = ["#viral", "#trending", "#fyp", "#design", "#2025", "#ai"];
  return (
    <div className="w-full h-full bg-gray-900/50 backdrop-blur-sm p-4 flex flex-wrap content-center gap-2 relative overflow-hidden rounded-xl border border-white/10">
      {tags.map((tag, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(168, 85, 247, 0.2)",
          }}
          className="px-2 py-1 bg-white/10 rounded-full text-[10px] text-purple-300 cursor-pointer border border-white/5"
        >
          {tag}
        </motion.div>
      ))}
    </div>
  );
};

// 7. Team Collab
export const TeamDemo = () => {
  return (
    <div className="w-full h-full bg-gray-900/50 backdrop-blur-sm p-4 flex items-center justify-center relative overflow-hidden rounded-xl border border-white/10">
      <div className="flex -space-x-3">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className={`w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center text-xs font-bold text-white
              ${
                i === 1
                  ? "bg-blue-500"
                  : i === 2
                  ? "bg-purple-500"
                  : "bg-pink-500"
              }`}
          >
            {i === 1 ? "JD" : i === 2 ? "AS" : "MK"}
          </motion.div>
        ))}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
          className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center"
        >
          <Plus size={12} className="text-white" />
        </motion.div>
      </div>

      {/* Cursors */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/3"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-blue-400 transform -rotate-12"
        >
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        </svg>
        <div className="bg-blue-500 text-[8px] px-1 rounded ml-2 text-white">
          John
        </div>
      </motion.div>
    </div>
  );
};

// Map helper
export const GetFeatureDemo = ({ title }) => {
  if (
    title.includes("poster") ||
    title.includes("intelligent") ||
    title.includes("thumbnail")
  )
    return <DesignDemo demo={title} />;
  if (title.includes("virtual")) return <TryOnDemo />;
  if (title.includes("script")) return <TextDemo type={title.split(" ")[0]} />;
  if (title.includes("product") || title.includes("blog"))
    return <TextDemo type={title.split(" ")[0]} />;
  if (title.includes("blog")) return <TextDemo type={title.split(" ")[0]} />;
  if (title.includes("caption")) return <TextDemo type={title.split(" ")[0]} />;
  if (title.includes("trend")) return <AnalyticsDemo />;
  if (title.includes("scheduler")) return <CalendarDemo />;
  if (title.includes("hash")) return <HashtagDemo />;
  if (title.includes("team")) return <TeamDemo />;
  return <DesignDemo />; // Fallback
};
