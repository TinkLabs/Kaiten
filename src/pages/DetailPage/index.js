import React, { Component } from 'react';
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
import Comments from './components/Comments';
import StaffLike from './components/StaffLike';

import { Distance } from 'containers';

import Map from './components/Map';
import Nav from './components/Nav';

import styles from './index.module.scss';
import icon from './gurunavi_icon.png';


class DetailPage extends Component {
	componentDidMount() {
		document.getElementById('main').scrollTo(0, 0);
		if (this.props.restaurant.get('detail_loaded')) return;
		const id = this.props.match.params.id;
		this.props.fetchRestaurant(id);
	}
	render() {
		const { restaurant } = this.props;
		return (
			<div className={styles.Page}>
				<Nav />
				<div className={styles.images}>
					<ImageSlider
						images={restaurant.get('images').filter((v, i, self) => self.indexOf(v) === i)}
					/>
				</div>
				<div className={styles.contentWrapper}>
					<span className={styles.name}>{restaurant.get('name')}</span>
					<span className={styles.category}>{restaurant.get('category')}</span>
					<span className={styles.district}>{restaurant.get('area')}</span>
					<StaffLike />
					<div className={styles.locationWrapper}>
						<Distance lat={restaurant.get('lat')} lng={restaurant.get('lng')} />
					</div>
				</div>
				<Comments comments={restaurant.get('comments')} />
				<div className={styles.shortDescription}>
					{renderHtml(restaurant.get('html').split('\n').join('<br />'))}
				</div>
				<div className={styles.restaurantProvider}>
					{t('Restaurant information provider:')}
					<a href={`olink:${restaurant.get('url_website')}`} _blank="_blank"><img src={icon} alt="gurunavi"/></a>
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
								<span className="icon icon-handy-icon-phone-solid" />
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
								￥{restaurant.get('budget')}
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
						{restaurant.get('lat') ? 
							<Map
							restaurant={restaurant}
							/> : null }
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
		restaurant: state.getIn(['result', 'cached_restaurant', id], new Restaurant()),
	};
}

const mapDispatchToProps = dispatch => ({
	fetchRestaurant: bindActionCreators(fetchRestaurant, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailPage));
