import React from 'react';
import Image from './_Image';
import Distance from './_Distance';
import Recommendation from './_Recommendation';
import styles from './index.module.scss'; // Import css modules stylesheet as styles


export default function () {
	return (
		<button className={styles.ListItem}>
			<div className={styles.imageWrapper}>
				<Image src="https://dummyimage.com/61x61/000/fff" size={61} />
			</div>
			<div className={styles.contentWrapper}>
				<span className={styles.name}>六本木店</span>
				<span className={styles.category}>中華料理、四川料理</span>
				<span className={styles.district}>Roppongi</span>
			</div>
			<div className={styles.locationWrapper}>
				<Recommendation
					inHotel
					staffRecommend
				/>
				<Distance lat={35.661259} lng={139.728083} />
			</div>
		</button>
	)
}