import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import t from 'translation';
import Mixpanel from 'utils/Mixpanel';
import styles from './index.module.scss';


const Nav = () => (
	<div className={styles.div}>
		<NavLink exact to="/map" activeStyle={{display: 'none'}}>
			<button
				onClick={() => {
					Mixpanel().track('Click Map View');
				}}
			>
				<span>{t('Map View')}</span>
			</button>
		</NavLink>
		<NavLink exact to="/" activeStyle={{display: 'none'}}>
			<button
				onClick={() => {
					Mixpanel().track('Click List View');
				}}
			>
				<span>{t('List View')}</span>
			</button>
		</NavLink>
	</div>
);

export default withRouter(Nav);
