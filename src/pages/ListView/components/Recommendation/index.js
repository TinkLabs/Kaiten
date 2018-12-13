import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Recommendation({ inHotel = false, staffLikeCount = 0 }) {
	let staffIcon = <span />;
	if (staffLikeCount > 2) {
		staffIcon =  <span className="icon icon-handy-icon-staff-fav3" />;
	} else if (staffLikeCount > 1) {
		staffIcon =  <span className="icon icon-handy-icon-staff-fav2" />;
	} else if (staffLikeCount) {
		staffIcon =  <span className="icon icon-handy-icon-staff-fav1" />;
	}
	return (
		<div className={styles.Recommendation}>
			{staffIcon}
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
