const socket = io();
const cv = $('#canvas');
const colors = {Black: '#000000', White: '#FFFFFF', Green: '#22B14C', Yellow: '#FFF200', Orange: '#FF7F27', Red: '#ED1C24', LightBlue: '#00A2E8', Blue: '#3F48CC', Purple: '#A349A4'};
let ownColor = colors[0], ownBrushSize = 5;

socket.on('test', function (data) {
    console.log(data);
});

let App = {};

$(window).load(function () {
    App.init();

    for (var i in colors) {
        $('#colorOptions').append(($('<option>').val(colors[i]).css({'background-color': colors[i], })));
    }
    ;
    $('#colorOptions').css({'background-color': colors['Black']});

});


App.init = function () {
    App.canvas = $("<canvas></canvas>", {id: 'canvas'})[0];
    App.canvas.height = $('#cvContainer').height();
    App.canvas.width = $('#cvContainer').width();
    //App.canvas.width = window.innerWidth;
    $('#cvContainer').append(App.canvas);
    App.ctx = App.canvas.getContext('2d');
    App.ctx.fillStyle = 'solid';
    App.ctx.strokeStyle = colors[0];
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = 'round';
    App.draw = function (x, y, type, brushSize, color) {
        App.ctx.lineWidth = brushSize;
        App.ctx.strokeStyle = color;
        if (type === 'dragstart') {
            App.ctx.beginPath();
            return App.ctx.moveTo(x, y);
        } else if (type === 'drag') {
            App.ctx.lineTo(x, y);
            return App.ctx.stroke();
        } else {
            return App.ctx.closePath();
        }
    };
    App.clear = function () {
        App.ctx.clearRect(0, 0, App.canvas.width, App.canvas.height);
    };
};


App.socket = io.connect();

App.socket.on('draw', function (data) {
    return App.draw(data.x, data.y, data.type, data.brushSize, data.color);
});

App.socket.on('clearCanvas', function () {
    App.clear();
});


cv.live('drag dragstart dragend', function (e) {
    const offset = $(this).offset();

    e.offsetX = e.layerX - offset.left;
    e.offsetY = e.layerY - offset.top;

    const type = e.handleObj.type, x = e.offsetX, y = e.layerY, color = ownColor, brushSize = ownBrushSize;

    App.draw(x, y, type, brushSize, color);
    App.socket.emit('drawClick', {
        x: x,
        y: y,
        type: type,
        brushSize: brushSize,
        color: color
    });
});

$('#colorOptions').live('change', function (e) {
    const selectedColor = $('option:selected', this);
    const color = this.value;
    App.ctx.strokeStyle = color;
    ownColor = color;

    $('#colorOptions').css('background-color', color);
});

$('#clearCv').click(function (e) {
    const answer = prompt('Enter the password for clearing the canvas.');

    if (answer === 'password') { //Will be changed later on
        App.clear();

        App.socket.emit('clearCanvas');
    }
});

$('#changeBrushSize').click(function (e) {
    const answer = prompt('Enter brush size.');

    App.ctx.lineWidth = answer;
    ownBrushSize = answer;
});