import data from './data';

export default function() {
	return new Promise((resolve, reject) => {
		setTimeout(function(){
			resolve({
				restaurants: Object.values(data()),
			});
		}, 300);
	});
}