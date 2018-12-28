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
	DirectionsRenderer, Polygon } from 'react-google-maps';
import TransitionGroup from 'react-transition-group/TransitionGroup'; // ES6

import { MapMarker } from 'components';
import CurrentLocationMarker from '../CurrentLocationMarker';
import styles from './index.module.scss';

// import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
const coords = [
	{ lng: 139.7275945,	lat:35.6667933},
	{ lng: 139.726637,	lat:35.6665405},
	{ lng: 139.725548,	lat:35.6665775},
	{ lng: 139.7255293,	lat:35.6665034},
	{ lng: 139.7244939,	lat:35.6664315},
	{ lng: 139.7247487, lat:35.6653725},
	{ lng: 139.7247648, lat:35.6651241},
	{ lng: 139.7246361, lat:35.6648277},
	{ lng: 139.7244, lat:35.6642916},
	{ lng: 139.7238636, lat:35.6632761},
	{ lng: 139.7237992, lat:35.6628708},
	{ lng: 139.7236705, lat:35.6620602},
	{ lng: 139.7239655, lat:35.6619686},
	{ lng: 139.7242552, lat:35.6621255},
	{ lng: 139.7244912, lat:35.6621953},
	{ lng: 139.7248077, lat:35.662204},
	{ lng: 139.7251671, lat:35.6621386},
	{ lng: 139.7255427, lat:35.6621386},
	{ lng: 139.7258753, lat:35.6621909},
	{ lng: 139.7262239, lat:35.6623609},
	{ lng: 139.7266638, lat:35.6627357},
	{ lng: 139.7268516, lat:35.6628839},
	{ lng: 139.7274363, lat:35.6622476},
	{ lng: 139.7278172, lat:35.6619861},
	{ lng: 139.7286487, lat:35.6614892},
	{ lng: 139.7279406, lat:35.6611797},
	{ lng: 139.7281069, lat:35.6609662},
	{ lng: 139.7281015, lat:35.6608006},
	{ lng: 139.7275758, lat:35.6585428},
	{ lng: 139.7286701, lat:35.6582334},
	{ lng: 139.7295767, lat:35.6580459},
	{ lng: 139.7302097, lat:35.6579326},
	{ lng: 139.7306281, lat:35.657889},
	{ lng: 139.7307569, lat:35.6578498},
	{ lng: 139.7315991, lat:35.6571437},
	{ lng: 139.7321463, lat:35.657536},
	{ lng: 139.7320658, lat:35.6576973},
	{ lng: 139.7322232, lat:35.6577501},
	{ lng: 139.7325615, lat:35.657893},
	{ lng: 139.7326219, lat:35.6579179},
	{ lng: 139.7326767, lat:35.6579401},
	{ lng: 139.7327606, lat:35.6578069},
	{ lng: 139.7328949, lat:35.6576427},
	{ lng: 139.7330198, lat:35.6574972},
	{ lng: 139.7332517, lat:35.6573146},
	{ lng: 139.7333745, lat:35.6572375},
	{ lng: 139.7335541, lat:35.6571384},
	{ lng: 139.7336795, lat:35.6570835},
	{ lng: 139.7337071, lat:35.6571232},
	{ lng: 139.7337241, lat:35.657193},
	{ lng: 139.7337504, lat:35.6572664},
	{ lng: 139.7338607, lat:35.657239},
	{ lng: 139.7343053, lat:35.6571396},
	{ lng: 139.7345734, lat:35.6570971},
	{ lng: 139.7346789, lat:35.6570893},
	{ lng: 139.7350129, lat:35.6571003},
	{ lng: 139.7352992, lat:35.6571216},
	{ lng: 139.7353143, lat:35.6571712},
	{ lng: 139.7353619, lat:35.6572646},
	{ lng: 139.7353928, lat:35.6573761},
	{ lng: 139.7354365, lat:35.6574889},
	{ lng: 139.7354031, lat:35.6575798},
	{ lng: 139.7356673, lat:35.6575643},
	{ lng: 139.7357498, lat:35.6573581},
	{ lng: 139.7357926, lat:35.6573225},
	{ lng: 139.7361126, lat:35.6574806},
	{ lng: 139.7363851, lat:35.6576404},
	{ lng: 139.7363926, lat:35.6576699},
	{ lng: 139.7362866, lat:35.6579097},
	{ lng: 139.7362383, lat:35.6580491},
	{ lng: 139.7362276, lat:35.6581712},
	{ lng: 139.736237, lat:35.6583041},
	{ lng: 139.7363108, lat:35.6587138},
	{ lng: 139.7364274, lat:35.6592848},
	{ lng: 139.7365159, lat:35.6595561},
	{ lng: 139.7365394, lat:35.659597},
	{ lng: 139.7366829, lat:35.66012},
	{ lng: 139.7368144, lat:35.6601004},
	{ lng: 139.7368552, lat:35.6600939},
	{ lng: 139.737271, lat:35.6606027},
	{ lng: 139.7373649, lat:35.660716},
	{ lng: 139.7375754, lat:35.6609841},
	{ lng: 139.7376787, lat:35.6611246},
	{ lng: 139.7377404, lat:35.6612603},
	{ lng: 139.738075, lat:35.6611385},
	{ lng: 139.7381202, lat:35.6613256},
	{ lng: 139.7382677, lat:35.6619591},
	{ lng: 139.7384883, lat:35.6628949},
	{ lng: 139.7385619, lat:35.6632566},
	{ lng: 139.7389337, lat:35.6631902},
	{ lng: 139.7390629, lat:35.6631279},
	{ lng: 139.7393009, lat:35.6630615},
	{ lng: 139.7396088, lat:35.662972},
	{ lng: 139.7398256, lat:35.662871},
	{ lng: 139.7402436, lat:35.6626565},
	{ lng: 139.7402956, lat:35.6626122},
	{ lng: 139.740625, lat:35.6624236},
	{ lng: 139.7407659, lat:35.6623476},
	{ lng: 139.7408606, lat:35.6623273},
	{ lng: 139.7411825, lat:35.6622786},
	{ lng: 139.7412358, lat:35.6624124},
	{ lng: 139.741391, lat:35.6624384},
	{ lng: 139.7416585, lat:35.6624946},
	{ lng: 139.7420373, lat:35.662479},
	{ lng: 139.7421241, lat:35.6626485},
	{ lng: 139.7421294, lat:35.6629798},
	{ lng: 139.7422743, lat:35.6632805},
	{ lng: 139.7423923, lat:35.6636771},
	{ lng: 139.7423387, lat:35.6637904},
	{ lng: 139.7421831, lat:35.6639517},
	{ lng: 139.7420061, lat:35.6640606},
	{ lng: 139.7423708, lat:35.664588},
	{ lng: 139.7426015, lat:35.6647231},
	{ lng: 139.7426605, lat:35.6648016},
	{ lng: 139.7429287, lat:35.6650979},
	{ lng: 139.7432506, lat:35.6653158},
	{ lng: 139.7431862, lat:35.6654727},
	{ lng: 139.7433847, lat:35.6659696},
	{ lng: 139.743669, lat:35.6665274},
	{ lng: 139.7429117, lat:35.6668151},
	{ lng: 139.7425586, lat:35.6661918},
	{ lng: 139.7423869, lat:35.6658998},
	{ lng: 139.7420704, lat:35.6660219},
	{ lng: 139.7416145, lat:35.66634},
	{ lng: 139.7408688, lat:35.6655381},
	{ lng: 139.7407079, lat:35.665464},
	{ lng: 139.7406167, lat:35.665756},
	{ lng: 139.7400749, lat:35.6661613},
	{ lng: 139.7396886, lat:35.6665536},
	{ lng: 139.7392434, lat:35.6666756},
	{ lng: 139.7393829, lat:35.6670591},
	{ lng: 139.7397959, lat:35.6676082},
	{ lng: 139.7390932, lat:35.6680092},
	{ lng: 139.7389054, lat:35.6677826},
	{ lng: 139.738825, lat:35.6681051},
	{ lng: 139.7376233, lat:35.6686803},
	{ lng: 139.736942, lat:35.6681748},
	{ lng: 139.736352, lat:35.667691},
	{ lng: 139.7355902, lat:35.6671027},
	{ lng: 139.7347748, lat:35.6669022},
	{ lng: 139.7344315, lat:35.6664141},
	{ lng: 139.7336054, lat:35.6669371},
	{ lng: 139.7325432, lat:35.6654553},
	{ lng: 139.7322321, lat:35.6651589},
	{ lng: 139.7315991, lat:35.6649846},
	{ lng: 139.7310841,	lat:35.6643483},
	{ lng: 139.7275945, lat:35.6667933 },
];
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
						<Polygon path={coords} options={{
            fillColor: "#000",
            fillOpacity: 0.4,
            strokeColor: "#000",
            strokeOpacity: 1,
            strokeWeight: 1
        }}/>
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
