import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Origin from "@/components/landing/Origin";
import Manifesto from "@/components/landing/Manifesto";
import WhatWeDo from "@/components/landing/WhatWeDo";
import Method4Exams from "@/components/landing/Method4Exams";
import LearningSystem from "@/components/landing/LearningSystem";
import Comparison from "@/components/landing/Comparison";
import WhatIncludes from "@/components/landing/WhatIncludes";
import Pricing from "@/components/landing/Pricing";
import CCAA from "@/components/landing/CCAA";
import LeadCapture from "@/components/landing/LeadCapture";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Origin />
      <Manifesto />
      <WhatWeDo />
      <Method4Exams />
      <LearningSystem />
      <Comparison />
      <WhatIncludes />
      <Pricing />
      <CCAA />
      <LeadCapture />
      <FAQ />
      <Footer />
    </main>
  );
}
