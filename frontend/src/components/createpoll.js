import React, { Component } from 'react';
import '../styles/stylesheet.css'
import $ from 'jquery';
class CreatePoll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			poll: {
				question: '',
				options: ['',''],
				votes: [0,0]
			},
			response: false,
			response_obj: null,
		}
	}
	Add() {
		var options = this.state.poll.options;
		var votes = this.state.poll.votes
		var new_index = Object.keys(options).length;
		options[new_index] = '';
		votes[new_index] = 0;
		this.setState({
			options,
			votes
		})
	}
	Delete(e,i) {
		e.preventDefault()
		var options = this.state.poll.options;
		var votes = this.state.poll.votes;
		options.splice(i,1);
		votes.splice(i,1);
		this.setState({
			options,
			votes
		})
	}
	Question(e) {
		var question = e.target.value;
		const poll = this.state.poll
		poll['question'] = question
		this.setState({
			poll
		})
	}
	Option(e,key) {
		var option = e.target.value;
		const options = this.state.poll.options;
		options[key] = option;
		this.setState({
			options
		})
	}
	Save() {
		function isEmptyStr(opt,index,arr) {
			return opt == ""
		}
		//checks whether user has entered values in the input fields
		if (this.state.poll.options.some(isEmptyStr) || this.state.poll.question == "") {
			this.setState({
				response: true,
				response_obj: {
					success: false,
					message: "You have to fill out the question and option fields."
				}
			})
		}
		else {
			$.ajax({
				url: '/api/poll-create',
				type: 'POST',
				data: this.state.poll,
				beforeSend: (xhr) => {
	       			xhr.withCredentials = true;
	    		},
				success: (res) => {
					this.setState({
						response: true,
						response_obj: res
					})
				},
				error: (xhr) => {
					alert("Status: "+xhr.status+ ". "+xhr.statusText)
				}
			})
		}
	}
	render() {
		let message = null;
		if (this.state.response) {
			let response_obj = this.state.response_obj
			if (response_obj.success) {
	            message = <div className="alert alert-success">
	                        {response_obj.message} <a href={'/polls/'+response_obj.id}>here</a>
	                       </div>
	       	}
	       	else {
	       		message = <div className="alert alert-danger">
	                        {response_obj.message}
	                      </div>
	       	}
        }
		return (
			<div className="container">
			<h3>Create a Poll</h3>
			<form>
				<textarea className="input" placeholder="Put your question in" value={this.state.poll.question} onChange={(e) => {this.Question(e)}}></textarea>
				{this.state.poll.options.map((obj, i) => 
					<div className="input-group">
						<textarea className="input" placeholder={"Option "+(i+1)} value={this.state.poll.options[i]} onChange={(e) => {this.Option(e,i)}}></textarea>
						<span className="input-group-btn">
							<button className="button small delete create_poll" onClick={(e) => this.Delete(e,i)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
						</span>
					</div>
				)}	
			</form>
			<button className="button small add create_poll" onClick={() => this.Add()}>+</button>
			<button className="button save" onClick={() => this.Save()}>Save Poll</button>
			<div className="message">
			{message}
			</div>
			</div>
			)
	}
}

export default CreatePoll
