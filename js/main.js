'use strict';

var map = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var fieldset = document.querySelectorAll('fieldset');
var select = document.querySelectorAll('select');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var titles = ['Дом', 'Квартира', 'Замок', 'Теремок', 'Шалаш', 'Пещера', 'Хата', 'Дворец'];
var types = ['palace', 'bungalo', 'flat', 'house'];
var checkins = ['12:00', '13:00', '14:00'];
var featureses = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptions = ['aaaaaaaaaaaaaaaaa', 'sssssssssssssssss', 'ddddddddddddddddddd'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var address = document.querySelector('#address');
var mapPin = document.querySelector('.map__pin');
var roomsNumber = document.querySelector('#room_number');
var capacitys = document.querySelector('#capacity');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ENTER_KEYCODE = 13;
var MAP_PIN_WIDTH = 65;
var MAP_PIN_HEIGHT = 72;
var MAX_NUMBER_ROOMS = 100;

// ----Генерирует случайное число---------------------
var getRandomNumber = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};
// /////////////////////////////////////////////////////////

// ----Из элементов массива создает новый рандомный массив------------
var getRandomArry = function (arry) {
  var arryClone = arry.sort(function () {
    return Math.random() - 0.5;
  }).slice();

  return arryClone.splice(0, getRandomNumber(1, arryClone.length));
};
// /////////////////////////////////////////////////////////////////////////

// ----Создает Стрктуру данных---------------------
var getPins = function () {

  var pinsList = [];

  for (var i = 0; i < 8; i++) {
    var photosRandom = getRandomArry(photos);
    var featuresesRandom = getRandomArry(featureses);
    var location = {
      x: getRandomNumber(0, map.offsetWidth) - (PIN_WIDTH / 2),
      y: getRandomNumber(130, 630) - PIN_HEIGHT
    };

    var pins = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titles[getRandomNumber(0, titles.length - 1)],
        address: location.x + ' ' + location.y,
        price: getRandomNumber(1000, 1500),
        rooms: getRandomNumber(1, 15),
        guests: getRandomNumber(1, 25),
        checkin: checkins[getRandomNumber(0, checkins.length - 1)],
        checkout: checkins[getRandomNumber(0, checkins.length - 1)],
        description: descriptions[getRandomNumber(0, descriptions.length - 1)],
        photos: photosRandom,
        type: types[getRandomNumber(0, types.length - 1)],
        features: featuresesRandom
      },
      location: location
    };

    pinsList.push(pins);
  }
  return pinsList;
};
// ///////////////////////////////////////////////

// ----------Вставляет данные в шаблон
var getPinElement = function (pin) {
  var markElement = mapPinTemplate.cloneNode(true);
  var img = markElement.querySelector('img');
  img.src = pin.author.avatar;
  img.alt = pin.offer.title;
  markElement.style.left = pin.location.x + 'px';
  markElement.style.top = pin.location.y + 'px';
  return markElement;
};
// ////////////////////////////////////////////

// --------------Вставляет готовый шаблон в разметку
var renderPins = function () {
  var pins = getPins();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(getPinElement(pins[i]));
  }
  mapPins.appendChild(fragment);
};
// //////////////////////////////////////////////////////

// ------переводит страницу в активное состояние----------------------------
var activationPage = function (isActive) {
  if (isActive) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('ad-form--disabled');
  } else {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('ad-form--disabled');
  }
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = !isActive;
  }
  for (i = 0; i < select.length; i++) {
    select[i].disabled = !isActive;
  }
};
// /////////////////////////////////////////////////////////////////

// -----При нажатии мышкой на кекс в цетре карты, переводит страницу в активное состояние-------------
mapPinMain.addEventListener('mousedown', function () {
  activationPage(true);
  renderPins();
});
// //////////////////////////////////////////////////////////////

// -------При нажатии ИНТЕРОМ на кекс в цетре карты, переводит страницу в активное состояние-------------
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activationPage(true);
    renderPins();
  }
});
// ////////////////////////////////////////////////////////////////////////////////

// -------Вычисляет координаты метки X и Y, взависимости от длины острого конца и втавляет в поле адресса------------------
var getCoordinatesPin = function () {
  var coordinateX = Math.floor(mapPin.offsetLeft + (MAP_PIN_WIDTH / 2));
  var coordinateY = Math.floor(mapPin.offsetTop + MAP_PIN_HEIGHT);
  address.value = coordinateX + ', ' + coordinateY;
};
// /////////////////////////////////////////////////////////////////////////////////////////

activationPage(false);

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
