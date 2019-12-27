import React from "react";

const HelpContent = props => (
   <div>      
      <h4>
         Getting Started
      </h4>
      <label>
         Let's create our first item (folder or todo list), we would start by making a folder of todo lists:
      </label>
      <ol>
         <li>
            Make sure you are in the "Folders Page" by looking at the folder button's style in the inner menu, if not 
            you can just click our logo in the nav bar and it will take you there
         </li>
         <li> 
            Click on the "Create Item" button in the mini menu
         </li>
         <li>
            The folder creation form should pop-up. <b> Note: </b> Each item's name must be unique and only contain 
            alphanumeric characters, it's length should range from 3 to 14
         </li>
         <li>
            And Voila... If your name is available and follows our standards your item will be created and displayed 
            in your desktop. <b> Note: </b> To see a folder's description you must place the mouse over it and wait like 1.5 seconds
         </li>
      </ol>
      <label>
         Now let's go for a todo list inside of our new folder:
      </label>
      <ol>
         <li>
            Click on our new folder
         </li>
         <li> 
            Click the "Create List" button and follow the step 3 from the previous tutorial
         </li>
         <li>
            You can access your new list by clicking on it
         </li>
         <li>
            <b>
               Wow! Now the only thing left before you can go on your own is to remember that the 2 buttons in the top corner 
               of each item are used for updating(pencil) or removing(trash can) itself
            </b>
         </li>
      </ol>
   </div>
);

export default HelpContent;