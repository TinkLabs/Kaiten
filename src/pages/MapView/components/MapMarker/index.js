import React from 'react';
import PropTypes from 'prop-types';
import { Marker }  from 'react-google-maps';
import Restaurant from 'records/Restaurant';
import marker from './marker.svg';


function MapMarker({restaurant, isActive, ...props}) {
	const activeIcon = {
		url: marker,
		size: new window.google.maps.Size(40, 50),
		origin: new window.google.maps.Point(0, 0),
		anchor: new window.google.maps.Point(20, 50),
		scaledSize: new window.google.maps.Size(40, 50),
	};
	const icon = {
		url: marker,
		size: new window.google.maps.Size(24, 30),
		origin: new window.google.maps.Point(0, 0),
		anchor: new window.google.maps.Point(12, 30),
		scaledSize: new window.google.maps.Size(24, 30),
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
	onClick: PropTypes.func,
	isActive: PropTypes.bool,
};
MapMarker.defaultProps = {
	restaurant: new Restaurant(),
	onClick: () => {},
	isActive: false,
};

export default MapMarker;
