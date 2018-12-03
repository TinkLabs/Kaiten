import React from 'react';

function Button({ onClick, children, ...props}) {
	return (
		<button
			{...props}
			onClick={() => { setTimeout(onClick, 10); }}
		>
			{children}
		</button>
	);
}
export default Button;
