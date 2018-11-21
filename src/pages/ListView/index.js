import React, { Component } from 'react';
import { connect } from 'react-redux';
import list from 'api/list';
import Immutable from 'immutable';
import Restaurant from 'records/Restaurant';
import RestaurantListItem from './components/RestaurantListItem';


class ListView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: Immutable.List(),
		};
		list().then(({ restaurants }) => {
			this.setState({
				restaurants: Immutable.List(restaurants.map(r => new Restaurant(r))),
			})
		})
	}
	render() {
		return this.props.restaurants.map(r => <RestaurantListItem restaurant={r} />);
	}
}
const mapStateToProps = state => ({
	lat: state.getIn(['device', 'lat']),
	lng: state.getIn(['device', 'lng']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
	restaurants: state.getIn(['result', 'restaurants'], Immutable.List()),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
