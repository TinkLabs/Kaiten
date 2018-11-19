import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Marker,
}  from 'react-google-maps';
import Geo from 'utils/Geo';
import useMap from 'hooks/useMap';

import Restaurant from 'records/Restaurant';
import marker from './marker.svg';


function MapMarker({restaurant, ...props}) {
	const { lat, lng } = useMap(Geo.getLocation());
	if (!lat || !lng) return null;
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
};
MapMarker.defaultProps = {
	restaurant: new Restaurant(),
};

export default MapMarker;
