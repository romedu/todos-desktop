import React, { Fragment } from "react";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail";

const FolderThumbnail = props => (
	<Fragment>
		<ItemThumbnail type="folder" {...props} />
	</Fragment>
);

export default FolderThumbnail;
