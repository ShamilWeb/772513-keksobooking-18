'use strict';

(function () {
  var fieldset = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var ENTER_KEYCODE = 13;

  // ------переводит страницу в активное состояние----------------------------
  var activationPage = function (isActive) {
    if (isActive) {
      window.util.map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      mapFilters.classList.remove('ad-form--disabled');
    } else {
      window.util.map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      mapFilters.classList.add('ad-form--disabled');
    }
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = !isActive;
    }
    for (i = 0; i < select.length; i++) {
      select[i].disabled = !isActive;
    }
  };
  // /////////////////////////////////////////////////////////////////

  // -----При нажатии мышкой на кекс в цетре карты, переводит страницу в активное состояние-------------
  mapPinMain.addEventListener('mousedown', function () {
    activationPage(true);
    window.backend.load(window.pin.renderPins, window.util.outputErrors);
  });
  // //////////////////////////////////////////////////////////////

  // -------При нажатии ИНТЕРОМ на кекс в цетре карты, переводит страницу в активное состояние-------------
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activationPage(true);
      window.backend.load(window.pin.renderPins, window.util.outputErrors);
    }
  });
  // ////////////////////////////////////////////////////////////////////////////////

  activationPage(false);

  window.activation = {
    activationPage: activationPage
  }

})();
