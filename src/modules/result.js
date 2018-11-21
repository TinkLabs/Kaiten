import Immutable from 'immutable';

export const RESET = 'RESET';
export const ADD_RESTAURANTS = 'ADD_RESTAURANTS';

const initialState = Immutable.Map({
	restaurants: Immutable.List(),
});

export default (state = initialState, action) => {
	switch (action.type) {
		case RESET:
			return initialState;
		case ADD_RESTAURANTS:
			return state.set('restaurants', action.restaurants);
		default:
			return state;
	}
};

export const addRestaurants = restaurants => (dispatch) => {
	dispatch({
		type: ADD_RESTAURANTS,
		restaurants,
	});
};
