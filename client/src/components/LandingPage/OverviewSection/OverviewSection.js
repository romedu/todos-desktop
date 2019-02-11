import React from "react";
import OverviewThumbnail from "../OverviewThumbnail/OverviewThumbnail";
import "./OverviewSection.css";
import calendarImage from "../../../assets/images/calendar.png";
import serviceImage from "../../../assets/images/room-service.png";
import theaterImage from "../../../assets/images/theater.png";

const OverviewSection = props => {
   return (
      <section className="OverviewSection">
         <h2>
            We know one todo is not enough for all your needs
         </h2>
         <ul>
            <OverviewThumbnail title="Serving you comes first" image={serviceImage}>
               Our top priority is making sure that our users feel like this was designed for them.
            </OverviewThumbnail>
            <OverviewThumbnail title="Active Support" image={calendarImage}>
               We are active at all times, if you ever feel like reporting a bug or proving feedback you can be sure we will listen.
            </OverviewThumbnail>
            <OverviewThumbnail title="Security creates comfortness" image={theaterImage}>
               We make sure to keep your todos and your data private at al times.
            </OverviewThumbnail>
         </ul>
      </section>
   )
}

export default OverviewSection;