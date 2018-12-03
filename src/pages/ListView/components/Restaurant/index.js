import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Restaurant from 'records/Restaurant';
import { Image, Button } from 'components';
import Recommendation from '../Recommendation';
import { Distance } from 'containers';
import styles from './index.module.scss'; // Import css modules stylesheet as styles


function ListItem({ restaurant, ...props }) {
	return (
		<Button
			{...props}
			className={classnames(styles.ListItem, { [styles.hotel]: restaurant.get('in_hotel') })}
		>
			<div className={styles.imageWrapper}>
				<Image src={restaurant.get('cover_image')} size={61} />
			</div>
			<div className={styles.contentWrapper}>
				<span className={styles.name}>{restaurant.get('name')}</span>
				<span className={styles.category}>{restaurant.get('category')}</span>
				<span className={styles.district}>{restaurant.get('area')}</span>
				{restaurant.get('budget') !== 0 ?
					<span className={styles.price}>料金： 〜{restaurant.get('budget')}円</span>
				: null}
			</div>
			<div className={styles.locationWrapper}>
				<Recommendation
					inHotel={restaurant.get('in_hotel')}
					staffLikeCount={restaurant.get('staff_like_count')}
				/>
			<Distance lat={restaurant.get('lat')} lng={restaurant.get('lng')} />
			</div>
		</Button>
	)
}
ListItem.propTypes = {
	restaurant: PropTypes.instanceOf(Restaurant),
};
ListItem.defaultProps = {
	restaurant: new Restaurant(),
};

export default ListItem;
