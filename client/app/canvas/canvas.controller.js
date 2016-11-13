class CanvasCtrl {
  constructor(AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
	this._$scope = $scope;
	
	this.socket = io();
	
	this.App = {};
	this.App.init = this.init()
	
	this.App.socket = io.connect();
	
	this.App.socket.on('draw', (data) => {
		return this.App.draw(data.x, data.y, data.brushSize, data.color, data.prevx, data.prevy);
	});
	
	this.App.socket.on('clearCanvas', () => {
		this.App.clear();
	});
	
	//Add JQuery listeners
	this.initListeners();
  }
  
	init() {
		this.ownColor = '#000000';
		this.ownBrushSize = 5;
		let flag = false, prevX = 0, currX = 0, prevY = 0, currY = 0, dot_flag = false;
		  
		this.App.canvas = $("<canvas></canvas>", {id: 'canvas'})[0];
		this.App.canvas.height = $('#cvContainer').height();
		this.App.canvas.width = $('#cvContainer').width();
		//App.canvas.width = window.innerWidth;
		$('#cvContainer').append(this.App.canvas);
		this.App.ctx = this.App.canvas.getContext('2d');
		this.App.canvas.onselectstart = () => {
			return false;
		};
		this.App.ctx.fillStyle = 'solid';
		this.App.ctx.strokeStyle = '#000000';
		this.App.ctx.lineWidth = 5;
		this.App.ctx.lineCap = 'round';
		this.App.draw = (x, y, brushSize, color, prevX, prevY) => {
			this.App.ctx.lineWidth = brushSize;
			this.App.ctx.strokeStyle = color;
			this.App.ctx.beginPath();
			this.App.ctx.moveTo(prevX, prevY);  /// previous point for this client
			this.App.ctx.lineTo(x, y);
			this.App.ctx.stroke();
			this.App.ctx.closePath();
		};
		this.App.clear = () => {
			this.App.ctx.clearRect(0, 0, this.App.canvas.width, this.App.canvas.height);
		};
		this.App.canvas.addEventListener("mousemove", (e) => {
			this.App.findxy('move', e);
			e.preventDefault();
		}, false);
		this.App.canvas.addEventListener("mousedown", (e) => {
			this.App.findxy('down', e);
			e.preventDefault();
		}, false);
		this.App.canvas.addEventListener("mouseup", (e) => {
			this.App.findxy('up', e);
			e.preventDefault();
		}, false);
		this.App.canvas.addEventListener("mouseout", (e) => {
			this.App.findxy('out', e);
			e.preventDefault();
		}, false);
		this.App.findxy = (res, e) => {
			if (res === 'down') {
				prevX = currX;
				prevY = currY;
				currX = e.clientX - this.App.canvas.offsetLeft;
				currY = e.clientY - this.App.canvas.offsetTop;

				flag = true;
				dot_flag = true;
				if (dot_flag) {
					this.App.ctx.beginPath();
					this.App.ctx.fillStyle = this.ownColor;
					this.App.ctx.fillRect(currX, currY, 2, 2);
					this.App.ctx.closePath();
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
					currX = e.clientX - this.App.canvas.offsetLeft;
					currY = e.clientY - this.App.canvas.offsetTop;
					this.App.draw(currX, currY, this.ownBrushSize, this.ownColor, prevX, prevY);
					this.App.emit(currX, currY, this.ownBrushSize, this.ownColor, prevX, prevY);
				}
			}
		};
		this.App.emit = (x, y, size, color, prevx, prevy) => {
			this.App.socket.emit('drawClick', {
				x: x,
				y: y,
				brushSize: size,
				color: color,
				prevx: prevx,
				prevy: prevy
			});
		};

	};
	
	initListeners() {
		$(document).on('click', '#clearCv', (e) => {
			const answer = prompt('Enter the password for clearing the canvas.');

			if (answer === 'password') { //Will be changed later on
				this.App.clear();
				this.App.socket.emit('clearCanvas');
			}
		});
		
		$(document).on('click', '#changeBrushSize', (e) => {
			const answer = prompt('Enter brush size.');

			this.App.ctx.lineWidth = answer;
			this.ownBrushSize = answer;
		});
		
		$(document).on('click', '#colorOptions', (e) => {
			this.toggleColorList();
		});
		
		$(document).on('click', '.color', (e) => {
			const selectedColor = $(e.currentTarget).attr('id');
			this.App.ctx.strokeStyle = selectedColor;
			this.ownColor = selectedColor;
			this.toggleColorList();
		});
	};
	
	toggleColorList() {
		$('#colorList').slideToggle();
	};
	  
}

export default CanvasCtrl;
