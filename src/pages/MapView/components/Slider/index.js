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



class MapMarker extends React.Component {
	constructor(props) {
		super(props);
		this.setActiveId = this.setActiveId.bind(this);
		this.gotoSlide = this.gotoSlide.bind(this);
	}
	componentDidMount() {
		this.gotoSlide(this.props.activeId, 0);
	}
	componentDidUpdate() {
		this.gotoSlide(this.props.activeId, 300);
	}
	setActiveId(id) {
		this.props.updateActiveID(id);
	}
	gotoSlide(id, speed) {
		const activeIdIndex = this.props.restaurants
			.map(r => r.get('id'))
			.indexOf(id);
		const currentSlide = this.r._swiper.activeIndex;
		if (activeIdIndex !== currentSlide) {
			console.log(this.r._swiper);
			this.r._swiper.slideTo(activeIdIndex, speed);
		}
	}
	render() {
		const { restaurants } = this.props;
		const params = {
			slidesPerView: 1,
			centeredSlides: true,
			width: 300,
			on: {
				slideChange: this.onSlideChange,
			}
		};
		return (
			<Swiper
				ref={r => { this.r = r;}}
				swiperOptions={params}
				navigation={false}
				pagination={false}
			> 
				{restaurants.map(r => (
					<Slide
						key={`frame-${r.get('id')}`}
						className={styles.itemWrapper}
						onActive={() => {
							this.setActiveId(r.get('id'));
						}}
					>
						<RestaurantMapItem
							restaurant={r}
							onClickDirection={this.props.showDirection}
							onClickDetail={() => {
								this.props.history.push(`/restaurants/${r.get('id')}`);
							}}
						/>
					</Slide>
				))}
			</Swiper>
		);
	}
}
MapMarker.propTypes = {
	restaurants: PropTypes.instanceOf(Immutable.List),
	activeId: PropTypes.number,
	updateActiveID: PropTypes.func,
};
MapMarker.defaultProps = {
	restaurants: Immutable.List(),
	activeId: 0,
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
