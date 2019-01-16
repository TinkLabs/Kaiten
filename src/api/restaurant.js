import axios from './axios';
import Restaurant from 'records/Restaurant';

const GET_RESTAURANT_BY_ID = (_id) => `
	query {
		restaurants (_id: "${_id}") {
			meta {
				total
			}
			results {
				... on Handy_Restaurant {
					_id
					name
					address
					budget
					categories {
						... on Handy_Category {
							_id
							name
						}
					}
					areas {
						... on Handy_Area {
							_id
							name
						}
					}
					comments {
						userName
						rating
						comment
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
		}
	}
`;

export default function(id) {
	return axios
		.post('', { query: GET_RESTAURANT_BY_ID(id) })
		.then(result => {
			console.log(result)
			return new Restaurant({...result.data.data.restaurants.results[0], detail_loaded: true});
		});
}