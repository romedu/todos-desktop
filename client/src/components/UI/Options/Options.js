import React from "react";

const Options = ({name, label, optionList, emptyOption, selected, pickOption}) => {
   if(!optionList) optionList = [emptyOption];
   else if(emptyOption && !optionList.includes(emptyOption)) optionList.unshift(emptyOption);

   const options = optionList.map((optionName, index) => (
      <option key={`${optionName}${index}`} value={optionName}> 
         {optionName}
      </option>)
   );

   return (
      <label>
         {label}
         <select name={name} value={selected || emptyOption} onChange={pickOption}>
            {options}
         </select>
      </label>
   );
};

export default Options;