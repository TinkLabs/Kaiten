import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import t from 'translation';
import styles from './index.module.scss';


const Nav = () => (
	<div className={styles.div}>
		<span className={styles.title}>{t('handy Restaurants')}</span>
		<NavLink exact to="/map" activeStyle={{display: 'none'}}>
			{t('Map View')}
		</NavLink>
		<NavLink exact to="/" activeStyle={{display: 'none'}}>{t('List View')}</NavLink>
	</div>
);

export default withRouter(Nav);
