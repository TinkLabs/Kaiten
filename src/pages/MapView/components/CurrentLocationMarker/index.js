import React from 'react';
import PropTypes from 'prop-types';
import {
	Marker,
}  from 'react-google-maps';
import { connect } from 'react-redux';
import Restaurant from 'records/Restaurant';
import marker from './marker.svg';


function MapMarker({restaurant, lat, lng, locationEnabled, ...props}) {
	if (!locationEnabled) return null;
	return (
		<Marker
			position={{ lat, lng }}
			icon={{
				url: marker,
				size: new window.google.maps.Size(34, 34),
				origin: new window.google.maps.Point(0, 0),
				anchor: new window.google.maps.Point(19, 16),
			}}
		/>
	);
}
MapMarker.propTypes = {
	restaurant: PropTypes.instanceOf(Restaurant),
	locationEnabled: PropTypes.bool,
};

MapMarker.defaultProps = {
	restaurant: new Restaurant(),
	locationEnabled: false,
};

const mapStateToProps = state => ({
	lat: state.getIn(['device', 'lat']),
	lng: state.getIn(['device', 'lng']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MapMarker);
