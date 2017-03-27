var socket = io("http://192.168.1.138:3000");
var point = document.createElement('DIV');

var id;
var answers = [];

var width = window.innerWidth;
var height = window.innerHeight;

point.id = "LvUkES3XHDSCT";
point.setAttribute('style', 'width: 10px; height: 10px; background: red; border: 2px solid black; transform: rotate(45deg); background-size: cover; position: fixed; top: 50%; left: 50%; z-index: 5423543542; display: block');


function randomID() {
	var dict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var num1 = Math.floor(Math.random() * 62);
    var num2 = Math.floor(Math.random() * 62);
    var num3 = Math.floor(Math.random() * 62);
    var num4 = Math.floor(Math.random() * 62);
    return dict[num1] + dict[num2] + dict[num3] + dict[num4];
}
id = randomID();
function scale(x0, x1, y0, y1, x) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //console.log(request);
	if(request.laserActivate) {
		sendResponse({id: id, runAgain: false});
	}

    if(request.hasOwnProperty("laserOn")) {
        if(request.laserOn) {
            document.body.appendChild(point);
        } else {
            document.body.removeChild(point);
        }
    }

    if(request.question) {
        console.log("Question received");
        socket.emit('question', {id: id, question: request.question});
    }
    if(request.getAnswers) {
        console.log(answers);
        if(answers.length > 0) {
            sendResponse(answers);
        }
    }
    if(request.endSession) {
        answers.splice(0, answers.length);
        socket.emit('endQuestion', {id: id});
    }
});

socket.on('type_request', function() {
	socket.emit('type_response', {type: "receiver", key: id});
});
socket.on('motion', function(data) {
    var x = data.x, y = data.y;
    point.style.transform = "translate(" + scale(-90, 90, -width/2, width/2, x) + "px, " + scale(-60, 60, -height/2, height/2, y) + "px)";
});
socket.on('phoneClick', function(data) {
    var x = scale(-90, 90, -width/2, width/2, data.x), y = scale(-60, 60, -height/2, height/2, data.y);
    document.elementFromPoint(x + width/2, y + (width/2) - 52).click();
    console.log("Click!");

});
socket.on('answer', function(answer) {
    console.log("Answer this");
    answers.push(answer);
});
