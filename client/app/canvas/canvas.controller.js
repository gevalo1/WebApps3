class CanvasCtrl {
  constructor(AppConstants, Drawing, $scope, $mdDialog) {
    'ngInject';
	
	//Unregister all event handlers to prevent double event handlers/memory leaks
	$(document).off();

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
	this.App.socket.on('bgColorChange', (data) => {
		this.App.changeBgColor(data.bgColor.bgColor);
	});
	this.App.socket.on('clearCanvas', () => {
		this.App.clear();
	});
	
	$scope.showAlert = false;
	$scope.switchBool = function(value) {
		$scope[value] = !$scope[value];
	}
	
	$scope.submitCustomColor = (hexColor) => {
		this.App.ctx.strokeStyle = hexColor;
		this.ownColor = hexColor;
		this.toggleColorChooser();
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
		this.App.ctx.fillStyle = '#000000';
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
		this.App.changeBgColor = (color) => {
			$(this.App.canvas).css("background-color", color);
		};
		this.App.changeBrushSize = (size) => {
			this.App.ctx.lineWidth = size;
			this.ownBrushSize = size;
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
		
		$(document).on('click', '#colorOptions', (e) => {
			this.toggleColorChooser();
		});
		
		$(document).on('click', '.color', (e) => {
			const selectedColor = $(e.currentTarget).attr('id');
			this.App.ctx.strokeStyle = selectedColor;
			this.ownColor = selectedColor;
			this.toggleColorChooser();
		});
		
		$(document).on('click', '#saveDrawing', (e) => {
			const scope = this._$scope;
			const canvas = this.App.canvas;
			const Drawing = this._Drawing;
			let prompt = this._$mdDialog.prompt()
				.title('Name and save your drawing')
				.textContent('Please give your drawing a name. This will also save the drawing and show it on the home page.')
				.placeholder('Name...')
				.ariaLabel('Drawing Name')
				.ok('Save!')
				.cancel('Cancel');

			this._$mdDialog.show(prompt).then((result) => {
				if (result !== undefined) {
					//save drawing
					const dataURL = canvas.toDataURL("image/png");
					Drawing.attemptSave(result, dataURL).then(
						(res) => {
							scope.textAlert = "The drawing was saved succesfully!";
							scope.textTitle = "SUCCESS: ";
							this.changeAlertBgColor("#60997A");
							if (!scope.showAlert) {
								scope.switchBool('showAlert');
							}
						},
						(err) => {
							scope.textAlert = "Something went wrong while saving the drawing, contact an administrator if this issue persists.";
							scope.textTitle = "ERROR: ";
							this.changeAlertBgColor("#e56969");
							if (!scope.showAlert) {
								scope.switchBool('showAlert');
							}
						}
					);
				} else {
					scope.textAlert = "You didn't name your drawing!";
					scope.textTitle = "ERROR: "
					this.changeAlertBgColor("#e56969");
					if (!scope.showAlert) {
						scope.switchBool('showAlert');
					}
				}
			});
		});
		
		$(document).on('click', '#changeBrushSize', (e) => {
			const scope = this._$scope;
			const app = this.App;
			let prompt = this._$mdDialog.prompt()
				.title('Choose brush size')
				.textContent('Please choose the size of your brush')
				.placeholder('Size...')
				.ariaLabel('Brush Size')
				.ok('Ok!')
				.cancel('Cancel');

			this._$mdDialog.show(prompt).then((result) => {
				if (result !== undefined) {
					app.changeBrushSize(result);
				} else {
					scope.textAlert = "You didn't enter a brush size!";
					scope.textTitle = "ERROR: "
					this.changeAlertBgColor("#e56969");
					if (!scope.showAlert) {
						scope.switchBool('showAlert');
					}
				}
			});
		});
		
		$(document).on('click', '#changeBgColor', (e) => {
			const scope = this._$scope;
			const app = this.App;
			const canvas = this.App.canvas;
			let prompt = this._$mdDialog.prompt()
				.title('Change the canvas background color')
				.htmlContent('Please enter the new color for the canvas background by name or HEX.<br/>(Or enter "default" to reset the default color)<br/><br/>Note: Doing this will NOT remove your drawing. This background will also NOT be saved if you save the drawing!')
				.placeholder('Color...')
				.ariaLabel('Background Color')
				.ok('Ok!')
				.cancel('Cancel');

			this._$mdDialog.show(prompt).then((result) => {
				if (result !== undefined) {
					if (result === "default") {
						result = "#E2E2E2";
						app.changeBgColor(result);
						app.socket.emit('bgColorChange', {bgColor: result});
					} else {
						app.changeBgColor(result);
						app.socket.emit('bgColorChange', {bgColor: result});
					}
				} else {
					scope.textAlert = "You didn't enter a color for the background!";
					scope.textTitle = "ERROR: "
					this.changeAlertBgColor("#e56969");
					if (!scope.showAlert) {
						scope.switchBool('showAlert');
					}
				}
			});
		});
	};
			
	toggleColorChooser() {
		$('#colorList').slideToggle();
		$('#customColor').toggle();
	};
	
	changeAlertBgColor(color) {
		$(".alertCustom").css("background-color", color);
	};
	  
}

export default CanvasCtrl;
