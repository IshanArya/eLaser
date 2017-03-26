document.addEventListener('DOMContentLoaded', function() {
	var pageId = document.getElementById('id');
	var laserToggle = document.getElementById('myonoffswitch');

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {laserActivate: 1}, function(response) {
			if(response.runAgain) {
				chrome.tabs.executeScript({
					file: 'src/js/socket.io.min.js'
				});
				chrome.tabs.executeScript({
					file: 'src/js/activate_laser.js'
				}, function() {
					chrome.tabs.sendMessage(tabs[0].id, {laserActivate: 1}, function(response2) {
						pageId.textContent = response2.id;
					});
				});
			} else {
				pageId.textContent = response.id;
			}
		});
	});


	laserToggle.addEventListener('change', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			console.log(laserToggle.checked);
			chrome.tabs.sendMessage(tabs[0].id, {laserOn: laserToggle.checked}, function(response) {
				
			});
		});
	})
});