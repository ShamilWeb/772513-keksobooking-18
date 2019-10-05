'use strict';

(function () {
  window.util = {
    map: document.querySelector('.map'),
    address: document.querySelector('#address'),
    getRandomNumber: function (min, max) { // Генерирует случайное число
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },
    outputErrors: function (errorMessage) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorMessageTpl = errorTemplate.querySelector('.error__message');
      var main = document.querySelector('main');
      errorMessageTpl.textContent = errorMessage;
      main.prepend(errorTemplate);
    },
  };

})();
