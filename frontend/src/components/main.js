import React, { Component } from 'react';
import Home from './home'
import Login from './login'
import Signup from './signup'
import Profile from './profile'
import Vote from './vote'

class Main extends Component {
	constructor(props) {
		super(props);
		this.LoginToMain = this.LoginToMain.bind(this);
	}
	LoginToMain(option) {
        this.props.callbackFromApp(option)
    }
	render() {
		let main = null
		if (this.props.NavOpt === 'home') {
        	main = <Home callbackFromMain={this.LoginToMain}/>
        }
		else if (this.props.NavOpt === 'login') {
            main = <Login callbackFromMain={this.LoginToMain}/> 
        }
        else if (this.props.NavOpt === 'signup') {
        	main = <Signup callbackFromMain={this.LoginToMain}/>
        }
        else if (this.props.NavOpt === 'vote') {
        	main = <Vote Id={this.props.ProfileOpt}/>
        }
        else {
        	main = <Profile Opt={this.props.ProfileOpt} callbackFromMain={this.LoginToMain}/>
        }
		return (
			<div className="main">
			{main}
			</div>
			)
	}
}

export default Main