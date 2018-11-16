import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Recommendation({ inHotel, staffRecommend }) {
	return (
		<div className={styles.Recommendation}>
			{inHotel ? 'in hotel': null}
			{staffRecommend ? 'staffRecommend': null}
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
