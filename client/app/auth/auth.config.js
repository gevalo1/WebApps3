function AuthConfig($stateProvider, $httpProvider) {
    'ngInject';

    // Define the routes
    $stateProvider

            .state('app.login', {
                url: '/login',
                controller: 'AuthCtrl as $ctrl',
                templateUrl: 'auth/auth.html',
                title: 'Sign in',
                resolve: {
                    auth: (User) => {
                        return User.ensureAuthIs(false);
                    }
                }
            })

            .state('app.register', {
                url: '/register',
                controller: 'AuthCtrl as $ctrl',
                templateUrl: 'auth/auth.html',
                title: 'Sign up',
                resolve: {
                    auth: (User) => {
                        return User.ensureAuthIs(false);
                    }
                }
            });

}

AuthConfig.$inject = ["$stateProvider", "$httpProvider"]; //Explicit annotation needed!

export default AuthConfig;