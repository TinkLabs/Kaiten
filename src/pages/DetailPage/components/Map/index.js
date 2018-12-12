import GoogleMapReact from 'google-map-react';

import React from 'react';
import styles from './index.module.scss';

const MarkerLabel = ({ title, subtitle }) => (
	<div className={styles.marker}>
		<h2>{title}</h2>
		<p>{subtitle}</p>
	</div>
);


const Map = ({
	lat,
	lng,
	name,
	subtitle,
}) => {
	if (!lat && !lng) return null;
	const renderMarkers = (map, maps) => {
		const marker = new maps.Marker({
			position: {
				lat,
				lng,
			},
			map,
		});
		return marker;
	};
	return (
		<div className={styles.mapContainer}>
			<button
				className={styles.map} 
				nClick={() => {
					window.open(`geo:${lat},${lng}?q=<${lat}><${lng}>(${name})`);
				}}
			>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyBwuj7BZgdtuQgjZnbhFfqmUWRK2Lq_Jc8' }}
					defaultCenter={{
						lat,
						lng,
					}}
					defaultZoom={16}
					onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
					options={{
						fullscreenControl: false,
						disableDefaultUI: true,
					}}
				>
					<MarkerLabel
						lat={lat}
						lng={lng}
						title={name}
						subtitle={subtitle}
					/>
				</GoogleMapReact>
			</button>
		</div>
	);
};

export default Map;