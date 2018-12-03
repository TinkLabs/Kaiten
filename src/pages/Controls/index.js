import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import { fetchRestaurants } from 'modules/result';
import Immutable from 'immutable';
import styles from './index.module.scss';


class Controls extends React.Component {
	constructor(props) {
		super(props);
		if (props.lat && props.lng) {
			props.fetchRestaurants(props.lat, props.lng);
		}
	}
	componentWillUpdate(nextProps, nextState) {
		if ((!this.props.lat || !this.props.lng) && nextProps.lat && nextProps.lng) {
			nextProps.fetchRestaurants(nextProps.lat, nextProps.lng);
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
	fetchRestaurants: bindActionCreators(fetchRestaurants, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);