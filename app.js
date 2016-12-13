'use strict';
const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

const mongoose = require('mongoose'),
        db = mongoose.connection,
        User = require('./server/models/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/draw');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to DB');
});

app.use(cors());


//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

server.listen(8085, () => {
    console.log('App listening at http://localhost:8085');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//Production
app.use(express.static('./build/'));

require('./server/routes')(app);

io.on('connection', (socket) => {
    socket.emit('test', 'Connectedddd');
    socket.on('drawClick', (data) => {
        socket.broadcast.emit('draw', {
            x: data.x,
            y: data.y,
            type: data.type,
            brushSize: data.brushSize,
            color: data.color,
            prevx: data.prevx,
            prevy: data.prevy
        });
    });
    socket.on('clearCanvas', () => {
        socket.broadcast.emit('clearCanvas');
    });
    socket.on('bgColorChange', (bgColor) => {
        socket.broadcast.emit('bgColorChange', {bgColor});
    });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found: ' + req.originalUrl);
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;