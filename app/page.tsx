import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import QuickActions from "@/components/QuickActions";
import Departments from "@/components/Departments";
import About from "@/components/About";
import HeadDoctor from "@/components/HeadDoctor";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import Appointment from "@/components/Appointment";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBar />
      <QuickActions />
      <Departments />
      <About />
      <HeadDoctor />
      <WhyUs />
      <Gallery />
      <Appointment />
      <Testimonials />
      <Faq />
      <CtaBand />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
    </main>
  );
}