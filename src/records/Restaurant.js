import { Record, List } from 'immutable';


export default class Restaurant extends Record({
	id: null,
	name: '',
	category: null,
	hotel_id: null,
	staff_like_count: 0,
	cover_image: null,
	images: List(),
	lat: null,
	lng: null,
}) {
	constructor(obj) {
		if (!obj) return obj;
		super(obj);
	}
}
