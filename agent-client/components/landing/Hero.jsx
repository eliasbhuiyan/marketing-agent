import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import Link from "next/link";
import ParticalEffects from "./ParticalEffects";
import ThreeDdemo from "./ThreeDdemo";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0E0E0E]/80 z-10" />
        <ParticalEffects />
        {/* Vignette */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#0E0E0E]/0 via-[#0E0E0E]/0 to-[#0E0E0E]" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,#0E0E0E_120%)]" />
      </div>
      <div className="container px-6 relative z-30 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Marketing Agent AI is here</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            AI Marketing Agent That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
              Designs, Writes & Publish
            </span>{" "}
            for You
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-lg">
            Create posters, blogs, captions & schedule posts — all in one place.
            The complete toolkit for modern growth teams.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/login">
              <Button size="lg" variant="glass" className="flex gap-2">
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                Get Started Free
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-800 border border-[#0E0E0E] overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                  />
                </div>
              ))}
            </div>
            <p>Trusted by 10,000+ marketers</p>
          </div>
        </div>
        <ThreeDdemo />
      </div>
    </section>
  );
}
