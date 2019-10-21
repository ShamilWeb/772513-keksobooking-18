'use strict';

(function () {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var typeHouseMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var indexFeaturesMap = {
    'wifi': 0,
    'dishwasher': 1,
    'parking': 2,
    'washer': 3,
    'elevator': 4,
    'conditioner': 5
  };

  var transferFeaturesMap = {
    'wifi': 'wifi',
    'dishwasher': 'посудомоечная машина',
    'parking': 'стоянка',
    'washer': 'стиральная машина',
    'elevator': 'лифт',
    'conditioner': 'кондиционер'
  };

  // --------удаляет домэлемент----------
  window.removeDomElement = function (selector) {
    if (document.querySelector(selector)) {
      document.querySelector(selector).remove();
    }
  };
  // ///////////////////////////////////////

  // --------удаляет домэлемент и класс map__pin--active----------
  window.removeDomElementAndClass = function (selector) {
    window.removeDomElement(selector);
    if (document.querySelector('.map__pin--active')) {
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };
  // ///////////////////////////////////////

  // -------Добавляет слушатель на дом элементы------------------
  window.addMyEventListener = function (selector, fact, callback, keyNamber) {
    var domElement = document.querySelectorAll(selector);
    if (fact !== 'keydown') {
      for (var i = 0; i < domElement.length; i++) {
        domElement[i].addEventListener(fact, callback);
      }
    } else {
      document.addEventListener(fact, function (evt) {
        if (evt.keyCode === keyNamber) {
          callback();
        }
      });
    }
  };
  // ////////////////////////////////////////////////////////////////

  // ----------Вставляет данные в шаблон Card------
  window.getCardElement = function (card) {
    var cardElement = mapCardTemplate.cloneNode(true);
    var popupTitle = cardElement.querySelector('.popup__title');
    var popupTextAddress = cardElement.querySelector('.popup__text--address');
    var popupTextPrice = cardElement.querySelector('.popup__text--price');
    var popupType = cardElement.querySelector('.popup__type');
    var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
    var popupTextTime = cardElement.querySelector('.popup__text--time');
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupDescription = cardElement.querySelector('.popup__description');
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var imgPhoto = popupPhotos.querySelector('img');
    var popupAvatar = cardElement.querySelector('.popup__avatar');
    popupTitle.textContent = card.offer.title;
    popupTextAddress.textContent = card.offer.address;
    popupTextPrice.textContent = card.offer.price + '₽/ночь';
    popupType.textContent = typeHouseMap[card.offer.type];
    popupTextCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    popupTextTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    for (var i = 0; i < card.offer.features.length; i++) {
      popupFeatures.children[indexFeaturesMap[card.offer.features[i]]].textContent = transferFeaturesMap[card.offer.features[i]];
    }
    for (i = 0; i < popupFeatures.children.length; i++) {
      if (!popupFeatures.children[i].textContent) {
        popupFeatures.children[i].classList.add('hidden');
      }
    }

    popupDescription.textContent = card.offer.description;

    var img = imgPhoto.cloneNode();
    imgPhoto.remove();
    for (i = 0; i < card.offer.photos.length; i++) {
      var imgClone = img.cloneNode();
      popupPhotos.appendChild(imgClone);
    }

    for (i = 0; i < card.offer.photos.length; i++) {
      popupPhotos.children[i].src = card.offer.photos[i];
    }

    popupAvatar.src = card.author.avatar;

    return cardElement;
  };
  // ////////////////////////////////////////////

  // --------------Вставляет готовый шаблон в разметку
  window.card.renderCards = function (data) {
    var card = data;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.getCardElement(card));
    map.appendChild(fragment);
  };
  // //////////////////////////////////////////////////////

})();
