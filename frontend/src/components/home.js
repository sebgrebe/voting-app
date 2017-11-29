import React, { Component } from 'react';
import $ from 'jquery';
import '../styles/stylesheet.css'
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			polls: []
		}
	}
	componentDidMount(){
		$.ajax({
			url: '/api/poll-list',
			type: 'GET',
			data: {
				'poll_owner': 'all'
			},
			beforeSend: (xhr) => {
       			xhr.withCredentials = true;
    		},
			success: (res) => {
				console.log(res)
				this.setState({
					polls: res
				})
			},
			error: (xhr) => {
				//handles timeout error
				if (xhr.status === 0) {
                	window.location.reload(); 
				}
				else {alert("Status: "+xhr.status+ ". "+xhr.statusText)}
			}
		})
	}
	Click(option) {
		this.props.callbackFromMain(option);
	}
	render() {
		if (this.state.polls.length > 0) {
			return(
				<div>
					<h1>Voting App</h1>
					<div className="description">
					<p>To create your own poll, <a className="link" onClick={() => this.Click('signup')}>sign up.</a></p> 
					<p>Or vote in one of the existing polls below.</p> 
					</div>
					<h4 className="home">Polls created by other users</h4>
					<div className="container">
					{this.state.polls.map((poll) => 
						<a className="no_link_effect" href={'/polls/'+poll['_id']}>
							<button className="button poll home">
								{poll.question}
							</button>		
						</a>
					)}	
					</div>
				</div>
				)
		}
		else {
			return( 
				<div className="Loading">Loading...</div>
				)
		}
	}
}

export default Home