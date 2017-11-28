import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

registerServiceWorker();

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App} />
		<Route path='/polls/*' component={App} poll={true}/>
	</Router>
),document.getElementById('root'))