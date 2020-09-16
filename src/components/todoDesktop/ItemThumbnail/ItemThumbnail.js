import React from "react";
import { Link } from "react-router-dom";
import "./ItemThumbnail.css";

const ItemThumbnail = ({ name, type, image, description, itemId }) => (
	<li className="itemThumbnail">
		<Link to={`/desktop/${itemId}`}>
			<div className={`${type}Icon`} title={description}>
				{image && <img src={image} alt="" />}
			</div>
			{name}
		</Link>
	</li>
);

export default ItemThumbnail;
