import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Home from './Home';
import { Redirect } from 'react-router-dom';
import Registration from "./Registration";
import ApplicationForm from './ApplicationForm';
import PublicRoute from '../utils/PublicRoute';
import NotFound from './NotFound';
import { getToken, getUser, removeUserSession, setUserSession } from '../utils/Common';
import logo from "../fonts/logo.png"
import ForgetPass from './ForgetPassword';

export default class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = { token: null, isLogined: true };
		this.onLogout = this.onLogout.bind(this);
	}

	async componentDidMount() {
		this.setState({ token: getToken() })
		if (!this.state.token) {
			return;
		}
		let config = {
			headers: {
				Authorization: 'Token ' + this.state.token
			}
		};
		await axios.get(`http://localhost:8000/auth/user`, config).then(response => {
			setUserSession(response.data.user.access_token, response.data.user.refresh_token, response.data.user.username);
			this.setState({ isLogined: true });
		}).catch(error => {
			console.error(error);
			removeUserSession();
		});
	}

	onLogout() {
		removeUserSession();
		window.location.href = '/';
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<div style={{ height: "100%" }}>
						<div className="header">
							<NavLink exact className="justify-start" activeClassName="active" to="/home/dashboard">
								<img src={logo} height="43px" width="68px" alt="logo" /></NavLink>
							<div className="emkk">Электронная маршрутно-квалификационная комиссия</div>
							{!this.state.token &&
								<>
									<NavLink className="link" activeClassName="active" to="/login">Логин</NavLink>
									<NavLink className="link" activeClassName="active" to="/signup">Регистрация</NavLink>
								</>}
							{this.state.token &&
								<>
									<div>{getUser()} </div>
									<Link className="link" style={{ padding: "0 35px" }} onClick={this.onLogout} to="/home/dashboard" >Выйти</Link>
								</>}

						</div>
						<div className="content" style={{ height: "80%" }}>
							<Switch>
								<Route exact path="/" render={() => (
									<Redirect to="/home/dashboard" />
								)} />
								<Route exact path="/home/dashboard" render={(props) => <Home isLogined={this.state.isLogined} {...props} />} />
								<Route exact path="/home/form" render={(props) => <Home isLogined={this.state.isLogined} {...props} />} />
								<PublicRoute path="/reset-password" component={ForgetPass} />
								<PublicRoute path="/home/review" component={Home} />
								<PublicRoute path="/login" component={Login} />
								<PublicRoute path="/signup" component={Registration} />
								<PublicRoute path="/form" component={ApplicationForm} />
								<Route path="*" component={NotFound} />
							</Switch>
						</div>
					</div>
				</BrowserRouter>
			</div>
		);

	}
}
