import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import "./DisplayIcon.css";
import Button from "../../UI/Button/Button";

const DisplayIcon = props => {
   const {type, name, image, id, url, description, folderName, openHandler, settingsHandler, deleteHandler} = props;
   const action = openHandler ? () => openHandler(id) : null;
   const iconProps = {name, id, type, image: image ? image : "", description: description ? description : "", folderName: folderName ? folderName : null};
   const content = (
      <Fragment>
         <div className={`${type}Display`}>
            <img src={image} alt="" />
         </div>
         {name}
      </Fragment>
   );
   // const buttons = [
   //    {
   //       text: "E",
   //       color: "settings",
   //       action: () => settingsHandler({...iconProps, settingType: "edit"})
   //    },
   //    {
   //       text: "D",
   //       color: "settings",
   //       action: () => settingsHandler({...iconProps, settingType: "delete"})
   //    }
   // ];

   return (
      <li className="displayIcon" onClick={action}>
         <Button action={e => {e.stopPropagation(); deleteHandler(iconProps)}} color="settings"> D </Button>
         <Button action={e => {e.stopPropagation(); settingsHandler(iconProps)}} color="settings"> E </Button>
         {url ? <Link to={url}> {content} </Link> : content}
      </li>
   )
};

export default DisplayIcon;