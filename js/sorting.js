'use strict';

(function () {
  var PRICE_10000 = 10000;
  var PRICE_50000 = 50000;

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

  window.sorting = function (arry) {
    var filterArry = getFilterData(arry).filter(function (el) {
      var returnValue = false;

      var advantage = window.valueCheckedInputs.every(function (e) {
        var booleanValue = false;
        for (var i = 0; i < el.offer.features.length; i++) {
          if (el.offer.features[i] === e) {
            booleanValue = true;
          }
        }
        return booleanValue;
      });

      if ((el.offer.type === window.selectedTypeHous || window.selectedTypeHous === 'any') &&
        (el.offer.rooms + '' === window.selectedRooms || window.selectedRooms === 'any') &&
        (el.offer.guests + '' === window.selectedGuests || window.selectedGuests === 'any') &&
        advantage &&
        ((window.selectedPrice === 'any') ||
        (el.offer.price < PRICE_10000 && window.low) ||
        (el.offer.price > PRICE_50000 && window.high) ||
        (el.offer.price >= PRICE_10000 && el.offer.price <= PRICE_50000 && window.middle))
      ) {
        returnValue = true;
      }

      return returnValue;
    });

    var sortArry = filterArry.slice();

    return sortArry;
  };


})();
