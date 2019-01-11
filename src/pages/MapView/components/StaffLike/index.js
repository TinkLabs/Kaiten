import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import star1 from './star_1.png';
import star2 from './star_2.png';
import star3 from './star_3.png';

function StaffLike({ count = 0 }) {
	let img = null;
	switch (count) {
		case 1:
			img = star1;
			break;
		case 2:
			img = star2;
			break;
		case 3:
			img = star3;
			break;
		default:
	}
	return (
		<div className={styles.StaffLike}>
			{img ? <img src={img} class={styles.img} alt=""/> : null }
		</div>
	)
}
StaffLike.propTypes = {
	count: PropTypes.number,
};
StaffLike.defaultProps = {
	count: 0,
};

export default StaffLike;
