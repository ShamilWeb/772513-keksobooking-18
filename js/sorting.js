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

  // ---------Проверяет объявление на соответствие типа жилья-------------
  var checkType = function (el) {
      var booleanValue = false;
      if(el.offer.type === window.filter.selectedTypeHous || window.filter.selectedTypeHous === 'any') {
        booleanValue = true;
      }
      return booleanValue;
  };
  // ////////////////////////////////////////////////////////////////////////

  // ---------Проверяет объявление на соответствие количества комнат-------------
  var checkRooms = function (el) {
      var booleanValue = false;
      if(el.offer.rooms + '' === window.filter.selectedRooms || window.filter.selectedRooms === 'any') {
        booleanValue = true;
      }
      return booleanValue;
  };
  // ////////////////////////////////////////////////////////////////////////

  // ---------Проверяет объявление на соответствие количества гостей-------------
  var checkGuests = function (el) {
      var booleanValue = false;
      if(el.offer.guests + '' === window.filter.selectedGuests || window.filter.selectedGuests === 'any') {
        booleanValue = true;
      }
      return booleanValue;
  };
  // ////////////////////////////////////////////////////////////////////////

  // ---------Проверяет объявление на соответствие цены-------------
  var checkPrice = function (el) {
      var booleanValue = false;
      if(((window.filter.selectedPrice === 'any') ||
      (el.offer.price < PRICE_LOW && window.low) ||
      (el.offer.price > PRICE_HIGH && window.high) ||
      (el.offer.price >= PRICE_LOW && el.offer.price <= PRICE_HIGH && window.middle))) {
        booleanValue = true;
      }
      return booleanValue;
  };
  // ////////////////////////////////////////////////////////////////////////

  // ---------Проверяет объявление на соответствие преимуществ-------------
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
  // ////////////////////////////////////////////////////////////////////////

  window.sorting = function (arry) {
    var filterArry = getFilterData(arry).filter(function (el) {

      var type= checkType(el);
      var price= checkPrice(el);
      var rooms= checkRooms(el);
      var guests= checkGuests(el);
      var features = checkFeatures(el);

      return type && price && rooms && guests && features;
    });

    return filterArry;
  };

})();
