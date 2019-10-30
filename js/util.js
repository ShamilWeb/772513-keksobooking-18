'use strict';

(function () {
  window.util = {
    getRandomNumber: function (min, max) { // Генерирует случайное число
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getInactivePage: function (removeErrorTemplate) {
      removeErrorTemplate.remove();
      window.activation.activationPage(false);
    },
    onDisabledPage: function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        window.util.getInactivePage(window.util.errorTemplateClone);
        document.removeEventListener('keydown', window.util.onDisabledPage);
      }
    },
    outputErrors: function (errorMessage) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      window.util.errorTemplateClone = errorTemplate.cloneNode(true);
      var errorMessageTpl = window.util.errorTemplateClone.querySelector('.error__message');
      var errorButton = window.util.errorTemplateClone.querySelector('.error__button');
      var main = document.querySelector('main');
      main.prepend(window.util.errorTemplateClone);

      errorButton.addEventListener('click', function () {
        window.util.getInactivePage(window.util.errorTemplateClone);
      });

      document.addEventListener('keydown', window.util.onDisabledPage);

      window.util.errorTemplateClone.addEventListener('click', function () {
        window.util.getInactivePage(window.util.errorTemplateClone);
      });

      errorMessageTpl.addEventListener('click', function (evt) {
        evt.stopPropagation();
      });
    },
    getCoordinatesPin: function () { // -------Вычисляет координаты метки X и Y, взависимости от длины острого конца и втавляет в поле адресса-------
      var coordinateX = Math.floor(window.element.mapPin.offsetLeft + (window.constants.MAP_PIN_WIDTH / 2));
      var coordinateY = Math.floor(window.element.mapPin.offsetTop + window.constants.MAP_PIN_HEIGHT);
      window.element.address.value = coordinateX + ', ' + coordinateY;
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
      var domElements = document.querySelectorAll(selector);
      if (fact !== 'keydown') {
        for (var i = 0; i < domElements.length; i++) {
          domElements[i].addEventListener(fact, callback);
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
