var socket = io("http://10.31.55.22:3000/");
var point = document.createElement('DIV');

var id;

var width = window.innerWidth;
var height = window.innerHeight;

//point.id = "wow";
point.setAttribute('style', 'width: 10px; height: 10px; background: red; border: 2px solid black; transform: rotate(45deg); background-size: cover; position: fixed; top: 50%; left: 50%; z-index: 5423543542; display: block');
document.body.appendChild(point);


function onReceiveSelected() {
    alert('receiving');
    socket.on('motion', function(data) {
        var x = data.x, y = data.y;
        point.style.transform = "translate(" + scale(-90, 90, -width/2, width/2, x) + "px, " + scale(-60, 60, -height/2, height/2, y) + "px)";
    });
}
function scale(x0, x1, y0, y1, x) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}
onReceiveSelected();

function randomID() {
	var dict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var num1 = Math.floor(Math.random() * 62);
    var num2 = Math.floor(Math.random() * 62);
    var num3 = Math.floor(Math.random() * 62);
    var num4 = Math.floor(Math.random() * 62);
    return dict[num1] + dict[num2] + dict[num3] + dict[num4];
}
id = randomID();



socket.on('type_request', function() {
	chrome.runtime.sendMessage({id: id});

	socket.emit('type_response', {type: "receiver", key: id});
	alert(id);
});