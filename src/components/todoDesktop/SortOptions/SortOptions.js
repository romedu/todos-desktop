import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Options from "../../UI/Options/Options";
import { getQueries, toKebabCase } from "../../../utilities/strings";

class SortOptions extends Component {
	componentDidMount() {
		this.props.setSortingHandler(this.sortParamsHandler());
	}

	componentDidUpdate(prevProps) {
		const { location, setSortingHandler } = this.props,
			{ sort: prevSort } = getQueries(prevProps.location.search),
			{ sort } = getQueries(location.search);

		//CALLING THIS FUNCTION MORE TIMES THAN NEEDED
		if (prevSort !== sort) setSortingHandler(this.sortParamsHandler());
	}

	sortingHandler = e => {
		const { value } = e.target,
			{ history, location } = this.props;
		history.push(`${location.pathname}?sort=${toKebabCase(value)}`);
	};

	sortParamsHandler = () => {
		const { location } = this.props,
			{ sort: sortParam } = getQueries(location.search);

		switch (sortParam) {
			case "unpopularity":
				return {
					property: "__v",
					order: "ascending",
					label: "Unpopularity"
				};
			case "newest-to-oldest":
				return {
					property: "createdAt",
					order: "descending",
					label: "Newest to Oldest"
				};
			case "oldest-to-newest":
				return {
					property: "createdAt",
					order: "ascending",
					label: "Oldest to Newest"
				};
			case "from-a-z":
				return {
					property: "name",
					order: "ascending",
					label: "From A-Z"
				};
			case "from-z-a":
				return {
					property: "name",
					order: "descending",
					label: "From Z-A"
				};
			default:
				return {
					property: "__v",
					order: "descending",
					label: "Popularity"
				};
		}
	};

	render() {
		const { selectedSorting } = this.props,
			sortingLabels = [
				{ name: "Popularity" },
				{ name: "Unpopularity" },
				{ name: "Newest to Oldest" },
				{ name: "Oldest to Newest" },
				{ name: "From A-Z" },
				{ name: "From Z-A" }
			];

		return (
			<Options label="Sort By: " optionList={sortingLabels} selected={selectedSorting} pickOption={this.sortingHandler} />
		);
	}
}

export default withRouter(SortOptions);
