import React from "react";
import { withRouter } from "react-router";
import CreateFolderBtn from "../CreateFolderBtn";
import CreateTodoListBtn from "../CreateTodoListBtn";
import "./CreateItemBtns.css";

const CreateItemBtns = props => {
   const shouldShowFolderBtn = props.match.isExact;
   
	return (
		<div className="createItemBtns">
			<CreateTodoListBtn />
			{shouldShowFolderBtn && <CreateFolderBtn />}
		</div>
	);
};

export default withRouter(CreateItemBtns);
