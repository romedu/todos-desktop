import React from "react";
import "./OverviewThumbnail.css";

const OverviewThumbnail = ({image, title, children}) => {
   return (
      <li className="OverviewThumbnail">
         <img src={image} alt="" />
         <h4>
            {title}
         </h4>
         <p>
            {children}
         </p>
      </li>
   )
}

export default OverviewThumbnail;