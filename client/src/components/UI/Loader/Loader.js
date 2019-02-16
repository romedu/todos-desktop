import React from "react";
import "./Loader.css";

const Loader = ({mini, insideModal}) => {
   return (
      <div className={`${mini ? "MiniLoader" : "Loader"} ${insideModal && "ModalLoader"}`}>
         <div className="spinner"></div>
      </div>
   )
};

export default Loader;