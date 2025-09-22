import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="p-12">
          <CardHeader>
            <Rocket className="w-12 h-12 mx-auto mb-6 text-white" />
            <CardTitle className="text-5xl mb-6 text-white">
              Your AI Marketing Partner is Ready — Are You?
            </CardTitle>
            <CardDescription className="text-xl mb-8 text-white/80">
              Join over 10,000 businesses already accelerating their growth with
              AI-powered marketing automation. Transform your content strategy
              and dominate your market today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="glass" className="px-8 py-4 text-lg pulse-glow">
                🚀 Start Your Free Trial Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
