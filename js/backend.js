'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking';
  var XHR_TIMEOUT = 10000;
  var XHR_STATUS = 200;

  var load = function (onLoad, onError) {
    window.window.xhr = new XMLHttpRequest();

    window.xhr.responseType = 'json';

    window.xhr.addEventListener('load', function () {
      if (window.xhr.status === XHR_STATUS) {
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

    window.xhr.open('GET', URL + '/data');
    window.xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT; // 10s

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
