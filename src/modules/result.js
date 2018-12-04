import Immutable from 'immutable';
import list from 'api/list';
import restaurant from 'api/restaurant';

export const RESET = 'RESET';
export const INIT_RESTAURANTS = 'INIT_RESTAURANTS';
export const ADD_RESTAURANTS = 'ADD_RESTAURANTS';
export const UPDATE_ACTIVE_ID = 'UPDATE_ACTIVE_ID';
export const UPDATE_DIRECTION = 'UPDATE_DIRECTION';
export const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT';
export const UPDATE_RESULT_LAT_LNG = 'UPDATE_RESULT_LAT_LNG';


const initialState = Immutable.Map({
	restaurants: Immutable.OrderedMap(),
	id: 1,
	show_direction: false,
	lat: null,
	lng: null,
});

export default (state = initialState, action) => {
	switch (action.type) {
		case RESET:
			return initialState;
		case INIT_RESTAURANTS:
			return state.set('restaurants', action.restaurants);
		case ADD_RESTAURANTS:
			// exclude duplication
			const filteredRestaurant = action.restaurants
				.filter(r => !state.get('restaurants').keySeq().includes(r.get('id')));
			return state
				.update('restaurants', map => map.concat(filteredRestaurant));
		case UPDATE_RESTAURANT:
			return state
				.update('restaurants', map => map.set(action.id, action.restaurant));
		case UPDATE_ACTIVE_ID:
			return state.set('id', action.id);
		case UPDATE_DIRECTION:
			return state.set('show_direction', action.value);
		case UPDATE_RESULT_LAT_LNG:
			return state.set('lat', action.lat).set('lng', action.lng);
		default:
			return state;
	}
};

export const updateActiveID = id => (dispatch) => {
	dispatch({
		type: UPDATE_ACTIVE_ID,
		id,
	});
};
export const showDirection = () => (dispatch) => {
	dispatch({
		type: UPDATE_DIRECTION,
		value: true,
	});
};
export const hideDirection = () => (dispatch) => {
	dispatch({
		type: UPDATE_DIRECTION,
		value: false,
	});
};
export const fetchRestaurants = (currentLat, currentLng) => (dispatch) => {
	list(currentLat, currentLng)
		.then((restaurants) => {
			const r = restaurants.sort((a, b) => a.compareTo(b, currentLat, currentLng));
			dispatch({
				type: INIT_RESTAURANTS,
				restaurants: r,
			});
			dispatch({
				type: UPDATE_ACTIVE_ID,
				id: r.valueSeq().getIn([0, 'id']),
			});
			dispatch({
				type: UPDATE_RESULT_LAT_LNG,
				lat: currentLat,
				lng: currentLng,
			});
		});
};
export const fetchRestaurant = (id) => (dispatch) => {
	restaurant(id)
		.then((restaurant) => {
			dispatch({
				type: UPDATE_RESTAURANT,
				id: restaurant.get('id'),
				restaurant,
			});
		});
};