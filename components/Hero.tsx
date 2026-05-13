
"use client";

import Image from "next/image";
import { ArrowRight, Play, ArrowUpRight, User, Building2, Home, Map } from "lucide-react";

const stats = [
  { n: "2750+", l: "Hours of Advice" },
  { n: "520M+", l: "Sq. Feet Analyzed" },
  { n: "210+", l: "Partner Builders" },
  { n: "500+", l: "Projects Across Bangalore" },
];

export default function Hero() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 lg:py-14 grid lg:grid-cols-2 gap-10 items-stretch">
      {/* Left column */}
      <div className="flex flex-col h-full">

        <p className="mb-4 text-[11px] tracking-[0.2em] uppercase font-semibold">
            <span className="animated-gradient-text">
                Stop wasting countless weekends on irrelevant visits
            </span>
        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-foreground">
          Visit curated homes, negotiate smarter &amp; buy intelligently.
        </h1>

        <div className="mt-4 border-t border-border pt-4 flex items-start gap-2">
          <p className="text-sm text-foreground/80 leading-relaxed flex-1">
            Get end-to-end guidance from property wizards who&apos;ve helped intelligent homebuyers
            buy 200+ homes in the last year alone.
          </p>
        </div>
        
        <div className="mt-4 grid grid-cols-4 gap-3 mb-10">
          {stats.map((s) => (
            <div key={s.l} className="border-t border-border pt-3">
              <div className="text-xl md:text-2xl tracking-tight text-foreground">{s.n}</div>
              <div className="text-[10px] tracking-wider uppercase text-muted-foreground mt-1 font-medium leading-tight">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-video group cursor-pointer pt-10 hidden lg:block">
          <Image
            src="/images/GHB-Hero-Thumbnail.avif"
            alt="Watch our story"
            fill
            className="object-cover"
            sizes="(max-width: 1400px) 50vw, 700px"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-foreground fill-foreground ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="relative rounded-[2rem] overflow-hidden h-full lg:min-h-[600px]">
        <Image
          src="/images/img3.png"
          alt="Curated premium homes"
          fill
          className="object-cover hidden lg:block"
          sizes="(max-width: 1400px) 50vw, 700px"
          priority
        />

        <div className="absolute top-5 left-5 bg-background/95 backdrop-blur rounded-2xl p-3 flex items-center gap-3 shadow-lg hidden lg:flex">
          <div>
            <div className="text-sm font-bold text-foreground leading-tight">Curated Homes</div>
            <div className="text-sm font-bold text-foreground leading-tight">India</div>
            <div className="mt-2 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <Image src="/images/download.jpg" alt="Property preview" fill className="object-cover" sizes="56px" />
            </div>
        </div>

        <div className="absolute top-5 right-5 items-center gap-2 hidden lg:flex">
          <button className="bg-background/95 backdrop-blur text-foreground rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-background">
            Contact Us
          </button>
          <button className="w-10 h-10 rounded-full bg-background/95 backdrop-blur flex items-center justify-center hover:bg-background">
            <User className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Bottom: caption + booking card */}
          <div className="lg:absolute lg:bottom-5 lg:right-5 lg:max-w-sm lg:w-[22rem]">
            <div className="overflow-hidden rounded-3xl bg-background/50 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.25)] border border-background/40 ring-1 ring-foreground/5">
              <div className="p-6 flex flex-col gap-6">
                {/* City */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">Select City</label>
                  <div className="relative flex p-1.5 bg-foreground/5 rounded-2xl">
                    <button className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-background text-foreground shadow-sm">Bangalore</button>
                    <button className="flex-1 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Mumbai</button>
                  </div>
                </div>

                {/* Property Type */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">Property Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border border-border border-foreground hover:border-foreground/30 hover:bg-background/60 transition-all">
                      <Building2 className="w-5 h-5 text-foreground/70" />
                      <span className="text-[11px] font-medium text-foreground/70">Apartment</span>
                    </button>
                    <button className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border-2 border-primary bg-primary/10 transition-all">
                      <Home className="w-5 h-5 text-primary" />
                      <span className="text-[11px] font-bold text-primary">Villa</span>
                    </button>
                    <button className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border border-border border-foreground hover:border-foreground/30 hover:bg-background/60 transition-all">
                      <Map className="w-5 h-5 text-foreground/70" />
                      <span className="text-[11px] font-medium text-foreground/70">Plot</span>
                    </button>
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-4 pt-1">
                  <button className="w-full bg-primary text-primary-foreground py-3.5 rounded-2xl font-bold text-sm shadow-[0_8px_20px_-4px_color-mix(in_oklab,var(--primary)_45%,transparent)] hover:opacity-95 transition-all active:scale-[0.98]">
                    Book An Appointment
                  </button>
                  <p className="text-center text-xs text-foreground font-medium">
                    Already a member? <a href="#" className="text-primary font-bold hover:underline underline-offset-4">Login</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}