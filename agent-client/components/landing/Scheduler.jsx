"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Facebook, Instagram, Linkedin, Twitter, Check, Plus } from 'lucide-react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const timeSlots = ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'];

export default function Scheduler() {
  const [posts, setPosts] = useState([
    { id: 1, day: 0, time: 0, platform: 'instagram', title: 'New Drop' },
    { id: 2, day: 2, time: 2, platform: 'twitter', title: 'Thread' },
    { id: 3, day: 4, time: 1, platform: 'linkedin', title: 'Article' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate adding a new post automatically
      const newPost = {
        id: Date.now(),
        day: Math.floor(Math.random() * 7),
        time: Math.floor(Math.random() * 4),
        platform: ['instagram', 'twitter', 'linkedin', 'facebook'][Math.floor(Math.random() * 4)],
        title: 'Scheduled Post'
      };
      
      setPosts(prev => {
        const filtered = prev.slice(-5); // Keep list short
        return [...filtered, newPost];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 container mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-sm text-green-400 mb-6">
          <CalendarIcon className="w-4 h-4" />
          <span>Smart Scheduler</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Plan Once, Post Everywhere</h2>
        <p className="text-gray-400">Drag, drop, and let AI handle the best posting times.</p>
      </div>

      <div className="glass-card rounded-3xl p-8 border border-white/10 overflow-hidden max-w-5xl mx-auto">
        <div className="grid grid-cols-8 gap-4 mb-6 border-b border-white/10 pb-4">
          <div className="text-gray-500 font-medium text-sm">Time</div>
          {days.map(day => (
            <div key={day} className="text-center text-gray-300 font-bold">{day}</div>
          ))}
        </div>

        <div className="space-y-4">
          {timeSlots.map((time, timeIndex) => (
            <div key={time} className="grid grid-cols-8 gap-4 h-24">
              <div className="text-xs text-gray-500 -mt-2">{time}</div>
              {days.map((_, dayIndex) => {
                const post = posts.find(p => p.day === dayIndex && p.time === timeIndex);
                
                return (
                  <div key={dayIndex} className="relative border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    {/* Empty Slot Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Plus className="w-4 h-4 text-white/30" />
                    </div>

                    <AnimatePresence>
                      {post && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className={`absolute inset-1 rounded-lg p-2 flex flex-col justify-between shadow-lg
                            ${post.platform === 'instagram' ? 'bg-gradient-to-br from-purple-600 to-pink-600' :
                              post.platform === 'twitter' ? 'bg-blue-500' :
                              post.platform === 'linkedin' ? 'bg-blue-700' :
                              'bg-blue-600'}
                          `}
                        >
                          <div className="flex justify-between items-start">
                            {post.platform === 'instagram' && <Instagram className="w-3 h-3 text-white" />}
                            {post.platform === 'twitter' && <Twitter className="w-3 h-3 text-white" />}
                            {post.platform === 'linkedin' && <Linkedin className="w-3 h-3 text-white" />}
                            {post.platform === 'facebook' && <Facebook className="w-3 h-3 text-white" />}
                            <Check className="w-3 h-3 text-white/70" />
                          </div>
                          <div className="text-[10px] font-medium text-white truncate">{post.title}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
