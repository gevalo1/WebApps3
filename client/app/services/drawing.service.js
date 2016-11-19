export default class Drawing {
	constructor(AppConstants, User, $http, $state, $q) {
		'ngInject';
		
		this._AppConstants = AppConstants;
		this._$http = $http;
		this._$state = $state;
		this._$q = $q;
		
		this.user = User.current;
	}
	
	attemptSave(canvasData) {
		return this._$http({
			url: this._AppConstants.api + '/drawing',
			method: 'POST',
			data: {
				canvas: canvasData,
				user: this.user
			}
		}).then(
			(res) => {
				return res;
			}
		);
	}
}