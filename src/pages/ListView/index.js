import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { updateActiveID } from 'modules/result';
import Immutable from 'immutable';
import { scroller, Element } from 'react-scroll';
import RestaurantListItem from './components/Restaurant';


class ListView extends React.PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			activeId: props.activeId,
		};
		this.scrollTo(props.activeId);
	}
	componentDidMount() {
		this.scrollTo(this.props.activeId);

	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.activeId !== prevState.activeId) {
			return {
				activeId: nextProps.activeId,
			};
		}
		return null;
	}
	componentDidUpdate(nextProps, nextState) {
		if (nextState.activeId !== this.state.activeId) {
			this.scrollTo(nextState.activeId);
		}
	}
	scrollTo(id) {
		// scroller.scrollTo(`element-${id}`, {
		// 	delay: 0,
		// 	smooth: true,
		// 	containerId: 'list',
		// 	offset: 50, // Scrolls to element + 50 pixels down the page
		// });
	}
	render() {
		const { restaurants, history } = this.props;
		return (
			<div id="list" style={{ height: '100%' }}>
				{restaurants.map(r => (
					<Element name={`element-${r.get('id')}`} key={`element-${r.get('id')}`}>
						<RestaurantListItem
							restaurant={r}
							onClick={() => {
								this.props.updateActiveID(r.get('id'));
								history.push(`/restaurants/${r.get('id')}`);
							}}
						/>
					</Element>
				))}
			</div>
		);
	}
}
const mapStateToProps = state => ({
	lat: state.getIn(['device', 'lat']),
	lng: state.getIn(['device', 'lng']),
	locationEnabled: state.getIn(['device', 'locationEnabled']),
	restaurants: state.getIn(['result', 'restaurants'], Immutable.OrderedMap()).valueSeq(),
	activeId: state.getIn(['result', 'id']),
});

const mapDispatchToProps = dispatch => ({
	updateActiveID: bindActionCreators(updateActiveID, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListView));
