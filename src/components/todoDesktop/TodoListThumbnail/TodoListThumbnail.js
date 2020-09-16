import React, { Fragment } from "react";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail";

const TodoListThumbnail = props => (
	<Fragment>
		<ItemThumbnail type="todo" {...props} />
	</Fragment>
);

export default TodoListThumbnail;
