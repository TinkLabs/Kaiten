import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Image({ src, size, ...props}) {
	return (
		<div
			{...props}
			className={styles.Image}
			style={{
				backgroundImage: `url(${src})`,
				width: size,
				height: size,
			}}
		/>
	);
}
Image.propTypes = {
	src: PropTypes.string,
	size: PropTypes.number,
};
Image.defaultProps = {
	src: '',
	size: 50,
};

export default Image;
