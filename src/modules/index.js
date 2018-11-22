import { routerReducer } from 'react-router-redux';
import {
	combineReducers,
} from 'redux-immutable';
import device from './device';
import result from './result';


export default combineReducers({
	device,
	result,
	routing: routerReducer,
});
