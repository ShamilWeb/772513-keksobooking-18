'use strict';

(function () {
  var MAX_HEIGHT = 630;
  var MIN_HEIGHT = 130;
  var MIN_WIDTH = 0;
  var MAX_WIDTH = window.element.mapOverlay.clientWidth;
  var main = document.querySelector('main');

  var getIf = function (moveEvt, moveEvtClientX, dragX, dragYPageYOffset) {
    return moveEvtClientX > dragX &&
      moveEvtClientX < dragX + window.Сonstants.MAP_PIN_WIDTH &&
      moveEvt.clientY > dragYPageYOffset &&
      moveEvt.clientY < dragYPageYOffset + window.Сonstants.MAP_PIN_HEIGHT;
  };

  var updateСoordinates = function (moveEvt, moveEvtClientX, dragX, dragY, dragYPageYOffset) {
    if (getIf(moveEvt, moveEvtClientX, dragX, dragYPageYOffset)) {
      if (dragX < -window.Сonstants.MAP_PIN_WIDTH / 2) {
        dragX = -window.Сonstants.MAP_PIN_WIDTH / 2;
      } else if (dragX > MAX_WIDTH - window.Сonstants.MAP_PIN_WIDTH / 2) {
        dragX = MAX_WIDTH - window.Сonstants.MAP_PIN_WIDTH / 2;
      }
      window.activation.mapPinMain.style.left = dragX + 'px';

      if (dragY < MIN_HEIGHT - window.Сonstants.MAP_PIN_HEIGHT) {
        dragY = MIN_HEIGHT - window.Сonstants.MAP_PIN_HEIGHT;
      } else if (dragY > MAX_HEIGHT - window.Сonstants.MAP_PIN_HEIGHT) {
        dragY = MAX_HEIGHT - window.Сonstants.MAP_PIN_HEIGHT;
      }
      window.activation.mapPinMain.style.top = dragY + 'px';
    }
  };

  window.activation.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var dragX = window.activation.mapPinMain.offsetLeft - shift.x;
      var dragY = window.activation.mapPinMain.offsetTop - shift.y;
      var moveEvtClientX = moveEvt.clientX - main.offsetLeft;
      var dragYPageYOffset = dragY - Math.ceil(window.pageYOffset);

      updateСoordinates(moveEvt, moveEvtClientX, dragX, dragY, dragYPageYOffset);

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

})();
