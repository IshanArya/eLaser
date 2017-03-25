var socket = io("http://10.31.55.22:3000/");
var point = document.createElement('DIV');

point.id = "wow";
point.setAttribute('style', 'width: 10px; height: 10px; background: red; border: 2px solid black; transform: rotate(45deg); background-size: cover; position: fixed; top: 50%; left: 50%; z-index: 5423543542; display: block');
document.body.appendChild(point);


var position = {
    x: 0,
    y: 0
};

var velocity = {
    x: 0,
    y: 0
};

var food = {
    x: 0,
    y: 0
};

var lastTime;

var width = window.innerWidth;
var height = window.innerHeight;

function onReceiveSelected() {
    // food.x = 
    alert('receiving');
    socket.on('motion', function(data) {
        var x = data.x, y = data.y;
        point.style.transform = "translate(" + scale(-90, 90, -width/2, width/2, x) + "px, " + scale(-60, 60, -height/2, height/2, y) + "px)";
    });
}
function round2(a) {
    return Math.floor(a * 100) / 100;
}

function scale(x0, x1, y0, y1, x) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}

onReceiveSelected();