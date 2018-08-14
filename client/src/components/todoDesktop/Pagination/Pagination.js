import React from "react";
import ButtonGroup from "../../UI/ButtonGroup/ButtonGroup";

const Pagination = ({currentPage, limit, total, paginateHandler}) => {
   const pagesToCome = Math.ceil(total / (limit * currentPage)) - 1,
         buttons = [
            {
               description: currentPage,
               design: "selected"
            }
         ];

   if(currentPage > 1){
      buttons.unshift({
         description: currentPage - 1,
         action: () => paginateHandler(currentPage - 1)
      });

      if(currentPage > 2) buttons.unshift({
         description: currentPage - 2,
         action: () => paginateHandler(currentPage - 2)
      });

      buttons.unshift({
         description: "<",
         action: () => paginateHandler(currentPage - 1)
      });
   }
   
   if(pagesToCome){
      buttons.push({
         description: currentPage + 1,
         action: () => paginateHandler(currentPage + 1)
      });

      if(pagesToCome > 1) buttons.push({
         description: currentPage + 2,
         action: () => paginateHandler(currentPage + 2)
      });

      buttons.push({
         description: ">",
         action: () => paginateHandler(currentPage + 1)
      });
   }

   return (
      <ButtonGroup buttons={buttons} />
   );
};

export default Pagination