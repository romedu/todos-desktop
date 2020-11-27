import React, { Component } from "react";
import "./ItemForm.module.css";

const defaultItemName = "untitled";

class ItemForm extends Component {
	state = { nameInputValue: defaultItemName };

	componentDidMount() {
		this.nameInput.focus();
	}

	onChangeInputHandler = ({ target }) => this.setState(prevState => ({ ...prevState, nameInputValue: target.value }));

	onSubmitHandler = e => {
		e.preventDefault();

		const { nameInputValue } = this.state;
		const { createHandler } = this.props;

		createHandler(nameInputValue || defaultItemName);
	};

	render() {
		const { nameInputValue } = this.state;

		return (
			<form onSubmit={this.onSubmitHandler}>
				<input
					name="itemName"
					value={nameInputValue}
					className="itemForm"
					ref={input => (this.nameInput = input)}
					onClick={e => e.preventDefault()}
					onChange={this.onChangeInputHandler}
					onFocus={e => e.target.select()}
					onBlur={this.onSubmitHandler}
				/>
			</form>
		);
	}
}

export default ItemForm;
