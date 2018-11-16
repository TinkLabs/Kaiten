import React, { Component } from 'react';
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
