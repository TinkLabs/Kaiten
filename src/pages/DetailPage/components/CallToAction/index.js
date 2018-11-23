import React from 'react';
import styles from './index.module.scss';

const CallToAction = ({ restaurant }) => (
	<div className={styles.ctaList}>
		{restaurant.get('tel') ?
			(
				<button
					onClick={() => {
						window.open(`tel:${restaurant.get('tel')}`);
					}}
				>
					<span className="icon icon-handy-icon-phone" />
					<div>
						<h2>Call {restaurant.get('tel')}</h2>
						<p>*Please note that inquiry by phone may only be available in Japanese.</p>
					</div>
				</button>
			) : null}
		{restaurant.get('url_reservation') ?
			(
				<button
					onClick={() => {
						window.open(`olink:${restaurant.get('url_reservation')}`);
					}}
				>
					<span className="icon icon-handyicon-portal-guestservices" />
					<div>
						<h2>Online Reservation</h2>
						<h2>({new URL(restaurant.get('url_reservation')).hostname})</h2>
					</div>
				</button>
			) : null}
		{restaurant.get('url_coupon') ?
			(
				<button
					onClick={() => {
						window.open(`olink:${restaurant.get('url_coupon')}`);
					}}
				>
					<span className="icon icon-handy-icon-ticket" />
					<div>
						<h2>Get to Coupon</h2>
						<p>Save your budget up to 10%</p>
					</div>
				</button>
			) : null}
		<button
			onClick={() => {
				const { lat, lng, name } = restaurant.toJSON();
				window.open(`geo:${lat},${lng}?q=<${lat}><${lng}>(${name})`);
			}}
		>
			<span className="icon icon-handy-icon-map" />
			<div>
				<h2>Direction</h2>
			</div>
		</button>
	</div>
);
export default CallToAction;