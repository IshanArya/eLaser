chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({
		file: 'src/js/socket.io.min.js'
	});
	chrome.tabs.executeScript({
		file: 'src/js/activate_laser.js'
	});
});