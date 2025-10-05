import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { GetStartedSection } from "@/components/landing/GetStartedSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    <main className="font-sans bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />

      <HeroSection />

      {/* Main content container with improved spacing */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-20 py-8 sm:py-12">
          <HowItWorksSection />
          <FeaturesSection />
          <GetStartedSection />
        </div>
      </div>

      <Footer />
    </main>
  );
}