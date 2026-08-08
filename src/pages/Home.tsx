import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Stack from "../components/Stack";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import Featured from "../components/Featured";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Stack/>
      <Featured/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default Home;
