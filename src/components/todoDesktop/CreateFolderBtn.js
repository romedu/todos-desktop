import React from "react";
import { connect } from "react-redux";
import { createUntitledFolder } from "../../store/actions/folder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

const CreateFolderBtn = ({ createNewFolder }) => {
	return (
		<button className="TransparentBtn">
			<FontAwesomeIcon size="4x" icon={faFolderPlus} color="#7fd1b9" onClick={createNewFolder} />
		</button>
	);
};

const mapDispatchToProps = dispatch => ({
	createNewFolder: () => dispatch(createUntitledFolder())
});

export default connect(null, mapDispatchToProps)(CreateFolderBtn);
