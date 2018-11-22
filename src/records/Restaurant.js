import { Record, List } from 'immutable';
import Geo from 'utils/Geo';


export default class Restaurant extends Record({
	id: null,
	name: '',
	address: '',
	category: null,
	area: '',
	hotel_id: null,
	staff_like_count: 0,
	cover_image: null,
	images: List(),
	lat: null,
	lng: null,
	in_hotel: false,
	html: '',
	tel: null,
	idd: null,
	untranslated_name: '',
	untranslated_address: '',
	url_reservation: '',
	url_coupon: '',
	detail_loaded: false,
}) {
	constructor(obj, deviceHotelId = null) {
		if (!obj) return super();
		super({
			...obj,
			in_hotel: parseInt(obj.hotel_id, 10) === parseInt(deviceHotelId, 10),
			html: obj.html || '',
		});
	}
	compareTo(b = new Restaurant(), deviceLat = null, deviceLng = null) {
		if (this.get('in_hotel') !== b.get('in_hotel')) {
			// in hotel restaurant first
			return b.get('in_hotel') - this.get('in_hotel');
		} else if (this.get('in_hotel')) {
			// sort by staff like count if both in hotel
			return b.get('staff_like_count') - this.get('staff_like_count');
		} else if (deviceLat && deviceLng){
			// sort by distance
			const thisDistance = Geo.getDistance(this.get('lat'), this.get('lng'), deviceLat, deviceLng);
			const bDistance = Geo.getDistance(b.get('lat'), b.get('lng'), deviceLat, deviceLng);
			return thisDistance - bDistance;
		}
		return 1;
	}
}
