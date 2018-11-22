import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Immutable from 'immutable';
import RestaurantListItem from './components/Restaurant';


function ListView ({ restaurants, history }) {
	return restaurants.map(r => (
		<RestaurantListItem
			restaurant={r}
			onClick={() => {
				history.push(`/restaurants/${r.get('id')}`);
			}}
		/>
	));
}
const mapStateToProps = state => ({
	lat: state.getIn(['device', 'lat']),
	lng: state.getIn(['device', 'lng']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
	restaurants: state.getIn(['result', 'restaurants'], Immutable.List()),
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListView));
