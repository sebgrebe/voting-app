import React, { Component } from 'react';
import $ from 'jquery';
import VotesChart from './chart.js';
import '../styles/stylesheet.css';

class Vote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			add: null,
			add_btn: null,
			authenticated: null,
			display_chart: null,
			display_message: null,
			new_option: "",
			poll_exists: true,
			poll: {
				id: "",
				question: "",
				options: [],
				votes: []
			},
			response: "",
			response_obj: {}
		}
		this.Add = this.Add.bind(this)
		this.CheckVote = this.CheckVote.bind(this)
		this.Delete = this.Delete.bind(this)
		this.GetPoll = this.GetPoll.bind(this)
		this.NewOption = this.NewOption.bind(this)
		this.Save = this.Save.bind(this)
		this.Vote = this.Vote.bind(this)	
	}
	Add(e) {
		e.preventDefault()
		this.setState({
			add: true,
			add_btn: false,
		})
	}
	CheckVote() {
		//checks whether user has voted already.
		var poll_id = this.props.Id;
		$.ajax({
			url: '/api/check-vote',
			type: 'GET',
			data: {
				poll_id: poll_id
			},
			beforeSend: (xhr) => {
       			xhr.withCredentials = true;
    		},
			success: (res) => {
				this.setState({
					display_chart: res.voted
				})
			},
			error: (xhr) => {
				alert("Status: "+xhr.status+ ". "+xhr.statusText)
			}
		})
	}
	componentDidMount() {
		//check whether user is authenticated
		$.ajax({
			url: '/api/authenticated',
			type: 'GET',
			beforeSend: (xhr) => {
       			xhr.withCredentials = true;
    		},
			success: (res) => {
				this.setState({
					authenticated: res.authenticated,
					add_btn: true
				})
			},
			error: (xhr) => {
				alert("Status: "+xhr.status+ ". "+xhr.statusText)
			}
		})
		this.GetPoll()
		this.CheckVote()
	}
	Delete(e) {
		e.preventDefault()
		this.setState({
			add: false,
			add_btn: true,
			new_option: "",
		})
	}
	GetPoll(){
		var poll_id = this.props.Id;
		$.ajax({
			url: '/api/polls',
			type: 'GET',
			data: {
				poll_id: poll_id
			},
			beforeSend: (xhr) => {
       			xhr.withCredentials = true;
    		},
			success: (res) => {
				if (res.success) {
					var poll = this.state.poll;
					poll.question = res.poll.question;
					poll.options = res.poll.options;
					poll.id = poll_id;
					var votes = res.poll.votes;
					for (var i=0; i < votes.length; i++) {
						votes[i] = parseInt(votes[i])
					}
					poll.votes = votes
					this.setState({
						poll,
						poll_exists: true
					})
				}
				else {
					this.setState({
						poll_exists: false,
					})
				}	
			},
			error: (xhr) => {
				alert("Status: "+xhr.status+ ". "+xhr.statusText)
			}
		})
	}
	NewOption(e,key) {
		var input = e.target.value;
		var new_option = this.state.new_option;
		new_option = input;
		this.setState({
			new_option
		})
	}
	Save(e) {
		e.preventDefault()
		//checks whether user has entered values in the input fields
		if (this.state.new_option === "") {
		}
		else {
			var poll = this.state.poll;
			poll.options[poll.options.length] = this.state.new_option;
			poll.votes.push('0')
			this.setState({
				add: false,
				add_btn: true,
				poll,
				new_option: "",
			})
		}
	}
	Vote(e,i) {
		e.preventDefault()
		var poll = this.state.poll;
		poll.votes[i] = poll.votes[i] + 1; 
		this.setState({
			poll
		})
		$.ajax({
			url: '/api/poll-vote',
			type: 'POST',
			data: this.state.poll,
			beforeSend: (xhr) => {
       			xhr.withCredentials = true;
    		},
			success: (res) => {
				this.setState({
					add_btn: false,
					display_chart: true,
					display_message: true,
					response: true,
					response_obj: res
				})
				this.GetPoll()
			},
			error: (xhr) => {
				this.setState({
					display_chart: true
				})
				alert("Status: "+xhr.status+ ". "+xhr.statusText)
			}
		})
	}
	render() {
		let message = null;
		let chart = null;
		let add_btn = null;
		let new_option = null;
		if (this.state.display_chart) {
			chart = <div>
					<h3>Results</h3>
					<VotesChart Poll={this.state.poll} />
					</div>
		}
		if (this.state.add_btn) {
			add_btn = <button className="button small add" onClick={(e) => this.Add(e)}>+</button>
		}
		//Add further voting option (only if authenticated user)
		if (this.state.add) {
			new_option = <div>
				<textarea className="input add_input" placeholder={"Add an option"} value={this.state.new_option} onChange={(e) => {this.NewOption(e)}}></textarea>
				<div className="input add_input">
				<button className="button small delete" onClick={(e) => this.Delete(e)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
				<button className="button save_vote" onClick={(e) => this.Save(e)}>Save</button>
				</div>
				</div>
		}
		//Alerts after vote
		if (this.state.response) {
			let response_obj = this.state.response_obj
			if (this.state.display_message && $("#alert").length > 0) {
				$('#alert').removeClass('in')
				//alert animation
				window.setTimeout(function() {$('#alert').addClass('in')}, 100)
			}
			if (response_obj.success) {
	            message = <div id='alert' className="alert alert-success fade message">
	                        <p>{response_obj.message}</p> 
	                      </div>;
	            //alert animation
	            window.setTimeout(function() {$('#alert').addClass('in')}, 400)
	       	}
	    	else {
	       		message = <div id='alert' className="alert alert-danger fade message">
	                        {response_obj.message}
	                      </div>;
	            //alert animation
	            window.setTimeout(function() {$('#alert').addClass('in')}, 400)
	       	}
	    }
	    //Alert if poll ID doesn't exist
	    if (this.state.poll_exists === false) {
	    	return(
		    		<div className="alert alert-danger message">
		    			No poll with this ID exists.
		    		</div>
	    		)
	    }
	    else {
			return(
				<div>
					<div className="col-sm-6 col-xs-12">
						<h3>{this.state.poll.question}</h3>
						<form className="container vote">
							{this.state.poll.options.map((option, i) => 
								<button className="button vote" onClick={(e) => this.Vote(e,i)} >{option}</button>		
							)}
						{add_btn}
						{new_option}
						</form>			
						<div className="message">
						{message}
						</div>
					</div>
					<div className="col-sm-6 col-xs-12">
						<div className="col-xs-10 col-xs-offset-1 col-sm-12">
						{chart}
						</div>
					</div>
				</div>
			)
		}
	}
}

export default Vote