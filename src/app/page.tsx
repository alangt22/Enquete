"use client";

import { Features } from "./_components/features";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import {NavBar} from "./_components/navBar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-slate-500 text-white">
      {/* Hero */}
      <Hero />


      {/* Features */}
      <Features />

    </main>
  );
}
