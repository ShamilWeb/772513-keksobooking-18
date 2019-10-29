'use strict';

(function () {
  var MAX_HEIGHT = 630;
  var MIN_HEIGHT = 130;
  var MIN_WIDTH = 0;
  var mapOverlay = document.querySelector('.map__overlay');
  var MAX_WIDTH = mapOverlay.clientWidth;
  var mapPinMainImg = window.activation.mapPinMain.querySelector('img');
  var main = document.querySelector('main');

  // --------Этот кусок кода отвечает за перетаскивания попапа в окне браузера---------------------
  window.activation.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    mapPinMainImg.classList.remove('bgNone');
    // -----Кортдинаты мышки в момент нажатии на window.mapPinMain------
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    // ////////////////////////////////////////////////////////////////////

    var onMouseMove = function (moveEvt) { // Это функция будет вызываться каждый раз когда будет двигаться мышка нажавщая элемент "dialogHandler"
      moveEvt.preventDefault();
      MAX_WIDTH = mapOverlay.clientWidth;
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

      var dragX = window.activation.mapPinMain.offsetLeft - shift.x;
      var dragY = window.activation.mapPinMain.offsetTop - shift.y;
      var moveEvtClientX = moveEvt.clientX - main.offsetLeft;
      var dragYPageYOffset = dragY - Math.ceil(window.pageYOffset);

      // -------Проверяет находится ли мышка над передвигаемом пине, если да, то возвращает true-------
      var checkClientX = function () {
        return moveEvtClientX > dragX &&
          moveEvtClientX < dragX + window.constants.MAP_PIN_WIDTH &&
          moveEvt.clientY > dragYPageYOffset &&
          moveEvt.clientY < dragYPageYOffset + window.constants.MAP_PIN_HEIGHT;
      };
      // ///////////////////////////////////////////////////////////////////////////////

      if (checkClientX()) {
        if (dragX < MIN_WIDTH) {
          dragX = MIN_WIDTH;
        } else if (dragX > MAX_WIDTH - window.constants.MAP_PIN_WIDTH) {
          dragX = MAX_WIDTH - window.constants.MAP_PIN_WIDTH;
        }
        window.activation.mapPinMain.style.left = dragX + 'px';

        if (dragY < MIN_HEIGHT - window.constants.MAP_PIN_HEIGHT) {
          dragY = MIN_HEIGHT - window.constants.MAP_PIN_HEIGHT;
        } else if (dragY > MAX_HEIGHT - window.constants.MAP_PIN_HEIGHT) {
          dragY = MAX_HEIGHT - window.constants.MAP_PIN_HEIGHT;
        }
        window.activation.mapPinMain.style.top = dragY + 'px';
      }

      window.util.getCoordinatesPin();
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
