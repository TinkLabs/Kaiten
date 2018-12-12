import React from 'react';
import PropTypes from 'prop-types';
import defaultImg from './mask.svg';
import styles from './index.module.scss';

function Image({ src, size, width, height, heightRatio, ...props}) {
	return (
		<div
			{...props}
			className={styles.Image}
			style={{
			}}
		>
			<img src={defaultImg} />
		</div>
	);
}
Image.propTypes = {
	src: PropTypes.string,
	size: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number,
	heightRatio: PropTypes.number,
};
Image.defaultProps = {
	src: '',
	size: 0,
	width: 0,
	height: 0,
	heightRatio: 0,
};

export default Image;
