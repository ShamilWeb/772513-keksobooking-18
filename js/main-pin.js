'use strict';

(function () {
  var mapOverlay = document.querySelector('.map__overlay');
  var mapPinMainImg = window.mapPinMain.querySelector('img');
  var main = document.querySelector('main');

  var MAX_HEIGHT = 630;
  var MIN_HEIGHT = 130;
  var MIN_WIDTH = 0;
  // --------Этот кусок кода отвечает за перетаскивания попапа в окне браузера---------------------
  window.mapPinMain.addEventListener('mousedown', function (evt) {
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
      var MAX_WIDTH = mapOverlay.clientWidth;
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

      var dragX = window.mapPinMain.offsetLeft - shift.x;
      if (dragX < MIN_WIDTH) {
        dragX = MIN_WIDTH;
      } else if (dragX > MAX_WIDTH - window.util.MAP_PIN_WIDTH) {
        dragX = MAX_WIDTH - window.util.MAP_PIN_WIDTH;
      }
      window.mapPinMain.style.left = dragX + 'px';

      var dragY = window.mapPinMain.offsetTop - shift.y;
      if (dragY < MIN_HEIGHT - window.util.MAP_PIN_HEIGHT) {
        dragY = MIN_HEIGHT - window.util.MAP_PIN_HEIGHT;
      } else if (dragY > MAX_HEIGHT - window.util.MAP_PIN_HEIGHT) {
        dragY = MAX_HEIGHT - window.util.MAP_PIN_HEIGHT;
      }
      window.mapPinMain.style.top = dragY + 'px';

      var moveEvtClientX = moveEvt.clientX - main.offsetLeft;
      var dragYPageYOffset = dragY - Math.ceil(window.pageYOffset);
      if (moveEvtClientX < dragX ||
        moveEvtClientX > dragX + window.util.MAP_PIN_WIDTH ||
        moveEvt.clientY < dragYPageYOffset ||
        moveEvt.clientY > dragYPageYOffset + window.util.MAP_PIN_HEIGHT) {
              document.removeEventListener('mousemove', onMouseMove);
              mapPinMainImg.classList.add('bgNone');
            }

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
