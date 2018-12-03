import axios from './axios';
import Restaurant from 'records/Restaurant';

const GET_RESTAURANT_BY_ID = (_id) => `
	query {
		restaurants (_id: "${_id}"){
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
			description
			tel
			idd
			info_opentime
			untranslated {
				name
				address
			}
			url_reservation
			url_coupon
		}
	}
`;

export default function(id) {
	return axios
		.post('', { query: GET_RESTAURANT_BY_ID(id) })
		.then(result => {
			console.log(result)
			return new Restaurant({...result.data.data.restaurants[0], detail_loaded: true});
		});
}