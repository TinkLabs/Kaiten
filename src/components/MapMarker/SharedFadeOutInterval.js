let subscribers = [];
let opacity = 1;
let timerIdUnmount = null;
function subscribe(setOpacity) {
	subscribers.push(setOpacity);
	return subscribers.length - 1;
}
function run() {
	if (timerIdUnmount) return;
	timerIdUnmount = setInterval(() => {
		opacity -= 0.3;
		opacity = parseInt(opacity * 10, 10)/ 10;

		console.log(opacity);

		subscribers.forEach((sub) => {
			if (!sub) return;
			sub(opacity);
		})
		if (opacity <= 0) {
			clearInterval(timerIdUnmount);
			opacity = 1;
			timerIdUnmount = null;
			subscribers = [];
		}
	}, 100);
}
function unsubscribe(index) {
	subscribers[index] = null;
}

const SharedFadeOutInterval = {
  subscribe,
  unsubscribe,
  run,
}

Object.freeze(SharedFadeOutInterval);
export default SharedFadeOutInterval;