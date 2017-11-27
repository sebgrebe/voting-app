import React, { Component } from 'react';
import $ from 'jquery';
import {withRouter} from 'react-router-dom'
import '../styles/stylesheet.css';
class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: {
				'username': '',
				'password': ''
			},
			failure: false,
			message: null
		};
		this.Signup = this.Signup.bind(this)
	}
	Click(option) {
        this.props.callbackFromMain(option);
    }
	EditUser(e) {
			var input = this.state.input
			input.username = e.target.value
			this.setState({
				input: input
			});
		}
	EditPassword(e) {
		var input = this.state.input
			input.password = e.target.value
			this.setState({
				input: input
			});
	}
	Signup(e){
		e.preventDefault();
		$.ajax({
			type: 'post',
			url: '/api/signup',
			data: this.state.input,
			success: (res) => {
				if (res.success) {
					this.props.callbackFromMain('profile')
				}
				else {
					this.setState({
						failure: true,
						message: res.message
					})
				}
			},
			error: (xhr) => {
				alert("Status: "+xhr.status+ ". "+xhr.statusText)
			}
		})
	}
	render() {
		let warning = null
		if (this.state.failure) {
			warning = <div class="alert alert-danger">{this.state.message}</div>
		}
		return (
			<div className="container">
			<h3>Signup</h3>
			<form className="form">
				<div className="input-group">
					<input placeholder="Username" value={this.state.input.username} onChange={(e) => this.EditUser(e)}></input>
					<input type="password" placeholder="Password" value={this.state.input.password} onChange={(e) => this.EditPassword(e)}></input>
				</div>
				{warning}
				<div className="row">
					<button className="button submit" onClick={(e) => this.Signup(e)}>Signup</button>
				</div>	
                <div className="account_alt">Already have an account?<a className="link" onClick={() => this.Click('login')}> Log in.</a></div>
			</form>
			</div>
			)
	}
}

export default Signup