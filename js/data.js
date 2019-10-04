'use strict';

(function () {
  var titles = ['Дом', 'Квартира', 'Замок', 'Теремок', 'Шалаш', 'Пещера', 'Хата', 'Дворец'];
  var types = ['palace', 'bungalo', 'flat', 'house'];
  var checkins = ['12:00', '13:00', '14:00'];
  var featureses = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var descriptions = ['aaaaaaaaaaaaaaaaa', 'sssssssssssssssss', 'ddddddddddddddddddd'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;


  // ----Из элементов массива создает новый рандомный массив------------
  var getRandomArry = function (arry) {
    var arryClone = arry.sort(function () {
      return Math.random() - 0.5;
    }).slice();

    return arryClone.splice(0, window.util.getRandomNumber(1, arryClone.length));
  };
  // /////////////////////////////////////////////////////////////////////////

  // ----Создает Стрктуру данных---------------------
  var getPins = function () {

    var pinsList = [];

    for (var i = 0; i < 8; i++) {
      var photosRandom = getRandomArry(photos);
      var featuresesRandom = getRandomArry(featureses);
      var location = {
        x: window.util.getRandomNumber(0, window.util.map.offsetWidth) - (PIN_WIDTH / 2),
        y: window.util.getRandomNumber(130, 630) - PIN_HEIGHT
      };

      var pins = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: titles[window.util.getRandomNumber(0, titles.length - 1)],
          address: location.x + ' ' + location.y,
          price: window.util.getRandomNumber(1000, 1500),
          rooms: window.util.getRandomNumber(1, 15),
          guests: window.util.getRandomNumber(1, 25),
          checkin: checkins[window.util.getRandomNumber(0, checkins.length - 1)],
          checkout: checkins[window.util.getRandomNumber(0, checkins.length - 1)],
          description: descriptions[window.util.getRandomNumber(0, descriptions.length - 1)],
          photos: photosRandom,
          type: types[window.util.getRandomNumber(0, types.length - 1)],
          features: featuresesRandom
        },
        location: location
      };

      pinsList.push(pins);
    }
    return pinsList;
  };
  // ///////////////////////////////////////////////

  window.data = {
    getPins: getPins
  };

})();
