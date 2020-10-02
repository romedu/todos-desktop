import React from "react";
import { DropTarget } from "react-dnd";
import ItemsList from "../../todoDesktop/ItemsList/ItemsList";
import { TODOLIST_DRAG_TYPE } from "../../../constants";

const FolderContent = ({ files, folderName, connectDropTarget }) => {
	const content = files.length ? <ItemsList items={files} /> : <h4> The folder is empty </h4>;

	return (
		<div ref={connectDropTarget}>
			<h2>{folderName}</h2>
			<div>{content}</div>
		</div>
	);
};

const dropSpecMethod = {
	drop: ({ folderId }) => ({ folderId, shouldAddToFolder: true })
};

const collectingFunction = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget()
});

export default DropTarget(TODOLIST_DRAG_TYPE, dropSpecMethod, collectingFunction)(FolderContent);
