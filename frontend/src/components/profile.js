import React, { Component } from 'react';
import MyPolls from './mypolls'
import CreatePoll from './createpoll'
import Login from './login'
class Profile extends Component {
	constructor(props) {
		super(props);
    }
	render() {
        let profile_view = null;
        if (this.props.Opt === 'mypolls' || this.props.ProfileOpt === null) {
            profile_view = <MyPolls /> 
        }
        else if (this.props.Opt === 'createpoll') {
            profile_view = <CreatePoll />    
        }
        else if (this.props.Opt === 'login') {
            profile_view = <Login />    
        }
        return (
    			<div>
                    <div className="main">
                    {profile_view}
                    </div>
    			</div>
                    
    			)
	}
}

export default Profile