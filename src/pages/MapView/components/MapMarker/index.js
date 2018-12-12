import React from 'react';
import PropTypes from 'prop-types';
import { Marker }  from 'react-google-maps';
import Restaurant from 'records/Restaurant';
import marker from './marker.png';


function MapMarker({restaurant, isActive, ...props}) {
	const activeIcon = {
		url: marker,
		size: new window.google.maps.Size(40, 40),
		origin: new window.google.maps.Point(0, 0),
		anchor: new window.google.maps.Point(20, 40),
		scaledSize: new window.google.maps.Size(40, 40),
	};
	const icon = {
		url: marker,
		size: new window.google.maps.Size(24, 24),
		origin: new window.google.maps.Point(0, 0),
		anchor: new window.google.maps.Point(12, 24),
		scaledSize: new window.google.maps.Size(24, 24),
	};
	return (
		<Marker
			onClick={() => { props.onClick(restaurant); }}
			position={{ lat: restaurant.get('lat'), lng: restaurant.get('lng') }}
			icon={isActive ? activeIcon : icon}
			zIndex={isActive ? 2 : 1}
		/>
	);
}
MapMarker.propTypes = {
	restaurant: PropTypes.instanceOf(Restaurant),
	onClick: PropTypes.func,
	isActive: PropTypes.bool,
};
MapMarker.defaultProps = {
	restaurant: new Restaurant(),
	onClick: () => {},
	isActive: false,
};

export default MapMarker;
