import React from "react";
import {Link} from "react-router-dom";
import "./MainSection.css";

const MainSection = ({image}) => (
   <main className="MainSection" style={{backgroundImage: `url(${image})`}}>
      <h1>
         TodoDesktop
      </h1>
      <h3>
         "Where one todo is just not enough"
      </h3>
      <Link to="/todos" className="LandingLink">
         Start organizing your todos
      </Link>
   </main>
);

export default MainSection;