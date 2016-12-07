let componentsModule = angular.module('app.components', []);

import ListErrors from './list-errors.component';
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import PressEnter from './press-enter.directive';
componentsModule.directive('pressEnter', PressEnter);

export default componentsModule;
