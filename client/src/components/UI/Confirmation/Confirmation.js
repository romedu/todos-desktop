import React, {Fragment} from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Loader from "../Loader/Loader";

const Confirmation = ({isLoading, slightDrop, children, deleteHandler, negationHandler, closeHandler}) => {
   const content = isLoading ? <Loader /> 
                             : (<Fragment>
                                  {children}
                                  <ButtonGroup>
                                     <Button action={deleteHandler}>
                                        Yes
                                     </Button>
                                     <Button action={negationHandler || closeHandler}>
                                        No
                                     </Button>
                                  </ButtonGroup>
                               </Fragment>);

   return (
      <Modal label={"Confirmation"} closeHandler={!isLoading ? closeHandler : null} slightDrop={slightDrop}>
         {content}
      </Modal>
   )
};

export default Confirmation;