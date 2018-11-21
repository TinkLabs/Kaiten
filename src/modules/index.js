import { routerReducer } from 'react-router-redux';
import {
	combineReducers,
} from 'redux-immutable';
import device from './device';
import active from './active';
import result from './result';


export default combineReducers({
	device,
	active,
	result,
	routing: routerReducer,
});
