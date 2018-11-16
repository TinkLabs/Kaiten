import React from 'react';
import PropTypes from 'prop-types';
import Geo from 'utils/Geo';
import Unit from 'utils/Unit';
import styles from './index.module.scss';

function Distance({ lat, lng }) {
	if (!lat & !lng) return null;
	
	const meter = Geo.getDistance(lat, lng);
	const distance = Unit.printDistance(meter);

	return (
		<div className={styles.Distance}>
			{distance.distance} {distance.unit}
		</div>
	)
}
Distance.propTypes = {
	lat: PropTypes.number,
	lng: PropTypes.number,
};
Distance.defaultProps = {
	lat: null,
	lng: null,
};

export default Distance;
