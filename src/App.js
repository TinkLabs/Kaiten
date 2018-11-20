import React, { Component, useState, useEffect } from 'react';
import { Element, scroller } from 'react-scroll'
import list from 'api/list';
import Geo from 'utils/Geo';
import Immutable from 'immutable';
import Restaurant from 'records/Restaurant';
import ListItem from 'components/Restaurant/ListItem';
import MapItem from 'components/Restaurant/MapItem';
import MapMarker from 'components/Restaurant/MapMarker';
import CurrentLocationMarker from 'components/CurrentLocationMarker';

import Dropdown from 'components/Dropdown';
import GoogleMapReact from 'google-map-react';
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");


const {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	DirectionsRenderer,
} = require("react-google-maps");


const Mapp = withScriptjs(withGoogleMap((props) => (
<GoogleMap	
	defaultZoom={16}
	defaultCenter={props.defaultCenter}
	options={{
		styles: [
			{
				featureType: "poi",
				stylers: [
					{ visibility: "off" }
				],
			},
		],
		clickableIcons: false,
		disableDefaultUI: true,
	}}
>
	<CurrentLocationMarker />
	<MarkerClusterer
		averageCenter
		enableRetinaIcons
		gridSize={20}
	>
	{props.restaurants.map(r => (
		<MapMarker
			isActive={props.activeId === r.get('id')}
			restaurant={r}
			onClick={props.onClick}
		/>))}
	</MarkerClusterer>
	{props.directions && <DirectionsRenderer directions={props.directions} options={{suppressMarkers: true}} />}
</GoogleMap>)));
		

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: Immutable.List(),
			directions: null,
			activeId: null,
		};
		list().then(({ restaurants }) => {
			this.setState({
				restaurants: Immutable.List(restaurants.map(r => new Restaurant(r))),
			})
		})
		this.onClick = this.onClick.bind(this);
	}
	onClick(r) {
		this.setState({
			activeId: r.get('id'),
		});
		scroller.scrollTo(`name-${r.get('id')}`, {
			duration: 300,
			delay: 0,
			smooth: true,
			containerId: 'list', // Scrolls to element + 50 pixels down the page
		})
		const DirectionsService = new window.google.maps.DirectionsService();
		const { lat, lng } = Geo.getLocation();
		DirectionsService.route({
			origin: new window.google.maps.LatLng(lat, lng),
			destination: new window.google.maps.LatLng(r.get('lat'), r.get('lng')),
			travelMode: window.google.maps.TravelMode.WALKING,
		}, (result, status) => {
			if (status === window.google.maps.DirectionsStatus.OK) {
				console.log(result.routes[0].legs[0].distance);
				console.log(result.routes[0].legs[0].duration);
				this.setState({
					directions: result,
				});
			} else {
				console.error(`error fetching directions ${result}`);
			}
		});
	}
	render() {
		const { lat, lng } = Geo.getLocation();
		
		return (
			<div className="App">
				<Mapp
					onClick={this.onClick}
					directions={this.state.directions}
					restaurants={this.state.restaurants}
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDI4R0JTd3dwrzyo0P7l1RiHeduEydL5R0&v=2"
					loadingElement={<div style={{ height: `50vh` }} />}
					containerElement={<div style={{ height: `50vh` }} />}
					mapElement={<div style={{ height: `100%` }} />}
					defaultCenter={{ lat: 35.6592537, lng: 139.7239108 }}
					activeId={this.state.activeId}
				/>
			<div id="list" style={{ height: '50vh', width: '100%', overflow: 'overlay'}}>
					{this.state.restaurants.map(r => (
						<Element id={`id-${r.get('id')}`} name={`name-${r.get('id')}`} key={`key-${r.get('id')}`}>
							<ListItem
								restaurant={r}
							/>
						</Element>
					))}
				</div>
			</div>
		);
	}
}


export default App;
