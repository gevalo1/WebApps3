const socket = io();
const cv = $("#canvas");
const colors = ["#000000", "#FFFFFF", "#22B14C", "#FFF200", "#FF7F27", "#ED1C24", "#00A2E8", "#3F48CC", "#A349A4"];

socket.on('test', function (data) {
    console.log(data);
});

let App = {};

$(document).ready(function () {
    App.init();

    $.each(colors, function(a) {
        console.log(colors[a]);
        $("#colorOptions").append(($("<option>").val(colors[a]).text(colors[a])));
    });
});


App.init = function () {
    App.canvas = $("<canvas></canvas>", {id: "canvas"})[0];
    App.canvas.height = $("#cvContainer").height();
    App.canvas.width = $("#cvContainer").width();
    $("#cvContainer").append(App.canvas);
    App.ctx = App.canvas.getContext("2d");
    App.ctx.fillStyle = "solid";
    App.ctx.strokeStyle = colors[0];
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

$("#colorOptions").live('change', function (e) {
    const selectedColor = $("option:selected", this);
    const color = this.value;
    App.ctx.strokeStyle = color;
});