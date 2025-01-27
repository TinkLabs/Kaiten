import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Android from 'utils/Android';
import { LocaleContext } from "./locale-context";

import MapView from './MapView';
import ListView from './ListView';
import Controls from './Controls';
import DetailPage from './DetailPage';
import Mixpanel from 'utils/Mixpanel';

import FullStory, { FullStoryAPI } from 'react-fullstory';

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
		Mixpanel().track('Restaurants Start App');
		FullStoryAPI('identify', Android().device_user_id, {
			hotel: Android().service_counter,
			room_id: Android().room_id,
			imei: Android().imei,
		});
	}
	render() {
		return (
			<LocaleContext.Provider value={this.state.locale}>
				<FullStory org="HSAXJ" />
				<div className={styles.app}>
					<div className={styles.header}>
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
