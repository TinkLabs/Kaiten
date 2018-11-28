import data from './data';

export default function(id) {
	console.log(id);
	console.log(data);
	return new Promise((resolve, reject) => {
		resolve({
			restaurant: data[id],
		});
	});
}