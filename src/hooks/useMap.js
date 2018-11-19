import { useState, useEffect } from 'react';

export default function useMap({ ilat, ilng }) {
	const [ lat, setLat ] = useState(ilat);
	const [ lng, setLng ] = useState(ilng);
	const [ watchId, setWatchId ] = useState(0);
	navigator.geolocation.getCurrentPosition((position) => {
		setLat(position.coords.latitude);
		setLng(position.coords.longitude);
	}, (err) => {
		alert(JSON.stringify(err));
	});
	useEffect(() => {
		if (!watchId) {
			setWatchId(navigator.geolocation.watchPosition((position) => {
				setLat(position.coords.latitude);
				setLng(position.coords.longitude);
			}));
		}
		return () => {
			navigator.geolocation.clearWatch(watchId);
		}
	});
	return {
		lat,
		lng,
	};
} 