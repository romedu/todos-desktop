import React from "react";

const Options = ({label, optionList, emptyOption, selected, pickOption}) => {
   if(!optionList) optionList = [emptyOption];
   else if(!optionList.includes(emptyOption)) optionList.unshift(emptyOption);
   const items = optionList.map((optionName, index) => (
      <option key={`${optionName}${index}`} value={optionName}> 
         {optionName}
      </option>)
   );

   return (
      <label>
         {label}
         <select value={selected || emptyOption} onChange={pickOption}>
            {items}
         </select>
      </label>
   );
};

export default Options;