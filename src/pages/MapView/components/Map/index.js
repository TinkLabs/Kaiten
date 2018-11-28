import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateActiveID, hideDirection } from 'modules/result';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	DirectionsRenderer} from 'react-google-maps';
import Geo from 'utils/Geo';
import MapMarker from '../MapMarker';
import CurrentLocationMarker from '../CurrentLocationMarker';
import styles from './index.module.scss';

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const mapOptions = {
	styles: [
		{
			featureType: "poi",
			stylers: [
				{ visibility: "off" }
			],
		},
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
		};
		this.mapRef = null;
		this.onClick = this.onClick.bind(this);
		this.setCenter = this.setCenter.bind(this);
		this.getNewDirections = this.getNewDirections.bind(this);
		this.gotoCurrentLocation = this.gotoCurrentLocation.bind(this);
		if (props.activeId) {
			const r = props.restaurants.find(r => r.get('id') === props.activeId);
			this.setState({
				lastActiveId: props.activeId,
			}, () => {
				this.getNewDirections(r).then((directions) => {
					this.setState({
						directions,
					});
				});
			})
		}
		
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.activeId !== prevState.lastActiveId) {
			return {
				directions: null
			};
		}
	}
	componentDidUpdate() {
		if (this.props.activeId !== this.state.lastActiveId) {
			this.props.hideDirection();
			const r = this.props.restaurants.find(r => r.get('id') === this.props.activeId);
			this.setCenter(r.get('lat'), r.get('lng'));
			this.setState({
				lastActiveId: this.props.activeId,
			});
			return;
		}
		if (this.props.showDirection && !this.state.directions) {
			const r = this.props.restaurants.find(r => r.get('id') === this.props.activeId);
			this.getNewDirections(r).then((directions) => {
				this.setState({
					directions,
				});
			});
		}
	}
	
	onClick(r) {
		this.props.updateActiveID(r.get('id'));
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
		this.mapRef.panTo(new window.google.maps.LatLng(lat, lng));
	}
	gotoCurrentLocation() {
		if (!this.props.locationEnabled) return;
		this.setCenter(this.props.lat, this.props.lng);
	}
	render() {
		return (
			<div style={{ height: '100%', position: 'relative' }}>
				<GoogleMap	
					ref={(ref) => { this.mapRef = ref; }}
					defaultZoom={17}
					defaultCenter={{
						lat: this.props.lat || Geo.getHandyLocation().lat,
						lng: this.props.lng || Geo.getHandyLocation().lng,
					}}
					options={mapOptions}
				>
					{this.props.locationEnabled ? <CurrentLocationMarker /> : null}
					<MarkerClusterer
						averageCenter
						enableRetinaIcons
						gridSize={5}
					>
						{this.props.restaurants.map(r => (
							<MapMarker
								key={`key-map-marker-${r.get('id')}`}
								isActive={this.props.activeId === r.get('id')}
								restaurant={r}
								onClick={() => { this.onClick(r); }}
							/>))}
					</MarkerClusterer>
					{this.state.directions && <DirectionsRenderer directions={this.state.directions} options={{suppressMarkers: true}} />}
				</GoogleMap>
				<button onClick={this.gotoCurrentLocation} className={styles.btnLocation}>
					<span className="icon icon-handy-icon-guest-experience" />
				</button>
			</div>
		);
	}
}

MapMarker.propTypes = {
	restaurants: PropTypes.instanceOf(Immutable.List),
	onClick: PropTypes.func,
	activeId: PropTypes.number,
};
MapMarker.defaultProps = {
	restaurants: Immutable.List(),
	onClick: () => {},
	activeId: 0,
};

const mapStateToProps = state => ({
	lat: state.getIn(['device', 'lat']),
	lng: state.getIn(['device', 'lng']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
	activeId: state.getIn(['result', 'id']),
	showDirection: state.getIn(['result', 'show_direction']),
});

const mapDispatchToProps = dispatch => ({
	updateActiveID: bindActionCreators(updateActiveID, dispatch),
	hideDirection: bindActionCreators(hideDirection, dispatch),

});
export default withScriptjs(withGoogleMap(connect(mapStateToProps, mapDispatchToProps)(Map)));
