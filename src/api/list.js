import axios from './axios';

const GET_RESTAURANT_BY_LAT_LNG = (lat, lng) => `
	query {
		restaurants (lat: ${lat}, lng: ${lng}, limit: 30) {
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
			console.log(result)
			return result.data.data;
		});
}