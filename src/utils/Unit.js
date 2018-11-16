
export default class {
	static printDistance (meter) {
		const distance = parseInt(meter, 10);
		if (distance >= 1000) {
			return {
				unit: 'km',
				distance: Math.round(distance / 100) / 10,
			};
		}
		return {
			unit: 'm',
			distance: distance,
		};
	}
}
