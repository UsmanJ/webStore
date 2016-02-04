'use strict';

angular.module('clothingWebsiteApp')
	.factory('DiscountService', ['$http', function ($http) {
		var service = {
			get: get
		};

		return service;

		function get () {
			return $http.get('/data/discount.json');
		}

	}]);
