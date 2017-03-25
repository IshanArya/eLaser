var socket = io();
var msgElem = document.getElementById("msg");

window.ondevicemotion = function(event) {

	var accelerationX = event.acceleration.x;
    accelerationX = Math.floor(accelerationX * 100) / 100;
	var accelerationY = event.acceleration.y;
    accelerationY = Math.floor(accelerationY * 100) / 100;
	var accelerationZ = event.acceleration.z;
    accelerationZ = Math.floor(accelerationZ * 100) / 100;

    socket.emit('motion', {
        acc: {
            x: accelerationX,
            y: accelerationY,
            z: accelerationZ
        }
    });

}
