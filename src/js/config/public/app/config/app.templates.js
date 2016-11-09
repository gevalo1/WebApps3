angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('auth/auth.html','<div class="auth-page">\r\n  <div class="container page">\r\n    <div class="row">\r\n\r\n      <div class="col-md-6 offset-md-3 col-xs-12">\r\n        <h1 class="text-xs-center" ng-bind="::$ctrl.title"></h1>\r\n        <p class="text-xs-center">\r\n          <a ui-sref="app.login" ng-show="$ctrl.authType === \'register\'">\r\n            Have an account?\r\n          </a>\r\n\t\t  <a ui-sref="app.register" ng-show="$ctrl.authType === \'login\'">\r\n            Need an account?\r\n          </a>\r\n        </p>\r\n\t\t\r\n\t\t<list-errors errors="$ctrl.errors"></list-errors>\r\n\r\n        <form ng-submit="$ctrl.submitForm()">\r\n          <fieldset ng-disabled="$ctrl.isSubmitting">\r\n\r\n            <fieldset class="form-group" ng-show="$ctrl.authType === \'register\'">\r\n              <input class="form-control form-control-lg"\r\n                type="text"\r\n                placeholder="Username"\r\n                ng-model="$ctrl.formData.username" />\r\n            </fieldset>\r\n\r\n            <fieldset class="form-group">\r\n              <input class="form-control form-control-lg"\r\n                type="email"\r\n                placeholder="Email"\r\n                ng-model="$ctrl.formData.email" />\r\n            </fieldset>\r\n\r\n            <fieldset class="form-group">\r\n              <input class="form-control form-control-lg"\r\n                type="password"\r\n                placeholder="Password"\r\n                ng-model="$ctrl.formData.password" />\r\n            </fieldset>\r\n              \r\n              <!--<fieldset class="form-group">\r\n              <input class="form-control form-control-lg"\r\n                type="password"\r\n                placeholder="Confirm Password"\r\n                ng-model="$ctrl.formData.password" />\r\n            </fieldset>-->\r\n\r\n            <button class="btn btn-lg btn-primary pull-xs-right"\r\n              type="submit" ng-bind="$ctrl.title">\r\n            </button>\r\n\r\n          </fieldset>\r\n        </form>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>');
$templateCache.put('components/list-errors.html','<ul class="error-messages" ng-show="$ctrl.errors">\r\n  <div ng-repeat="(field, errors) in $ctrl.errors">\r\n    <li ng-repeat="error in errors">\r\n      {{field}} {{error}}\r\n    </li>\r\n  </div>\r\n</ul>');
$templateCache.put('layout/app-view.html','<app-header></app-header>\r\n\r\n<div ui-view></div>\r\n\r\n<app-footer></app-footer>\r\n');
$templateCache.put('layout/footer.html','<div id="footer"></div>');
$templateCache.put('layout/header.html','<div id="navbar">\r\n    <select id="colorOptions"></select>\r\n</div>');
$templateCache.put('home/home.html','<div id="content">\r\n    <div id="cvContainer"><!-- our canvas will be inserted here--></div>\r\n    <div id="sidebar">\r\n        <input type ="button" id="clearCv" value="Clear Canvas"/>\r\n        <input type ="button" id="changeBrushSize" value="Brush Size"/>\r\n    </div>\r\n</div>');
$templateCache.put('components/buttons/favorite-btn.html','<button class="btn btn-sm"\r\n\t\tng-class="{ \'disabled\': $ctrl.isSubmitting,\r\n\t\t\t\t\t\'btn-outline-primary\': !$ctrl.article.favorited,\r\n\t\t\t\t\t\'btn-primary\': $ctrl.article.favorited }"\r\n\t\tng-click="$ctrl.submit()">\r\n\r\n  <i class="ion-heart"></i> <ng-transclude></ng-transclude>\r\n\r\n</button>');
$templateCache.put('components/buttons/follow-btn.html','<button class="btn btn-sm action-btn"\r\n\t\tng-class="{ \'disabled\': $ctrl.isSubmitting,\r\n\t\t\t\t\t\'btn-outline-secondary\': !$ctrl.user.following,\r\n\t\t\t\t\t\'btn-secondary\': $ctrl.user.following }"\r\n\t\tng-click="$ctrl.submit()">\r\n\t&nbsp;\r\n\t{{ $ctrl.user.following ? \'Unfollow\' : \'Follow\' }} {{ $ctrl.user.username }}\r\n</button>');
$templateCache.put('components/article-helpers/article-list.html','<article-preview\r\n  article="article"\r\n  ng-repeat="article in $ctrl.list">\r\n</article-preview>\r\n\r\n<div class="article-preview"\r\n  ng-hide="!$ctrl.loading">\r\n  Loading articles...\r\n</div>\r\n\r\n<div class="article-preview"\r\n  ng-show="!$ctrl.loading && !$ctrl.list.length">\r\n  No articles are here... yet.\r\n</div>\r\n\r\n<list-pagination\r\n total-pages="$ctrl.listConfig.totalPages"\r\n current-page="$ctrl.listConfig.currentPage"\r\n ng-hide="$ctrl.listConfig.totalPages <= 1">\r\n</list-pagination>');
$templateCache.put('components/article-helpers/article-meta.html','<div class="article-meta">\r\n  <a ui-sref="app.profile.main({ username:$ctrl.article.author.username })">\r\n    <img ng-src="{{$ctrl.article.author.image}}" />\r\n  </a>\r\n\r\n  <div class="info">\r\n    <a class="author"\r\n      ui-sref="app.profile.main({ username:$ctrl.article.author.username })"\r\n      ng-bind="$ctrl.article.author.username">\r\n    </a>\r\n    <span class="date"\r\n      ng-bind="$ctrl.article.createdAt | date: \'longDate\' ">\r\n    </span>\r\n  </div>\r\n\r\n  <ng-transclude></ng-transclude>\r\n</div>');
$templateCache.put('components/article-helpers/article-preview.html','<div class="article-preview">\r\n  <article-meta article="$ctrl.article">\r\n    <favorite-btn\r\n      article="$ctrl.article"\r\n      class="pull-xs-right">\r\n      {{$ctrl.article.favoritesCount}}\r\n    </favorite-btn>\r\n  </article-meta>\r\n\r\n  <a ui-sref="app.article({ slug: $ctrl.article.slug })" class="preview-link">\r\n    <h1 ng-bind="$ctrl.article.title"></h1>\r\n    <p ng-bind="$ctrl.article.description"></p>\r\n    <span>Read more...</span>\r\n    <ul class="tag-list">\r\n      <li class="tag-default tag-pill tag-outline"\r\n        ng-repeat="tag in $ctrl.article.tagList">\r\n        {{tag}}\r\n      </li>\r\n    </ul>\r\n  </a>\r\n</div>');
$templateCache.put('components/article-helpers/list-pagination.html','<nav>\r\n  <ul class="pagination">\r\n\r\n    <li class="page-item"\r\n      ng-class="{active: pageNumber === $ctrl.currentPage }"\r\n      ng-repeat="pageNumber in $ctrl.pageRange($ctrl.totalPages)"\r\n\t  ng-click="$ctrl.changePage(pageNumber)">\r\n\r\n      <a class="page-link" href="">{{ pageNumber }}</a>\r\n\r\n    </li>\r\n\r\n  </ul>\r\n</nav>');}]);