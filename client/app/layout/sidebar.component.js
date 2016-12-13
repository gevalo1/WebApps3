class AppSidebarCtrl {
    constructor(AppConstants, User, $scope) {
        'ngInject';

        this.appName = AppConstants.appName;
        this.currentUser = User.current;

        $scope.$watch('User.current', (newUser) => {
            this.currentUser = newUser;
        });
    }
}

let AppSidebar = {
    controller: AppSidebarCtrl,
    templateUrl: 'layout/sidebar.html'
};

export default AppSidebar;
