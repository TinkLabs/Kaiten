import React from 'react';
import { Image } from 'components';
import classnames from 'classnames';
import t from 'translation';
import defaultImg from './default.png';
import styles from './index.module.scss'; // Import css modules stylesheet as styles
import { Distance } from 'containers';


export default function ({ restaurant, onClickDetail, onClickDirection }) {
	return (
		<div>
			<div className={classnames(styles.MapItem, { [styles.hotel]: restaurant.get('in_hotel') })}>
				<div className={styles.imageWrapper}>
					<Image src={restaurant.get('cover_image') || defaultImg} size={95} />
				</div>
				<div className={styles.contentWrapper}>
					<span className={styles.name}>{restaurant.get('name')}</span>
					<span className={styles.category}>{restaurant.get('category')}</span>
					{restaurant.get('budget') !== 0 ?
						<span className={styles.price}>
							{t('Budget: %{currency_symbol}%{budget}~', {
								currency_symbol: '￥',
								budget: restaurant.get('budget'),
							})}
						</span>
					: null}
					<div className={styles.locationWrapper}>

						<Distance lat={restaurant.get('lat')} lng={restaurant.get('lng')} />
					</div>
					<div className={styles.controls}>
						<button onClick={onClickDirection}>
							<span className="icon icon-handy-icon-route" />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}