import React from 'react';
import styles from './index.module.scss'; // Import css modules stylesheet as styles


export default function () {
	return (
		<div className={styles.Dropdown}>
			<button className={styles.DropdownButton}>
				<label>Area</label>
				<div className={styles.selectedLabel}>
					Roppongi
				</div>
				<div className={styles.arrow}>u</div>
			</button>
			<div className={styles.DropdownList}>
				<div className={styles.option}> Nearby</div>
				<div className={styles.option}> Nearby</div>
				<div className={styles.option}> Nearby Nearby Nearby</div>
			</div>
		</div>
	)
}