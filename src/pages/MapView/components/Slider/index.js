import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import RestaurantMapItem from '../RestaurantMapItem';
import { Swiper, Slide } from 'react-dynamic-swiper';
import { updateActiveID, showDirection } from 'modules/active';
import styles from './index.module.scss';



class MapMarker extends React.Component {
	constructor(props) {
		super(props);
		this.setActiveId = this.setActiveId.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	setActiveId(id) {
		this.props.updateActiveID(id);
	}
	onClick() {
		console.log(this.props.activeId);
	}
	componentDidUpdate() {
		const activeIdIndex = this.props.restaurants
			.map(r => r.get('id'))
			.indexOf(this.props.activeId);
		const currentSlide = this.r._swiper.activeIndex;
		if (activeIdIndex !== currentSlide) {
			this.r._swiper.slideTo(activeIdIndex);
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
							onClickDetail={() => { console.log('detail', r);}}
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
	activeId: state.getIn(['active', 'id']),
});

const mapDispatchToProps = dispatch => ({
	updateActiveID: bindActionCreators(updateActiveID, dispatch),
	showDirection: bindActionCreators(showDirection, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapMarker);
