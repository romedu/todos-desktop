import React from "react";
import { connect } from "react-redux";
import ItemForm from "./ItemForm/ItemForm";
import { createFolder } from "../../store/actions/folder";

const NewFolderForm = ({ onFolderCreate }) => <ItemForm createHandler={onFolderCreate} />;

const mapDispatchToProps = dispatch => ({
	onFolderCreate: folderName => dispatch(createFolder({ name: folderName }))
});

export default connect(null, mapDispatchToProps)(NewFolderForm);
