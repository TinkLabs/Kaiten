import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Recommendation({ inHotel, staffRecommend }) {
	return (
		<div className={styles.Recommendation}>
			{inHotel ? 'i': null}
			{staffRecommend ? 's': null}
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
