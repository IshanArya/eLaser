chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({
		file: 'src/js/socket.io.min.js'
	});
	chrome.tabs.executeScript({
		file: 'src/js/content_script.js'
	});
});