'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';
  var XHR_TIMEOUT = 10000;

  var load = function (onLoad, onError) {
    window.window.xhr = new XMLHttpRequest();

    window.xhr.responseType = 'json';

    window.xhr.addEventListener('load', function () {
      if (window.xhr.status === 200) {
        window.serverData = window.xhr.response;
        onLoad(window.xhr.response);
      } else {
        onError('Ошибка загрузки объявления');
      }
    });

    window.xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    window.xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + window.xhr.timeout + 'мс');
    });

    window.xhr.timeout = XHR_TIMEOUT; // 10s

    window.xhr.open('GET', URL);
    window.xhr.send();
  };

  window.backend = {
    load: load,
  };
})();
