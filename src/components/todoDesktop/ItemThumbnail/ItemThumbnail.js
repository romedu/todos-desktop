import React from "react";
import "./ItemThumbnail.css";

const ItemThumbnail = ({ name, type, image, description, itemId }) => (
	<li className="itemThumbnail">
		<div className={`${type}Icon`} title={description}>
			{image && <img src={image} alt="" />}
		</div>
		{name}
	</li>
);

export default ItemThumbnail;
