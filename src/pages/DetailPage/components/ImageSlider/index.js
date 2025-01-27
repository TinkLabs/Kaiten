import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Image } from 'components';
import { Swiper, Slide } from 'react-dynamic-swiper';
import { updateActiveID, showDirection } from 'modules/result';
import styles from './index.module.scss';


const params = {
	slidesPerView: 1,
	centeredSlides: true,
};

const Slider = ({ images = Immutable.List() }) => (
	<div className={styles.slider}>
		<Swiper
			swiperOptions={params}
			pagination={images.size > 1}
			navigation={false}
		> 
			{images && images.map((img, i) => (
				<Slide
					key={`img-${i}`}
					className={styles.itemWrapper}
				>
					<div className={styles.img}>
					<Image src={img} width="340" height={180}/>
					</div>
				</Slide>
			))}
		</Swiper>
	</div>
);
Slider.propTypes = {
	images: PropTypes.instanceOf(Immutable.List),
};
Slider.defaultProps = {
	images: Immutable.List(),
};

const mapStateToProps = state => ({
	activeId: state.getIn(['result', 'id']),
});

const mapDispatchToProps = dispatch => ({
	updateActiveID: bindActionCreators(updateActiveID, dispatch),
	showDirection: bindActionCreators(showDirection, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Slider));
