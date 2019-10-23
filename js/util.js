'use strict';

(function () {
  window.util = {
    mapFilters: document.querySelector('.map__filters'),
    form: document.querySelector('.ad-form'),
    map: document.querySelector('.map'),
    ESC_KEYCODE: 27,
    MAP_PIN_WIDTH: 65,
    MAP_PIN_HEIGHT: 72,
    address: document.querySelector('#address'),
    getRandomNumber: function (min, max) { // Генерирует случайное число
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getInactivePage: function (removeErrorTemplate) {
      removeErrorTemplate.remove();
      window.activation.activationPage(false);
    },
    outputErrors: function (errorMessage) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorTemplateClone = errorTemplate.cloneNode(true);
      var errorMessageTpl = errorTemplateClone.querySelector('.error__message');
      var errorButton = errorTemplateClone.querySelector('.error__button');
      var main = document.querySelector('main');
      errorMessageTpl.textContent = errorMessage;
      main.prepend(errorTemplateClone);

      errorButton.addEventListener('click', function () {
        window.util.getInactivePage(errorTemplateClone);
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          window.util.getInactivePage(errorTemplateClone);
        }
      });

      errorTemplateClone.addEventListener('click', function () {
        window.util.getInactivePage(errorTemplateClone);
      });

      errorMessageTpl.addEventListener('click', function (evt) {
        evt.stopPropagation();
      });
    },
  };

  window.mapPin = document.querySelector('.map__pin');

  // -------Вычисляет координаты метки X и Y, взависимости от длины острого конца и втавляет в поле адресса------------------
  window.getCoordinatesPin = function () {
    var coordinateX = Math.floor(window.mapPin.offsetLeft + (window.util.MAP_PIN_WIDTH / 2));
    var coordinateY = Math.floor(window.mapPin.offsetTop + window.util.MAP_PIN_HEIGHT);
    window.util.address.value = coordinateX + ', ' + coordinateY;
  };
  // /////////////////////////////////////////////////////////////////////////////////////////

})();
