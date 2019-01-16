
import React from 'react';
import renderHTML from 'react-render-html';
import styles from './index.module.scss';
import avatar from './avatar.svg';

const Comments = ({
	comments,
}) => {
	const rating = {
		"1": '⭑',
		"2": '⭑⭑',
		"3": '⭑⭑⭑',
	};
	return (
		<div className={styles.Comments}>
			{comments.filter(cm => cm.get('comment')).map(cm => (
				<div className={styles.Comment} key={cm.get('id')}>
					<div className={styles.user}>
						<img className={styles.avatar} src={avatar} /> 
						<div className={styles.name}>{cm.get('userName')}</div>
					</div>
					<div className={styles.rightContainer}>
						<div className={styles.rating}>
							{rating[cm.get('rating')]}
						</div>
						<div className={styles.comment}>
							{renderHTML(cm.get('comment').split('\n').join('<br />'))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Comments;