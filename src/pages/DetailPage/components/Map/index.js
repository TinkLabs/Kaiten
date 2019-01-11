
import React from 'react';
import styles from './index.module.scss';
import Mixpanel from 'utils/Mixpanel';


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
					Mixpanel().track('Restaurants Detail Click Map', {
						item: 'restaurant',
						container: 'detail page',
						item_id: restaurant.get('id'),
						item_type: 'restaurant',
					});
					window.open(`geo:${lat},${lng}?q=<${lat}><${lng}>(${name})`);
				}}
			>
				<img style={{ width: '100%' }} src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=18&size=1200x600&scale=2&maptype=roadmap&markers=${lat},${lng}&key=AIzaSyDI4R0JTd3dwrzyo0P7l1RiHeduEydL5R0`} />
			</div>
		</div>
	);
};

export default Map;