import React, { Component } from 'react';
import ListItem from 'components/Restaurant/ListItem';
import MapItem from 'components/Restaurant/MapItem';
import Dropdown from 'components/Dropdown';


class App extends Component {
	render() {
		return (
			<div className="App">
				<Dropdown />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<ListItem />
				<MapItem />
			</div>
		);
	}
}

export default App;
