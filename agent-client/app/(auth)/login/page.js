"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="h-screen dark-veil flex items-center justify-center">
      <Card className="w-full max-w-2xl !bg-transparent text-center">
        <CardHeader className="text-center">
          <CardTitle className="text-6xl font-bold">Welcome</CardTitle>
          <CardDescription>Join us with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="glass"
            className="w-fit h-16 py-3.5 px-10 text-2xl justify-start m-auto gap-4 text-gray-800 border-white/60 flex items-center"
            onClick={() => {
              window.location.href = `http://localhost:8000/google`;
            }}
          >
            <Image src="/google.png" alt="google icon" width="30" height="30" />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
