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
		return null;
	}
	static getDistance(lat, lng) {
		const loc = this.getLocation();
		if (!loc) return null;
		return geolib.getDistance(
			{latitude: loc.lat, longitude: loc.lng},
			{latitude: lat, longitude: lng}
		); // meter
	}
}
