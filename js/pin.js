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

  // --------------Вставляет готовый шаблон в разметку
  window.pin.renderPins = function (data) {
    var pins = data;
    console.log(pins[0].offer.type);
    var pinsCopy = sorting(pins);
    console.log(pinsCopy[0].offer.type);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 5; i++) {
      fragment.appendChild(getPinElement(pinsCopy[i]));
    }
    mapPins.appendChild(fragment);
  };
  // //////////////////////////////////////////////////////

})();
