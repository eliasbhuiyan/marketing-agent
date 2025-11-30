"use client";
import { motion } from 'framer-motion';
import { Image as ImageIcon, Wand2, Shirt, Type, FileText, Calendar } from 'lucide-react';

const features = [
  { icon: ImageIcon, title: 'Poster Generator', desc: 'Create stunning visuals instantly' },
  { icon: Wand2, title: 'Intelligent Studio', desc: 'Auto-layout & brand themes' },
  { icon: Shirt, title: 'Virtual Try-On', desc: 'Realistic product previews' },
  { icon: Type, title: 'Caption Generator', desc: 'Engaging AI-written copy' },
  { icon: FileText, title: 'Blog Generator', desc: 'SEO-optimized long form' },
  { icon: Calendar, title: 'Social Scheduler', desc: 'Plan & auto-post' },
];

export default function FeatureScroller() {
  return (
    <section className="py-20 border-y border-white/5 bg-[#0E0E0E]/50 overflow-hidden">
      <div className="mb-12 text-center px-6">
        <h2 className="text-sm font-semibold text-purple-400 tracking-wider uppercase mb-2">Powerful Toolkit</h2>
        <p className="text-white/60">Everything you need to scale your content</p>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Gradient Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0E0E0E] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0E0E0E] to-transparent" />

        {/* Scrolling Container - Duplicated for infinite loop */}
        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          {[...features, ...features, ...features].map((feature, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-80 mx-4"
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="h-full glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group/card">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover/card:bg-purple-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-white group-hover/card:text-purple-400 transition-colors" />
                </div>
                
                {/* Mockup preview placeholder */}
                <div className="h-32 rounded-lg bg-gradient-to-br from-white/5 to-white/0 mb-4 border border-white/5 overflow-hidden relative">
                   <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                   {/* Abstract UI lines */}
                   <div className="absolute top-4 left-4 right-4 h-2 bg-white/10 rounded-full" />
                   <div className="absolute top-8 left-4 w-1/2 h-2 bg-white/10 rounded-full" />
                   <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-purple-500/20" />
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
