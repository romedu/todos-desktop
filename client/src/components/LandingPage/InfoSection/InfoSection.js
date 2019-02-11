import React from "react";
import InfoBlock from "../InfoBlock/InfoBlock";
import resortImage from "../../../assets/images/luxury-resort.jpg";
import nodeHerokuImage from "../../../assets/images/node-&-heroku.png";
import reactImage from "../../../assets/images/reactJS-wallpaper.png";
import "./InfoSection.css";

const InfoSection = props => {
   return (
      <section className="InfoSection">
         <InfoBlock title="Lorem ipsum dolor" image={reactImage} backgroundColor="rgb(236, 255, 130)">
            Lorem ipsum dolor sit amet, nec nemore causae prompta ut. Vel idque persequeris id, vel cu volumus intellegam deterruisset. 
         </InfoBlock>
         <InfoBlock title="Lorem ipsum dolor" image={nodeHerokuImage} backgroundColor="skyblue">
            Lorem ipsum dolor sit amet, nec nemore causae prompta ut. Vel idque persequeris id, vel cu volumus intellegam deterruisset.
         </InfoBlock>
         <InfoBlock title="Lorem ipsum dolor" image={resortImage} backgroundColor="rgb(162, 219, 116)">
            Lorem ipsum dolor sit amet, nec nemore causae prompta ut. Vel idque persequeris id, vel cu volumus intellegam deterruisset.
         </InfoBlock>
      </section>
   )
}

export default InfoSection;