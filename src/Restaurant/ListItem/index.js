import React from 'react';
import geolib from 'geolib';
import styles from './index.module.scss'; // Import css modules stylesheet as styles
function Image({ src, size, ...props}) {
	return (
		<div
			className={styles.Image}
			style={{
				backgroundImage: `url(${src})`,
				width: size,
				height: size,
			}}
			{...props}
		/>
	);
}
function Recommendation({ inHotel, staffRecommend }) {
	return (
		<div className={styles.Recommendation}>
			{inHotel ? 'in hotel': null}
			{staffRecommend ? 'staffRecommend': null}
		</div>
	)
}
function DistanceTo({ lat, lng }) {
	const distance = geolib.getDistance(
		{latitude: 35.661259, longitude: 139.728083},
		{latitude: 35.6592537, longitude: 139.7239108},
	);
	return (
		<div className={styles.DistanceTo}>
			{distance} m
		</div>
	)
}
export default function () {
	return (
		<button className={styles.ListItem}>
			<div className={styles.ImageWrapper}>
				<Image src="https://dummyimage.com/61x61/000/fff" size={61} />
			</div>
			<div className={styles.ContentWrapper}>
				<span className={styles.name}>六本木店</span>
				<span className={styles.category}>中華料理、四川料理</span>
				<span className={styles.district}>Roppongi</span>
			</div>
			<div className={styles.LocationWrapper}>
				<Recommendation
					inHotel
					staffRecommend
				/>
				<DistanceTo
					lat=""
					lng=""
				/>
			</div>
		</button>
	)
}