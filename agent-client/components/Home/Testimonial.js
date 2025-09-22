import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Testimonial = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            User Experiences
          </h2>
          <p className="text-xl text-white/80">
            Discover how businesses are achieving remarkable growth with AI
            Marketing Agent
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <CardHeader>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 card-surface rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">SM</span>
                </div>
                <div>
                  <CardTitle className="text-lg text-white">Sarah Mitchell</CardTitle>
                  <div className="text-sm text-white/80">
                    E-commerce Store Owner
                  </div>
                </div>
              </div>
              <CardDescription className="text-white/80">
                &quot;AI Marketing Agent transformed our business completely. We
                increased sales by 30% in just two months and saved over 20
                hours per week on content creation. The automated posting
                feature alone has been a game-changer for our social media
                presence.&quot;
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 card-surface rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MJ</span>
                </div>
                <div>
                  <CardTitle className="text-lg text-white">Mike Johnson</CardTitle>
                  <div className="text-sm text-white/80">
                    Digital Marketing Agency
                  </div>
                </div>
              </div>
              <CardDescription className="text-white/80">
                &quot;The trend analyzer feature helped us identify market
                opportunities that increased our clients&apos; engagement by 150%.
                Our team can now focus on strategy while the AI handles content
                creation. It&apos;s like having a full marketing team at your
                fingertips.&quot;
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 card-surface rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">LC</span>
                </div>
                <div>
                  <CardTitle className="text-lg text-white">Lisa Chen</CardTitle>
                  <div className="text-sm text-white/80">
                    Content Creator & Influencer
                  </div>
                </div>
              </div>
              <CardDescription className="text-white/80">
                &quot;From struggling with content ideas to publishing high-quality
                posts daily across 6 platforms. The AI script writer creates
                engaging video content that my audience loves. My follower
                growth has increased by 200% since using this platform.&quot;
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
