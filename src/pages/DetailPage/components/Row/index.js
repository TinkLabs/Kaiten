import React from 'react';
import styles from './index.module.scss';

const Row = ({ children, title }) => (
	<div className={styles.Row}>
		<div className={styles.title}>{title}</div>
		<div className={styles.children}>
			{children}
		</div>
	</div>
)
export default Row;