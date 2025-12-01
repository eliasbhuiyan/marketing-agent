import Hero from "@/components/landing/Hero";
import FeatureScroller from "@/components/landing/FeatureScroller";
import PosterStudio from "@/components/landing/PosterStudio";
import WritingTools from "@/components/landing/WritingTools";
import Scheduler from "@/components/landing/Scheduler";
import AllFeatures from "@/components/landing/AllFeatures";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import DemoTemplates from "@/components/landing/DemoTemplates";
import ThumbnailGenerator from "@/components/landing/ThumbnailGenerator";
import VirtualTryOn from "@/components/landing/VirtualTryOn";
import BlogGeneratorSection from "@/components/landing/BlogGeneratorSection";
import Pricing from "@/components/landing/Pricing";

export default function Home() {
  return (
    <div className="bg-[#0e0e0e] text-white selection:bg-purple-500/30">
      <Hero />
      <FeatureScroller />
      <PosterStudio />
      <ThumbnailGenerator />
      <DemoTemplates/>
      <WritingTools />
      <VirtualTryOn />
      <Scheduler />
      <AllFeatures />
      <BlogGeneratorSection/>
      <Testimonials />
      <Pricing/>
      <FAQ/>
    </div>
  );
}
