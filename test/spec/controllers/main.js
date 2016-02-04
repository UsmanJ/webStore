'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('clothingWebsiteApp'));

  var MainCtrl,
    scope,
    CatalogueService;

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    CatalogueService = $injector.get('CatalogueService');
    var success = function(func) {
      return func({resultCount: 1});
    };
    spyOn(CatalogueService, 'get').and.returnValue({success: success});
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should call the catalogue service to retrieve a list of products', function () {
    expect(CatalogueService.get).toHaveBeenCalled();
  });

  it('should have an empty basket when page first loads', function () {
    expect(MainCtrl.basketEmpty).toBe(true);
  });
});

describe('when adding items to the basket', function () {

  beforeEach(module('clothingWebsiteApp'));

  var MainCtrl,
	scope,
	CatalogueService;

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
	CatalogueService = $injector.get('CatalogueService');
	var success = function(func) {
	  return func({resultCount: 1});
	};
	spyOn(CatalogueService, 'get').and.returnValue({success: success});
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  var product = {
		'productCode':'01',
		'name':'Almond Toe Court Shoes, Patent Black',
		'category':'Women’s Footwear',
		'price':99.00,
		'quantity':10,
		'url': 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=61954405'
  };

  it('should add a item to the basket', function () {
    MainCtrl.add(product);
    expect(MainCtrl.basketEmpty).toBe(false);
  });

  it('basketEmpty remains false when numerous itemes are added to the basket', function () {
    MainCtrl.add(product);
    MainCtrl.add(product);
    expect(MainCtrl.basketEmpty).toBe(false);
  });

  it('should add the item and price to the basket', function () {
    MainCtrl.add(product);
    expect(MainCtrl.basket.length).toEqual(1);
  });

  it('should add item price to the total', function () {
    MainCtrl.add(product);
    expect(MainCtrl.totalCost).toBe(99.00);
  });

  it('should add a number to the total products when a product is added', function () {
    MainCtrl.add(product);
    expect(MainCtrl.totalProducts).toBe(1);
  });
});

describe('when incremeneting product in the basket', function () {

  beforeEach(module('clothingWebsiteApp'));

  var MainCtrl,
	scope,
	CatalogueService;

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
	CatalogueService = $injector.get('CatalogueService');
	var success = function(func) {
	  return func({resultCount: 1});
	};
	spyOn(CatalogueService, 'get').and.returnValue({success: success});
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  var product = {
		'productCode':'01',
		'name':'Almond Toe Court Shoes, Patent Black',
		'category':'Women’s Footwear',
		'price':99.00,
		'quantity':5,
		'url': 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=61954405'
  };

  it('should increment totalMains when a main is added', function () {
    MainCtrl.add(product);
    MainCtrl.incrementItem(product);
    expect(MainCtrl.totalProducts).toBe(2);
  });

  it('should add to the total price', function () {
    MainCtrl.add(product);
    MainCtrl.incrementItem(product);
    expect(MainCtrl.totalCost).toBe(198);
  });

  it('should change the quantity in the object', function () {
    MainCtrl.add(product);
    MainCtrl.add(product);
    expect(MainCtrl.basket[0].quantity).toBe(2);
  });
});

describe('when decrementing product in the basket', function () {

  beforeEach(module('clothingWebsiteApp'));

  var MainCtrl,
	scope,
	CatalogueService;

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
	CatalogueService = $injector.get('CatalogueService');
	var success = function(func) {
	  return func({resultCount: 1});
	};
	spyOn(CatalogueService, 'get').and.returnValue({success: success});
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  var product = {
		'productCode':'01',
		'name':'Almond Toe Court Shoes, Patent Black',
		'category':'Women’s Footwear',
		'price':99.00,
		'quantity':5,
		'url': 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=61954405'
  };

  it('should decrement totalMains when a main is decremented', function () {
    MainCtrl.add(product);
    MainCtrl.incrementItem(product);
    MainCtrl.incrementItem(product);
    MainCtrl.decrementItem(product);
    expect(MainCtrl.totalProducts).toBe(2);
  });

  it('should decrement totalCost', function () {
    MainCtrl.add(product);
    MainCtrl.incrementItem(product);
    MainCtrl.incrementItem(product);
    MainCtrl.decrementItem(product);
    expect(MainCtrl.totalCost).toBe(198);
  });
});
