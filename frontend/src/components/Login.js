import React from 'react';
import axios from 'axios';
import { setUserSession } from '../utils/Common';
import OkIcon from '@skbkontur/react-icons/Ok';
import WarningSign from '@skbkontur/react-icons/Warning'
import { Button, Center, Input, Gapped, Link } from '@skbkontur/react-ui';
import validator from 'validator';

export default class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = { login: '', password: '', error: null };
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		axios.post('http://localhost:8000/auth/users/login', { user: { username: this.state.login, password: this.state.password } })
			.then(response => {
				setUserSession(response.data.user.access_token, response.data.user.username);
				this.props.history.push('/dashboard'); // не убирает кнопки login и registration после входа. пофиксить.
			}).catch(err => {
				if (err.response.data.user) this.setState({ error: `Неправильный логин или пароль` });
			});

	}

	render() {
		return (
			<Center style={{ height: '80vh' }}>
				<div style={{ width: '350px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '15px', border: 'solid 1px' }}>
					<Center style={{ height: '91vh' }}>
						<form onSubmit={this.onSubmit}>
							<div>
								<label for="login">Логин</label><br/>
								<Input style={{ width: '240px' }} required type="text" name="login" value={this.state.login} onChange={(e) => this.setState({ login: e.target.value })} />
							</div>
							<div style={{ marginTop: 15 }}>
								<label for="password">Пароль</label><br/>
								<Gapped vertical gap={5}>
									<Input style={{ width: '240px' }} required type="password" name="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
									{this.state.error && <><small style={{ color: 'red' }}><WarningSign />{this.state.error}</small><br /></>}<br />
									<Button style={{ position: 'relative', top: '-30px' }} use='link'>Забыли пароль?</Button>
								</Gapped>
							</div>
							<div>
								<Gapped style={{ position: 'relative', top: '100px' }} gap={15}>
									<Link href="/signup">Зарегистрироваться</Link>
									<Button style={{ width: "99px" }} icon={<OkIcon />} type="submit">Войти</Button>
								</Gapped>
							</div>
						</form>
					</Center>
				</div>
			</Center>

		);
	}
}