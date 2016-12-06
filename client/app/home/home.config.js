function HomeConfig($stateProvider) {

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    title: 'Home'
  });

};
HomeConfig.$inject = ["$stateProvider"]; //Explicit annotation needed!

export default HomeConfig;
