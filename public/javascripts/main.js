const socket = io();
const cv = $("#canvas");

socket.on('test', function (data) {
    console.log(data);
});

let App = {};

$(document).ready(function () {
    App.init();
});


App.init = function () {
    App.canvas = $("<canvas></canvas>", {id: "canvas"})[0];
    App.canvas.height = $("#cvContainer").height();
    App.canvas.width = $("#cvContainer").width();
    $("#cvContainer").append(App.canvas);
    App.ctx = App.canvas.getContext("2d");
    App.ctx.fillStyle = "solid";
    App.ctx.strokeStyle = "#bada55";
    App.ctx.lineWidth = 5;
    App.ctx.lineCap = "round";
    App.draw = function (x, y, type) {
        if (type === "dragstart") {
            App.ctx.beginPath();
            return App.ctx.moveTo(x, y);
        } else if (type === "drag") {
            App.ctx.lineTo(x, y);
            return App.ctx.stroke();
        } else {
            return App.ctx.closePath();
        }
    };
};


App.socket = io.connect();

App.socket.on('draw', function (data) {
    return App.draw(data.x, data.y, data.type);
});


cv.live('drag dragstart dragend', function (e) {
    const offset = $(this).offset();
    
    e.offsetX = e.layerX - offset.left;
    e.offsetY = e.layerY - offset.top;

    const type = e.handleObj.type, x = e.offsetX, y = e.layerY;

    App.draw(x, y, type);
    App.socket.emit('drawClick', {
        x: x,
        y: y,
        type: type
    });
});