import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import FolderContent from "../../components/Folder/FolderContent/FolderContent";
import FolderBackdrop from "../../components/Folder/FolderBackdrop";
import Loader from "../../components/UI/Loader/Loader";
import { openFolder, closeFolder } from "../../store/actions/folder";
import "./Folder.css";

class Folder extends Component {
	state = {
		isLoading: true
	};

	componentDidMount() {
		const { match, onFolderOpen } = this.props;
		const folderId = match.params.id;

		onFolderOpen(folderId);
	}

	componentDidUpdate(prevState) {
		const { currentFolder } = this.props;
		if (!prevState.currentFolder && currentFolder) this.setState({ isLoading: false });
	}

	clearFolderHandler = () => {
		const { history, onFolderClose } = this.props;
		history.goBack();
		onFolderClose();
	};

	render() {
		const { isLoading } = this.state;
		const { currentFolder } = this.props;
		const shouldShowLoader = isLoading || !currentFolder;
		const content = shouldShowLoader ? (
			<Loader />
		) : (
			<FolderContent folderName={currentFolder.name} files={currentFolder.files} />
		);

		return (
			<Fragment>
				<FolderBackdrop closeHandler={this.clearFolderHandler} />
				<div className="Folder FolderBorder"></div>
				<div className="Folder FolderInside"> {content} </div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({ currentFolder: state.folder.current });
const mapDispatchToProps = dispatch => ({
	onFolderOpen: folderId => dispatch(openFolder(folderId)),
	onFolderClose: () => dispatch(closeFolder())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Folder));
