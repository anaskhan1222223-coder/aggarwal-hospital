import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import QuickActions from "@/components/QuickActions";
import Departments from "@/components/Departments";
import About from "@/components/About";
import VideoTour from "@/components/VideoTour";
import HeadDoctor from "@/components/HeadDoctor";
import Facilities from "@/components/Facilities";
import Gallery from "@/components/Gallery";
import WhyUs from "@/components/WhyUs";
import Appointment from "@/components/Appointment";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatsBar />
      <QuickActions />
      <Departments />
      <About />
      <VideoTour />
      <HeadDoctor />
      <Facilities />
      <Gallery />
      <WhyUs />
      <Appointment />
      <Testimonials />
      <Faq />
      <CtaBand />
      <Contact />
      <Footer />
      <ChatBot />
      <FloatingWhatsApp />
      <MobileActionBar />
    </main>
  );
}