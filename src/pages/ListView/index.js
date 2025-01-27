import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchRestaurants } from 'modules/result';
import { updateActiveID } from 'modules/result';
import Nav from './components/Nav';
import Immutable from 'immutable';
import { Element } from 'react-scroll';
import styles from './index.module.scss';
// import PullToRefresh from 'react-pull-to-refresh';
import t from 'translation';
import Mixpanel from 'utils/Mixpanel';
import RestaurantListItem from './components/Restaurant';


class ListView extends React.PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			activeId: props.activeId,
			loading: false,
			error: false,
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
	handleRefresh = (resolve, reject) => {
		// do some async code here
		this.setState({
			loading: true,
			error: false,
		}, () => {
			this.props.fetchRestaurants(this.props.lat, this.props.lng)
				.then(() => {
					resolve();
					this.setState({
						loading: false,
					});
				})
				.catch(() => {
					resolve();
					this.setState({
						loading: false,
						error: true,
					});
				});	
		});
	}
	render() {
		const { restaurants, history } = this.props;
		return (
			<div id="list" style={{ height: '100%' }}>
				<Nav />
				<div className={styles.listview}>
					{this.state.error ?
					<div className={styles.error}>{t('Network disconnected / Server error, please try again.')}</div> : null}
					<div style={{ opacity: this.state.loading ? 0.5 : 1 }}>
						{restaurants.size ? restaurants.map((r, i) => (
							<Element name={`element-${r.get('id')}`} key={`element-${r.get('id')}`}>
								<RestaurantListItem
									restaurant={r}
									onClick={() => {
										Mixpanel().track('Restaurants Click Restaurant Detail', {
											item: 'restaurant',
											container: 'list view',
											item_id: r.get('id'),
											item_type: 'restaurant',
											item_position: i + 1,
										});

										this.props.updateActiveID(r.get('id'));
										history.push(`/restaurants/${r.get('id')}`);
									}}
								/>
							</Element>
						)) : null}
					</div>
				</div>
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
	fetchRestaurants: bindActionCreators(fetchRestaurants, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListView));
