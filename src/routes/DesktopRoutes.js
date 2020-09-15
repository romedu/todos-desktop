import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Folder from "../containers/Folder/Folder";
import Desktop from "../containers/Desktop/Desktop";

const DesktopRoutes = () => (
	<Fragment>
		<Route path="/desktop" component={Desktop} />
		<Route path="/desktop/:id" component={Folder} />
	</Fragment>
);

export default DesktopRoutes;
