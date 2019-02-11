import React from 'react';
import Map from './components/Map';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Nav from './components/Nav';
import Mixpanel from 'utils/Mixpanel';
import t from 'translation';
import Slider from './components/Slider';
import StaffLike from './components/StaffLike';
import styles from './index.module.scss';

const loadingDiv = <div style={{ height: `100%` }} />;
class MapView extends React.PureComponent {
	onClickDeatils = () => {
		const { restaurants, id } = this.props;
		const currentRestaurant = restaurants.get(id);

		if (!currentRestaurant) return;
		Mixpanel().track('Restaurants Click Restaurant Detail', {
			item: 'restaurant',
			container: 'map view label',
			item_id: currentRestaurant.get('id'),
			item_type: 'restaurant',
		});
		this.props.history.push(`/restaurants/${currentRestaurant.get('id')}`);
	}
	render() {
		const { restaurants, id } = this.props;
		const currentRestaurant = restaurants.get(id);
		return (
			<div className={styles.MapView}>
				<Nav />
				<Map
					restaurants={restaurants}
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI4R0JTd3dwrzyo0P7l1RiHeduEydL5R0&v=3"
					loadingElement={loadingDiv}
					containerElement={loadingDiv}
					mapElement={loadingDiv}
				/>
				<div className={styles.bottom}>
					<Slider restaurants={restaurants} />
				</div>
				{currentRestaurant ?
					<button className={styles.address} onClick={this.onClickDeatils}>
						<h1>{currentRestaurant.get('name')}</h1>
						<h2>{currentRestaurant.get('category')}</h2>
						<StaffLike count={currentRestaurant.get('staff_like_count')} />
						<p>{currentRestaurant.get('address')}</p>
						<span>{t('View details')}</span>
					</button>
					: null }
			</div>
		);
	}
}
const mapStateToProps = state => ({
	restaurants: state.getIn(['result', 'restaurants'], Immutable.OrderedMap()),
	id: state.getIn(['result', 'id']),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
