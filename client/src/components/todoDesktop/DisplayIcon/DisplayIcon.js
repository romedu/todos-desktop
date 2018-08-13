import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import ButtonGroup from "../../UI/ButtonGroup/ButtonGroup";
import "./DisplayIcon.css";

const DisplayIcon = props => {
   const {openHandler, settingsHandler, deleteHandler, ...iconData} = props,
         content = (
            <Fragment>
               <div className={`${iconData.type}Display`} title={iconData.description}>
                  <img src={iconData.image} alt="" />
               </div>
               {iconData.name}
            </Fragment>
         ),
          buttons = [
            {
               description: "D",
               design: "settings",
               action: e => {
                  e.stopPropagation(); 
                  deleteHandler(iconData)
               }
            },
            {
               description: "E",
               design: "settings",
               action: e => {
                  e.stopPropagation(); 
                  settingsHandler(iconData)
               }
            }
         ];

   return (
      <li className="displayIcon" onClick={openHandler}>
         <ButtonGroup buttons={buttons} groupType="settingsGroup"/>
         {iconData.url 
          ? <Link to={iconData.url}>
             {content} 
          </Link>
          : content}
      </li>
   )
};

export default DisplayIcon;