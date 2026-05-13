import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#fdfbff] via-[#fefeff] to-[#cdcaef]">
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <CTA />
      </main>
    </div>
  );
}
