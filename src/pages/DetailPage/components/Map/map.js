import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateActiveID, hideDirection, fetchRestaurants } from 'modules/result';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap } from 'react-google-maps';
import { MapMarker } from 'components';

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
		
class Map extends React.PureComponent {
	render() {
		return (
			<div style={{ height: '100%', position: 'relative' }}>
				<GoogleMap	
					maxZoom={19}
					defaultZoom={17}
					defaultCenter={{
						lat: this.props.restaurant.get('lat'),
						lng: this.props.restaurant.get('lng'),
					}}
					options={mapOptions}
				>
					<MapMarker
						isActive
						restaurant={this.props.restaurant}
					/>
				</GoogleMap>
			</div>
		);
	}
}

MapMarker.propTypes = {

};
MapMarker.defaultProps = {

};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({


});
export default withScriptjs(withGoogleMap(Map));
