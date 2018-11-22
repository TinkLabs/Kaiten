import React, { Component } from 'react';
import { connect } from 'react-redux';
import renderHtml from 'react-render-html';
import getRestaurant from 'api/restaurant';
import Immutable from 'immutable';
import Restaurant from 'records/Restaurant';
import Row from './components/Row';
import ImageSlider from './components/ImageSlider';
import CallToAction from './components/CallToAction';

import Map from './components/Map';
import styles from './index.module.scss';

const loadingDiv = <div style={{ height: `100%` }} />;
class DetailPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurant: new Restaurant(),
		};
		getRestaurant().then(({ restaurant }) => {
			this.setState({
				restaurant: new Restaurant({ ...restaurant, detail_loaded: true }),
			})
		});
	}
	render() {
		const { restaurant } = this.state;
		return (
			<div className={styles.Page}>
				<div className={styles.images}>
					<ImageSlider
						images={restaurant.get('images')}
					/>
				</div>
				<div className={styles.contentWrapper}>
					<span className={styles.name}>{restaurant.get('name')}</span>
					<span className={styles.category}>{restaurant.get('category')}</span>
					<span className={styles.district}>{restaurant.get('area')}</span>
				</div>
				<div className={styles.shortDescription}>
					{renderHtml(restaurant.get('html').split('\r\n').join('<br />'))}
				</div>
				<CallToAction restaurant={restaurant} />
				<div className={styles.details}>
					<Row title="Restaurant Name">
						<span className={styles.originName}>{restaurant.get('untranslated_name')}</span>
						{restaurant.get('untranslated_name') !== restaurant.get('name') ?
							(<span className={styles.translatedName}>
								{restaurant.get('name')}
							</span>)
							: null}
					</Row>
					<Row title="Phone Number">
						<button className={styles.phone}>
							<span className={styles.phoneNumber}>
								{restaurant.get('tel')}
								{restaurant.get('idd') ? `(${restaurant.get('idd')})` : null}
							 </span>
							<span className="icon icon-handy-icon-phone" />
						</button>
					</Row>
					<Row title="Address">
						<div className={styles.address}>
							{renderHtml(restaurant.get('untranslated_address').split('\r\n').join('<br />'))}
						</div>
						<div className={styles.translatedAddress}>
							{restaurant.get('address') === restaurant.get('untranslated_address') ? null
								: renderHtml(restaurant.get('address').split('\r\n').join('<br />'))}
						</div>
					</Row>
					<div>
						<Map
							googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI4R0JTd3dwrzyo0P7l1RiHeduEydL5R0&v=3.exp&libraries=geometry,drawing,places"
							loadingElement={loadingDiv}
							containerElement={loadingDiv}
							mapElement={loadingDiv}
							lat={35.6593366}
							lng={139.7240406}
							name={restaurant.get('name')}
							subtitle={restaurant.get('category')}
						/>
					</div>
				</div>
					
			</div>
		);
	}
}
const mapStateToProps = state => ({
	lat: state.getIn(['device', 'lat']),
	lng: state.getIn(['device', 'lng']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
	restaurants: state.getIn(['result', 'restaurants'], Immutable.List()),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
