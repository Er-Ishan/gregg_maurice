import React, { useEffect, useState } from 'react'
import Topbar from "../component/Topbar";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Aboutus from "../component/Aboutus";
import NavbarElement from '../component/NavbarElement';


const About = () => {

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
      <NavbarElement></NavbarElement>

      <Aboutus></Aboutus>

      <Footer></Footer>

    </>
  )
}

export default About
