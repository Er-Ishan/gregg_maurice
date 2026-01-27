import { useEffect, useState } from "react";
import Hero from "../component/Hero";
import Topbar from "../component/Topbar";
import NavbarElement from "../component/NavbarElement";
import Aboutus from "../component/Aboutus";
import Features from "../component/Features";
import Fact from "../component/Fact";
import Services from "../component/Services";
import Carsteps from "../component/Carsteps";
import Footer from "../component/Footer";
import Copyright from "../component/Copyright";
import HeathrowLocations from "../component/HeathrowLocations";
import Categories from "../component/Categories";


export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      {/* {!isMobile && <Topbar />} */}
      <NavbarElement />
      <Hero />
      <Aboutus />
      <Features />
      {/* <Fact /> */}
      <Services />
      <HeathrowLocations></HeathrowLocations>
      <Carsteps />
      {/* <Categories></Categories> */}
      <Footer />
      <Copyright />
    </>
  );
}
