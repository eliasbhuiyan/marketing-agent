"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout, Sparkles } from "lucide-react";
import Image from "next/image";

const templates = [
  {
    id: 1,
    img: "/poster/bag.png",
    title: "Poster & Design",
    rotate: -6,
    y: 0,
    delay: 0,
  },
  {
    id: 2,
    img: "/poster/perfume.png",
    title: "Poster & Design",
    rotate: 4,
    y: 40,
    delay: 1,
  },
  {
    id: 3,
    img: "/thumbnail/thumbnail.png",
    title: "Video Thumbnail",
    rotate: -3,
    y: -20,
    delay: 2,
  },
  {
    id: 4,
    img: "/features/thumbnail-2.png",
    title: "Video Thumbnail",
    rotate: 5,
    y: 60,
    delay: 0.5,
  },
  {
    id: 5,
    img: "/poster.png",
    title: "Intelligent Poster",
    rotate: -5,
    y: 10,
    delay: 1.5,
  },
  {
    id: 6,
    img: "/thumbnail/thumbnail-yt.png",
    title: "Video Thumbnail",
    rotate: 3,
    y: -30,
    delay: 2.5,
  },
  {
    id: 7,
    img: "/generated_images/dark_abstract_3d_shapes_background.png",
    title: "Real Estate",
    rotate: 3,
    y: -30,
    delay: 2.5,
  },
  {
    id: 8,
    img: "/generated_images/dark_abstract_3d_shapes_background.png",
    title: "Real Estate",
    rotate: 3,
    y: -30,
    delay: 2.5,
  },
  {
    id: 9,
    img: "/generated_images/dark_abstract_3d_shapes_background.png",
    title: "Real Estate",
    rotate: 3,
    y: -30,
    delay: 2.5,
  },
  {
    id: 10,
    img: "/generated_images/dark_abstract_3d_shapes_background.png",
    title: "Real Estate",
    rotate: 3,
    y: -30,
    delay: 2.5,
  },
  {
    id: 11,
    img: "/generated_images/dark_abstract_3d_shapes_background.png",
    title: "Real Estate",
    rotate: 3,
    y: -30,
    delay: 2.5,
  },
  {
    id: 12,
    img: "/generated_images/dark_abstract_3d_shapes_background.png",
    title: "Real Estate",
    rotate: 3,
    y: -30,
    delay: 2.5,
  },
];

export default function DemoTemplates() {
  return (
    <section className="py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-400 mb-6">
            <Layout className="w-4 h-4" />
            <span>Infinite Possibilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              AI-Generated Templates
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Explore our diverse range of AI-generated templates
          </p>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 min-h-[800px]">
          {templates.map((template, i) => (
            <motion.div
              key={template.id}
              className="relative group"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: template.y }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [
                    template.rotate,
                    template.rotate + 2,
                    template.rotate,
                  ],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: template.delay,
                }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white/5 shadow-2xl bg-[#111]"
                style={{ rotate: template.rotate }}
              >
                <Image
                  fill={true}
                  src={template.img}
                  alt={template.title}
                  className="w-full h-full object-fit transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="glass">
                    <Sparkles className="w-4 h-4 mr-2" />
                    {template.title}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
