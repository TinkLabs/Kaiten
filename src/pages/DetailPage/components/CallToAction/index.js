import React from 'react';
import t from 'translation';
import Mixpanel from 'utils/Mixpanel';
import styles from './index.module.scss';

const CallToAction = ({ restaurant }) => (
	<div className={styles.ctaList}>
		{restaurant.get('tel') ?
			(
				<button
					onClick={() => {
						Mixpanel().track('Restaurants Detail Click Call', {
							item: 'restaurant',
							container: 'detail page',
							item_id: restaurant.get('id'),
							item_type: 'restaurant',
						});
						window.open(`tel:${restaurant.get('tel')}`);
					}}
				>
					<span className="icon icon-handy-icon-phone-solid" />
					<div>
						<h2>{t('Call %{tel}', { tel: restaurant.get('tel')})}</h2>
						<p>{t('*Please note that inquiry by phone may only be available in Japanese.')}</p>
					</div>
				</button>
			) : null}
		{restaurant.get('url_reservation') ?
			(
				<button
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
					<span className="icon icon-handy-icon-reservation" />
					<div>
						<h2>{t('Online Reservation')}</h2>
						<h2>({new URL(restaurant.get('url_reservation')).hostname})</h2>
					</div>
				</button>
			) : null}
		{restaurant.get('url_coupon') ?
			(
				<button
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
					<span className="icon icon-handy-icon-coupon" />
					<div>
						<h2>{t('Get to Coupon')}</h2>
						<p>{t('Save your budget up to 10%')}</p>
					</div>
				</button>
			) : null}
		<button
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
			<span className="icon icon-handy-icon-direction" />
			<div>
				<h2>{t('Direction')}</h2>
			</div>
		</button>
	</div>
);
export default CallToAction;