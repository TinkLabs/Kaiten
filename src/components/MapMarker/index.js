import React from 'react';
import PropTypes from 'prop-types';
import {
	Marker,
}  from 'react-google-maps';
import Restaurant from 'records/Restaurant';
import marker from './marker.svg';


function MapMarker({restaurant, isActive, ...props}) {
	const activeIcon = {
		url: marker,
		size: new window.google.maps.Size(64, 80),
		origin: new window.google.maps.Point(0, 0),
		anchor: new window.google.maps.Point(32, 68),
		scaledSize: new window.google.maps.Size(64, 80),
	};
	const icon = {
		url: marker,
		size: new window.google.maps.Size(32, 40),
		origin: new window.google.maps.Point(0, 0),
		anchor: new window.google.maps.Point(15, 40),
	};
	return (
		<Marker
			onClick={() => { props.onClick(restaurant); }}
			position={{ lat: restaurant.get('lat'), lng: restaurant.get('lng') }}
			animation={window.google.maps.Animation.DROP}
			icon={isActive ? activeIcon : icon}
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
