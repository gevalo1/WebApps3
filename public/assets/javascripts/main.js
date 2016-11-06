const socket = io();
const cv = $('#canvas');
const colors = {
    Black: '#000000',
    White: '#FFFFFF',
    Green: '#22B14C',
    Yellow: '#FFF200',
    Orange: '#FF7F27',
    Red: '#ED1C24',
    LightBlue: '#00A2E8',
    Blue: '#3F48CC',
    Purple: '#A349A4'
};
let ownColor = '#000000', ownBrushSize = 5;

let flag = false, prevX = 0, currX = 0, prevY = 0, currY = 0, dot_flag = false;

socket.on('test', (data) => {
    console.log(data);
});

let App = {};

$(window).load(() => {
    App.init();

    for (let color in colors) {
        $('#colorOptions').append(($('<option>').val(colors[color]).css({'background-color': colors[color]})));
    }

    $('#colorOptions').css({'background-color': colors['Black']});
});


App.init = () => {
    App.canvas = $("<canvas></canvas>", {id: 'canvas'})[0];
    App.canvas.height = $('#cvContainer').height();
    App.canvas.width = $('#cvContainer').width();
    //App.canvas.width = window.innerWidth;
    $('#cvContainer').append(App.canvas);
    App.ctx = App.canvas.getContext('2d');
    App.canvas.onselectstart = () => {
        return false;
    };
    App.ctx.fillStyle = 'solid';
    App.ctx.strokeStyle = colors[0];
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = 'round';
    App.draw = (x, y, brushSize, color, prevX, prevY) => {
        App.ctx.lineWidth = brushSize;
        App.ctx.strokeStyle = color;
        App.ctx.beginPath();
        App.ctx.moveTo(prevX, prevY);  /// previous point for this client
        App.ctx.lineTo(x, y);
        App.ctx.stroke();
        App.ctx.closePath();
    };
    App.clear = () => {
        App.ctx.clearRect(0, 0, App.canvas.width, App.canvas.height);
    };
    App.canvas.addEventListener("mousemove", (e) => {
        App.findxy('move', e);
        e.preventDefault();
    }, false);
    App.canvas.addEventListener("mousedown", (e) => {
        App.findxy('down', e);
        e.preventDefault();
    }, false);
    App.canvas.addEventListener("mouseup", (e) => {
        App.findxy('up', e);
        e.preventDefault();
    }, false);
    App.canvas.addEventListener("mouseout", (e) => {
        App.findxy('out', e);
        e.preventDefault();
    }, false);
    App.findxy = (res, e) => {
        if (res === 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - App.canvas.offsetLeft;
            currY = e.clientY - App.canvas.offsetTop;

            flag = true;
            dot_flag = true;
            if (dot_flag) {
                App.ctx.beginPath();
                App.ctx.fillStyle = ownColor;
                App.ctx.fillRect(currX, currY, 2, 2);
                App.ctx.closePath();
                dot_flag = false;
            }
        }
        if (res === 'up' || res === "out") {
            flag = false;
        }
        if (res === 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - App.canvas.offsetLeft;
                currY = e.clientY - App.canvas.offsetTop;
                App.draw(currX, currY, ownBrushSize, ownColor, prevX, prevY);
                App.emit(currX, currY, ownBrushSize, ownColor, prevX, prevY);
            }
        }
    };
    App.emit = (x, y, size, color, prevx, prevy) => {
        App.socket.emit('drawClick', {
            x: x,
            y: y,
            brushSize: size,
            color: color,
            prevx: prevx,
            prevy: prevy
        });
    };

};


App.socket = io.connect();

App.socket.on('draw', (data) => {
    return App.draw(data.x, data.y, data.brushSize, data.color, data.prevx, data.prevy);
});

App.socket.on('clearCanvas', () => {
    App.clear();
});


$('#colorOptions').live('change', (e) => {
    const selectedColor = $('option:selected');
    const color = selectedColor[0].style.backgroundColor;
    App.ctx.strokeStyle = color;
    ownColor = color;

    $('#colorOptions').css('background-color', color);
});

$('#clearCv').click((e) => {
    const answer = prompt('Enter the password for clearing the canvas.');

    if (answer === 'password') { //Will be changed later on
        App.clear();
        App.socket.emit('clearCanvas');
    }
});

$('#changeBrushSize').click((e) => {
    const answer = prompt('Enter brush size.');

    App.ctx.lineWidth = answer;
    ownBrushSize = answer;
});