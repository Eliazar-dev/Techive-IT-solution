import Hero from "../components/sections/Hero";
import ServicesIconRow from "../components/ServicesIconRow";
import ServicesSection from "../components/sections/ServicesSection";
import SolutionsSection from "../components/sections/SolutionsSection";
import AcademySection from "../components/sections/AcademySection";
import PortfolioSection from "../components/sections/PortfolioSection";
import AboutSection from "../components/sections/AboutSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import BlogSection from "../components/sections/BlogSection";
import ContactSection from "../components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesIconRow />
      <ServicesSection limit={6} />
      <SolutionsSection limit={3} />
      <AcademySection limit={4} />
      <PortfolioSection limit={3} />
      <AboutSection />
      <TestimonialsSection />
      <BlogSection limit={3} />
      <ContactSection />
    </>
  );
}
