'use strict';

(function () {
  var MAX_OUTPUT_PIN = 5;
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var removeEventListenerPopupClose = function () {
    var popupClose = document.querySelector('.popup__close');
    popupClose.removeEventListener('click', removeCards);
    document.removeEventListener('keydown', removeCardsEsc);
  };

  var removeCards = function () {
    removeEventListenerPopupClose();
    window.util.removeDomElement('.map__card');
    if (document.querySelector('.map__pin--active')) {
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };

  var removeCardsEsc = function (evt) {
    if (evt.keyCode === 27) {
      removeEventListenerPopupClose();
      window.util.removeDomElement('.map__card');
      if (document.querySelector('.map__pin--active')) {
        document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
    }
  };

  var getPinElement = function (pin) {
    var markElement = mapPinTemplate.cloneNode(true);
    var image = markElement.querySelector('img');
    image.src = pin.author.avatar;
    image.alt = pin.offer.title;
    markElement.style.left = pin.location.x + 'px';
    markElement.style.top = pin.location.y + 'px';
    return markElement;
  };

  var getCircuit = function (pins, cards) {
    window.onPinsClick = function () {
      if (document.querySelector('.map__pin--active')) {
        document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
      pins.classList.add('map__pin--active');
      if (document.querySelector('.map__card')) {
        removeEventListenerPopupClose();
        window.util.removeDomElement('.map__card');
      }
      window.card.renderCards(cards);
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', removeCards);
      document.addEventListener('keydown', removeCardsEsc);
    };
    pins.addEventListener('click', window.onPinsClick);
    return pins;
  };

  var addEventListenerPins = function (pin, cards) {
    return getCircuit(pin, cards);
  };

  var removeMapPin = function () {
    var pins = document.querySelector('.map__pins').querySelectorAll('.map__pin');
    if (pins) {
      pins.forEach(function (element, index) {
        if (index !== 0) {
          element.removeEventListener('click', window.onPinsClick);
          element.remove();
        }
      });
    }
  };

  var activateFilter = function () {
    window.element.mapFilters.classList.remove('ad-form--disabled');
    window.element.filterFieldsets.forEach(function (element) {
      element.disabled = false;
    });

    window.element.filterSelects.forEach(function (element) {
      element.disabled = false;
    });
  };

  window.pin.renderPins = function (data) {
    var pinsData = window.sorting(data);
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pinsData.length; i++) {
      var pin = getPinElement(pinsData[i]);
      pin = addEventListenerPins(pin, pinsData[i]);
      fragment.appendChild(pin);
      if (i >= MAX_OUTPUT_PIN) {
        break;
      }
    }

    removeMapPin();

    mapPins.appendChild(fragment);

    activateFilter();

  };

})();
