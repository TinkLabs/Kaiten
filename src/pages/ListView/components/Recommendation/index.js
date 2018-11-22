import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Recommendation({ inHotel = false, staffRecommend = false }) {
	return (
		<div className={styles.Recommendation}>
			{staffRecommend ? <span className="icon icon-handyicon-portal-mice" />: <span />}
			{inHotel ? <span className="icon icon-handy-icon-hotel" />: <span />}
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
