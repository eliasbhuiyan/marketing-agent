"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/lib/hooks/useAuth";

export default function ProfilePage() {
  const { userData } = useAuth();

  return (
    <div className="space-y-6">
      <Card className="pt-4">
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full overflow-hidden flex items-center justify-center">
              {
                userData?.avatar && (
                  <Image
                    src={userData?.avatar}
                    width={200}
                    height={200}
                    alt="profile"
                  />
                )
              }
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                defaultValue={userData?.fullName?.split(" ")[0]}
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                defaultValue={userData?.fullName?.split(" ")[1]}
                readOnly
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              defaultValue={userData?.email}
              readOnly
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}