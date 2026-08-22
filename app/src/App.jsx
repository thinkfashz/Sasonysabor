import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Categories from "./components/Categories/Categories.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Promotions from "./components/Promotions/Promotions.jsx";
import About from "./components/About/About.jsx";
import Testimonials from "./components/Testimonials/Testimonials.jsx";
import SocialMedia from "./components/SocialMedia/SocialMedia.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import BottomBar from "./components/BottomBar/BottomBar.jsx";
import CartDrawer from "./components/Cart/CartDrawer.jsx";
import OrderModal from "./components/Order/OrderModal.jsx";
import Particles from "./components/Particles/Particles.jsx";
import ScrollReveal from "./components/ScrollReveal/ScrollReveal.jsx";
import CartProvider from "./context/CartProvider";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Particles count={25} />
        <Header />
        <main>
          <Hero />
          <ScrollReveal>
            <Categories />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Menu />
          </ScrollReveal>
          <ScrollReveal>
            <Promotions />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <About />
          </ScrollReveal>
          <ScrollReveal>
            <Testimonials />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <SocialMedia />
          </ScrollReveal>
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </main>
        <Footer />
        <BottomBar />
        <CartDrawer />
        <OrderModal />
      </CartProvider>
    </ThemeProvider>
  );
}
