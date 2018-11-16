import React from 'react';
import Image from './_Image';
import Distance from './_Distance';
import styles from './index.module.scss'; // Import css modules stylesheet as styles


export default function () {
	return (
		<button className={styles.MapItem}>
			<div className={styles.imageWrapper}>
				<Image src="https://dummyimage.com/61x61/000/fff" size={68} />
			</div>
			<div className={styles.contentWrapper}>
				<span className={styles.name}>六本木店</span>
				<span className={styles.category}>中華料理、四川料理</span>
				<Distance lat={35.661259} lng={139.728083} />
			</div>
		</button>
	)
}