'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

  // ----------Вставляет данные в шаблон
  var getPinElement = function (pin) {
    var markElement = mapPinTemplate.cloneNode(true);
    var img = markElement.querySelector('img');
    img.src = pin.author.avatar;
    img.alt = pin.offer.title;
    markElement.style.left = pin.location.x + 'px';
    markElement.style.top = pin.location.y + 'px';
    return markElement;
  };
  // ////////////////////////////////////////////

  // -------Добавляет пинам слушатель клика-----------
  var getCircuit = function (pins, cards) {
    pins.addEventListener('click', function () {
      if(document.querySelector('.map__pin--active')) {
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
  };

  var addEventListenerPins = function (pins, cards) {
    for (var i = 0; i < pins.length; i++) {
      getCircuit(pins[i], cards[i]);
    }
  };
  // ///////////////////////////////////////////////

  // --------Вставляет готовый шаблон в разметку--------
  window.pin.renderPins = function (data) {
    var pins = data;
    var pinsCopy = window.sorting(pins);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 5 && i < pinsCopy.length; i++) {
      fragment.appendChild(getPinElement(pinsCopy[i]));
    }
    if (window.util.mapPins) {console.log(window.util.mapPins);
      for (i = 1; i < window.util.mapPins.length; i++) {
        window.util.mapPins[i].remove();
      }
    }
    mapPins.appendChild(fragment);
    window.util.mapPins = document.querySelector('.map__pins').querySelectorAll('.map__pin');
    pins = Array.from(window.util.mapPins);
    pins.shift();
    addEventListenerPins(pins, pinsCopy);
    if (window.xhr) {
      window.util.mapFilters.classList.remove('ad-form--disabled');
    }
  };
  // //////////////////////////////////////////////////////

})();
