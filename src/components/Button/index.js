import React from 'react';

function Button({ onClick, children, ...props}) {
	return (
		<button
			{...props}
			onClick={() => {}}
			onKeyUp={onClick}
		>
			{children}
		</button>
	);
}
export default Button;
