import data from './data';

export default function(id) {
	return new Promise((resolve, reject) => {
		resolve({
			restaurant: data()[id],
		});
	});
}