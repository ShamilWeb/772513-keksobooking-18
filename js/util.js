'use strict';

(function () {
  window.util = {
    getRandomNumber: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    getInactivePage: function (errorTemplate) {
      errorTemplate.remove();
      window.activation.activatePage(false);
    },
    onDeactivatePage: function (evt) {
      if (evt.keyCode === window.Constants.ESC_KEYCODE) {
        window.util.getInactivePage(window.util.errorTemplateClone);
        document.removeEventListener('keydown', window.util.onDeactivatePage);
      }
    },
    outputErrors: function () {
      window.util.errorTemplateClone = window.element.errorTemplate.cloneNode(true);
      var errorMessageTpl = window.util.errorTemplateClone.querySelector('.error__message');
      var errorButton = window.util.errorTemplateClone.querySelector('.error__button');

      window.element.main.prepend(window.util.errorTemplateClone);

      errorButton.addEventListener('click', function () {
        window.util.getInactivePage(window.util.errorTemplateClone);
      });

      document.addEventListener('keydown', window.util.onDeactivatePage);

      window.util.errorTemplateClone.addEventListener('click', function () {
        window.util.getInactivePage(window.util.errorTemplateClone);
      });

      errorMessageTpl.addEventListener('click', function (evt) {
        evt.stopPropagation();
      });
    },
    getCoordinatesPin: function () {
      var coordinateX = Math.floor(window.element.mapPin.offsetLeft + (window.Constants.MAP_PIN_WIDTH / 2));
      var coordinateY = Math.floor(window.element.mapPin.offsetTop + (window.Constants.ACTIVE_PAGE ? window.Constants.MAP_PIN_HEIGHT : window.Constants.MAP_PIN_ROUND_HEIGHT / 2));
      window.element.address.value = coordinateX + ', ' + coordinateY;
    },
    removeDomElement: function (selector) {
      if (document.querySelector(selector)) {
        document.querySelector(selector).remove();
      }
    },

    addEventListenerKeydown: function (selector, fact, callback, keyNamber) {
      var domElements = document.querySelectorAll(selector);
      if (fact !== 'keydown') {
        domElements.forEach(function (element) {
          element.addEventListener(fact, callback);
        });
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
