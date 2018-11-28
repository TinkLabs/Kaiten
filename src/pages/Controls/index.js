import React from 'react';
import list from 'api/list';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import { initRestaurants } from 'modules/result';
import Immutable from 'immutable';
import Restaurant from 'records/Restaurant';
import styles from './index.module.scss';


class Controls extends React.Component {
	constructor(props) {
		super(props);
		list().then(({ restaurants }) => {
			this.props.initRestaurants(Immutable.List(restaurants.map(r => new Restaurant(r, props.hotel_id))), this.props.lat, this.props.lng);
		});
	}
	componentWillUpdate(nextProps, nextState) {
		console.log(this.props.lat, nextProps.lat);
		if (!this.props.lat && nextProps.lat) {
			nextProps.initRestaurants(this.props.restaurants, nextProps.lat, nextProps.lng);
		}
	}
	render() {
		return null;
	}
}
const mapStateToProps = state => ({
	lat: state.getIn(['device', 'lat']),
	lng: state.getIn(['device', 'lng']),
	hotel_id: state.getIn(['device', 'hotel_id']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
	restaurants: state.getIn(['result', 'restaurants'], Immutable.List()),
});

const mapDispatchToProps = dispatch => ({
	initRestaurants: bindActionCreators(initRestaurants, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);