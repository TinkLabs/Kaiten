import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import RestaurantMapItem from '../Restaurant';
import { Swiper, Slide } from 'react-dynamic-swiper';
import { updateActiveID, showDirection } from 'modules/result';
import styles from './index.module.scss';
import Mixpanel from 'utils/Mixpanel'


class MapMarker extends React.Component {
	constructor(props) {
		super(props);
		this.setActiveId = this.setActiveId.bind(this);
		this.gotoSlide = this.gotoSlide.bind(this);
		this.onClickSlide = this.onClickSlide.bind(this);
	}
	componentDidMount() {
		this.gotoSlide(this.props.activeId, 0);
	}
	componentDidUpdate(prevProps)  {
		if (prevProps.activeId === this.props.activeId) {
			this.gotoSlide(this.props.activeId, 0);
			return;
		}
		this.gotoSlide(this.props.activeId, 300);
	}
	setActiveId(id) {
		this.props.updateActiveID(id);
	}
	gotoSlide(id, speed) {
		const activeIdIndex = this.props.restaurants
			.keySeq()
			.indexOf(id);
		const currentSlide = this.swiper._swiper.activeIndex;
		if (activeIdIndex !== currentSlide) {
			this.swiper._swiper.slideTo(activeIdIndex, speed);
		}
	}
	onClickSlide() {
		this.props.history.push(`/restaurants/${this.props.activeId}`);
	}
	render() {
		const { restaurants } = this.props;
		const params = {
			slidesPerView: 1,
			centeredSlides: true,
			width: 300,
			clickable: false,
			on: {
				slideChange: this.onSlideChange,
			}
		};
		return (
			<Swiper
				ref={(r) => { 	this.swiper = r; }}
				swiperOptions={params}
				navigation={false}
				pagination={false}
			> 
				{restaurants.valueSeq().map((r, i) => (
					<Slide
						key={`frame-${r.get('id')}`}
						className={styles.itemWrapper}
						onActive={() => {
							Mixpanel().track('Restaurants Focus Restaurant', {
								item: 'restaurant',
								container: 'map view slider',
								item_id: r.get('id'),
								item_type: 'restaurant',
								item_position: i + 1,
							});
							this.setActiveId(r.get('id'));
						}}
					>
						<RestaurantMapItem
							restaurant={r}
							onClickDirection={() => {
								Mixpanel().track('Restaurants Click Restaurant Direction', {
									item: 'restaurant',
									container: 'map view slider',
									item_id: r.get('id'),
									item_type: 'restaurant',
									item_position: i + 1,
								});
								this.props.showDirection();
							}}
						/>
					</Slide>
				))}
			</Swiper>
		);
	}
}
MapMarker.propTypes = {
	restaurants: PropTypes.instanceOf(Immutable.OrderedMap),
	activeId: PropTypes.string,
	updateActiveID: PropTypes.func,
};
MapMarker.defaultProps = {
	restaurants: Immutable.OrderedMap(),
	activeId: '',
	updateActiveID: () => {},
};

const mapStateToProps = state => ({
	activeId: state.getIn(['result', 'id']),
});

const mapDispatchToProps = dispatch => ({
	updateActiveID: bindActionCreators(updateActiveID, dispatch),
	showDirection: bindActionCreators(showDirection, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapMarker));
