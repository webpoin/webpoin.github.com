'use strict';

/**
 * @ngdoc function
 * @name findteacherApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the findteacherApp
 */
angular.module('app')
  .controller('search', function ($scope,$http,$location,Data,localStorageService) {
  	$scope.data = Data;
  	// $scope.data = {}
  	// $scope.data.key = '项目管理';


	$scope.submit = function() {
		if($scope.data.key.length==0 ) return;
		var key = $scope.data.key;

		$http({
			method: 'GET',
			url: 'search.json',
			// data: $scope.data, // pass in data as strings
			headers: {'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
		}).success(function(json) {
			Data.search = json;

			// 储存到本地数据库
			// 最近搜索规则
			// 不能重复(如果重复则重复项提前)
			// 不能为空
			// 最长为5个
			// 最新搜索放最前（倒序）

			var late = localStorageService.get('late');
				late = late && late.split('\n') || [];

			if(late.indexOf(key)<0){
				localStorageService.add('late', [key].concat(late.slice(0,4)).join('\n') );
			}else{
				// 有重复
				late.splice(late.indexOf(key), 1);
				localStorageService.add('late',[key].concat(late).join('\n'));
			}

			$location.path('/list');

		});
	}
	$scope.filter = function(){
		$location.path('/filter');
	}
  });
