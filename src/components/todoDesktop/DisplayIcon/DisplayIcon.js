import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/Button/Button";
import ButtonGroup from "../../UI/ButtonGroup/ButtonGroup";
import "./DisplayIcon.css";

const DisplayIcon = ({ name, type, image, description, itemId }) => (
	<li className="displayIcon">
		<ButtonGroup groupType="settingsGroup">
			<Button design="settings">
				<FontAwesomeIcon
					size={window.screen.availWidth < 600 ? "2x" : "1x"}
					icon={faTrashAlt}
					color="rgb(91, 146, 130)"
				/>
			</Button>
			<Button design="settings">
				<FontAwesomeIcon
					size={window.screen.availWidth < 600 ? "2x" : "1x"}
					icon={faPencilAlt}
					color="rgb(91, 146, 130)"
				/>
			</Button>
		</ButtonGroup>
		<Link to={`/desktop/${itemId}`}>
			<div className={`${type}Icon`} title={description}>
				<img src={image || ""} alt="" />
			</div>
			{name}
		</Link>
	</li>
);

export default DisplayIcon;
