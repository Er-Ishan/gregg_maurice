import React, { useEffect, useState } from 'react'
import Topbar from "../component/Topbar"
import Navbar from "../component/Navbar"
import Footer from "../component/Footer"
import Copyright from "../component/Copyright"
import CarSteps from '../component/Carsteps'
import NavbarElement from '../component/NavbarElement'


const Howwork = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return (
        <div>
            {/* {!isMobile && <Topbar />} */}
            <NavbarElement></NavbarElement>
            <CarSteps></CarSteps>
            <Footer></Footer>
            <Copyright></Copyright>
        </div>
    )
}

export default Howwork
