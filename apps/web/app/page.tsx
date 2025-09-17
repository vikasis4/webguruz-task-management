import React from "react";
import "./globals.css";
import AnimatedHero from "@/components/homepage/AnimatedHero";
import Features from "@/components/homepage/Features";

function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedHero />
      <Features />
    </div>
  );
}

export default page;
