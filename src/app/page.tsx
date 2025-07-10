import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection/Hero"
import About from "../components/About"
import Services from "../components/Services"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <About />
      <Services />
      <Testimonials />
      <Footer />
    </main>
  )
}