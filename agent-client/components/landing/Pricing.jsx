"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const [credits, setCredits] = useState(57000);

  // Credit-based pricing: approximately $0.001 per credit
  const costUSD = (credits * 0.001).toFixed(2);
  const costBDT = (credits * 0.122).toFixed(2); // Approximate USD to INR conversion

  const minCredits = 3000;
  const maxCredits = 100000;

  const handleSliderChange = (e) => {
    setCredits(parseInt(e.target.value));
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <section
      id="pricing"
      className="py-32 bg-[#0E0E0E] relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple Credit-Based{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Pay only for what you use. No hidden fees, no contracts.
            </p>
          </motion.div>
        </div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto bg-[#111] rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl"
        >
          {/* Title */}
          <h3 className="text-3xl font-bold text-white mb-2">
            Calculate Your Cost
          </h3>
          <p className="text-gray-400 mb-8">
            Use the slider to see how many credits you need.
          </p>

          {/* Credits Display */}
          <motion.div
            key={credits}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2">
              {formatNumber(credits)} Credits
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 text-gray-400">
              <span>Estimated Cost:</span>
              <span className="font-bold text-white text-lg">
                ${costUSD} / <span className="text-2xl">৳</span>{costBDT}
              </span>
            </div>
          </motion.div>

          {/* Slider */}
          <div className="mb-8 space-y-4">
            <input
              type="range"
              min={minCredits}
              max={maxCredits}
              value={credits}
              onChange={handleSliderChange}
              className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer accent-yellow-500 slider"
              style={{
                background: `linear-gradient(to right, #facc15 0%, #facc15 ${
                  ((credits - minCredits) / (maxCredits - minCredits)) * 100
                }%, #374151 ${
                  ((credits - minCredits) / (maxCredits - minCredits)) * 100
                }%, #374151 100%)`,
              }}
            />
            <div className="flex justify-between text-sm text-gray-500 font-medium">
              <span>{formatNumber(minCredits)} credits</span>
              <span>{formatNumber(maxCredits)}+ credits</span>
            </div>
          </div>

          {/* Free Credits Offer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl"
          >
            <p className="text-white text-center">
              SignUp and grab your{" "}
              <span className="font-bold text-yellow-400">free credits</span>
            </p>
          </motion.div>

          {/* CTA Button */}
          <Link href="/dashboard" className="m-auto w-fit block">
            <Button size="lg">Start With Free Credits</Button>
          </Link>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center"
        >
          {[
            {
              icon: "⚡",
              title: "Instant Credits",
              desc: "Get credits instantly after purchase",
            },
            {
              icon: "♻️",
              title: "Never Expires",
              desc: "Use your credits anytime, no expiry",
            },
            {
              icon: "💰",
              title: "Best Value",
              desc: "More credits = better rate per credit",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-bold text-white mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #facc15;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(250, 204, 21, 0.5);
          border: 3px solid #1f2937;
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #facc15;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(250, 204, 21, 0.5);
          border: 3px solid #1f2937;
        }
      `}</style>
    </section>
  );
}
