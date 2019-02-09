import React from "react";
import Button from "../../UI/Button/Button";
import ButtonGroup from "../../UI/ButtonGroup/ButtonGroup";

const Pagination = ({currentPage, limit, total, paginateHandler}) => {
   const pagesToCome = Math.ceil(total / (limit * currentPage)) - 1,
         buttons = [
            <Button key="page0" design="selected">
               {currentPage}
            </Button>
         ];

   if(currentPage > 1){
      buttons.unshift(
         <Button key="page-1" action={() => paginateHandler(currentPage - 1)}>
            {currentPage - 1}
         </Button>
      );

      if(currentPage > 2) buttons.unshift(
         <Button key="page-2" action={() => paginateHandler(currentPage - 2)}>
            {currentPage - 2}
         </Button>
      );

      buttons.unshift(
         <Button key="page<" action={() => paginateHandler(currentPage - 1)}>
            {"<"}
         </Button>
      );
   }
   
   if(pagesToCome){
      buttons.push(
         <Button key="page1" action={() => paginateHandler(currentPage + 1)}>
            {currentPage + 1}
         </Button>
      );

      if(pagesToCome > 1) buttons.push(
         <Button key="page2" action={() => paginateHandler(currentPage + 2)}>
            {currentPage + 2}
         </Button>
      );

      buttons.push(
         <Button key="page>" action={() => paginateHandler(currentPage + 1)}>
            {">"}
         </Button>
      );
   }

   return (
      <ButtonGroup groupType="pagesGroup">
         {buttons}
      </ButtonGroup>
   );
};

export default Pagination