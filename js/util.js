'use strict';

(function () {
  window.util = {
    getRandomNumber: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getInactivePage: function (errorTemplate) {
      errorTemplate.remove();
      window.activation.activationPage(false);
    },
    onDisabledPage: function (evt) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        window.util.getInactivePage(window.util.errorTemplateClone);
        document.removeEventListener('keydown', window.util.onDisabledPage);
      }
    },
    outputErrors: function () {
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
    getCoordinatesPin: function () {
      var coordinateX = Math.floor(window.element.mapPin.offsetLeft + (window.constants.MAP_PIN_WIDTH / 2));
      var coordinateY = Math.floor(window.element.mapPin.offsetTop + (window.constants.ACTIVE_PAGE? window.constants.MAP_PIN_HEIGHT : window.constants.MAP_PIN_ROUND_HEIGHT/2));
      window.element.address.value = coordinateX + ', ' + coordinateY;
    },
    removeDomElement: function (selector) {
      if (document.querySelector(selector)) {
        document.querySelector(selector).remove();
      }
    },
    removeDomElementAndClass: function (selector) {
      window.util.removeDomElement(selector);
      if (document.querySelector('.map__pin--active')) {
        document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      }
    },
    addEventListenerKeydown: function (selector, fact, callback, keyNamber) {
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
