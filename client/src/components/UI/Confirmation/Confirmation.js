import React, {Fragment} from "react";
import Modal from "../Modal/Modal";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Loader from "../Loader/Loader";

const Confirmation = ({isLoading, slightDrop, children, deleteHandler, negationHandler, closeHandler}) => {
   const buttons = [
      {
         description: "Yes",
         action: deleteHandler
      },
      {
         description: "No",
         action: negationHandler || closeHandler
      }
   ];
   const content = isLoading ? <Loader /> 
                             : (<Fragment>
                                  {children}
                                  <ButtonGroup buttons={buttons} />
                               </Fragment>);

   return (
      <Modal label={"Confirmation"} closeHandler={!isLoading ? closeHandler : null} slightDrop={slightDrop}>
         {content}
      </Modal>
   )
};

export default Confirmation;