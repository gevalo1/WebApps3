class HomeCtrl {
  constructor(AppConstants, Drawing, $scope, User) {
    'ngInject';

    this.appName = AppConstants.appName;
	this._Drawing = Drawing;
	this._$scope = $scope;
	this._User = User;
	
	this.logout = User.logout.bind(User);
	this.authed = (User.current != null);
	
	this.getDrawings();
  }
  
  getDrawings() {
	  let src = '';
		this._Drawing.getDrawings().then(
			(res) => {
				console.log(res.data);
				for (let val of res.data) {
					src = val.drawingData;
					$('#images').prepend('<img class="homeDrawing" src="' + src + '" />')
				}
			},
			(err) => {
				console.log(err);
			}
		);
	  
  }

}

export default HomeCtrl;
