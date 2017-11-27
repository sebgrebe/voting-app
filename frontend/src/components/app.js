import React, { Component } from 'react';
import Navbar from './navbar'
import Main from './main'
import '../styles/stylesheet.css'
import $ from 'jquery';
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: null,
			option: 'home',
			profile: 'mypolls'
		}
		this.MainToApp = this.MainToApp.bind(this)
		this.NavToApp = this.NavToApp.bind(this)
	}
	componentDidMount() {
		//checks whether URL is for a specific poll
		if (this.props.route.poll) {
			this.setState({
				option: 'vote',
				profile: this.props.routeParams.splat
			})
		}
		//check whether user is authenticated
		$.ajax({
			url: '/api/authenticated',
			type: 'GET',
			beforeSend: (xhr) => {
       			xhr.withCredentials = true;
    		},
			success: (res) => {
				this.setState({
					authenticated: res.authenticated
				})
			},
			error: (xhr) => {
				alert("Status: "+xhr.status+ ". "+xhr.statusText)
			}
		})
	}
	NavToApp(option) {
		if (option === 'logout') {
			this.setState({
				authenticated: false,
				option: 'home',
				profile: null
			})
		}
		else if (option === 'home' || option === 'login' || option === 'signup') {
			this.setState({
				option: option
			})
		}
		else {
			this.setState({
				option: 'profile',
				profile: option
			})
		}
	}
	MainToApp(option) {
		if (option === 'profile') {
			this.setState({
				authenticated: true,
				option: 'profile',
				profile: 'mypolls'
			})
		}
		else if (option === 'signup' || option === 'login') {
			this.setState({
				option: option
			})	
		}
	}
	render() {
		return(
			<div>
			<Navbar Auth={this.state.authenticated} callbackFromApp={this.NavToApp} />
			<Main NavOpt={this.state.option} ProfileOpt={this.state.profile} callbackFromApp={this.MainToApp}/>
			</div>
		)
	}
}

export default App