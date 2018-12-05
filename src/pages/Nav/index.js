import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Immutable from 'immutable';
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
const mapStateToProps = state => ({
	lat: state.getIn(['device', 'lat']),
	lng: state.getIn(['device', 'lng']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
	restaurants: state.getIn(['result', 'restaurants'], Immutable.List()),
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(Nav);
