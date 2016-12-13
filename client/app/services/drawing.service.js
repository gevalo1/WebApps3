export default class Drawing {
    constructor(AppConstants, User, $http, $state, $q) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$state = $state;
        this._$q = $q;

        this.user = User.current;
    }

    attemptSave(drawingName, canvasData) {
        return this._$http({
            url: this._AppConstants.api + '/drawing',
            method: 'POST',
            data: {
                drawingName: drawingName,
                canvas: canvasData,
                user: this.user
            }
        }).then(
                (res) => {
            return res;
        }
        );
    }

    getTwelveMostRecentDrawings() {
        return this._$http({
            url: this._AppConstants.api + '/drawingLimited',
            method: 'GET'
        }).then(
                (res) => {
            return res;
        }
        );
    }

    getDrawings() {
        return this._$http({
            url: this._AppConstants.api + '/drawing',
            method: 'GET'
        }).then(
                (res) => {
            return res;
        }
        );
    }
}