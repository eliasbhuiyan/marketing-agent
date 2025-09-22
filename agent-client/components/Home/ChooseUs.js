import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ChooseUs = () => {
  const features = [
    {
      icon: "🚀",
      title: "Save Valuable Time",
      description:
        "Reduce content creation time by 80% with our advanced AI automation. Focus on strategy while we handle the execution.",
    },
    {
      icon: "🎯",
      title: "Boost Sales Performance",
      description:
        "Leverage data-driven marketing trends and insights to increase conversion rates and drive revenue growth.",
    },
    {
      icon: "🤖",
      title: "Intelligent AI Assistant",
      description:
        "Our AI learns from your business goals and adapts to deliver personalized content that resonates with your audience.",
    },
    {
      icon: "🌍",
      title: "Universal Publishing",
      description:
        "Create once, publish everywhere. Reach your audience across all major platforms from a single dashboard.",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 slide-up">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose AI Marketing Agent?
          </h2>
          <p className="text-xl text-white/80">
            Transform your marketing strategy with intelligent automation and
            data-driven insights
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover-scale slide-up text-white"
            >
              <div className="card-surface mt-4 w-14 h-14 flex items-center justify-center text-2xl rounded-2xl mx-auto">
                {feature.icon}
              </div>
              <CardHeader>
                <CardTitle className="text-white">{feature.title}</CardTitle>
                <CardDescription className="text-white/80 pt-3">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
