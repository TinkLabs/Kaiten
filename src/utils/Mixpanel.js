import mixpanel from 'mixpanel-browser';
import Android from './Android';
import store from 'store';

window.mixpanel = mixpanel;

export default () => {
	mixpanel.init('6c29862add298fba05d9fd796a51e441');
	// '6c29862add298fba05d9fd796a51e441'
	mixpanel.register({
		...Android(),
		Domain: window.location.hostname,
		section: 'handy Restaurants',
		// imei: ,
		latitude: store.getState().getIn(['device', 'lat']),
		longitude: store.getState().getIn(['device', 'lng']),
		// location_accuracy: ,
		// rom_version: ,
		// application_id: ,
		// status: ,
		// previous_screen_name: ,
		// member_id: ,
		deploy_environment: 'development',
		timestamp_utc: Date.now(),
		// session_id: ,
		// event_type: ,
		// inside_hotel: ,
	});
	return mixpanel;
};

