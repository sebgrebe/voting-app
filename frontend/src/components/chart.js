import React, { Component } from 'react';
import Pie from 'react-chartjs-2'
import '../styles/stylesheet.css'

class VotesChart extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		var poll = this.props.Poll;
		const colors = ['#e6194b','#3cb44b','#ffe119','#0082c8','#f58231','#911eb4','#46f0f0','#f032e6','#d2f53c','#fabebe','#008080','#e6beff','#aa6e28','#fffac8']
		const data = {
  			labels: poll.options,
  			datasets: [{
  				data: poll.votes,
  				backgroundColor: colors
    		}]
    	};
		return(
			<div className="pie">
			<Pie data={data} height={100} width={100}/>
			</div>
			)
	}
}

export default VotesChart