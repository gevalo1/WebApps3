class HomeCtrl {
  constructor(AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
	this._$scope = $scope;
	
  }

}

export default HomeCtrl;
