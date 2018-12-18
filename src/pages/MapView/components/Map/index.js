import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { updateActiveID, hideDirection, fetchRestaurants } from 'modules/result';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	DirectionsRenderer} from 'react-google-maps';
import TransitionGroup from 'react-transition-group/TransitionGroup'; // ES6

import { MapMarker } from 'components';
import CurrentLocationMarker from '../CurrentLocationMarker';
import styles from './index.module.scss';

// import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

const mapOptions = {
	styles: [
		{
			'featureType': 'landscape.man_made',
			'stylers': [
				{
					'visibility': 'simplified'
				}
			]
		},
		{
			'featureType': 'poi.business',
			'elementType': 'labels.icon',
			'stylers': [
				{
					'visibility': 'off'
				}
			]
		},
		{
			'featureType': 'poi.business',
			'elementType': 'labels.text',
			'stylers': [
				{
					'visibility': 'off'
				}
			]
		}
	],
	gestureHandling: 'greedy',
	clickableIcons: false,
	disableDefaultUI: true,
};
		
class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			directions: null,
			lastActiveId: null,
			zoom: 18,
			currentLocation: false,
		};
		this.mapRef = null;
		this.onClick = this.onClick.bind(this);
		this.setCenter = this.setCenter.bind(this);
		this.getNewDirections = this.getNewDirections.bind(this);
		this.gotoCurrentLocation = this.gotoCurrentLocation.bind(this);
		
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.activeId !== prevState.lastActiveId) {
			return {
				activeId: nextProps.activeId,
			};
		}
		return null;
	}
	componentDidMount() {
		if (this.props.activeId !== this.state.lastActiveId) {
			this.props.hideDirection();
			const r = this.props.restaurants.get(this.props.activeId);
			if (!r) return;
			this.setCenter(r.get('lat'), r.get('lng'));
			this.setState({
				lastActiveId: this.props.activeId,
			});
			return;
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.showDirection && !this.props.showDirection) {
			const r = nextProps.restaurants.get(nextProps.activeId);
			if (!r) return;
			this.getNewDirections(r).then((directions) => {
				this.setState({
					directions,
				});
			});
		}
		if (nextProps.activeId !== nextState.lastActiveId && nextProps.activeId !== this.props.activeId ) {
			if (this.props.restaurants !== nextProps.restaurants) return true;
			const r = nextProps.restaurants.get(nextProps.activeId);
			if (!r) return true;
			const shouleUpdateCenter = this.isOutBound(r.get('lat'), r.get('lng'));
			if (shouleUpdateCenter) this.setCenter(r.get('lat'), r.get('lng'));
		}
		return true;
	}
	isOutBound = (lat, lng) => {
		if (!lat || !lng || !this.mapRef) return false;
		return !this.mapRef.getBounds().contains({ lat, lng });
	}
	onClick(r) {
		this.setState({
			directions: null,
		}, () => {
			this.props.hideDirection();
			this.props.updateActiveID(r.get('id'));
		});
	}
	getNewDirections(restaurant) {
		return new Promise((resolve, reject) => {
			const lat = restaurant.get('lat');
			const lng = restaurant.get('lng');
			const DirectionsService = new window.google.maps.DirectionsService();
			DirectionsService.route({
				origin: new window.google.maps.LatLng(this.props.lat, this.props.lng),
				destination: new window.google.maps.LatLng(lat, lng),
				travelMode: window.google.maps.TravelMode.WALKING,
			}, (result, status) => {
				if (status === window.google.maps.DirectionsStatus.OK) {
					resolve(result);
				} else {
					console.error(`error fetching directions ${result}`);
					reject(result);
				}
			});
		});
	}
	setCenter(lat, lng) {
		if (!this.mapRef) return;
		this.mapRef.panTo(new window.google.maps.LatLng(lat, lng));
		this.setState({
			currentLocation: false,
		});
	}
	gotoCurrentLocation() {
		if (!this.props.locationEnabled) return;
		this.setState({
			currentLocation: true,
		}, () => {
			if (!this.mapRef) return;
			this.mapRef.panTo(new window.google.maps.LatLng(this.props.lat, this.props.lng));
			this.props.fetchRestaurants(this.props.lat, this.props.lng);
		});
	}
	fetchRestaurants = () => {
		this.setState({
			currentLocation: false,
		}, () => {
			const lat = this.mapRef.getCenter().lat();
			const lng = this.mapRef.getCenter().lng();
			this.props.fetchRestaurants(lat, lng);
		});
	}
	updateZoom = (zoom) => {
		this.setState({
			zoom,
		});
	}
	render() {
		let latlng = {
			lat: this.props.resultLat,
			lng: this.props.resultLng,
		};
		const r = this.props.restaurants.get(this.props.activeId);
		if (r) {
			latlng = {
				lat: r.get('lat'),
				lng: r.get('lng'),
			};
		};
		return (
			<div style={{ height: '100%', position: 'relative' }}>
				{this.props.resultLat && this.props.resultLng ? 
					<GoogleMap	
						ref={(ref) => { this.mapRef = ref; }}
						maxZoom={23}
						defaultZoom={this.state.zoom}
						defaultCenter={latlng}
						minZoom={15}
						options={mapOptions}
						onDragEnd={this.fetchRestaurants}
						onZoomChanged={this.updateZoom}
					>
						{this.props.locationEnabled ? <CurrentLocationMarker /> : null}
						<TransitionGroup>
							{this.props.restaurants.valueSeq().map(r => (
								<MapMarker
									key={`key-map-marker-${r.get('id')}`}
									isActive={this.props.activeId === r.get('id')}
									restaurant={r}
									onClick={() => { this.onClick(r); }}
								/>))}
						</TransitionGroup>
						{this.state.directions && <DirectionsRenderer directions={this.state.directions} options={{suppressMarkers: true}} />}
					</GoogleMap>
					: null}
				{this.props.locationEnabled ?
					<button
						onClick={this.gotoCurrentLocation}
						className={classnames(styles.btnLocation, {
							[styles.active]: this.state.currentLocation,
						})}
					>
						<span className='icon icon-hotel-icon-gps-arrow' />
					</button>
					: null}
			</div>
		);
	}
}

MapMarker.propTypes = {
	restaurants: PropTypes.instanceOf(Immutable.OrderedMap),
	onClick: PropTypes.func,
	activeId: PropTypes.string,
};
MapMarker.defaultProps = {
	restaurants: Immutable.OrderedMap(),
	onClick: () => {},
	activeId: '',
};

const mapStateToProps = state => ({
	resultLat: state.getIn(['result', 'lat']),
	resultLng: state.getIn(['result', 'lng']),
	lat: state.getIn(['device', 'lat']),
	lng: state.getIn(['device', 'lng']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
	activeId: state.getIn(['result', 'id']),
	showDirection: state.getIn(['result', 'show_direction']),
});

const mapDispatchToProps = dispatch => ({
	updateActiveID: bindActionCreators(updateActiveID, dispatch),
	hideDirection: bindActionCreators(hideDirection, dispatch),
	fetchRestaurants: bindActionCreators(fetchRestaurants, dispatch),

});
export default withScriptjs(withGoogleMap(connect(mapStateToProps, mapDispatchToProps)(Map)));
