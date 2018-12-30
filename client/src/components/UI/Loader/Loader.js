import React from "react";
import "./Loader.css";

const Loader = ({mini}) => {
   return (
      <div className={mini ? "MiniLoader" : "Loader"}>
         <div className="spinner"></div>
      </div>
   )
};

export default Loader;