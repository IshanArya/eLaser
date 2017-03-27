var socket = io();

var key;
var input = document.getElementById('key');
var button1 = document.getElementById('laser_button');
var button2 = document.getElementById('question_button');

var width = $(window).width();
var height = $(window).height();

var currentPos = {
     x: 0,
     y: 0
};

if (!navigator.userAgent.match('Mobile')) {
    // document.body.innerHTML = '<br><br><br><center>Please visit this page on a mobile device.<center>';
} else {
    document.body.style.animation = 'bg 10s linear infinite';
}

function onTransmitSelected() {
    button1.style.display = "none";
    button2.style.display = "none";
    key = input.value;
    window.ondeviceorientation = function(event) {

        var alpha = event.alpha; // 90 -> 270
        alpha = round2(alpha);
        if (0 <= alpha && alpha <= 90) {
            alpha *= -1;
        } else if (270 <= alpha && alpha <= 360) {
            alpha -= 360;
            alpha *= -1;
        }
        // -90 -> 90

        var beta = event.beta; // -90 -> 90
        beta = round2(beta);

        currentPos = {
            key: key,
            x: alpha,
            y: -beta,
        };

        socket.emit('motion', currentPos);

    }

    window.ontouchstart = function(e) {
        e.preventDefault();
        socket.emit('phoneClick', currentPos);
    }

    socket.on('end', function(endedKey) {
        if (endedKey === key) {
            window.ondevicemotion = null;
            alert("Other device disconnected. Please reload the page to connect again.");
            location.reload();
        }
    });

}

function onQuestionSelected() {
    key = input.value;
    socket.on('question', function(data) {
        if (data.id === key) {
            var name = prompt('What\'s your name?');
            var answer = prompt(data.question);
            socket.emit('answer', {
                key: key,
                answer: answer,
                user: name
            });
        }
    });
}

function round2(a) {
    return Math.floor(a * 100) / 100;
}
