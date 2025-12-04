import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SupportTicket = () => {
  return (
    <form id="support-form">
      <div className="space-y-6">
        <div>
          <Label htmlFor="fullName" className="text-white">
            Full Name
          </Label>
          <Input
            id="fullName"
            required
            placeholder="e.g., John Doe"
            className="text-white"
          />
        </div>
        <div>
          <Label htmlFor="emailAddress" className="text-white">
            Email Address
          </Label>
          <Input
            id="emailAddress"
            type="email"
            required
            placeholder="e.g., john.doe@example.com"
            className="text-white"
          />
        </div>
        <div>
          <Label htmlFor="subject" className="text-white">
            Subject
          </Label>
          <Input
            id="subject"
            required
            type="text"
            placeholder="e.g., Account Help"
            className="text-white"
          />
        </div>
        <div>
          <Label htmlFor="message" className="text-white">
            Message
          </Label>
          <textarea
            id="message"
            name="message"
            rows="6"
            required
            placeholder="e.g., Hello, I need help with my account."
            className="w-full text-white rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ></textarea>
        </div>
        <Button type="submit" className="w-full">
          Submit Ticket
        </Button>
      </div>
    </form>
  );
};

export default SupportTicket;
