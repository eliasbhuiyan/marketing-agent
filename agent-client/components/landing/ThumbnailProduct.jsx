"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Globe } from 'lucide-react';

export default function ThumbnailProduct() {
  const [platform, setPlatform] = useState('amazon');

  return (
    <section className="py-32 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Thumbnail Carousel */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Generated Thumbnails</h3>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
                <span className="w-2 h-2 rounded-full bg-white/20"></span>
              </div>
            </div>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
              <img src="/generated_images/fashion_sale_poster_design.png" alt="Thumbnail" className="w-full h-full object-cover" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="rounded-full bg-white text-black hover:bg-white/90">
                  Download HD
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video rounded-lg overflow-hidden border border-white/10 opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                   <img src="/generated_images/fashion_sale_poster_design.png" alt="Thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Description */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-sm text-pink-400 mb-6 self-start">
              <ShoppingBag className="w-4 h-4" />
              <span>E-commerce Optimized</span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-8">Product Descriptions That Sell</h2>

            <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center border-b border-white/10">
                <button 
                  onClick={() => setPlatform('amazon')}
                  className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${platform === 'amazon' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  <ShoppingBag className="w-4 h-4" /> Amazon Style
                </button>
                <div className="w-px h-full bg-white/10" />
                <button 
                  onClick={() => setPlatform('shopify')}
                  className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${platform === 'shopify' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                >
                  <Globe className="w-4 h-4" /> Shopify Style
                </button>
              </div>

              <div className="p-8 min-h-[300px]">
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {platform === 'amazon' ? (
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-white">Premium Wireless Headphones - Noise Cancelling, 30h Battery</h4>
                      <ul className="space-y-3 text-gray-400 list-disc pl-5">
                        <li><strong className="text-white">IMMERSIVE SOUND:</strong> Experience crystal clear audio with deep bass and precision highs.</li>
                        <li><strong className="text-white">ALL-DAY COMFORT:</strong> Plush memory foam earcups designed for extended listening sessions.</li>
                        <li><strong className="text-white">30-HOUR BATTERY:</strong> Keep the music playing all day and night on a single charge.</li>
                        <li><strong className="text-white">NOISE CANCELLATION:</strong> Advanced ANC technology blocks out ambient noise effectively.</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h4 className="text-2xl font-serif italic text-white">The Sound of Silence.</h4>
                      <p className="text-gray-400 leading-relaxed">
                        Escape the noise of the everyday. Our Premium Wireless Headphones aren't just a gadget; they're your personal sanctuary. Crafted with precision-engineered drivers and wrapped in cloud-soft memory foam, they deliver an auditory experience that feels as good as it sounds.
                      </p>
                      <p className="text-gray-400 leading-relaxed">
                        Whether you're commuting, working, or just relaxing, the 30-hour battery life ensures your soundtrack never fades.
                      </p>
                      <Button className="bg-black text-white border border-white/20 w-full hover:bg-white hover:text-black">
                        Add to Cart - $299
                      </Button>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
