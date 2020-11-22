import React, { Component } from "react";
import "./ItemForm.module.css";

const defaultItemName = "untitled";

class ItemForm extends Component {
	state = { nameInputValue: defaultItemName };

	componentDidMount() {
		this.nameInput.focus();
	}

	onChangeInputHandler = ({ target }) => this.setState(prevState => ({ ...prevState, nameInputValue: target.value }));

	render() {
		const { nameInputValue } = this.state;
		const { createHandler } = this.props;

		return (
			<input
				name="itemName"
				value={nameInputValue}
				className="itemForm"
				ref={input => (this.nameInput = input)}
				onClick={e => e.preventDefault()}
				onChange={this.onChangeInputHandler}
				onFocus={e => e.target.select()}
				onBlur={() => createHandler(nameInputValue || defaultItemName)}
			/>
		);
	}
}

export default ItemForm;
