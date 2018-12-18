import React from 'react';
import PropTypes from 'prop-types';

import { Marker }  from 'react-google-maps';
import Restaurant from 'records/Restaurant';
import marker from './marker.png';


class MapMarker extends React.Component {
	state = {
		opacity: 0,
	}
	componentWillEnter(callback) {
		callback();
		var self = this;
		if(!this.timerId){     
			this.timerId = setInterval(() => {
				self.setState((prev) => {
					var opt = prev.opacity + 0.3;
					if (prev.opacity >= 1) {
						clearInterval(this.timerId);
						this.timerId = null;
						return {
							opacity: opt,
						};
					}
					return {
						opacity: opt,
					};
				});
			}, 100);
		}
	}
	componentWillLeave(callback) {
		var self = this;
		if (this.timerId) {
			clearInterval(this.timerId);
		}
		if(!this.timerIdUnmount){
			this.timerIdUnmount = setInterval(() => {
				self.setState((prev) => {
					var opt = prev.opacity - 0.3;
					if (prev.opacity <= 0) {
						clearInterval(this.timerIdUnmount);
						this.timerIdUnmount = null;
						callback();
						return {
							opacity: 0,
						};
					}
					return {
						opacity: opt,
					};
				});
			}, 100);
		}
	}
	render() {
		const { restaurant, isActive, onClick } = this.props;
		const activeIcon = {
			url: marker,
			size: new window.google.maps.Size(40, 40),
			origin: new window.google.maps.Point(0, 0),
			anchor: new window.google.maps.Point(20, 40),
			scaledSize: new window.google.maps.Size(40, 40),
		};
		const icon = {
			url: marker,
			size: new window.google.maps.Size(24, 24),
			origin: new window.google.maps.Point(0, 0),
			anchor: new window.google.maps.Point(12, 24),
			scaledSize: new window.google.maps.Size(24, 24),
		};
		return (
			<Marker
				onClick={() => { onClick(restaurant); }}
				position={{ lat: restaurant.get('lat'), lng: restaurant.get('lng') }}
				icon={isActive ? activeIcon : icon}
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
