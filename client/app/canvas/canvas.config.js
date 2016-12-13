function CanvasConfig($stateProvider) {
    'ngInject';

    $stateProvider
            .state('app.canvas', {
                url: '/canvas',
                controller: 'CanvasCtrl as $ctrl',
                templateUrl: 'canvas/canvas.html',
                title: 'Canvas',
                resolve: {
                    auth: function (User) {
                        return User.ensureAuthIs(true);
                    }
                }
            });

}

CanvasConfig.$inject = ["$stateProvider"]; //Explicit annotation needed!

export default CanvasConfig;
