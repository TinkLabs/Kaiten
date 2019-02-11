import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import emptyStar from './empty_star.svg';
import star from './star.svg';

function StaffLike({ count = 0 }) {
	let img = null;
	switch (count) {
		case 0:
			img = (
				<div className={styles.images}>
					<img src={emptyStar} alt="" />
					<img src={emptyStar} alt="" />
					<img src={emptyStar} alt="" />
				</div>
			);
			break;
		case 1:
			img = (
				<div className={styles.images}>
					<img src={star} alt="" />
					<img src={emptyStar} alt="" />
					<img src={emptyStar} alt="" />
				</div>
			);
			break;
		case 2:
			img = (
				<div className={styles.images}>
					<img src={star} alt="" />
					<img src={star} alt="" />
					<img src={emptyStar} alt="" />
				</div>
			);
			break;
		case 3:
			img = (
				<div className={styles.images}>
					<img src={star} alt="" />
					<img src={star} alt="" />
					<img src={star} alt="" />
				</div>
			);
			break;
		default:
	}
	return (
		<div className={styles.StaffLike}>
			{img}
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
