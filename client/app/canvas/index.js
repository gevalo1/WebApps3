// Create the module where our functionality can attach to
let canvasModule = angular.module('app.canvas', []);

// Include our UI-Router config settings
import CanvasConfig from './canvas.config';
canvasModule.config(CanvasConfig);


// Controllers
import CanvasCtrl from './canvas.controller';
canvasModule.controller('CanvasCtrl', CanvasCtrl);

export default canvasModule;
