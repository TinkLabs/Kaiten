import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MapView from './MapView';
import ListView from './ListView';
import Controls from './Controls';
import Nav from './Nav';
import styles from './index.module.scss';

const propTypes = {
};

const defaultProps = {
};

class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={styles.app}>
				<div className={styles.header}>
					<Nav />
					<Controls />
				</div>
				<div className={styles.content}>
					<Switch>
						<Route
							exact
							path="/"
							component={ListView}
						/>
						<Route
							exact
							path="/map"
							component={MapView}
						/>
					</Switch>
				</div>
			</div>
		);
	}
}
App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
