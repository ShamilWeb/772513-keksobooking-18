'use strict';

(function () {
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var getFilterData = function (arry) {
    var returnValue = arry.filter(function (pin) {
      if (pin.offer && pin.location) {
        return true;
      }
      return false;
    });

    return returnValue;
  };

  var checkType = function (el) {
    var booleanValue = false;
    if (el.offer.type === window.filter.selectedTypeHous || window.filter.selectedTypeHous === 'any') {
      booleanValue = true;
    }
    return booleanValue;
  };

  var checkRooms = function (el) {
    var booleanValue = false;
    if (el.offer.rooms + '' === window.filter.selectedRooms || window.filter.selectedRooms === 'any') {
      booleanValue = true;
    }
    return booleanValue;
  };

  var checkGuests = function (el) {
    var booleanValue = false;
    if (el.offer.guests + '' === window.filter.selectedGuests || window.filter.selectedGuests === 'any') {
      booleanValue = true;
    }
    return booleanValue;
  };

  var checkPrice = function (el) {
    var booleanValue = false;
    if (((window.filter.selectedPrice === 'any') ||
    (el.offer.price < PRICE_LOW && window.filter.low) ||
    (el.offer.price > PRICE_HIGH && window.filter.high) ||
    (el.offer.price >= PRICE_LOW && el.offer.price <= PRICE_HIGH && window.filter.middle))) {
      booleanValue = true;
    }
    return booleanValue;
  };

  var checkFeatures = function (el) {
    return window.filter.valueCheckedInputs.every(function (e) {
      var booleanValue = false;
      for (var i = 0; i < el.offer.features.length; i++) {
        if (el.offer.features[i] === e) {
          booleanValue = true;
        }
      }
      return booleanValue;
    });
  };

  window.sorting = function (arry) {
    var filterArry = getFilterData(arry).filter(function (el) {

      var type = checkType(el);
      var price = checkPrice(el);
      var rooms = checkRooms(el);
      var guests = checkGuests(el);
      var features = checkFeatures(el);

      return type && price && rooms && guests && features;
    });

    return filterArry;
  };

})();
