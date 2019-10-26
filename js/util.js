'use strict';

(function () {
  window.util = {
    mapPin: document.querySelector('.map__pin'),
    mapFilters: document.querySelector('.map__filters'),
    form: document.querySelector('.ad-form'),
    map: document.querySelector('.map'),
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
        if (evt.keyCode === window.constants.ESC_KEYCODE) {
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
    getCoordinatesPin: function () { // -------Вычисляет координаты метки X и Y, взависимости от длины острого конца и втавляет в поле адресса-------
      var coordinateX = Math.floor(window.util.mapPin.offsetLeft + (window.constants.MAP_PIN_WIDTH / 2));
      var coordinateY = Math.floor(window.util.mapPin.offsetTop + window.constants.MAP_PIN_HEIGHT);
      window.util.address.value = coordinateX + ', ' + coordinateY;
    },
    removeDomElement: function (selector) { // --------удаляет домэлемент----------
      if (document.querySelector(selector)) {
        document.querySelector(selector).remove();
      }
    },
    removeDomElementAndClass: function (selector) { // --------удаляет домэлемент и класс map__pin--active---------
      window.util.removeDomElement(selector);
      if (document.querySelector('.map__pin--active')) {
        document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
    },
    addEventListenerKeydown: function (selector, fact, callback, keyNamber) { // -------Добавляет слушатель на дом элементы------------------
      var domElement = document.querySelectorAll(selector);
      if (fact !== 'keydown') {
        for (var i = 0; i < domElement.length; i++) {
          domElement[i].addEventListener(fact, callback);
        }
      } else {
        document.addEventListener(fact, function (evt) {
          if (evt.keyCode === keyNamber) {
            callback();
          }
        });
      }
    }
  };

})();
