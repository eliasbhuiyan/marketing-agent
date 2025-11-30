"use client";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const testimonials = [
  {
    quote:
      "MarkgenAI has completely transformed our content workflow. We're creating 10x more content in half the time.",
    name: "Sarah Jenkins",
    role: "CMO at TechFlow",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    quote:
      "The poster generator is pure magic. It understands our brand guidelines better than some freelancers we've hired.",
    name: "David Chen",
    role: "Founder, ArtStart",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    quote:
      "Finally, an AI tool that actually writes like a human. The blog generator is a game-changer for SEO.",
    name: "Elena Rodriguez",
    role: "Marketing Lead, GrowthX",
    avatar: "https://i.pravatar.cc/100?img=9",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl font-bold text-white">
          Loved by Marketing Teams
        </h2>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="max-w-md w-full"
            >
              <div className="relative bg-[#111] border border-white/10 p-8 rounded-3xl rounded-bl-none mx-4 shadow-xl">
                <MessageSquare className="w-8 h-8 text-purple-500/20 absolute top-6 right-6" />
                <p className="text-gray-300 leading-relaxed mb-6">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full border border-white/10"
                  />
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
