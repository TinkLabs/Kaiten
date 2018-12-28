let subscribers = [];
let opacity = 0;
let timerIdUnmount = null;
function subscribe(setOpacity) {
	subscribers.push(setOpacity);
	return subscribers.length - 1;
}
function run() {
	if (timerIdUnmount) return;
	timerIdUnmount = setInterval(() => {
		opacity = opacity + 0.3
		opacity = parseInt(opacity * 10, 10)/ 10;
		console.log(opacity);

		let tempSubscribers;
		if (opacity >= 1) {
			clearInterval(timerIdUnmount);
			timerIdUnmount = null;
			tempSubscribers = subscribers;

			subscribers = [];
		} else {
			tempSubscribers = subscribers;
		}
		tempSubscribers.forEach((sub) => {
			if (!sub) return;
			sub(opacity);
		});
		if (opacity >= 1) {
			opacity = 0;
		}
	}, 100);
}
function unsubscribe(index) {
	subscribers[index] = null;
}

const SharedFadeInInterval = {
  subscribe,
  unsubscribe,
  run,
}

Object.freeze(SharedFadeInInterval);
export default SharedFadeInInterval;