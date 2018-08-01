import React, {Fragment} from "react";
import Modal from "../Modal/Modal";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Loader from "../Loader/Loader";

const Confirmation = ({isLoading, backDropped, children, deleteHandler, negationHandler, closeHandler}) => {
   const buttons = [
      {
         text: "Yes",
         action: deleteHandler
      },
      {
         text: "No",
         action: negationHandler || closeHandler
      }
   ];
   const content = isLoading ? <Loader /> 
                             : (<Fragment>
                                  {children}
                                  <ButtonGroup buttons={buttons} />
                               </Fragment>);

   return (
      <Modal label={"Confirmation"} closeHandler={closeHandler} backDropped={backDropped}>
         {content}
      </Modal>
   )
};

export default Confirmation;