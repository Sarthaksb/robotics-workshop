import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import WorkshopDetails from "./components/sections/WorkshopDetails";
import LearningOutcomes from "./components/sections/LearningOutcomes";
import FAQ from "./components/sections/FAQ";
import RegistrationForm from "./components/sections/RegistrationForm";

export default function App() {
  return (
    <>
      {/* Skip to main content (accessibility) */}
      <a href="#hero" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <WorkshopDetails />
        <LearningOutcomes />
        <FAQ />
        <RegistrationForm />
      </main>

      <Footer />
    </>
  );
}
