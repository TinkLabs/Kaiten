import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './Restaurant/ListItem';

class App extends Component {
	render() {
		return (
			<div className="App">
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
			</div>
		);
	}
}

export default App;
