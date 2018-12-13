import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Image({ src, size, width, height, heightRatio, ...props}) {
	return (
		<div
			{...props}
			className={styles.Image}
			style={{
				backgroundImage: `url(${src})`,
				width: size || width || 50,
				height: size || height || 50,
				paddingBottom: heightRatio,
			}}
		/>
	);
}
Image.propTypes = {
	src: PropTypes.string,
	size: PropTypes.number,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	heightRatio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Image.defaultProps = {
	src: '',
	size: 0,
	width: 0,
	height: 0,
	heightRatio: 0,
};

export default Image;
