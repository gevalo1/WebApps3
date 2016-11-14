class HomeCtrl {
  constructor(AppConstants, $scope, User) {
    'ngInject';

    this.appName = AppConstants.appName;
	this._$scope = $scope;
	this._User = User;
	
	this.logout = User.logout.bind(User);
	
  }

}

export default HomeCtrl;
