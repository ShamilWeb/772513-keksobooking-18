'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin');
  var roomsNumber = document.querySelector('#room_number');
  var capacitys = document.querySelector('#capacity');
  var address = document.querySelector('#address');
  var MAP_PIN_WIDTH = 65;
  var MAP_PIN_HEIGHT = 72;
  var MAX_NUMBER_ROOMS = 100;

  // -------Вычисляет координаты метки X и Y, взависимости от длины острого конца и втавляет в поле адресса------------------
  var getCoordinatesPin = function () {
    var coordinateX = Math.floor(mapPin.offsetLeft + (MAP_PIN_WIDTH / 2));
    var coordinateY = Math.floor(mapPin.offsetTop + MAP_PIN_HEIGHT);
    address.value = coordinateX + ', ' + coordinateY;
  };
  // /////////////////////////////////////////////////////////////////////////////////////////

  getCoordinatesPin();

  // ---------- Определяет какое количество комнат выбрал пользователь---------------------
  var defineNumberRooms = function () {
    for (var i = 0; i < roomsNumber.options.length; i++) {
      if (roomsNumber.options[i].selected) {
        var numberRooms = roomsNumber.options[i].value;
      }
    }
    return numberRooms;
  };
  // ///////////////////////////////////////////////////////////////////

  // ----------Удаляет атрибут disabled у всех options в склекте гости--------------------------
  var removesDisabledCapacitys = function () {
    for (var i = 0; i < capacitys.options.length; i++) {
      capacitys.options[i].disabled = false;
    }
  };
  // ///////////////////////////////////////////////////////////////////////////////

  // -----------Добавляет атрибут disabled к определенным options в склекте гости--------------
  var addDisabledCapacitys = function (numberRooms) {
    for (var i = 0; i < capacitys.options.length; i++) {
      if (Number(capacitys.options[i].value) > Number(numberRooms)) {
        capacitys.options[i].disabled = true;
      }

      if (MAX_NUMBER_ROOMS === Number(numberRooms)) {
        capacitys.options[capacitys.options.length - 1].disabled = false;
        for (var j = 0; j < capacitys.options.length; j++) {
          if (capacitys.options[j].textContent !== 'не для гостей') {
            capacitys.options[j].disabled = true;
          }
        }
      } else {
        capacitys.options[capacitys.options.length - 1].disabled = true;
      }
    }
  };
  // ///////////////////////////////////////////////////////////////////////////////////

  // ------Если выбранное количество гостей, после переключения количество комнат, стало недоступным, то данная функция переключает на доступное количество гостей---------------------------
  var switchСapacitys = function () {
    for (var i = 0; i < capacitys.options.length; i++) {
      if (capacitys.options[i].selected) { // Определяем какой option выбран
        if (capacitys.options[i].disabled) { // Проверяем у него значение disabled, если tru то выполняем следующи код
          for (var j = 0; j < capacitys.options.length; j++) {
            if (!capacitys.options[j].disabled) { // Здесь находим первый элемент который активен и переходи к нему
              capacitys.options[j].selected = true;
              break;
            }
          }
        }
      }
    }
  };
  // ///////////////////////////////////////////////////////////////////////////////////////////

  // -------не дает пользователю выбрать количество гостей больше количества комнат
  roomsNumber.addEventListener('change', function () {
    removesDisabledCapacitys();
    addDisabledCapacitys(defineNumberRooms());
    switchСapacitys();
  });
  // /////////////////////////////////////////////////////////////////////////////////

})();
