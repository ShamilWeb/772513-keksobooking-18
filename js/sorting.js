'use strict';

(function () {
  var PRICE_10000 = 10000;
  var PRICE_50000 = 50000;

  // ----------Проверяет два массива на совпадение значений и вовращает количество совпадений----------
  var compareArry = function (arry1, arry2) {
    var consilience = 0;
    arry1.forEach(function (el) {
      for (var i = 0; i < arry2.length; i++) {
        if (el === arry2[i]) {
          consilience += 1;
          break;
        }
      }
    });
    return consilience;
  };
  // ////////////////////////////////////////////////////////////////////////////////////////

  var getRank = function (advert) {
    var rank = 0;

    if (advert.offer.price < PRICE_10000 && window.low) {
      rank += 1;
    }
    if (advert.offer.price >= PRICE_10000 && advert.offer.price <= PRICE_50000 && window.middle) {
      rank += 1;
    }
    if (advert.offer.price > PRICE_50000 && window.high) {
      rank += 1;
    }

    if (advert.offer.rooms + '' === window.selectedRooms) {
      rank += 1;
    }

    if (advert.offer.guests + '' === window.selectedGuests) {
      rank += 1;
    }

    rank += compareArry(window.valueCheckedInputs, advert.offer.features);

    return rank;
  };

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
      return el.offer.type === window.selectedTypeHous || window.selectedTypeHous === 'any';
    });
    var sortArry = filterArry.slice().sort(function (right, left) {
      var rankDiff = getRank(left) - getRank(right);
      return rankDiff;
    });

    return sortArry;
  };


})();
