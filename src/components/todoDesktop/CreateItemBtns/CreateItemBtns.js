import React from "react";
import CreateFolderBtn from "../CreateFolderBtn";
import CreateTodoListBtn from "../CreateTodoListBtn";
import "./CreateItemBtns.css";

const CreateItemBtns = props => {
	return (
		<div className="createItemBtns">
			<CreateTodoListBtn />
			<CreateFolderBtn />
		</div>
	);
};

export default CreateItemBtns;
