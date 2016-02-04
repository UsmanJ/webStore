'use strict';

/**
 * @ngdoc function
 * @name clothingWebsiteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clothingWebsiteApp
 */
angular.module('clothingWebsiteApp')
  .controller('MainCtrl', ['CatalogueService', 'DiscountService', '$timeout', function (CatalogueService, DiscountService, $timeout) {

    var self = this;

    angular.element(document).ready(function () {
      self.retreiveBasket();
      self.sessionPrice();
      self.sessionQuantity();
      self.sessionBasket();
    });

    self.catalogue = {};
      CatalogueService.get('/data/catalogue.json').success(function(data) {
      self.catalogue = data;
    });

    self.discount = {};
      DiscountService.get('/data/discount.json').success(function(data) {
      self.discount = data;
    });

    self.basketEmpty = true;
    self.basket = [];
    self.totalCost = 0;
    self.totalProducts = 0;
    self.discountApplied = false;
    self.discount = 0;
    self.incorrectCode = false;
    self.incompatiableVoucher = false;
    self.footWear = false;

    self.add = function(product) {
      self.basketEmpty = false;
      var i;
      var alreadyExists = false;
      if (product.quantity > 0) {
        for (i = 0; i < self.basket.length; i++) {
          if (self.basket[i].product === product.name) {
            alreadyExists = true;
            var quantity = self.basket[i].quantity;
            self.basket[i] = ({product: product.name, price: parseFloat(product.price), quantity: quantity+1});
            }
        }

        if (!alreadyExists) {
          self.basket.push({product: product.name, price: parseFloat(product.price), quantity: 1});
        }
        if (product.productCode === '01') {
          self.footWear = true;
        }
        product.quantity--;
        self.totalProducts += 1;
        self.totalCost += parseFloat(product.price);
        self.updateStorage();
      } else {
        alert('Sorry, this product is out of stock.');
      }
    };

    self.incrementItem = function(product) {
      var i;
      if (product.quantity > 0) {
        for (i = 0; i < self.basket.length; i++) {
          if (self.basket[i].product === product.product) {
            var quantity = self.basket[i].quantity;
            self.basket[i] = ({product: product.product, price: parseFloat(product.price), quantity: quantity+1, tags: product.tags});
            }
        }
        self.totalProducts += 1;
        self.totalCost += parseFloat(product.price);
        self.updateStorage();
      } else {
        alert('Sorry, this product is out of stock.');
      }
    };

    self.decrementItem = function(product) {
      var i;
      for (i = 0; i < self.basket.length; i++) {
        if (self.basket[i].product === product.product) {
          var quantity = self.basket[i].quantity;
          self.basket[i] = ({product: product.product, price: parseFloat(product.price), quantity: quantity-1});
          if (self.basket[i].quantity === 0 ) {
            delete self.basket[i];
            self.deleted = true;
            self.clearBasket();
            self.basketEmpty = true;
          }
        }
      }
      self.totalProducts -= 1;
      self.totalCost -= parseFloat(product.price);
      self.updateStorage();
    };

    self.submitVoucher = function (code) {
      var i;
      var hasFootwear = self.footWear;
      if (!self.discountApplied) {
        for (i = 0; i < self.discount.length; i++) {
          var existingVouchers = self.discount[i];
          var minOrderValue = existingVouchers.value;
          var fifteenDiscount = self.discount[2].code;
          if (existingVouchers.code === code) {
            self.validCode = true;
            if (self.validCode && minOrderValue < self.totalCost && fifteenDiscount !== code) {
              self.totalCost -= self.discount[i].discount;
              self.discountApplied = true;
              self.discount = self.discount[i].discount;
              self.incorrectCode = false;
              self.incompatiableVoucher = false;
              break;
            } else if (self.validCode && minOrderValue < self.totalCost && fifteenDiscount === code && hasFootwear) {
              self.totalCost -= self.discount[i].discount;
              self.discountApplied = true;
              self.discount = self.discount[i].discount;
              self.incorrectCode = false;
              self.incompatiableVoucher = false;
              break;

          } else if (self.validCode && minOrderValue > self.totalCost || self.validCode && minOrderValue < self.totalCost && fifteenDiscount === code && !hasFootwear) {
              self.incompatiableVoucher = true;
          }
          }
        }
      } else if (self.discountApplied){
        self.discountAlreadyApplied = true;
      }
      if (!self.validCode){
        self.incorrectCode = true;
      }
    };

    self.updateStorage = function() {
      sessionStorage.setItem('basket', JSON.stringify(self.basket));
    };

    self.retreiveBasket = function() {
      var retrieved = JSON.parse(sessionStorage.getItem('basket'));
      if (retrieved !== null) {
        self.basket = retrieved;
        self.basket = self.basket.filter(function(n){ return n !== undefined });
      }
    };

    self.sessionPrice = function() {
      var i;
      for (i = 0; i < self.basket.length; i++) {
        var price = self.basket[i].price;
        var quantity = self.basket[i].quantity;
        self.totalCost += (price * quantity);
      }
    };

    self.sessionQuantity = function() {
      var i;
      for (i = 0; i < self.basket.length; i++) {
        var quantity = self.basket[i].quantity;
        self.totalProducts += quantity;
      }
    };

    self.clearBasket = function() {
      sessionStorage.clear();
      location.reload();
    };

    self.sessionBasket = function() {
      if (self.totalProducts > 0) {
        $timeout(function() {
          self.basketEmpty = false;
        },50);
      }
    };

    self.delete = function() {
      return self.deleted;
    };

  }]);
