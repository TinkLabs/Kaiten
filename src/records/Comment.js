import { Record } from 'immutable';


export default class Comment extends Record({
	id: null,
	userName: '',
	comment: '',
	rating: 0,
}) {
	constructor(obj) {
		if (!obj) return super();
		super({
			...obj,
			id: obj._id,
		});
	}
}
