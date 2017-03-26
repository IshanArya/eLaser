var socket = io();

var key;
var input = document.getElementById('key');

var width = $(window).width();
var height = $(window).height();

if (!navigator.userAgent.match('Mobile')) {
    document.body.innerHTML = '<br><br><br><center>Please visit this page on a mobile device.<center>';
} else {
    document.body.style.animation = 'bg 10s linear infinite';
}

function onTransmitSelected() {
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

        socket.emit('motion', {
            key: key,
            x: alpha,
            y: -beta,
            z: event.gamma
        });

    }

    socket.on('end', function(endedKey) {
        if (endedKey === key) {
            window.ondevicemotion = null;
            alert("Other device disconnected. Please reload the page to connect again.");
        }
    });

  }

function round2(a) {
    return Math.floor(a * 100) / 100;
}

function scale(x0, x1, y0, y1, x) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}