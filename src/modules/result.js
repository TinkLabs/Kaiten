import Immutable from 'immutable';
export const RESET = 'RESET';
export const INIT_RESTAURANTS = 'INIT_RESTAURANTS';
export const ADD_RESTAURANTS = 'ADD_RESTAURANTS';
export const UPDATE_ACTIVE_ID = 'UPDATE_ACTIVE_ID';
export const UPDATE_DIRECTION = 'UPDATE_DIRECTION';


const initialState = Immutable.Map({
	restaurants: Immutable.List(),
	restaurantIds: Immutable.List(),
	id: 1,
	show_direction: false,
});

export default (state = initialState, action) => {
	switch (action.type) {
		case RESET:
			return initialState;
		case INIT_RESTAURANTS:
			return state
				.set('restaurants', action.restaurants)
				.set('restaurantIds', action.restaurants.map(r => r.get('id')));
		case ADD_RESTAURANTS:
			// exclude duplication
			const filteredRestaurant = action.restaurants
				.filter(r => !state.get('restaurantIds').includes(r.get('id')));
			return state
				.update('restaurants', list => list.push(filteredRestaurant))
				.update('restaurantIds', list => list.push(filteredRestaurant.map(r => r.get('id'))));
		case UPDATE_ACTIVE_ID:
			return state.set('id', action.id);
		case UPDATE_DIRECTION:
			return state.set('show_direction', action.value);
		default:
			return state;
	}
};

export const initRestaurants = (restaurants, currentLat, currentLng) => (dispatch) => {
	dispatch({
		type: INIT_RESTAURANTS,
		restaurants: restaurants.sort((a, b) => a.compareTo(b)),
	});
};
export const addRestaurants = (restaurants, currentLat, currentLng) => (dispatch) => {
	dispatch({
		type: ADD_RESTAURANTS,
		restaurants: restaurants.sort((a, b) => a.compareTo(b)),
	});
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
