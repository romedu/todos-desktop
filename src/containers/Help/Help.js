import React from "react";
import HelpContent from "../../components/Help/HelpContent";
import "./Help.css";

const Help = props => {
   return (
      <div className="Help">
         <h2>
            Help
         </h2>
         <HelpContent />
      </div>
   );
};

export default Help;