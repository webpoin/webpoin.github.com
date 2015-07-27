'use strict';

/**
 * @ngdoc function
 * @name findteacherApp.controller:MainCtrl
 * @description
 * # ListCtrl
 * Controller of the findteacherApp
 */
angular.module('app')
  .controller('ListCtrl', function ($scope,Data) {
  	$scope.data = Data;


  });
