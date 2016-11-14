angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('canvas/canvas.html','<div id="navbar">\r\n\t<!--<select id="colorOptions"></select>-->\r\n\t<md-button id="colorOptions" class="md-fab icon ion-android-color-palette" aria-label="Change Color"/>\r\n\t<div id="colorList">\r\n\t\t<div id="black" class="color"/>\r\n\t\t<div id="white" class="color"/>\r\n\t\t<div id="green" class="color"/>\r\n\t\t<div id="yellow" class="color"/>\r\n\t\t<div id="orange" class="color"/>\r\n\t\t<div id="red" class="color"/>\r\n\t\t<div id="lightBlue" class="color"/>\r\n\t\t<div id="blue" class="color"/>\r\n\t\t<div id="purple" class="color"/>\r\n\t</div>\r\n</div>\r\n\t\r\n<div id="content">\r\n\r\n\t<div id="cvContainer"><!-- our canvas will be inserted here--></div>\r\n\t<div id="sidebar">\r\n\t\t<md-button id="clearCv" class="md-fab icon ion-ios-trash" aria-label="Clear Canvas"/>\r\n\t\t<md-button id="changeBrushSize" class="md-fab icon ion-record" aria-label="Brush Size"/>\r\n\t</div>\r\n\t\r\n</div>\r\n\r\n<div id="footer">\r\n\t<p id="footerText">WebApps 3 Drawing Application</p>\r\n</div>');
$templateCache.put('auth/auth.html','<div class="auth-page">\r\n    <div class="row">\r\n\r\n        <h1 class="auth-title" ng-bind="::$ctrl.title"></h1>\r\n        <p>\r\n          <a ui-sref="app.login" ng-show="$ctrl.authType === \'register\'">\r\n            Have an account?\r\n          </a>\r\n\t\t  <a ui-sref="app.register" ng-show="$ctrl.authType === \'login\'">\r\n            Need an account?\r\n          </a>\r\n        </p>\r\n\t\t\r\n\t\t<p>{{$ctrl.errors}}</p>\r\n\r\n\t\t\t<form name="authForm" novalidate ng-submit="$ctrl.submitForm()">\r\n\t\t\t  <fieldset ng-disabled="$ctrl.isSubmitting">\r\n\r\n\t\t\t\t  <input class="auth-input"\r\n\t\t\t\t\ttype="text"\r\n\t\t\t\t\tplaceholder="Username"\r\n\t\t\t\t\tng-model="$ctrl.formData.username"\r\n\t\t\t\t\tng-pattern="/^([A-Za-z0-9\\-\\_]{3,16}$)+$/" ng-required="$ctrl.authType === \'register\'" ng-show="$ctrl.authType === \'register\'"/>\r\n\r\n\t\t\t\t  <input class="auth-input"\r\n\t\t\t\t\ttype="email"\r\n\t\t\t\t\tplaceholder="Email"\r\n\t\t\t\t\tng-model="$ctrl.formData.email" required/>\r\n\r\n\t\t\t\t  <input class="auth-input"\r\n\t\t\t\t\ttype="password"\r\n\t\t\t\t\tplaceholder="Password"\r\n\t\t\t\t\tng-model="$ctrl.formData.password" required/>\r\n\r\n\t\t\t\t<md-button class="auth-button" type="submit" ng-bind="$ctrl.title" ng-disabled="authForm.$invalid" aria-label="auth"/>\r\n\t\t\t  </fieldset>\r\n\t\t\t</form>\r\n  </div>\r\n</div>');
$templateCache.put('components/list-errors.html','<ul class="error-messages" ng-show="$ctrl.errors">\r\n  <div ng-repeat="(field, errors) in $ctrl.errors">\r\n    <li ng-repeat="error in errors">\r\n      {{field}} {{error}}\r\n    </li>\r\n  </div>\r\n</ul>');
$templateCache.put('home/home.html','<div class="home-page">\r\n\r\n  <p>This is the home page and still needs to be changed, we are planning to show different rooms here and probably some information...</p>\r\n  \r\n  <ul>\r\n\r\n      <li class="nav-item">\r\n        <a class="nav-link"\r\n          ui-sref-active="active"\r\n          ui-sref="app.canvas">\r\n          Canvas\r\n        </a>\r\n      </li>\r\n\r\n\t  <div ng-hide="$ctrl.authed">\r\n\t\t  <li class="nav-item">\r\n\t\t\t<a class="nav-link"\r\n\t\t\t  ui-sref-active="active"\r\n\t\t\t  ui-sref="app.login">\r\n\t\t\t  Sign in\r\n\t\t\t</a>\r\n\t\t  </li>\r\n\r\n\t\t  <li class="nav-item">\r\n\t\t\t<a class="nav-link"\r\n\t\t\t  ui-sref-active="active"\r\n\t\t\t  ui-sref="app.register">\r\n\t\t\t  Sign up\r\n\t\t\t</a>\r\n\t\t  </li>\r\n\t  </div>\r\n\t  \r\n\t  <li class="nav-item" show-authed="true">\r\n        <a class="nav-link" href=""\r\n\t\t  ui-sref-active="active"\r\n          ng-click="$ctrl.logout()">\r\n          Logout\r\n        </a>\r\n      </li>\r\n\r\n    </ul>\r\n\r\n</div>\r\n');
$templateCache.put('layout/app-view.html','<div ui-view></div>');
$templateCache.put('layout/footer.html','<div id="footer">\r\n\t<span>test</span>\r\n</div>');
$templateCache.put('layout/header.html','<div id="navbar">\r\n\t<select id="colorOptions"></select>\r\n\t<span>Evil Drawing</span>\r\n</div>');
$templateCache.put('layout/sidebar.html','<div id="sidebar">\r\n                <input type ="button" id="clearCv" value="Clear Canvas"/>\r\n                <input type ="button" id="changeBrushSize" value="Brush Size"/>\r\n</div>');
$templateCache.put('components/buttons/favorite-btn.html','<button class="btn btn-sm"\r\n\t\tng-class="{ \'disabled\': $ctrl.isSubmitting,\r\n\t\t\t\t\t\'btn-outline-primary\': !$ctrl.article.favorited,\r\n\t\t\t\t\t\'btn-primary\': $ctrl.article.favorited }"\r\n\t\tng-click="$ctrl.submit()">\r\n\r\n  <i class="ion-heart"></i> <ng-transclude></ng-transclude>\r\n\r\n</button>');
$templateCache.put('components/buttons/follow-btn.html','<button class="btn btn-sm action-btn"\r\n\t\tng-class="{ \'disabled\': $ctrl.isSubmitting,\r\n\t\t\t\t\t\'btn-outline-secondary\': !$ctrl.user.following,\r\n\t\t\t\t\t\'btn-secondary\': $ctrl.user.following }"\r\n\t\tng-click="$ctrl.submit()">\r\n\t&nbsp;\r\n\t{{ $ctrl.user.following ? \'Unfollow\' : \'Follow\' }} {{ $ctrl.user.username }}\r\n</button>');
$templateCache.put('components/article-helpers/article-list.html','<article-preview\r\n  article="article"\r\n  ng-repeat="article in $ctrl.list">\r\n</article-preview>\r\n\r\n<div class="article-preview"\r\n  ng-hide="!$ctrl.loading">\r\n  Loading articles...\r\n</div>\r\n\r\n<div class="article-preview"\r\n  ng-show="!$ctrl.loading && !$ctrl.list.length">\r\n  No articles are here... yet.\r\n</div>\r\n\r\n<list-pagination\r\n total-pages="$ctrl.listConfig.totalPages"\r\n current-page="$ctrl.listConfig.currentPage"\r\n ng-hide="$ctrl.listConfig.totalPages <= 1">\r\n</list-pagination>');
$templateCache.put('components/article-helpers/article-meta.html','<div class="article-meta">\r\n  <a ui-sref="app.profile.main({ username:$ctrl.article.author.username })">\r\n    <img ng-src="{{$ctrl.article.author.image}}" />\r\n  </a>\r\n\r\n  <div class="info">\r\n    <a class="author"\r\n      ui-sref="app.profile.main({ username:$ctrl.article.author.username })"\r\n      ng-bind="$ctrl.article.author.username">\r\n    </a>\r\n    <span class="date"\r\n      ng-bind="$ctrl.article.createdAt | date: \'longDate\' ">\r\n    </span>\r\n  </div>\r\n\r\n  <ng-transclude></ng-transclude>\r\n</div>');
$templateCache.put('components/article-helpers/article-preview.html','<div class="article-preview">\r\n  <article-meta article="$ctrl.article">\r\n    <favorite-btn\r\n      article="$ctrl.article"\r\n      class="pull-xs-right">\r\n      {{$ctrl.article.favoritesCount}}\r\n    </favorite-btn>\r\n  </article-meta>\r\n\r\n  <a ui-sref="app.article({ slug: $ctrl.article.slug })" class="preview-link">\r\n    <h1 ng-bind="$ctrl.article.title"></h1>\r\n    <p ng-bind="$ctrl.article.description"></p>\r\n    <span>Read more...</span>\r\n    <ul class="tag-list">\r\n      <li class="tag-default tag-pill tag-outline"\r\n        ng-repeat="tag in $ctrl.article.tagList">\r\n        {{tag}}\r\n      </li>\r\n    </ul>\r\n  </a>\r\n</div>');
$templateCache.put('components/article-helpers/list-pagination.html','<nav>\r\n  <ul class="pagination">\r\n\r\n    <li class="page-item"\r\n      ng-class="{active: pageNumber === $ctrl.currentPage }"\r\n      ng-repeat="pageNumber in $ctrl.pageRange($ctrl.totalPages)"\r\n\t  ng-click="$ctrl.changePage(pageNumber)">\r\n\r\n      <a class="page-link" href="">{{ pageNumber }}</a>\r\n\r\n    </li>\r\n\r\n  </ul>\r\n</nav>');}]);