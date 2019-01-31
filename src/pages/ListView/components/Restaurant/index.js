import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Restaurant from 'records/Restaurant';
import { Image, Button } from 'components';
import Recommendation from '../Recommendation';
import StaffLike from '../StaffLike';
import { Distance } from 'containers';
import defaultImg from './default.png';
import t from 'translation';

import styles from './index.module.scss'; // Import css modules stylesheet as styles


function ListItem({ restaurant, ...props }) {
	return (
		<div className={styles.wrapper}>
			<Button
				{...props}
				className={classnames(styles.ListItem)}
			>
				<div className={styles.contentWrapper}>
					<span className={styles.name}>{restaurant.get('name')}</span>
					<span className={styles.category}>{restaurant.get('category')}</span>
					<span className={styles.district}>{restaurant.get('area')}</span>
					{restaurant.get('budget') !== 0 ?
						<span className={styles.price}>
							{t('Budget: %{currency_symbol}%{budget}~', {
								currency_symbol: '￥',
								budget: restaurant.get('budget'),
							})}
						</span>
					: null}
					<div className={styles.bottomPart}>
						<div className={styles.recommendationWrapper}>
							<StaffLike count={restaurant.get('staff_like_count')} />
							<Recommendation
								inHotel={restaurant.get('in_hotel')}
							/>
						</div>
					</div>
					<div className={styles.locationWrapper}>

						<Distance lat={restaurant.get('lat')} lng={restaurant.get('lng')} />
					</div>
				</div>
				<div className={styles.imageWrapper}>
					<Image src={restaurant.get('cover_image') || defaultImg} width={116} height={135} />
				</div>
			</Button>
		</div>
	)
}
ListItem.propTypes = {
	restaurant: PropTypes.instanceOf(Restaurant),
};
ListItem.defaultProps = {
	restaurant: new Restaurant(),
};

export default ListItem;
