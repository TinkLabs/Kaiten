import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {		
		return (
			<div className="App">
				
			</div>
		);
	}
}
const mapStateToProps = state => ({
	lat: state.getIn(['device', 'lat']),
	lng: state.getIn(['device', 'lng']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
