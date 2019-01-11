import React from 'react';
import renderHTML from 'react-render-html';
import { LocaleContext } from 'pages/locale-context';
import zh_TW from './zh_TW.json';
import ja_JP from './ja_JP.json';
import en_US from './en_US.json';
import zh_CN from './zh_CN.json';


const translation = {
	zh_CN,
	zh_TW,
	ja_JP,
	en_US,
};
function putVarsToString(str, vars = {}) {
	let result = str;
	const matches = str.match(/%{\s?\w+}/g) || [];
	matches.forEach((value) => {
		const key = value.replace('%{', '').replace('}', '').trim();
		const varValue = typeof (vars[key]) !== 'undefined' ? vars[key] : '';
		result = result.replace(new RegExp(value, 'g'), varValue);
	});
	return result;
}

export default function t(key, vars = {}) {
	return (
		<LocaleContext.Consumer>
			{locale => {
				let str = key;
				if (translation[locale] && translation[locale][key]) {
					str = translation[locale][key];
				}
				if (typeof vars.renderHTML !== 'undefined' && vars.renderHTML === true) {
					return renderHTML(putVarsToString(str, vars));
				}
				return putVarsToString(str, vars);
			}}
		</LocaleContext.Consumer>
	)
	
};