'use strict';

(function () {
  var fieldset = document.querySelectorAll('fieldset');
  var select = document.querySelectorAll('select');
  window.mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var ENTER_KEYCODE = 13;
  var PIN_TOP = '375px';
  var PIN_LEFT = '570px';

  // ------переводит страницу в активное состояние----------------------------
  var activationPage = function (isActive) {
    if (isActive) {
      if (document.querySelector('.map--faded')) {
        window.util.map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        window.filter.getValueFilter();
      }
    } else {
      if (document.querySelector('.ad-form__photo').querySelector('img')) {
        var adFormPhoto = document.querySelectorAll('.ad-form__photo');
        for (var i = 0; i < adFormPhoto.length - 1; i++) {
          adFormPhoto[i].remove();
        }
      }
      if (window.preview) {
        window.preview.src = 'img/muffin-grey.svg';
      }
      window.mapPinMain.style.top = PIN_TOP;
      window.mapPinMain.style.left = PIN_LEFT;
      window.util.form.reset();
      window.util.mapFilters.reset();
      window.util.getCoordinatesPin();
      window.util.map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      window.util.mapFilters.classList.add('ad-form--disabled');
      if (window.mapPins) {
        for (i = 1; i < window.mapPins.length; i++) {
          window.mapPins[i].remove();
        }
      }
    }
    for (i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = !isActive;
    }
    for (i = 0; i < select.length; i++) {
      select[i].disabled = !isActive;
    }

    if (document.querySelector('.map__card')) {
      window.removeDomElement('.map__card');
    }
  };
  // /////////////////////////////////////////////////////////////////

  // -----При нажатии мышкой на кекс в цетре карты, переводит страницу в активное состояние-------------
  window.mapPinMain.addEventListener('mousedown', function () {
    if (document.querySelector('.map--faded')) {
      window.backend.load(window.pin.renderPins, window.util.outputErrors);
    }
    activationPage(true);
  });
  // //////////////////////////////////////////////////////////////

  // -------При нажатии ИНТЕРОМ на кекс в цетре карты, переводит страницу в активное состояние-------------
  window.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (document.querySelector('.map--faded')) {
        window.backend.load(window.pin.renderPins, window.util.outputErrors);
      }
      activationPage(true);
    }
  });
  // ////////////////////////////////////////////////////////////////////////////////

  activationPage(false);

  window.activation = {
    activationPage: activationPage
  };

})();
