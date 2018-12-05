import React from 'react';
import { Image } from 'components';
import classnames from 'classnames';
import t from 'translation';

import styles from './index.module.scss'; // Import css modules stylesheet as styles


export default function ({ restaurant, onClickDetail, onClickDirection }) {
	return (
		<div className={classnames(styles.MapItem, { [styles.hotel]: restaurant.get('in_hotel') })}>
			<div className={styles.imageWrapper}>
				<Image src={restaurant.get('cover_image')} size={68} />
			</div>
			<div className={styles.contentWrapper}>
				<span className={styles.name}>{restaurant.get('name')}</span>
				<span className={styles.category}>{restaurant.get('category')}</span>
				{restaurant.get('budget') !== 0 ?
					<span className={styles.price}>
						{t('Budget: %{currency_symbol}%{budget}~', {
							currency_symbol: '$',
							budget: restaurant.get('budget'),
						})}
					</span>
				: null}
				<div className={styles.controls}>
					<button onClick={onClickDetail}>
						<span className="icon icon-handy-icon-handychat-template" />
					</button>
					<button onClick={onClickDirection}>
						<span className="icon icon-handy-icon-sent" />
					</button>
				</div>
			</div>
		</div>
	)
}