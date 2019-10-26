'use strict';

(function () {
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  // ------На вход получает масим похожих объявлений и убирает из них те объявления у которых нет свойства offer и location--------
  var getFilterData = function (arry) {
    var returnValue = arry.filter(function (pin) {
      if (pin.offer && pin.location) {
        return true;
      }
      return false;
    });

    return returnValue;
  };
  // //////////////////////////////////////////////////////////////////////////

  var searchBenefits = function (el) {
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
      var returnValue = false;

      var advantage = searchBenefits(el);

      if ((el.offer.type === window.filter.selectedTypeHous || window.filter.selectedTypeHous === 'any') &&
        (el.offer.rooms + '' === window.filter.selectedRooms || window.filter.selectedRooms === 'any') &&
        (el.offer.guests + '' === window.filter.selectedGuests || window.filter.selectedGuests === 'any') &&
        advantage &&
        ((window.filter.selectedPrice === 'any') ||
        (el.offer.price < PRICE_LOW && window.low) ||
        (el.offer.price > PRICE_HIGH && window.high) ||
        (el.offer.price >= PRICE_LOW && el.offer.price <= PRICE_HIGH && window.middle))
      ) {
        returnValue = true;
      }

      return returnValue;
    });

    var sortArry = filterArry.slice();

    return sortArry;
  };


})();
