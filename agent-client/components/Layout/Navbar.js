import React from "react";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="card-surface fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-white">
              🤖 AI Marketing Agent
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-white hover:text-yellow-300 transition-colors"
            >
              FAQ
            </a>
          </div>
          <div className="flex space-x-4">
            <Button variant="glass">Sign In</Button>
            <Button variant="glass">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
