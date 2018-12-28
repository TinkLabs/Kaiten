import React from 'react';
import PropTypes from 'prop-types';
import SharedFadeInInterval from './SharedFadeInInterval';
import SharedFadeOutInterval from './SharedFadeOutInterval';

import { Marker }  from 'react-google-maps';
import Restaurant from 'records/Restaurant';
import marker from './marker.png';



class MapMarker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			opacity: 0,
		};
		this.activeIcon = {
			url: marker,
			size: new window.google.maps.Size(40, 40),
			origin: new window.google.maps.Point(0, 0),
			anchor: new window.google.maps.Point(20, 40),
			scaledSize: new window.google.maps.Size(40, 40),
		};
		this.icon = {
			url: marker,
			size: new window.google.maps.Size(24, 24),
			origin: new window.google.maps.Point(0, 0),
			anchor: new window.google.maps.Point(12, 24),
			scaledSize: new window.google.maps.Size(24, 24),
		};
	}
	componentDidMount() {
		SharedFadeInInterval.subscribe(this.setOpacityIncrement);
		SharedFadeInInterval.run();
	}
	setOpacityIncrement = (opacity) => {
		this.setState((prevState) => ({
			opacity: prevState.opacity > opacity ? prevState.opacity : opacity,
		}));
	}
	setOpacityDecrement = (opacity) => {
		this.setState((prevState) => ({
			opacity: prevState.opacity > opacity ? opacity : prevState.opacity,
		}));
	}
	componentWillLeave(callback) {
		SharedFadeOutInterval.subscribe(this.setOpacityDecrement);
		SharedFadeOutInterval.run();
	}
	render() {
		const { restaurant, isActive, onClick } = this.props;
		return (
			<Marker
				onClick={() => { onClick(restaurant); }}
				position={{ lat: restaurant.get('lat'), lng: restaurant.get('lng') }}
				icon={isActive ? this.activeIcon : this.icon}
				zIndex={isActive ? 2 : 1}
				opacity={this.state.opacity}
			/>
		);
	}
}
MapMarker.propTypes = {
	restaurant: PropTypes.instanceOf(Restaurant),
	onClick: PropTypes.func,
	isActive: PropTypes.bool,
};
MapMarker.defaultProps = {
	restaurant: new Restaurant(),
	onClick: () => {},
	isActive: false,
};

export default MapMarker;
