'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking';
  var XHR_TIMEOUT = 10000;
  var XHR_STATUS = 200;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS) {
        window.backend.serverData = xhr.response;
        onLoad(xhr.response);
      } else {
        onError()
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = XHR_TIMEOUT; // 10s

    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
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
