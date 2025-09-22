import Banner from "@/components/Home/Banner";
import ChooseUs from "@/components/Home/ChooseUs";
import Features from "@/components/Home/Features";
import WorkSteps from "@/components/Home/WorkSteps";
import DemoShowcase from "@/components/Home/DemoShowcase";
import Testimonial from "@/components/Home/Testimonial";
import Pricing from "@/components/Home/Pricing";
import FAQ from "@/components/Home/FAQ";
import CTA from "@/components/Home/CTA";

export default function Home() {
  return (
    <>
      <Banner />
      <ChooseUs />
      <Features />
      <WorkSteps />
      <DemoShowcase />
      <Testimonial />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
