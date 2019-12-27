import React from "react";
import MainSection from "../../components/LandingPage/MainSection/MainSection";
import OverviewSection from "../../components/LandingPage/OverviewSection/OverviewSection";
import InfoSection from "../../components/LandingPage/InfoSection/InfoSection";
import jellyfishImage from "../../assets/images/Jellyfish.jpg";
import "./LandingPage.css";

const LandingPage = props => {
   return (
      <div className="LandingPage">
         <MainSection image={jellyfishImage} />
         <OverviewSection />
         <section className="BackgroundSection" style={{backgroundImage: `url(${jellyfishImage})`}}></section>
         <InfoSection />
      </div>
   )
}

export default LandingPage;