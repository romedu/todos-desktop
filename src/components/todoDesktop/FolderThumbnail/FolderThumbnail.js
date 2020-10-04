import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import { TODOLIST_DRAG_TYPE } from "../../../constants";
import { Link, withRouter } from "react-router-dom";
import "./FolderThumnail.css";

class FolderThumbnail extends Component {
	state = {
		openFolderTimeoutID: null
   };
   
   componentDidUpdate(){
      const {openFolderTimeoutID} = this.state;
      const { isOver, canDrop, history, itemId } = this.props;
      const folderPath = `/desktop/${itemId}`;

      if (isOver && !openFolderTimeoutID) this.setState({ openFolderTimeoutID: setTimeout(() => history.push(folderPath), 600) });
		if (openFolderTimeoutID && (!isOver || !canDrop)) {
			clearTimeout(openFolderTimeoutID);
			this.setState({ openFolderTimeoutID: null });
		}
   }

	render() {
		const { connectDropTarget, isOver, name, description, itemId } = this.props;
		const folderPath = `/desktop/${itemId}`;
		let thumbnailClassName = "folderThumbnail";

      if(isOver) thumbnailClassName = thumbnailClassName.concat(" ", "overFolderThumbnail");

		return (
			<div ref={connectDropTarget}>
				<Link to={folderPath}>
					<li className="itemThumbnail">
						<div className={thumbnailClassName} title={description}></div>
						{name}
					</li>
				</Link>
			</div>
		);
	}
}

const dropSpecMethod = {
	drop: props => ({ folderId: props.itemId })
};

const collectingFunction = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
});

export default DropTarget(TODOLIST_DRAG_TYPE, dropSpecMethod, collectingFunction)(withRouter(FolderThumbnail));
