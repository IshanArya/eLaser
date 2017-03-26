chrome.runtime.onMessage.addListener(function inject(request, sender, sendResponse) {
	if(request.laserActivate) {
		console.log("ran");
		sendResponse({runAgain: true});
		chrome.runtime.onMessage.removeListener(inject);
	}
});