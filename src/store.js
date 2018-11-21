import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'modules';

export const history = createHistory();

let initialState = Immutable.Map();
const enhancers = [];
const middleware = [
	thunk,
	routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
	const { devToolsExtension } = window;
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}
}

const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers,
);
const store = createStore(
	rootReducer,
	initialState,
	composedEnhancers,
);
navigator.geolocation.getCurrentPosition((position) => {
	store.dispatch({
		type: 'UPDATE_LAT_LNG',
		lat: position.coords.latitude,
		lng: position.coords.longitude,
	});
}, (err) => {
	alert(JSON.stringify(err));
});
navigator.geolocation.watchPosition((position) => {
	console.log(position);
	store.dispatch({
		type: 'UPDATE_LAT_LNG',
		lat: position.coords.latitude,
		lng: position.coords.longitude,
	});
});
window.store = store;
export default store;
