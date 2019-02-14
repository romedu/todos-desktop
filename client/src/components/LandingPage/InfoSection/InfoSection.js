import React from "react";
import InfoBlock from "../InfoBlock/InfoBlock";
import UIImage from "../../../assets/images/user-interface.png";
import sortingImage from "../../../assets/images/sorting.png";
import foldersImage from "../../../assets/images/folders.png";
import "./InfoSection.css";

const InfoSection = props => {
   return (
      <section className="InfoSection">
         <InfoBlock title="Organize your todos in folders" image={foldersImage} backgroundColor="#CFBAE1">
            With our folder system, you can easily create todos and group them according to your own criteria.
         </InfoBlock>
         <InfoBlock title="Smooth User Interface" image={UIImage} backgroundColor="#fcb38f">
            The user interface was designed thinking in the casual user, who doesn't want to learn anything new in order to use it.
         </InfoBlock>
         <InfoBlock title="Live Sorting" image={sortingImage} backgroundColor="#EFE9AE">
            Our sorting algorithm supports multiple ways to organize your items, making sure you find the one suited for your needs.
         </InfoBlock>
      </section>
   )
}

export default InfoSection;