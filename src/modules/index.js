import { routerReducer } from 'react-router-redux';
import {
	combineReducers,
} from 'redux-immutable';
import device from './device';


export default combineReducers({
	device,
	routing: routerReducer,
});
