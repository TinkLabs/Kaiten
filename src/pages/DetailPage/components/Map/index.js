import GoogleMapReact from 'google-map-react';

import React from 'react';
import styles from './index.module.scss';
import MapJS from './map';
const MarkerLabel = ({ title, subtitle }) => (
	<div className={styles.marker}>
		<h2>{title}</h2>
		<p>{subtitle}</p>
	</div>
);
const loadingDiv = <div/>;


const Map = ({
	restaurant,
}) => {
	const lat = restaurant.get('lat');
	const lng = restaurant.get('lng');
	const name = restaurant.get('name');
	if (!lat || !lng) return null;
	return (
		<div className={styles.mapContainer}>
			<div
				className={styles.map} 
				onClick={() => {
					window.open(`geo:${lat},${lng}?q=<${lat}><${lng}>(${name})`);
				}}
			>
				<MapJS
					restaurant={restaurant}
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI4R0JTd3dwrzyo0P7l1RiHeduEydL5R0&v=2"
					loadingElement={loadingDiv}
					containerElement={loadingDiv}
					mapElement={loadingDiv}
				/>
			</div>
		</div>
	);
};

export default Map;