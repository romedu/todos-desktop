import React, {Fragment} from "react";
import "./Options.css";

// The optionList property should be an object, containing the props: name and id.
// The emptyOption property should be a string
const Options = ({name, label, optionList, emptyOption, selected, pickOption}) => {
   if(!optionList) optionList = [{name: emptyOption}];
   else if(emptyOption && !optionList.includes(emptyOption)) optionList.unshift({name: emptyOption});

   const options = optionList.map(({name, id}, index) => (
      <option key={`${id || name}${index}`} value={id || name}> 
         {name}
      </option>)
   );

   return (
      <Fragment>
         <label className="optionsLabel">
            {label}
         </label>
         <select name={name} value={selected || emptyOption} onChange={pickOption} className="selectOption">
            {options}
         </select>
      </Fragment>
   );
};

export default Options;