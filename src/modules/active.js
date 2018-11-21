import Immutable from 'immutable';

export const RESET = 'RESET';
export const UPDATE_ACTIVE_ID = 'UPDATE_ACTIVE_ID';
export const SHOW_DIRECTION = 'SHOW_DIRECTION';
export const HIDE_DIRECTION = 'HIDE_DIRECTION';


const initialState = Immutable.Map({
	id: 1,
	show_direction: false,
});

export default (state = initialState, action) => {
	switch (action.type) {
		case RESET:
			return initialState;
		case UPDATE_ACTIVE_ID:
			return state.set('id', action.id);
		case SHOW_DIRECTION:
			return state.set('show_direction', true);
		case HIDE_DIRECTION:
			return state.set('show_direction', false);
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
		type: SHOW_DIRECTION,
	});
};
export const hideDirection = () => (dispatch) => {
	dispatch({
		type: HIDE_DIRECTION,
	});
};
