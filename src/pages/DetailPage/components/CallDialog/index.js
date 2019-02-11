
import React from 'react';
import t from 'translation';
import { Button } from 'components';
import styles from './index.module.scss';
import phone from './phone.svg';

const CallDialog = ({
	tel, onClose, onCall, show,
}) => {
	if (!tel) return null;
	if (!show) return null;
	return (
		<div className={styles.CallDialog}>
			<img src={phone} alt="phone" />
			<p>{t('Call %{tel}', { tel })}</p>
			<p>{t('*Please note that inquiry by phone may only be available in Japanese.')}</p>
			<p>{t('%{tel}に電話をかけますよろしいですか？', { tel })}</p>
			<Button onClick={onCall}>{t('Call')}</Button>
			<Button onClick={onClose}>{t('Close')}</Button>
		</div>
	);
};

export default CallDialog;