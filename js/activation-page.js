'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_TOP = '375px';
  var PIN_LEFT = '570px';
  var formFieldsets = document.querySelectorAll('.ad-form fieldset');
  var formSelects = document.querySelectorAll('.ad-form select');
  var adForm = document.querySelector('.ad-form');

  var onMapPinMainMousedown = function () {
    if (document.querySelector('.map--faded')) {
      window.backend.load(window.pin.renderPins, window.util.outputErrors);
    }
    activatePage(true);
  };

  var onMapPinMainKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (document.querySelector('.map--faded')) {
        window.backend.load(window.pin.renderPins, window.util.outputErrors);
      }
      activatePage(true);
    }
  };

  window.activation = {
    activatePage: activatePage,
    mapPinMain: document.querySelector('.map__pin--main')
  };

  var activatePageTrue = function () {
    window.activation.mapPinMain.removeEventListener('mousedown', onMapPinMainMousedown);
    window.activation.mapPinMain.removeEventListener('keydown', onMapPinMainKeydown);
    window.Constants.ACTIVE_PAGE = true;
    window.util.getCoordinatesPin();
    if (document.querySelector('.map--faded')) {
      window.element.map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.filter.getValueFilter();
    }
  };

  var activatePageFalse = function () {
    window.activation.mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
    window.activation.mapPinMain.addEventListener('keydown', onMapPinMainKeydown);
    window.Constants.ACTIVE_PAGE = false;
    if (document.querySelector('.ad-form__photo').querySelector('img')) {
      var adFormPhotos = document.querySelectorAll('.ad-form__photo');
      adFormPhotos.forEach(function (element, index) {
        if (index < adFormPhotos.length - 1) {
          element.remove();
        }
      });
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
      mapPins.forEach(function (element, index) {
        if (index !== 0) {
          element.remove();
        }
      });
    }
    if (document.querySelector('.input--not-valid')) {
      var classValid = document.querySelectorAll('.input--not-valid');
      classValid.forEach(function (element) {
        element.classList.remove('input--not-valid');
      });
    }
  };

  var activatePage = function (isActive) {
    if (isActive) {
      activatePageTrue();
    } else {
      activatePageFalse();
    }

    formFieldsets.forEach(function (element) {
      element.disabled = !isActive;
    });

    formSelects.forEach(function (element) {
      element.disabled = !isActive;
    });

    window.element.filterFieldsets.forEach(function (element) {
      element.disabled = true;
    });

    window.element.filterSelects.forEach(function (element) {
      element.disabled = true;
    });

    if (document.querySelector('.map__card')) {
      window.util.removeDomElement('.map__card');
    }

  };

  activatePage(false);

  window.activation.activatePage = activatePage;


})();
