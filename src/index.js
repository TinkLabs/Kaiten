import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from 'pages/AppRoute';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import 'handy-font/styles.css';
import 'react-dynamic-swiper/lib/styles.css';

import store from 'store';

const Main = () => (
	<Provider store={store}>
		<HashRouter onUpdate={() => window.scrollTo(0, 0)}>
			<App />
		</HashRouter>
	</Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
