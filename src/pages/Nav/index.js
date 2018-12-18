import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import t from 'translation';
import styles from './index.module.scss';


const Nav = () => (
	<div className={styles.div}>
		<span className={styles.title}>{t('handy Restaurants')}</span>
		<NavLink exact to="/map" activeStyle={{display: 'none'}}>
			<span className="icon icon-handy-icon-location" />
			<span>{t('Map View')}</span>
		</NavLink>
		<NavLink exact to="/" activeStyle={{display: 'none'}}>
			<span className="icon icon-handy-icon-details" />
			<span>{t('List View')}</span>
		</NavLink>
	</div>
);

export default withRouter(Nav);
