import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WorkSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Enter Your Business Idea",
      description: "Simply provide your topic, product details, target audience, or marketing goals. Our intelligent AI system analyzes your input and understands your specific business needs and objectives."
    },
    {
      number: 2,
      title: "AI Creates Premium Content",
      description: "Watch as our advanced AI generates high-quality blogs, product descriptions, video scripts, or provides detailed trend analysis. All content is optimized for your industry and target audience."
    },
    {
      number: 3,
      title: "Publish & Scale Your Growth",
      description: "Automatically publish across all your marketing channels or download content for manual use. Track performance metrics and watch your business grow with data-driven insights."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-white/80">
            Get started with AI-powered marketing in just three simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto feature-icon">
                <span className="card-surface text-white mt-4 w-14 h-14 flex items-center justify-center text-2xl rounded-2xl mx-auto">
                  {step.number}
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-white">{step.title}</CardTitle>
                <CardDescription className="text-white/80">
                  {step.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSteps;
