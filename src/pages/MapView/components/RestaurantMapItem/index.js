import React from 'react';
import { Image } from 'components';
import styles from './index.module.scss'; // Import css modules stylesheet as styles


export default function ({ restaurant, onClickDetail, onClickDirection }) {
	return (
		<div className={styles.MapItem}>
			<div className={styles.imageWrapper}>
				<Image src={restaurant.get('cover_image')} size={68} />
			</div>
			<div className={styles.contentWrapper}>
				<span className={styles.name}>{restaurant.get('name')}</span>
				<span className={styles.category}>{restaurant.get('category')}</span>
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