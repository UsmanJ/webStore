'use strict';

describe('Factory: DiscountService', function () {

  beforeEach(module('clothingWebsiteApp'));

  var DiscountService, $httpBackend;
  beforeEach(inject(function ($injector) {
	$httpBackend          = $injector.get('$httpBackend');
	DiscountService = $injector.get('DiscountService');
  }));

  afterEach(function() {
	$httpBackend.verifyNoOutstandingExpectation();
	$httpBackend.verifyNoOutstandingRequest();
  });

  it('should do something', function () {
    expect(!!DiscountService).toBe(true);
  });

  it('should load the discount json', function() {
    var DiscountData = [
      {
        'code':'fiver',
        'discount': 5,
        'value': 5
      },
      {
        'code':'tenner',
        'discount': 10,
        'value': 50
      },
      {
        'code':'fifteen',
        'discount': 15,
        'value': 5
      }
    ];

	$httpBackend.whenGET(/\/data\/discount.json?.*/).respond(function() {
	  return [200, DiscountData];
	});
	DiscountService.get().success(function (data) {
	  expect(data.length).toBe(DiscountData.length);
	});
	$httpBackend.flush();
  });

});
