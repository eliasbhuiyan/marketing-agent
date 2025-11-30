import Hero from "@/components/landing/Hero";
import FeatureScroller from "@/components/landing/FeatureScroller";
import PosterStudio from "@/components/landing/PosterStudio";
import VirtualTryOn from "@/components/landing/VirtualTryOn";
import WritingTools from "@/components/landing/WritingTools";
import ThumbnailProduct from "@/components/landing/ThumbnailProduct";
import Scheduler from "@/components/landing/Scheduler";
import AllFeatures from "@/components/landing/AllFeatures";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import DemoTemplates from "@/components/landing/DemoTemplates";

export default function Home() {
  return (
    <div className="bg-[#0e0e0e] text-white selection:bg-purple-500/30">
      <Hero />
      <FeatureScroller />
      <PosterStudio />
      <VirtualTryOn />
      <DemoTemplates/>
      <WritingTools />
      <ThumbnailProduct />
      <Scheduler />
      <AllFeatures />
      <Testimonials />
      <FAQ/>
    </div>
  );
}
