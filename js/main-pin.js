'use strict';

(function () {
  var mapOverlay = document.querySelector('.map__overlay');
  var MAX_HEIGHT = 630;
  var MIN_HEIGHT = 130;

  // --------Этот кусок кода отвечает за перетаскивания попапа в окне браузера---------------------
  window.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // -----Кортдинаты мышки в момент нажатии на window.mapPinMain------
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    // ////////////////////////////////////////////////////////////////////

    var onMouseMove = function (moveEvt) { // Это функция будет вызываться каждый раз когда будет двигаться мышка нажавщая элемент "dialogHandler"
      moveEvt.preventDefault();

      // ---- При выполнении функции "onMouseMove" эти два объекта способствуют тому, что shift.x и shift.y всегда будут равны 1 или -1, в зависимости куда мышка двигается------------
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      if (window.mapPinMain.offsetTop + window.MAP_PIN_HEIGHT > MAX_HEIGHT) {
        shift.y = 1;
      }

      if (window.mapPinMain.offsetTop + window.MAP_PIN_HEIGHT < MIN_HEIGHT) {
        shift.y = -1;
      }

      if (window.mapPinMain.offsetLeft + window.MAP_PIN_WIDTH > mapOverlay.clientWidth) {
        shift.x = 1;
      }

      if (window.mapPinMain.offsetLeft < 0) {
        shift.x = -1;
      }

      // ---Благодаря тому, что мы можем в зависимость от напрвления мышки получать 1 или -1, мы также можем в зависимости от направления мышки менять top и left нашего пинам
      window.mapPinMain.style.top = (window.mapPinMain.offsetTop - shift.y) + 'px';
      window.mapPinMain.style.left = (window.mapPinMain.offsetLeft - shift.x) + 'px';
      // /////////////////////////////////////////////////////////////////////////////////////////////

      window.getCoordinatesPin();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})();
