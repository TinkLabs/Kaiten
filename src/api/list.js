import axios from './axios';
import Immutable from 'immutable';
import Restaurant from 'records/Restaurant';

const GET_RESTAURANT_BY_LAT_LNG = (lat, lng) => `
	query {
		restaurants (lat: ${lat.toFixed(5)}, lng: ${lng.toFixed(5)}, limit: 30) {
			_id
			name
			address
			budget
			categories {
				_id
				name
			}
			areas {
				_id
				name
			}
			hotel {
				_id
				name
			}
			staff_like_count
			cover_image
			images
			lat
			lng
		}
	}
`;

export default function(lat, lng) {
	return axios
		.post('', { query: GET_RESTAURANT_BY_LAT_LNG(lat, lng) })
		.then(result => {
			const mapping = result.data.data.restaurants.reduce((obj, item) => {
				const r = new Restaurant(item);
				obj[r.get('id')] = r;
				return obj
			}, {})
			return Immutable.OrderedMap(mapping);
		});
}