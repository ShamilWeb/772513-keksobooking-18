'use strict';

(function () {
  window.util = {
    map: document.querySelector('.map'),
    ESC_KEYCODE: 27,
    address: document.querySelector('#address'),
    getRandomNumber: function (min, max) { // Генерирует случайное число
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    outputErrors: function (errorMessage) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorTemplateClone = errorTemplate.cloneNode(true)
      var errorMessageTpl = errorTemplateClone.querySelector('.error__message');
      var errorButton = errorTemplateClone.querySelector('.error__button');
      var main = document.querySelector('main');
      errorMessageTpl.textContent = errorMessage;
      main.prepend(errorTemplateClone);

      errorButton.addEventListener('click', function () {
        errorTemplateClone.remove();
        window.activation.activationPage(false);
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          errorTemplateClone.remove();
          window.activation.activationPage(false);
        }
        });

      errorTemplateClone.addEventListener('click', function () {
        errorTemplateClone.remove();
        window.activation.activationPage(false);
      });

      errorMessageTpl.addEventListener('click', function (evt) {
        evt.stopPropagation();
      });
    },
  };

})();
