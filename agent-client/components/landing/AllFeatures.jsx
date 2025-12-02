import {
  Type,
  Layout,
  Video,
  Hash,
  BarChart,
  Calendar,
  Users,
  Images,
  RectangleGogglesIcon,
  ReceiptText,
  ScanEye,
} from "lucide-react";
import { GetFeatureDemo } from "./FeatureDemos";
const features = [
  {
    tag: "poster",
    title: "Poster & Design",
    desc: "Create stunning marketing visuals in seconds",
  },
  {
    tag: "intelligent",
    title: "Intelligent Poster Studio",
    desc: "AI-powered design tool for professional posters",
  },
  {
    tag: "virtual",
    title: "Virtual Try-On",
    desc: "Let customers visualize products before buying",
  },
  {
    tag: "caption",
    title: "Caption Generator",
    desc: "Generate engaging captions for any social platform",
  },
  {
    tag: "blog",
    title: "Blog Generator",
    desc: "Create SEO-optimized blog posts automatically",
  },
  {
    tag: "hash",
    title: "Hashtags & Keywords",
    desc: "Discover trending tags and keywords for your niche",
  },
  {
    tag: "product",
    title: "Product Description",
    desc: "Write persuasive product descriptions that convert",
  },
  {
    tag: "thumbnail",
    title: "Thumbnail Generator",
    desc: "Design eye-catching thumbnails for videos",
  },
  {
    tag: "script",
    title: "Script writer",
    desc: "Generate viral video scripts and storyboards",
  },
  {
    tag: "trend",
    title: "Trend Analyzer",
    desc: "Analyze trends and performance metrics across channels",
  },
  {
    tag: "scheduler",
    title: "Scheduler",
    desc: "Schedule and auto-post content to all platforms",
  },
  {
    tag: "team",
    title: "Team Collab",
    desc: "Collaborate with your team on shared projects",
  },
];

export default function AllFeatures() {
  return (
    <section id="features" className="py-32 bg-[#0E0E0E]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need to Grow
          </h2>
          <p className="text-gray-400">
            The complete operating system for modern marketing teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.tag}
              className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="h-50 mb-5">
                <GetFeatureDemo title={feature.tag} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4 duration-200">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
