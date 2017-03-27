var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
app.set('port', port);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes');

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var receivers = {};
var transmitters = {};

io.on('connection', function(socket) {
	console.log('connection recieved');
	socket.emit('type_request');
	socket.on('type_response', function(data) {
		if (data.type === 'receiver') {
			receivers[data.key] = socket.id;
		}
	});
	
    socket.on('motion', function(data) {
		//console.log(data);
		var receiver = receivers[data.key];
        if (!transmitters[data.key]) {
            transmitters[data.key] = socket.id;
        } else {
            if (transmitters[data.key] === socket.id) {
		        socket.broadcast.to(receiver).emit('motion', data);
            } else {
                socket.emit('unauthorized');
            }
        }
	});

    socket.on('phoneClick', function(data) {
        var receiver = receivers[data.key];
        socket.broadcast.to(receiver).emit('phoneClick', data);
    });

	socket.on('disconnect', function() {
		console.log('disconnected', socket.id);
		var keyToDelete;
		for (var key in receivers) {
			if (receivers[key] === socket.id) {
				keyToDelete = key;
			}
		}
		delete receivers[keyToDelete];
		socket.broadcast.emit('end', keyToDelete);
	});

    socket.on('question', function(data) {
        socket.broadcast.emit('question', data);
        console.log('question:', data);
    });

    socket.on('answer', function(data) {
        var receiver = receivers[data.key];
        socket.broadcast.to(receiver).emit('answer', data);
    });
});

server.listen(port, function() {
  console.log("Server started on port " + port);
});
