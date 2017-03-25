var socket = io();
var msgElem = document.getElementById("msg");

window.ondevicemotion = function(event) {
    
	var accelerationX = event.accelerationIncludingGravity.x;
	var accelerationY = event.accelerationIncludingGravity.y;
	var accelerationZ = event.accelerationIncludingGravity.z;

    socket.emit('motion', {
        acc: {
            x: accelerationX,
            y: accelerationY,
            z: accelerationZ
        }
    });

}
