import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const Footer = () => {
  return (
    <footer className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="p-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                🤖 AI Marketing Agent
              </div>
              <p className="text-white/80">
                The comprehensive AI-powered platform designed for modern
                marketing teams and growing businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">
                Product Features
              </h4>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    AI Content Creation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Trend Analysis
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Multi-Platform Publishing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Team Collaboration
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Career Opportunities
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">
                Support & Resources
              </h4>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    System Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center text-white/80">
            <p>
              &copy; 2024 AI Marketing Agent. All rights reserved. Built with ❤️
              for growing businesses.
            </p>
          </div>
        </Card>
      </div>
    </footer>
  );
};

export default Footer;
