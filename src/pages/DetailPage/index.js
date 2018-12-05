import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import renderHtml from 'react-render-html';
import { bindActionCreators } from 'redux';
import Restaurant from 'records/Restaurant';
import { fetchRestaurant } from 'modules/result';
import Row from './components/Row';
import ImageSlider from './components/ImageSlider';
import t from 'translation';
import CallToAction from './components/CallToAction';

import Map from './components/Map';
import styles from './index.module.scss';

const loadingDiv = <div style={{ height: `100%` }} />;

class DetailPage extends PureComponent {
	componentDidMount() {
		if (this.props.restaurant.get('detail_loaded')) return;
		const id = this.props.match.params.id;
		this.props.fetchRestaurant(id);
	}
	render() {
		const { restaurant } = this.props;
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
					{renderHtml(restaurant.get('html').split('\n').join('<br />'))}
				</div>
				<CallToAction restaurant={restaurant} />
				<div className={styles.details}>
					<Row title={t('Restaurant Name')}>
						<span className={styles.originName}>{restaurant.get('untranslated_name')}</span>
						{restaurant.get('untranslated_name') !== restaurant.get('name') ?
							(<span className={styles.translatedName}>
								{restaurant.get('name')}
							</span>)
							: null}
					</Row>
					{restaurant.get('tel') ?
						<Row title={t('Phone Number')}>
							<button className={styles.phone}>
								<span className={styles.column}>
									{restaurant.get('tel')}
									{restaurant.get('idd') ? `(${restaurant.get('idd')})` : null}
								 </span>
								<span className="icon icon-handy-icon-phone" />
							</button>
						</Row> 
						: null
					}
					{restaurant.get('info_opentime') ?
						<Row title={t('Opening Hour')}>
							<span className={styles.column}>
								{renderHtml(restaurant.get('info_opentime').split('\n').join('<br />'))}
							</span>
						</Row> 
						: null
					}
					{restaurant.get('budget') ?
						<Row title={t('Budget')}>
							<span className={styles.column}>
								JPY${restaurant.get('budget')}~
							</span>
						</Row> 
						: null
					}
					{restaurant.get('address') ?
						<Row title={t('Address')}>
							<div className={styles.address}>
								{renderHtml(restaurant.get('untranslated_address').split('\n').join('<br />'))}
							</div>
							<div className={styles.translatedAddress}>
								{restaurant.get('address') === restaurant.get('untranslated_address') ? null
									: renderHtml(restaurant.get('address').split('\n').join('<br />'))}
							</div>
						</Row>
						: null }
					<div>
						{/* <Map
							googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI4R0JTd3dwrzyo0P7l1RiHeduEydL5R0&v=3.exp&libraries=geometry,drawing,places"
							loadingElement={loadingDiv}
							containerElement={loadingDiv}
							mapElement={loadingDiv}
							lat={restaurant.get('lat')}
							lng={restaurant.get('lng')}
							name={restaurant.get('name')}
							subtitle={restaurant.get('category')}
						/> */}
					</div>
				</div>
					
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;

	return {
		lat: state.getIn(['device', 'lat']),
		lng: state.getIn(['device', 'lng']),
		locationEnabled: state.getIn(['device', 'locationEnabled']),
		restaurants: state.getIn(['result', 'restaurants']),
		restaurant: state.getIn(['result', 'restaurants', id], new Restaurant()),
	};
}

const mapDispatchToProps = dispatch => ({
	fetchRestaurant: bindActionCreators(fetchRestaurant, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailPage));
