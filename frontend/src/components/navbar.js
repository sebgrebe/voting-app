import React, { Component } from 'react';
import styles from '../styles/stylesheet.css'
import $ from 'jquery';
class Navbar extends Component {
	constructor(props) {
		super(props);
		this.Logout = this.Logout.bind(this)
		this.Click = this.Click.bind(this)
	}
	Click(option) {
		if (option === 'logout') {this.Logout()}
		else {
			this.props.callbackFromApp(option);
		}
	}
	Logout() {
		// e.preventDefault();
        $.ajax({
            method: 'get',
            url: '/api/logout',
            success: () => {
            	console.log('logout success')
            	this.props.callbackFromApp('logout')
            },
			error: (xhr) => {
				alert("Status: "+xhr.status+ ". "+xhr.statusText)
			}
        })
	}
	render() {
		if (this.props.Auth) {
			var navbar = 
			<ul className="nav navbar-nav navbar-right navbar-collapse">
				<li><div className="button nav" onClick={() => this.Click('mypolls')}>My polls</div></li>
				<li><div className="button nav"  onClick={() => this.Click('createpoll')}>Create poll</div></li>
				<li><div className="button nav last"  onClick={() => this.Click('logout')}>Logout</div></li>
			</ul>	
		}
		else {
			var navbar = 
			<ul className="nav navbar-nav navbar-right navbar-collapse">
				<li><div className="button nav" onClick={() => this.Click('login')}>Login</div></li>
				<li><div className="button nav last" onClick={() => this.Click('signup')}>Signup</div></li>
			</ul>		
		}
		return (
		<nav className="navbar navbar-default navbar-fixed-top">
			<div className="navbar-header">
				<button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
			data-target="#navbar-collapse" aria-expanded="false">
					<span className="icon-bar"></span>
          			<span className="icon-bar"></span>
          			<span className="icon-bar"></span>
				</button>
				<div className="button nav" onClick={() => this.Click('home')}><a className="no_link_effect" href='/'>Home</a></div>
			</div>
			<div className="collapse navbar-collapse" id="navbar-collapse">
				{navbar}
			</div>
		</nav>
	)}
}

export default Navbar