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
	  let drawName = '';
	  let by = '';
		this._Drawing.getTwelveMostRecentDrawings().then(
			(res) => {
				for (let val of res.data.reverse()) {
					src = val.drawingData;
					drawName = val.drawingName;
					by = val.byUsername;
					$('#images').prepend('<div class="homeDrawingDiv"><img class="homeDrawing" src="' + src + '" /><span>Title: ' + drawName + '</span><br/><span>By: ' + by + '</span></div>')
				}
			},
			(err) => {
				console.log(err);
			}
		);
	  
  }

}

export default HomeCtrl;
