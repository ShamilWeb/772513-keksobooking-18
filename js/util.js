'use strict';

(function () {
  window.util = {
    map: document.querySelector('.map'),
    ESC_KEYCODE: 27,
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

})();
