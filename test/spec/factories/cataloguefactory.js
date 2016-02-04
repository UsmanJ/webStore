'use strict';

describe('Factory: CatalogueService', function () {

  beforeEach(module('clothingWebsiteApp'));

  var CatalogueService, $httpBackend;
  beforeEach(inject(function ($injector) {
	$httpBackend          = $injector.get('$httpBackend');
	CatalogueService = $injector.get('CatalogueService');
  }));

  afterEach(function() {
	$httpBackend.verifyNoOutstandingExpectation();
	$httpBackend.verifyNoOutstandingRequest();
  });

  it('should do something', function () {
    expect(!!CatalogueService).toBe(true);
  });

  it('should load the catalogue json', function() {
	var catalogueData = { "products" : [
  	{
  		"productCode":"01",
  		"name":"Almond Toe Court Shoes, Patent Black",
  		"category":"Women’s Footwear",
  		"price":99.00,
  		"quantity":5,
  		"url": "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=61954405"
  	}
  ]};
  
	$httpBackend.whenGET(/\/data\/catalogue.json?.*/).respond(function(/* method, url */) {
	  return [200, catalogueData];
	});
	CatalogueService.get().success(function (data) {
	  expect(data.resultCount).toBe(catalogueData.resultCount);
	  expect(data.products.length).toBe(catalogueData.products.length);
	  expect(data.products[0].id).toBe(catalogueData.products[0].id);
	});
	$httpBackend.flush();
  });

});
