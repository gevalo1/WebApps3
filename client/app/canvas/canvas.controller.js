class CanvasCtrl {
  constructor(AppConstants, Drawing, $scope, $mdDialog) {
    'ngInject';

    this.appName = AppConstants.appName;
	this._Drawing = Drawing
	this._$scope = $scope;
	this._$mdDialog = $mdDialog;
	
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
	
	$scope.showSuccessAlert = false;
	$scope.switchBool = function(value) {
		$scope[value] = !$scope[value];
	}
	
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
			const app = this.App;
			let confirm = this._$mdDialog.confirm()
				.title('Clear the canvas?')
				.textContent('Are you sure you want to clear the canvas?')
				.ariaLabel('clearCanvasConfirm')
				.ok("Yes, I'm sure!")
				.cancel('No, take me back.');

			this._$mdDialog.show(confirm).then(function() {
				app.clear();
				app.socket.emit('clearCanvas');
			});
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
		
		$(document).on('click', '#saveDrawing', (e) => {
			const scope = this._$scope;
			const canvas = this.App.canvas;
			const Drawing = this._Drawing;
			let confirm = this._$mdDialog.prompt()
				.title('Name your drawing')
				.textContent('Please give your drawing a name.')
				.placeholder('Name...')
				.ariaLabel('Drawing Name')
				.ok('Save!')
				.cancel('Cancel');

			this._$mdDialog.show(confirm).then(function(result) {
				if (result != undefined) {
					//save drawing
					const dataURL = canvas.toDataURL();
					Drawing.attemptSave(dataURL).then(
						(res) => {
							console.log(res);
						},
						(err) => {
							console.log(err);
						}
					);
				} else {
					scope.textAlert = "You didn't name your drawing!";
					scope.textTitle = "ERROR: "
					if (!scope.showSuccessAlert) {
						scope.switchBool('showSuccessAlert');
					}
				}
			});
		});
	};
			
	toggleColorList() {
		$('#colorList').slideToggle();
	};
	  
}

export default CanvasCtrl;
