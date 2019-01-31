import { Record, List } from 'immutable';
import Geo from 'utils/Geo';
import Android from 'utils/Android';
import Comment from './Comment';


export default class Restaurant extends Record({
	id: null,
	name: '',
	address: '',
	budget: 0,
	category: null,
	area: '',
	hotel_id: null,
	staff_like_count: 0,
	cover_image: null,
	images: List(),
	lat: null,
	lng: null,
	comments: List(),
	in_hotel: false,
	html: '',
	tel: null,
	idd: null,
	info_opentime: '',
	untranslated_name: '',
	untranslated_address: '',
	url_reservation: '',
	url_coupon: '',
	url_website: '',
	detail_loaded: false,
}) {
	constructor(obj) {
		if (!obj) return super();
		super({
			...obj,
			id: obj._id,
			hotel_id: obj.hotel ? parseInt(obj.hotel._id, 10) : null,
			in_hotel: obj.hotel && parseInt(obj.hotel._id, 10) === parseInt(Android().hotel_id, 10),
			category: obj.categories && obj.categories.length ? obj.categories[0].name : '',
			budget: parseInt(obj.budget, 10),
			area: obj.areas ? obj.areas[0].name : '',
			untranslated_name: obj.name,
			untranslated_address: obj.address,
			html: obj.description || '',
			images: obj.images ? List(obj.images) : List(),
			comments: obj.comments && obj.comments.length ? List(obj.comments.map(c => new Comment(c))) : List(),
			staff_like_count: obj.avg_rating || 0,
		});
	}
	compareTo(b = new Restaurant(), deviceLat = null, deviceLng = null) {
		if (this.get('in_hotel') !== b.get('in_hotel')) {
			// in hotel restaurant first
			return b.get('in_hotel') - this.get('in_hotel');
		} else if (b.get('staff_like_count') !== this.get('staff_like_count') ) {
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
