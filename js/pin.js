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

  // -------На ввход принимает массив Дом элементов, у которых нужно удалить определенный класс и принимает сам удаляемый класс----
  var removeClass = function (arryHtmlElement, classElement) {
    for (var i = 0; i < arryHtmlElement.length; i++) {
      for (var j = 0; j < arryHtmlElement[i].classList.length; j++) {
        if (arryHtmlElement[i].classList[j] === classElement) {
          arryHtmlElement[i].classList.remove(classElement);
        }
      }
    }
  };
  // ///////////////////////////////////////////////////////////////////////////////////////////////////

  // -------Добавляет пинам слушатель клика-----------
  var getCircuit = function (pins, cards, i) {
    pins[i].addEventListener('click', function () {
      removeClass(pins, '.map__pin--active');
      pins[i].classList.add('.map__pin--active');
      if (document.querySelector('.map__card')) {
        window.removeDomElement('.map__card');
      }
      window.card.renderCards(cards[i]);
      window.addMyEventListener('.popup__close', 'click', window.removeDomElement.bind(null, '.map__card'));
      window.addMyEventListener('.popup__close', 'keydown', window.removeDomElement.bind(null, '.map__card'), 27);
    });
  };

  var addEventListenerPins = function (pins, cards) {
    for (var i = 0; i < pins.length; i++) {
      getCircuit(pins, cards, i);
    }
  };
  // ///////////////////////////////////////////////

  // --------Вставляет готовый шаблон в разметку--------
  window.pin.renderPins = function (data) {
    var pins = data;
    var pinsCopy = window.sorting(pins);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 5; i++) {
      fragment.appendChild(getPinElement(pinsCopy[i]));
    }
    if (window.mapPins) {
      for (i = 1; i < window.mapPins.length; i++) {
        window.mapPins[i].remove();
      }
    }
    mapPins.appendChild(fragment);
    window.mapPins = document.querySelector('.map__pins').querySelectorAll('.map__pin');
    pins = Array.from(window.mapPins);
    pins.shift();
    addEventListenerPins(pins, pinsCopy);
  };
  // //////////////////////////////////////////////////////

})();
