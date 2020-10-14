import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileMedical } from "@fortawesome/free-solid-svg-icons";

const CreateTodoListBtn = props => {
	return (
		<button className="TransparentBtn">
			<FontAwesomeIcon size="4x" icon={faFileMedical} color="#cfbae1" onClick={() => {}} />
		</button>
	);
};

export default CreateTodoListBtn;
