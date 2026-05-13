import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { TestimonialsSection } from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans max-w-screen-2xl mx-auto">
      <Navbar />
      <Hero />
      <TestimonialsSection />
    </div>
  );
}