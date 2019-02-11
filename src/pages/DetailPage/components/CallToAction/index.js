import React from 'react';
import t from 'translation';
import { Button } from 'components';
import CallDialog from '../../components/CallDialog';
import Mixpanel from 'utils/Mixpanel';
import styles from './index.module.scss';

class CallToAction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenCallDialog: false,
		};
	}
	onCall = () => {
		const { restaurant } = this.props;
		Mixpanel().track('Restaurants Detail Click Call', {
			item: 'restaurant',
			container: 'detail page',
			item_id: restaurant.get('id'),
			item_type: 'restaurant',
		});
		window.open(`tel:${restaurant.get('tel')}`);
	}
	onOpenCall = () => {
		this.setState({
			isOpenCallDialog: true,
		});
	}
	onCloseCall = () => {
		this.setState({
			isOpenCallDialog: false,
		});
	}
	render() {
		const { restaurant } = this.props;
		return (
			<div className={styles.ctaList}>
				<CallDialog
					show={this.state.isOpenCallDialog}
					tel={restaurant.get('tel')}
					onClose={this.onCloseCall}
					onCall={this.onCall}
				/>
				{restaurant.get('tel') ?
					(
						<Button
							onClick={this.onOpenCall}
						>
							<div>
								<h2>{t('Call')}</h2>
								<p>{t('*A dial pad will open')}</p>
							</div>
						</Button>
					) : null}
				{restaurant.get('url_coupon') ?
					(
						<Button
							onClick={() => {
								Mixpanel().track('Restaurants Detail Click Coupon', {
									item: 'restaurant',
									container: 'detail page',
									item_id: restaurant.get('id'),
									item_type: 'restaurant',
								});
								window.open(`olink:${restaurant.get('url_coupon')}`);
							}}
						>
							<div>
								<h2>{t('Check Dining Coupons')}</h2>
							</div>
						</Button>
					) : null}
				{restaurant.get('url_reservation') ?
					(
						<Button
							onClick={() => {
								Mixpanel().track('Restaurants Detail Click Reservation', {
									item: 'restaurant',
									container: 'detail page',
									item_id: restaurant.get('id'),
									item_type: 'restaurant',
								});
								window.open(`olink:${restaurant.get('url_reservation')}`);
							}}
						>
							<div>
								<h2>{t('Book Online')}</h2>
								<h2>({new URL(restaurant.get('url_reservation')).hostname})</h2>
							</div>
						</Button>
					) : null}
				<Button
					onClick={() => {
						Mixpanel().track('Restaurants Detail Click Direction', {
							item: 'restaurant',
							container: 'detail page',
							item_id: restaurant.get('id'),
							item_type: 'restaurant',
						});
						const { lat, lng, name } = restaurant.toJSON();
						window.open(`geo:${lat},${lng}?q=<${lat}><${lng}>(${name})`);
					}}
				>
					<div>
						<h2>{t('View Location')}</h2>
					</div>
				</Button>
			</div>
		);
	}
}
export default CallToAction;