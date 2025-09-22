"use client"
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Pricing = () => {
  const [credits, setCredits] = useState(500);
  const [price, setPrice] = useState(0);

  // Calculate price based on credits
  useEffect(() => {
    // Base pricing: $0.05 per credit with volume discount
    let calculatedPrice = 0;
    
    if (credits <= 100) {
      calculatedPrice = credits * 0.10; // $0.10 per credit for small amounts
    } else if (credits <= 500) {
      calculatedPrice = credits * 0.08; // $0.08 per credit for medium amounts
    } else if (credits <= 1000) {
      calculatedPrice = credits * 0.06; // $0.06 per credit for larger amounts
    } else {
      calculatedPrice = credits * 0.05; // $0.05 per credit for bulk amounts
    }
    
    // Round to 2 decimal places
    setPrice(Math.round(calculatedPrice * 100) / 100);
  }, [credits]);

  const handleCreditChange = (e) => {
    setCredits(Number(e.target.value));
  };

  return (
    <section id="pricing" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Credit Package
          </h2>
          <p className="text-xl text-white/80">
            Pay only for what you need with our flexible credit system
          </p>
        </div>

        {/* Credit Slider Section */}
        <div className="mb-12 max-w-2xl mx-auto">
          <Card className="p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">Select Your Credits</CardTitle>
              <div className="text-5xl font-bold text-white my-4">${price}</div>
              <CardDescription className="text-white/80">
                {credits} credits ({credits <= 100 ? "$0.10" : credits <= 500 ? "$0.08" : credits <= 1000 ? "$0.06" : "$0.05"} per credit)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="credit-slider" className="block text-white font-medium mb-2">
                  Adjust Credit Amount
                </Label>
                <input
                  id="credit-slider"
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={credits}
                  onChange={handleCreditChange}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-white/70 text-sm mt-1">
                  <span>100 credits</span>
                  <span className="font-medium text-white">{credits} credits</span>
                  <span>2000 credits</span>
                </div>
              </div>
              <Button variant="default" className="w-full py-3">
                Purchase Credits
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
