import React from 'react';
import PropTypes from 'prop-types';
import t from 'translation';
import styles from './index.module.scss';

function Recommendation({ inHotel = false }) {
	if (!inHotel) return null;
	return (
		<div className={styles.Recommendation}>
			<span>{t('In hotel')}</span>
		</div>
	)
}
Recommendation.propTypes = {
	lat: PropTypes.number,
	lng: PropTypes.number,
};
Recommendation.defaultProps = {
	lat: null,
	lng: null,
};

export default Recommendation;
