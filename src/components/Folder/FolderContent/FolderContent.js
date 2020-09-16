import React from "react";
import ItemsList from "../../todoDesktop/ItemsList/ItemsList";

const FolderContent = ({ files, folderName }) => {
	const content = files.length ? <ItemsList items={files} /> : <h4> The folder is empty </h4>;

	return (
		<div>
			<h2>{folderName}</h2>
			<div>{content}</div>
		</div>
	);
};

export default FolderContent;
