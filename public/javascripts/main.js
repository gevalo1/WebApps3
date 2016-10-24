var socket = io();
socket.on('test', function (data) {
    console.log(data);
});

var App = {};

$(document).ready(function() {
    App.init();
});


App.init = function () {
    App.canvas = document.createElement('canvas');
    App.canvas.height = $("article").height();
    App.canvas.width = $("article").width();
    document.getElementsByTagName('article')[0].appendChild(App.canvas);
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

App.socket.on('draw', function(data) {
  return App.draw(data.x, data.y, data.type);
});


$('canvas').live('drag dragstart dragend', function(e) {
  var offset, type, x, y;
  type = e.handleObj.type;
  offset = $(this).offset();
  console.log($(this));
  e.offsetX = e.layerX - offset.left;
  e.offsetY = e.layerY - offset.top;
  x = e.offsetX;
  y = e.offsetY;
  console.log(offset.left);
  console.log(e.layerX); console.log(e.layerY);
  //App.draw(e.offsetX, e.offsetY, type);
  App.draw(e.layerX, e.layerY, type);
  App.socket.emit('drawClick', {
    x: x,
    y: y,
    type: type
  });
});