import React, { Component } from 'react';
import '../styles/stylesheet.css';
import $ from 'jquery';
class Mypolls extends Component {
	constructor(props) {
		super(props);
		this.state = {
			polls: null
		}
		this.GetPolls = this.GetPolls.bind(this)
	}
	componentDidMount() {
		this.GetPolls()
	}
	Delete(e,poll_id) {
		e.preventDefault()
		console.log(poll_id)
		$.ajax({
			url: '/api/poll-delete',
			type: 'POST',
			data: {
				'poll_id': poll_id
			},
			beforeSend: (xhr) => {
       			xhr.withCredentials = true;
    		},
			success: (res) => {
				console.log(res)
				this.GetPolls()
			},
			error: (xhr) => {
				alert("Status: "+xhr.status+ ". "+xhr.statusText)
			}
		})
	}
	GetPolls() {
		$.ajax({
			url: '/api/poll-list',
			type: 'GET',
			data: {
				'poll_owner': 'user'
			},
			beforeSend: (xhr) => {
       			xhr.withCredentials = true;
    		},
			success: (res) => {
				this.setState({
					polls: res
				})
			},
			error: (xhr) => {
				alert("Status: "+xhr.status+ ". "+xhr.statusText)
			}
		})
	}
	render() {
		if (this.state.polls !== null) {
			return (
				<div>
				<h3>My Polls</h3>
				<div className="container">
					{this.state.polls.map((poll) => 
						<div className="row">
						<a className="no_link_effect" href={'/polls/'+poll['_id']}>
						<button className="button poll">
							{poll.question}
						</button>
						</a>
						<button className="button small delete" onClick={(e) => this.Delete(e,poll._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>		
						</div>
					)}	
				</div>
				</div>
				)
		}
		else {
			return null
		}
	}
}

export default Mypolls