import React from 'react';
import list from 'api/list';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import { addRestaurants } from 'modules/result';
import Immutable from 'immutable';
import Restaurant from 'records/Restaurant';
import styles from './index.module.scss';


class Controls extends React.Component {
	constructor(props) {
		super(props);
		list().then(({ restaurants }) => {
			this.props.addRestaurants(Immutable.List(restaurants.map(r => new Restaurant(r))));
		});
	}
	render() {
		return (
			<div className={styles.control}>controls</div>
		)
	}
}
const mapStateToProps = state => ({
	lat: state.getIn(['device', 'lat']),
	lng: state.getIn(['device', 'lng']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
	restaurants: state.getIn(['result', 'restaurants'], Immutable.List()),
});

const mapDispatchToProps = dispatch => ({
	addRestaurants: bindActionCreators(addRestaurants, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);