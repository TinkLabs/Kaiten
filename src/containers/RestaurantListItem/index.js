import React from 'react';
import PropTypes from 'prop-types';
import Restaurant from 'records/Restaurant';
import { Image, Recommendation } from 'components';
import { Distance } from 'containers';
import styles from './index.module.scss'; // Import css modules stylesheet as styles


function ListItem({ restaurant, ...props }) {
	return (
		<button {...props} className={styles.ListItem}>
			<div className={styles.imageWrapper}>
				<Image src={restaurant.get('cover_image')} size={61} />
			</div>
			<div className={styles.contentWrapper}>
				<span className={styles.name}>{restaurant.get('name')}</span>
				<span className={styles.category}>{restaurant.get('category')}</span>
				<span className={styles.district}>{restaurant.get('area')}</span>
			</div>
			<div className={styles.locationWrapper}>
				<Recommendation
					inHotel
					staffRecommend
				/>
			<Distance lat={restaurant.get('lat')} lng={restaurant.get('lng')} />
			</div>
		</button>
	)
}
ListItem.propTypes = {
	restaurant: PropTypes.instanceOf(Restaurant),
};
ListItem.defaultProps = {
	restaurant: new Restaurant(),
};

export default ListItem;
