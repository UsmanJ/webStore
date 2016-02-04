'use strict';

angular.module('clothingWebsiteApp')
	.factory('CatalogueService', ['$http', function ($http) {
		var service = {
			get: get
		};

		return service;

		function get () {
			return $http.get('/data/catalogue.json');
		}

	}]);
