var socket = io();

function onReceiveSelected() {
    socket.on('motion', function(data) {
        var alpha = data.acc.alpha;
        var beta = data.acc.beta;

        $('#box').css({
            'top': (beta * 5) + 'px',
            'left': (alpha * 5) + 'px'
        });
    });
}

function onTransmitSelected() {
    window.ondeviceorientation = function(event) {

        var alpha = event.alpha; // 90 -> 270
        alpha = round2(alpha);
        if (0 <= alpha && alpha <= 90) {
            alpha *= -1;
        } else if (270 <= alpha && alpha <= 360) {
            alpha -= 360;
            alpha *= -1;
        }

        var beta = event.beta; // -90 -> 90
        beta = round2(beta);

        socket.emit('motion', {
            acc: {
                alpha: alpha,
                beta: beta
            }
        });

    }
}

function round2(a) {
    return Math.floor(a * 100) / 100;
}
