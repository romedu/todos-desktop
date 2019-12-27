import React from "react";
import "./InfoBlock.css";

const InfoBlock = ({title, image, backgroundColor, children}) => (
   <div className="InfoBlock" style={{backgroundColor}}>
      <h5>
         {title}
      </h5>
      <div className="ImageContainer" style={{backgroundImage: `url(${image})`}}></div>
      <p>
         {children}
      </p>
   </div>
)

export default InfoBlock;