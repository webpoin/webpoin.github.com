'use strict';

/**
 * @ngdoc function
 * @name findteacherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the findteacherApp
 */
angular.module('app').controller('MainCtrl', function($scope, $http, Data, localStorageService) {


		var hot = [];
		var hot_idx = 0;
		var hot_each = 8;

		var late = localStorageService.get('late');
		$scope.late = late && late.split('\n') || [];
		$scope.lately = $scope.late.length > 0;


		// 点击“换一批”时更新数据
		$scope.updateHot = function() {

			$scope.hot = hot.slice(hot_idx * hot_each, (hot_idx + 1) * hot_each);
			hot_idx++;
			$scope.replace = hot.length > hot_idx * hot_each;
		}

		// 点击“清除” 清除本地数据
		$scope.cleanUp = function() {
			$scope.lately = false;
			localStorageService.add('late', '');
		}


		// 异步取热门搜索
		$http({
			method: 'GET',
			url: 'hot.json',
			// data: $scope.data, // pass in data as strings
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			} // set the headers so angular passing info as form data (not request payload)
		}).success(function(json) {
			hot = json;
			$scope.updateHot();
		});

		$scope.replace = true;
		$scope.data = Data;
		$scope.data.key = '';

	});