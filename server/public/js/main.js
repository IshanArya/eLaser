var socket = io();

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

var key;

var lastTime;
var box = document.getElementById('box');
var pipe = document.getElementById('pipe');

var width = $(window).width();
var height = $(window).height();

function onReceiveSelected() {
    socket.on('type_request', function() {
        socket.emit('type_response', {type: "receiver", key: 'lmao'});
    });
    // food.x = 
    alert('receiving');
    $('#box, #food').css('display', 'block');
    requestAnimationFrame(movePipe);
    socket.on('motion', function(data) {
        var x = data.x, y = data.y, theta = data.z;
        // if (Math.abs(x) * 2 >= $(window).width()) {
        //     x = position.x;
        // }
        // if (Math.abs(y) * 2 >= $(window).height()) {
        //     y = position.y;
        // }
        
        // $('#box').css({
        //     'transform': 'translate(' + scale(-90, 90, -width/2, width/2, x) + 'px, ' + scale(-60, 60, -height/2, height/2, y) + 'px)'
        // });
        box.style.transform = "translate(" + scale(-90, 90, -width/2, width/2, x) + "px, " + scale(-60, 60, -height/2, height/2, y) + "px) rotate(" + theta + "deg)";
        // position = data;
    });
}

function movePipe() {
    var currentLeft = parseInt(pipe.style.left || "100%");
    currentLeft -= 0.005;
    if (currentLeft <= 0) {
        currentLeft = 100;
    }
    pipe.style.left = currentLeft + '%';
    pipe.style.top = (Math.floor(Math.random() * 10) - 5) + '%';
    requestAnimationFrame(movePipe);
}

function onTransmitSelected() {
    key = prompt("Please enter the ID of your other device:");
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

    // lastTime = Date.now();

    // window.ondevicemotion = function(event) {

    //     var ax = round2(event.acceleration.x) / 100;
    //     var ay = round2(event.acceleration.z) / 100; // because z is up and down, i'm calling it y because y not

    //     if (ax >= 3) {
    //         ax = 3;
    //     }

    //     if (ax <= -3) {
    //         ax = -3;
    //     }

    //     if (ay >= 3) {
    //         ay = 3;
    //     }

    //     if (ay <= -3) {
    //         ay = -3;
    //     }

    //     var currentTime = Date.now();
    //     var dt = (currentTime - lastTime) / 1000;

    //     velocity.x += ax * dt;
    //     velocity.y += ay * dt;

    //     position.x += velocity.x * dt;
    //     position.y += velocity.y * dt;

    //     socket.emit('motion', {
    //         x: position.x,
    //         y: position.y,
    //         ax: ax,
    //         ay: ay,
    //         vx: velocity.x,
    //         vy: velocity.y,
    //         dt: dt
    //     });

    // }
}

function round2(a) {
    return Math.floor(a * 100) / 100;
}

function scale(x0, x1, y0, y1, x) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
}