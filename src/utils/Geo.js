import geolib from 'geolib';
import Android from './Android';


export default class {
	static getLocation () {
		if (Android().latitude && Android().longitude) {
			return {
				lat: Android().latitude,
				lng: Android().longitude,
			};
		} else if (localStorage.getItem('lat') && localStorage.getItem('lng')) {
			return {
				lat: parseFloat(localStorage.getItem('lat')),
				lng: parseFloat(localStorage.getItem('lng')),
			};
		}
		return { lat: null, lng: null };
	}
	static getDistance(lat1, lng1, lat2, lng2) {
		if (!lat1 || !lng1) return null;
		return geolib.getDistance(
			{latitude: lat1, longitude: lng1},
			{latitude: lat2, longitude: lng2}
		); // meter
	}
}
