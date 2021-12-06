import React from "react";
import axios from "axios";
import { TextField, Button } from '@mui/material'
import { withRouter } from "react-router-dom";

class ResetPassword extends React.Component {

	constructor(props) {
		super(props);
		this.reset_token = this.props.match.params.token;
		this.state = { password: "", secondPassword: "", error: "" };
		this.onSubmit = this.onSubmit.bind(this);

	}

	onSubmit(e) {
		e.preventDefault();
		if (this.state.password !== this.state.secondPassword) {
			this.setState({ error: "Пароли не совпадают" });
		} else {
			axios.patch(`${process.env.REACT_APP_URL}/auth/user`,
				{
					user: {
						password: this.state.password
					},
					reset_token: 'Token ' + this.reset_token
				}
			).then(resp => {
				this.setState({ error: "Пароль успешно поменян" });
			})
		}


	}

	render() {
		return (
			<div style={{
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}>
				<form onSubmit={this.onSubmit}
					style={{
						display: "grid",
						border: "0.5px solid gray",
						borderRadius: 15,
						padding: 35,
						gridRowGap: 10,
					}}>
					<TextField
						name="password" type="password"
						required label="Новый пароль" variant="outlined"
						onChange={(e) => { this.setState({ password: e.target.value }); }} />
					<TextField
						name="secondPassword" type="password"
						required label="Новый пароль" variant="outlined"
						onChange={(e) => { this.setState({ secondPassword: e.target.value }); }} />
					<Button type="submit" variant="contained">
						Сменить пароль
					</Button>
					{this.state.error}
				</form>
			</div>
		);
	}
}

export default withRouter(ResetPassword);