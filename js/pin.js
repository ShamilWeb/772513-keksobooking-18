'use strict';

(function () {
  var MAX_OUTPUT_PIN = 5;
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  var getPinElement = function (pin) {
    var markElement = mapPinTemplate.cloneNode(true);
    var img = markElement.querySelector('img');
    img.src = pin.author.avatar;
    img.alt = pin.offer.title;
    markElement.style.left = pin.location.x + 'px';
    markElement.style.top = pin.location.y + 'px';
    return markElement;
  };

  var getCircuit = function (pins, cards) {
    pins.addEventListener('click', function () {
      if (document.querySelector('.map__pin--active')) {
        document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
      pins.classList.add('map__pin--active');
      if (document.querySelector('.map__card')) {
        window.util.removeDomElement('.map__card');
      }
      window.card.renderCards(cards);
      window.util.addEventListenerKeydown('.popup__close', 'click', window.util.removeDomElementAndClass.bind(null, '.map__card'));
      window.util.addEventListenerKeydown('.popup__close', 'keydown', window.util.removeDomElementAndClass.bind(null, '.map__card'), 27);
    });
    return pins;
  };

  var addEventListenerPins = function (pin, cards) {
    return getCircuit(pin, cards);
  };

  var removeMapPin = function () {
    var pins = document.querySelector('.map__pins').querySelectorAll('.map__pin');
    if (pins) {
      for (var i = 1; i < pins.length; i++) {
        pins[i].remove();
      }
    }
  };

  window.pin.renderPins = function (data) {
    var pinsData = window.sorting(data);
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_OUTPUT_PIN && i < pinsData.length; i++) {
      var pin = getPinElement(pinsData[i]);
      pin = addEventListenerPins(pin, pinsData[i]);
      fragment.appendChild(pin);
    }

    removeMapPin();

    mapPins.appendChild(fragment);

    window.element.mapFilters.classList.remove('ad-form--disabled');
  };

})();
