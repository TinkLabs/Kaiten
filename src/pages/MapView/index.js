import React from 'react';
import Map from './components/Map';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Slider from './components/Slider';
import styles from './index.module.scss';

const loadingDiv = <div style={{ height: `100%` }} />;
const MapView = ({ restaurants }) => (
	<div className={styles.MapView}>
		<Map
			restaurants={restaurants}
			googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI4R0JTd3dwrzyo0P7l1RiHeduEydL5R0&v=2"
			loadingElement={loadingDiv}
			containerElement={loadingDiv}
			mapElement={loadingDiv}
		/>
		<div className={styles.bottom}>
			<Slider restaurants={restaurants} />
		</div>
	</div>
);
const mapStateToProps = state => ({
	restaurants: state.getIn(['result', 'restaurants'], Immutable.List()),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
