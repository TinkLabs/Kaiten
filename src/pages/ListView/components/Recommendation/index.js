import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Recommendation({ inHotel = false, staffLikeCount = 0 }) {
	return (
		<div className={styles.Recommendation}>
			{inHotel ? <span className="icon icon-handy-icon-inhotel" />: <span />}
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
