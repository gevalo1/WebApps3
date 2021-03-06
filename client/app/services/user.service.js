import { createHash } from 'crypto';

export default class User {
    constructor(JWT, AppConstants, $http, $state, $q) {
        'ngInject';

        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$state = $state;
        this._$q = $q;

        this.current = null;
    }

    attemptAuth(type, credentials) {
        const userData = angular.copy(credentials);
        userData.password = createHash('sha256').update(userData.password).digest('hex');
        let route = (type === 'login') ? '/login' : '/signup';
        return this._$http({
            url: this._AppConstants.api + route,
            method: 'POST',
            data: {
                user: userData
            }
        }).then(
                (res) => {
            this._JWT.save(res.data.user.token);
            this.current = res.data.user;
            return res;
        });
    }

    logout() {
        this.current = null;
        this._JWT.destroy();
        this._$state.go(this._$state.$current, null, {reload: true});
    }

    verifyAuth() {
        let deferred = this._$q.defer();

        if (!this._JWT.get()) {
            deferred.resolve(false);
            return deferred.promise;
        }

        if (this.current) {
            deferred.resolve(true);
        } else {
            this._$http({
                url: this._AppConstants.api + '/user',
                method: 'GET',
                headers: {
                    Authorization: this._JWT.get()
                }
            }).then(
                    (res) => {
                this.current = res.data.user;
                deferred.resolve(true);
            },
                    (err) => {
                this._JWT.destroy();
                deferred.resolve(false);
            });
        }
        return deferred.promise;
    }

    ensureAuthIs(bool) {
        let deferred = this._$q.defer();

        this.verifyAuth().then((authValid) => {
            if (authValid !== bool) {
                this._$state.go('app.home');
                deferred.resolve(false);
            } else {
                deferred.resolve(true);
            }
        })
        return deferred.promise;
    }

    update(fields) {
        return this._$http({
            url: this._AppConstants.api + '/user',
            method: 'PUT',
            data: {user: fields}
        }).then(
                (res) => {
            this.current = res.data.user;
            return res.data.user;
        }
        );
    }
}