"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Image,
  Type,
  Layout,
  Video,
  Hash,
  Mail,
  Globe,
  BarChart,
  Calendar,
  Users,
  PenTool,
} from "lucide-react";

const features = [
  {
    icon: Image,
    title: "Poster Generator",
    desc: "Create marketing visuals in seconds",
  },
  {
    icon: Type,
    title: "Caption Writer",
    desc: "Engaging copy for any platform",
  },
  {
    icon: Layout,
    title: "Blog Writer",
    desc: "SEO-optimized long form content",
  },
  { icon: Video, title: "Video Scripts", desc: "Viral hooks and storyboards" },
  { icon: Hash, title: "Hashtag Finder", desc: "Trend-based tag suggestions" },
  { icon: Mail, title: "Email Generator", desc: "High-converting newsletters" },
  { icon: Globe, title: "Landing Pages", desc: "Copy and layout suggestions" },
  {
    icon: BarChart,
    title: "Analytics",
    desc: "Track performance across channels",
  },
  { icon: Calendar, title: "Scheduler", desc: "Auto-post to all platforms" },
  { icon: Users, title: "Team Collab", desc: "Share workspaces and assets" },
  {
    icon: PenTool,
    title: "Brand Voice",
    desc: "Custom AI personality training",
  },
  { icon: Zap, title: "Ad Generator", desc: "Facebook & Google ad variants" },
];

export default function AllFeatures() {
  return (
    <section id="features" className="py-32 bg-[#0E0E0E]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to Grow
          </h2>
          <p className="text-gray-400">
            The complete operating system for modern marketing teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white mb-4 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                <feature.icon className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4 group-hover:opacity-0 transition-opacity duration-200">
                {feature.desc}
              </p>

              {/* Reveal on hover */}
              <div className="absolute bottom-6 left-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                <div className="flex items-center text-sm font-bold text-purple-400 gap-2">
                  Try Demo <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
