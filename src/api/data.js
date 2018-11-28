import data from './near_by_handy.json';

export default function() {
	const mapping = {};
	data.data.restaurants.forEach((r, i) => {
		if (!r.cover_image && i !== 1) return;
		mapping[i + 1] = {
			...r,
			id: i + 1,
		}
	})
	return mapping;
}