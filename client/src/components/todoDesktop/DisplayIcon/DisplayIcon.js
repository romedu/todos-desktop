import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import Button from "../../UI/Button/Button";
import ButtonGroup from "../../UI/ButtonGroup/ButtonGroup";
import "./DisplayIcon.css";

const DisplayIcon = props => {
   const {openHandler, settingsHandler, deleteHandler, ...iconData} = props,
         content = (
            <Fragment>
               <div className={`${iconData.type}Icon`} title={iconData.description}>
                  <img src={iconData.image || ""} alt="" />
               </div>
               {iconData.name}
            </Fragment>
         );

   return (
      <li className="displayIcon" onClick={openHandler}>
         <ButtonGroup groupType="settingsGroup">
            <Button design="settings" action={e => {
                  e.stopPropagation(); 
                  deleteHandler(iconData)
            }}>
               <FontAwesomeIcon size={window.screen.availWidth < 600 ? "2x" : "1x"} icon={faTrashAlt} color="rgb(59, 167, 122)" />
            </Button>
            <Button design="settings" action={e => {
                  e.stopPropagation(); 
                  settingsHandler(iconData)
            }}>
               <FontAwesomeIcon size={window.screen.availWidth < 600 ? "2x" : "1x"} icon={faPencilAlt} color="rgb(59, 167, 122)" />
            </Button>
         </ButtonGroup>
         {iconData.url 
          ? <Link to={iconData.url}>
             {content} 
          </Link>
          : content}
      </li>
   )
};

export default DisplayIcon;