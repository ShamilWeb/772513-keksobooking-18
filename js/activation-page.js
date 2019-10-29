'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_TOP = '375px';
  var PIN_LEFT = '570px';
  var ONE = 1;
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');
  var adForm = document.querySelector('.ad-form');

  window.activation = {
    activationPage: activationPage,
    mapPinMain: document.querySelector('.map__pin--main')
  };

  // ------переводит страницу в активное состояние----------------------------
  var activationPage = function (isActive) {
    if (isActive) {
      if (document.querySelector('.map--faded')) {
        window.element.map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        window.filter.getValueFilter();
      }
    } else {
      if (document.querySelector('.ad-form__photo').querySelector('img')) {
        var adFormPhotos = document.querySelectorAll('.ad-form__photo');
        for (var i = 0; i < adFormPhotos.length - ONE; i++) {
          adFormPhotos[i].remove();
        }
      }
      if (window.preview) {
        window.preview.src = 'img/muffin-grey.svg';
      }
      window.activation.mapPinMain.style.top = PIN_TOP;
      window.activation.mapPinMain.style.left = PIN_LEFT;
      window.element.form.reset();
      window.element.mapFilters.reset();
      window.util.getCoordinatesPin();
      window.element.map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      window.element.mapFilters.classList.add('ad-form--disabled');
      var mapPins = document.querySelector('.map__pins').querySelectorAll('.map__pin');
      if (mapPins) {
        for (i = 1; i < mapPins.length; i++) {
          mapPins[i].remove();
        }
      }
    }
    for (i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = !isActive;
    }
    for (i = 0; i < selects.length; i++) {
      selects[i].disabled = !isActive;
    }

    if (document.querySelector('.map__card')) {
      window.util.removeDomElement('.map__card');
    }

  };
  // /////////////////////////////////////////////////////////////////

  // -----При нажатии мышкой на кекс в цетре карты, переводит страницу в активное состояние-------------
  window.activation.mapPinMain.addEventListener('mousedown', function () {
    if (document.querySelector('.map--faded')) {
      window.backend.load(window.pin.renderPins, window.util.outputErrors);
    }
    activationPage(true);
  });
  // //////////////////////////////////////////////////////////////

  // -------При нажатии ИНТЕРОМ на кекс в цетре карты, переводит страницу в активное состояние-------------
  window.activation.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (document.querySelector('.map--faded')) {
        window.backend.load(window.pin.renderPins, window.util.outputErrors);
      }
      activationPage(true);
    }
  });
  // ////////////////////////////////////////////////////////////////////////////////

  activationPage(false);

  window.activation.activationPage = activationPage;


})();
