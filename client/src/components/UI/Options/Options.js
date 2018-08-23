import React, {Fragment} from "react";
import "./Options.css";

const Options = ({name, label, optionList, emptyOption, selected, pickOption}) => {
   if(!optionList) optionList = [emptyOption];
   else if(emptyOption && !optionList.includes(emptyOption)) optionList.unshift(emptyOption);

   const options = optionList.map((optionName, index) => (
      <option key={`${optionName}${index}`} value={optionName}> 
         {optionName}
      </option>)
   );

   return (
      <Fragment>
         <label>
            {label}
         </label>
         <select name={name} value={selected || emptyOption} onChange={pickOption} className="selectOption">
            {options}
         </select>
      </Fragment>
   );
};

export default Options;