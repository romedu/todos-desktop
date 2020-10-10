import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

const CreateFolderBtn = props => {
	return (
		<button className="TransparentBtn">
			<FontAwesomeIcon size="6x" icon={faFolderPlus} color="#7fd1b9" onClick={() => {}} />
		</button>
	);
};

export default CreateFolderBtn;
