"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wand2, Layout, Palette, Download, Check, Loader2 } from 'lucide-react';

export default function PosterStudio() {
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

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
              <div className="ml-auto text-xs text-gray-500 font-mono">Intelligent Studio v2.0</div>
            </div>

            <div className="flex h-[500px]">
              {/* Sidebar */}
              <div className="w-16 border-r border-white/10 flex flex-col items-center py-6 gap-6">
                {[Layout, Palette, Type, ImageIcon].map((Icon, i) => (
                  <div key={i} className={`p-2 rounded-lg ${i === 0 ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-white'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                ))}
              </div>

              {/* Canvas Area */}
              <div className="flex-1 bg-[#0A0A0A] p-8 flex items-center justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-[300px] aspect-[3/4] shadow-2xl"
                  >
                    <img 
                      src="/generated_images/modern_event_poster_design.png" 
                      alt="Poster Canvas" 
                      className="w-full h-full object-cover rounded-lg"
                      style={{ 
                        filter: step === 0 ? 'grayscale(100%) brightness(0.8)' : step === 1 ? 'sepia(50%)' : 'none' 
                      }}
                    />
                    
                    {/* Overlay UI elements simulating editing */}
                    {step === 0 && (
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: "100%" }} 
                        className="absolute top-1/2 left-4 right-4 h-1 bg-blue-500"
                      />
                    )}
                    {step === 1 && (
                      <motion.div 
                        className="absolute inset-0 border-4 border-purple-500 rounded-lg"
                        initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Floating Tools */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-2 flex gap-4 shadow-xl">
                  <button className="text-xs text-white hover:text-purple-400 transition-colors">Reset</button>
                  <div className="w-px h-4 bg-white/10" />
                  <button className="text-xs text-white hover:text-purple-400 transition-colors">Resize</button>
                </div>
              </div>

              {/* Right Panel */}
              <div className="w-64 border-l border-white/10 bg-[#111] p-6">
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">Theme</div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="aspect-square rounded bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/5" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">Auto-Layout</div>
                    <div className="space-y-2">
                      <div className="h-8 rounded bg-white/5 w-full" />
                      <div className="h-8 rounded bg-white/5 w-3/4" />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
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
            <h2 className="text-4xl font-bold text-white mb-4">Intelligent Poster Studio</h2>
            <p className="text-xl text-gray-400">
              Stop wrestling with complex design tools. Our AI understands your brand and content, automatically generating professional layouts in seconds.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: Layout, title: "Auto-Layout Engine", desc: "Instantly rearranges elements for perfect balance." },
              { icon: Palette, title: "Brand Theme Detection", desc: "Upload your logo and we'll extract your colors." },
              { icon: Wand2, title: "One-click Variations", desc: "Generate 10 unique versions from a single prompt." }
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
            <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8">
              Create Poster
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Layout autosave active</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Import helper for icons that I used inside the component but didn't import at top */}
      {/* Done */}
    </section>
  );
}
import { Type, Image as ImageIcon } from 'lucide-react';
