var socket = io();
var msgElem = document.getElementById("msg");

window.ondeviceorientation = function(event) {

	var alpha = event.alpha;
    alpha = round2(alpha);
    var beta = event.beta;
    beta = round2(beta);
    var gamma = event.gamma;
    gamma = round2(gamma);

    socket.emit('motion', {
        acc: {
            alpha: alpha,
            beta: beta,
            gamma: gamma
        }
    });

}

function round2(a) {
    return Math.floor(a * 100) / 100;
}
