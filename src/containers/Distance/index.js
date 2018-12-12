import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Geo from 'utils/Geo';
import Unit from 'utils/Unit';
import styles from './index.module.scss';

function Distance({ lat, lng, deviceLat, deviceLng, locationEnabled }) {
	if (!locationEnabled || !lat || !lng || !deviceLat ||!deviceLng) return null;
	const meter = Geo.getDistance(lat, lng, deviceLat, deviceLng);
	const distance = Unit.printDistance(meter);

	return (
		<div className={styles.Distance}>
			<span className="icon icon-handy-icon-walk" />{distance.distance}{distance.unit}
		</div>
	)
}
Distance.propTypes = {
	lat: PropTypes.number,
	lng: PropTypes.number,
	deviceLat: PropTypes.number,
	deviceLng: PropTypes.number,
	locationEnabled: PropTypes.bool
};
Distance.defaultProps = {
	lat: null,
	lng: null,
	deviceLat: null,
	deviceLng: null,
	locationEnabled: false,
};
const mapStateToProps = state => ({
	deviceLat: state.getIn(['device', 'lat']),
	deviceLng: state.getIn(['device', 'lng']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Distance);