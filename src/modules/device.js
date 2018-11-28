import Immutable from 'immutable';
import Android from 'utils/Android';

export const RESET = 'RESET';
export const UPDATE_LAT_LNG = 'UPDATE_LAT_LNG';

const initialState = Immutable.Map({
	lat: Android().latitude || null,
	lng: Android().longitude || null,
	locationEnabled: !!Android().latitude || false,
	hotel_id: Android().hotel_id,
});

export default (state = initialState, action) => {
	switch (action.type) {
		case RESET:
			return initialState;
		case UPDATE_LAT_LNG: {
			if (!action.lat || !action.lng) {
				return initialState;
			}
			return Immutable.Map({
				lat: action.lat,
				lng: action.lng,
				locationEnabled: true,
			});
		}
		default:
			return state;
	}
};
