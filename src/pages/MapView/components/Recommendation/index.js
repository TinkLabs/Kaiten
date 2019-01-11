import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import image from './in_hotel.png';

function Recommendation({ inHotel = false }) {
	return (
		<div className={styles.Recommendation}>
			{inHotel ? <img src={image} />: null}
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
