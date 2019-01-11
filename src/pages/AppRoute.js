import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LocaleContext } from "./locale-context";
import { hotjar } from 'react-hotjar';

import MapView from './MapView';
import ListView from './ListView';
import Controls from './Controls';
import Nav from './Nav';
import DetailPage from './DetailPage';
import Mixpanel from 'utils/Mixpanel';

import { Highlight } from 'components';

import styles from './index.module.scss';

const propTypes = {
};

const defaultProps = {
};

class App extends Component {
	constructor(props) {
		super(props);
		const locale = new URLSearchParams(window.location.search).get('locale');

		this.state = {
			locale: locale || 'en_US',
		};
		hotjar.initialize(1154544, 6);
		Mixpanel().track('Restaurants Start App');

	}
	render() {
		return (
			<LocaleContext.Provider value={this.state.locale}>
				<div className={styles.app}>
					<div className={styles.header}>
						<Nav />
						<Controls />
					</div>
					<div className={styles.content} id="main">
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
							<Route
								exact
								path="/restaurants/:id"
								component={DetailPage}
							/>
						</Switch>
					</div>
				</div>
			</LocaleContext.Provider>
		);
	}
}
App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
