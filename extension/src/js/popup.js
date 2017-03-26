document.addEventListener('DOMContentLoaded', function() {
	var pageId = document.getElementById('id');
	var laserToggle = document.getElementById('myonoffswitch');

	var classroomDiv = document.getElementById('classroom');
	var question = document.getElementById('question');
	var submit = document.getElementById('submitButton');

	var answersDiv = document.getElementById('answers');
	var answerList = document.getElementById('answerList');
	var returnToQuestionButton = document.getElementById('returnToQuestion');

	var intervalId;

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
		var tempDiv = document.createElement("DIV");
		var temph4 = document.createElement("h4");
		var tempp = document.createElement("p");
		tempDiv.className = "answer";
		temph4.textContent = "Bob Garrett";
		tempp.textContent = "1 + 1 = 3";
		tempDiv.appendChild(temph4);
		tempDiv.appendChild(tempp);
		answerList.appendChild(tempDiv);
		answerList.appendChild(document.createElement("hr"));
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {getAnswers: 1}, function(response) {
				response.forEach(function(answer) {
					var tempDiv = document.createElement("DIV");
					var temph4 = document.createElement("h4");
					var tempp = document.createElement("p");
					tempDiv.className = "answer";
					temph4.textContent = answer.user;
					tempp.textContent = answer.answer;
					tempDiv.appendChild(temph4);
					tempDiv.appendChild(tempp);
					answerList.appendChild(tempDiv);
					answerList.appendChild(document.createElement("hr"));
				});
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
			question.value = "";
			classroomDiv.style.display = "none";
			answersDiv.style.display = "block";
		}

		intervalId = setInterval(getAnswers, 3000);
	});
	returnToQuestionButton.addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {returnToQuestion: true});
		});
		clearInterval(intervalId);
		answersDiv.style.display = "none";
		classroomDiv.style.display = "block";
		answerList.innerHTML = '<img src="../img/loading.gif">';
	});

});