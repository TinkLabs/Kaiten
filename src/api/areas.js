import axios from './axios';

const GET_AREA = `
	query {
		areas {
			_id
			name
		}
	}
`;

export default function() {
	return axios
		.post('', { query: GET_AREA })
		.then(result => {
			console.log(result)
			return result.data.data;
		});
}