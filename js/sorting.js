'use strict';

(function () {
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var getFilterData = function (array) {
    var result = array.filter(function (pin) {
      if (pin.offer && pin.location) {
        return true;
      }
      return false;
    });

    return result;
  };

  var checkType = function (element) {
    var booleanValue = false;
    if (element.offer.type === window.filter.selectedTypeHous || window.filter.selectedTypeHous === 'any') {
      booleanValue = true;
    }
    return booleanValue;
  };

  var checkRooms = function (element) {
    var booleanValue = false;
    if (element.offer.rooms + '' === window.filter.selectedRooms || window.filter.selectedRooms === 'any') {
      booleanValue = true;
    }
    return booleanValue;
  };

  var checkGuests = function (element) {
    var booleanValue = false;
    if (element.offer.guests + '' === window.filter.selectedGuests || window.filter.selectedGuests === 'any') {
      booleanValue = true;
    }
    return booleanValue;
  };

  var checkPrice = function (element) {
    var booleanValue = false;
    if (((window.filter.selectedPrice === 'any') ||
    (element.offer.price < PRICE_LOW && window.filter.low) ||
    (element.offer.price > PRICE_HIGH && window.filter.high) ||
    (element.offer.price >= PRICE_LOW && element.offer.price <= PRICE_HIGH && window.filter.middle))) {
      booleanValue = true;
    }
    return booleanValue;
  };

  var checkFeatures = function (element) {
    return window.filter.valueCheckedInputs.every(function (value) {
      var booleanValue = false;
      for (var i = 0; i < element.offer.features.length; i++) {
        if (element.offer.features[i] === value) {
          booleanValue = true;
          break;
        }
      }
      return booleanValue;
    });
  };

  window.sorting = function (array) {
    var filterArry = getFilterData(array).filter(function (element) {

      var type = checkType(element);
      var price = checkPrice(element);
      var rooms = checkRooms(element);
      var guests = checkGuests(element);
      var features = checkFeatures(element);

      return type && price && rooms && guests && features;
    });

    return filterArry;
  };

})();
