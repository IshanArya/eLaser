document.addEventListener('DOMContentLoaded', function() {
	var pageId = document.getElementById('id');
	var laserToggle = document.getElementById('myonoffswitch');

	var classroomDiv = document.getElementById('classroom');
	var question = document.getElementById('question');
	var submit = document.getElementById('submitButton');

	var answersDiv = document.getElementById('answers');
	var answerList = document.getElementById('answerList');
	var returnToQuestionButton = document.getElementById('endSession');

	var intervalId;
	var answersPosition = 0;

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

	function getAnswers() {
		// var tempDiv = document.createElement("DIV");
		// var temph4 = document.createElement("h4");
		// var tempp = document.createElement("p");
		// tempDiv.className = "answer";
		// temph4.textContent = "Bob Garrett";
		// tempp.textContent = "1 + 1 = 3";
		// tempDiv.appendChild(temph4);
		// tempDiv.appendChild(tempp);
		// answerList.appendChild(tempDiv);
		// answerList.appendChild(document.createElement("hr"));
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {getAnswers: 1}, function(response) {
				if(response) {
					for(var i = answersPosition; i < response.length; i++) {
						var tempDiv = document.createElement("DIV");
						var temph4 = document.createElement("h4");
						var tempp = document.createElement("p");
						tempDiv.className = "answer";
						temph4.textContent = response[i].user;
						tempp.textContent = response[i].answer;
						tempDiv.appendChild(temph4);
						tempDiv.appendChild(tempp);
						answerList.appendChild(tempDiv);
						answerList.appendChild(document.createElement("hr"));
					};
					answersPosition = response.length;
				}
				
			});
		});
	}


	laserToggle.addEventListener('change', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {laserOn: laserToggle.checked});
		});
	});
	submit.addEventListener('click', function() {
		question.value = question.value.trim();
		if(question.value) {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {question: question.value});
			});
			console.log("message sent");
			classroomDiv.style.display = "none";
			answersDiv.style.display = "block";
		}

		intervalId = setInterval(getAnswers, 3000);
	});
	returnToQuestionButton.addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {endSession: true});
		});
		clearInterval(intervalId);
		question.value = "";
		answersDiv.style.display = "none";
		classroomDiv.style.display = "block";
		answerList.innerHTML = '<img src="../img/loading.gif">';
		answersPosition = 0;
	});

});