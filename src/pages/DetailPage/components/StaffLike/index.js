import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import t from 'translation';
import styles from './index.module.scss';
import emptyStar from './empty_star.svg';
import star from './star.svg';

function StaffLike({ count = 0 }) {
	let img = null;
	switch (count) {
		case 0:
			img = (
				<div className={styles.images}>
					<img src={emptyStar} />
					<img src={emptyStar} />
					<img src={emptyStar} />
				</div>
			);
			break;
		case 1:
			img = (
				<div className={styles.images}>
					<img src={star} />
					<img src={emptyStar} />
					<img src={emptyStar} />
				</div>
			);
			break;
		case 2:
			img = (
				<div className={styles.images}>
					<img src={star} />
					<img src={star} />
					<img src={emptyStar} />
				</div>
			);
			break;
		case 3:
			img = (
				<div className={styles.images}>
					<img src={star} />
					<img src={star} />
					<img src={star} />
				</div>
			);
			break;
		default:
	}
	return (
		<div className={styles.StaffLike}>
			{img}
			<span className={classnames(styles.text, { [styles.hidden]: !count })}>{t('Hotel recommendation')}</span>
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
